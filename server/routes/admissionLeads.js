import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { body, param, query, validationResult } from 'express-validator';
import AdmissionLead from '../models/AdmissionLead.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ── Cloudinary config ─────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ── Multer — memory storage ────────────────────────────────────────────────────
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter(_req, file, cb) {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG or PDF files are allowed'));
    }
    cb(null, true);
  },
});

// ── Helper: upload buffer to Cloudinary ──────────────────────────────────────
const uploadToCloudinary = (buffer, folder, publicId, mimetype) =>
  new Promise((resolve, reject) => {
    const isPdf = mimetype === 'application/pdf';
    const options = {
      folder,
      resource_type: isPdf ? 'raw' : 'image',
      quality: isPdf ? undefined : 'auto',
      fetch_format: isPdf ? undefined : 'auto',
      ...(publicId
        ? { public_id: publicId.replace(/[^a-z0-9_-]/gi, '_').slice(0, 100), overwrite: true }
        : {}),
    };
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });

// ── Validation helpers ────────────────────────────────────────────────────────
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'Validation failed', errors: errors.array() });
  }
  next();
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC ROUTE — Student / Parent submits interest form
// POST /api/admission-leads
// ═══════════════════════════════════════════════════════════════════════════════
router.post(
  '/',
  upload.single('paymentScreenshot'),
  [
    body('studentName').trim().notEmpty().withMessage('Student name is required'),
    body('classApplying').trim().notEmpty().withMessage('Class is required'),
    body('parentName').trim().notEmpty().withMessage('Parent name is required'),
    body('mobile')
      .trim()
      .matches(/^[6-9]\d{9}$/)
      .withMessage('Enter a valid 10-digit Indian mobile number'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        studentName,
        classApplying,
        parentName,
        mobile,
        city,
        state,
        upiTransactionId,
        source,
      } = req.body;

      // Upload screenshot to Cloudinary (optional)
      let paymentScreenshot = { url: '', publicId: '' };
      if (req.file) {
        const safeName = `${mobile}_${Date.now()}`;
        const result = await uploadToCloudinary(
          req.file.buffer,
          'amatir_admission_leads',
          safeName,
          req.file.mimetype
        );
        paymentScreenshot = {
          url: result.secure_url,
          publicId: result.public_id,
        };
      }

      const lead = await AdmissionLead.create({
        studentName,
        classApplying,
        parentName,
        mobile,
        city,
        state,
        upiTransactionId: upiTransactionId || '',
        paymentScreenshot,
        source: source || 'direct',
      });

      res.status(201).json({
        message: 'Thank you! Your interest has been registered. We will contact you soon.',
        leadId: lead._id,
      });
    } catch (err) {
      console.error('[POST /admission-leads]', err);
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }
);

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN ROUTES (protected)
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/admission-leads/admin — paginated listing with search + filter
router.get('/admin', protect, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 15);
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.status) filter.status = req.query.status;

    if (req.query.search) {
      const s = req.query.search.trim();
      filter.$or = [
        { studentName: { $regex: s, $options: 'i' } },
        { parentName: { $regex: s, $options: 'i' } },
        { mobile: { $regex: s, $options: 'i' } },
        { city: { $regex: s, $options: 'i' } },
        { classApplying: { $regex: s, $options: 'i' } },
      ];
    }

    if (req.query.classApplying) filter.classApplying = req.query.classApplying;

    const [leads, total] = await Promise.all([
      AdmissionLead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      AdmissionLead.countDocuments(filter),
    ]);

    res.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    console.error('[GET /admission-leads/admin]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admission-leads/admin/stats — summary counts
router.get('/admin/stats', protect, async (req, res) => {
  try {
    const [total, byStatus] = await Promise.all([
      AdmissionLead.countDocuments(),
      AdmissionLead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const stats = { total, new: 0, contacted: 0, enrolled: 0, 'not-interested': 0 };
    byStatus.forEach(({ _id, count }) => {
      if (_id in stats) stats[_id] = count;
    });

    res.json({ stats });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admission-leads/admin/:id — single lead detail
router.get(
  '/admin/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid lead ID')],
  handleValidationErrors,
  async (req, res) => {
    try {
      const lead = await AdmissionLead.findById(req.params.id).lean();
      if (!lead) return res.status(404).json({ message: 'Lead not found' });
      res.json({ lead });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PATCH /api/admission-leads/admin/:id — update status / notes
router.patch(
  '/admin/:id',
  protect,
  [
    param('id').isMongoId().withMessage('Invalid lead ID'),
    body('status')
      .optional()
      .isIn(['new', 'contacted', 'enrolled', 'not-interested'])
      .withMessage('Invalid status'),
    body('adminNotes').optional().trim(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const lead = await AdmissionLead.findById(req.params.id);
      if (!lead) return res.status(404).json({ message: 'Lead not found' });

      if (req.body.status !== undefined) lead.status = req.body.status;
      if (req.body.adminNotes !== undefined) lead.adminNotes = req.body.adminNotes;

      await lead.save();
      res.json({ lead });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/admission-leads/admin/:id — delete a lead
router.delete(
  '/admin/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid lead ID')],
  handleValidationErrors,
  async (req, res) => {
    try {
      const lead = await AdmissionLead.findById(req.params.id);
      if (!lead) return res.status(404).json({ message: 'Lead not found' });
      await lead.deleteOne();
      res.json({ message: 'Lead deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
