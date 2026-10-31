import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { body, validationResult } from 'express-validator';

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

// ── Google Sheet webhook URL ──────────────────────────────────────────────────
const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbxFYtY3xkLxT0hrf5PNBkjNu7rSEzqKEcWoImHN4TW8Ewsr31Gv4usCaYME6viJLDSa/exec';

// ── Helper: send lead data to Google Sheet via Apps Script webhook ────────────
const sendToGoogleSheet = async (payload) => {
  try {
    const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    console.log(`[admissionLeads] Sheet webhook → ${res.status}: ${text}`);
  } catch (err) {
    // Non-critical — log but don't fail the request
    console.error('[admissionLeads] Sheet webhook error:', err.message);
  }
};

// ── Validation error handler ─────────────────────────────────────────────────
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
      const { studentName, classApplying, parentName, mobile, city, state, upiTransactionId, source } = req.body;

      // ── Upload screenshot to Cloudinary ──────────────────────────────────
      let screenshotUrl = '';
      if (req.file) {
        const safeName = `${mobile}_${Date.now()}`;
        const result = await uploadToCloudinary(
          req.file.buffer,
          'amatir_admission_leads',
          safeName,
          req.file.mimetype
        );
        screenshotUrl = result.secure_url;
      }

      // ── Push to Google Sheet ──────────────────────────────────────────────
      const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

      await sendToGoogleSheet({
        submittedAt,
        studentName,
        classApplying,
        parentName,
        mobile,
        city,
        state,
        upiTransactionId: upiTransactionId || '',
        source: source || 'interest-form',
        paymentScreenshotUrl: screenshotUrl,
      });

      res.status(201).json({
        message: 'Thank you! Your interest has been registered. We will contact you soon.',
      });
    } catch (err) {
      console.error('[POST /admission-leads]', err);
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }
);

export default router;
