import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { param, query } from 'express-validator';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ── Cloudinary config ─────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ── Multer — memory storage for Cloudinary upload ─────────────────────────────
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter(_req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

// ── Helper: upload buffer to Cloudinary ──────────────────────────────────────
const uploadToCloudinary = (buffer, folder = 'amatir_blogs') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image', quality: 'auto', fetch_format: 'auto' },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    stream.end(buffer);
  });

// ── Helper: delete from Cloudinary ───────────────────────────────────────────
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (_) {
    // non-critical
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC ROUTES
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/blogs — list published blogs (paginated)
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 50 }),
    query('category').optional().trim(),
    query('tag').optional().trim(),
    query('search').optional().trim(),
    query('featured').optional().isBoolean(),
  ],
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9;
      const skip = (page - 1) * limit;

      const filter = { status: 'published' };

      if (req.query.category) filter.category = req.query.category;
      if (req.query.tag) filter.tags = req.query.tag;
      if (req.query.featured === 'true') filter.featured = true;
      if (req.query.search) {
        filter.$or = [
          { title: { $regex: req.query.search, $options: 'i' } },
          { excerpt: { $regex: req.query.search, $options: 'i' } },
          { tags: { $regex: req.query.search, $options: 'i' } },
        ];
      }

      const [blogs, total] = await Promise.all([
        Blog.find(filter)
          .sort({ publishedAt: -1 })
          .skip(skip)
          .limit(limit)
          .select('-content -seo.keywords'),
        Blog.countDocuments(filter),
      ]);

      res.json({
        blogs,
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
      console.error('[GET /blogs]', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /api/blogs/categories — distinct categories
router.get('/categories', async (_req, res) => {
  try {
    const cats = await Blog.distinct('category', { status: 'published' });
    res.json({ categories: cats.filter(Boolean) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/blogs/:slug — single blog by slug (increments views)
router.get(
  '/:slug',
  [param('slug').trim().notEmpty()],
  async (req, res) => {
    try {
      const blog = await Blog.findOneAndUpdate(
        { slug: req.params.slug, status: 'published' },
        { $inc: { views: 1 } },
        { new: true }
      );
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      res.json({ blog });
    } catch (err) {
      console.error('[GET /blogs/:slug]', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN ROUTES (protected)
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/blogs/admin/all — all blogs (any status) for admin
router.get('/admin/all', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { category: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content'),
      Blog.countDocuments(filter),
    ]);

    res.json({
      blogs,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('[GET /blogs/admin/all]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/blogs/admin/:id — single blog by ID for admin editor
router.get('/admin/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ blog });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/blogs/admin/upload-image — upload image for TipTap inline insert
router.post('/admin/upload-image', protect, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file provided' });
  try {
    const result = await uploadToCloudinary(req.file.buffer, 'amatir_blogs/content');
    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error('[Upload Image Error]', err);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

// POST /api/blogs — create blog
router.post(
  '/',
  protect,
  upload.single('coverImage'),
  async (req, res) => {
    try {
      const data = JSON.parse(req.body.blogData || '{}');

      if (!data.title || !data.title.trim()) {
        return res.status(400).json({ message: 'Title is required' });
      }
      if (!data.content || data.content.trim() === '' || data.content === '<p></p>') {
        return res.status(400).json({ message: 'Content is required' });
      }

      // Cover image upload
      let coverImage = { url: '', publicId: '', altText: data.coverImage?.altText || '' };
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'amatir_blogs/covers');
        coverImage.url = result.secure_url;
        coverImage.publicId = result.public_id;
        coverImage.altText = data.coverImage?.altText || '';
      } else if (data.coverImage?.url) {
        coverImage = data.coverImage;
      }

      const blog = await Blog.create({
        title: data.title.trim(),
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage,
        category: data.category || 'General',
        tags: data.tags || [],
        author: data.author || {},
        seo: data.seo || {},
        status: data.status || 'draft',
        featured: data.featured || false,
        ...(data.status === 'published' && { publishedAt: new Date() }),
      });

      res.status(201).json({ blog });
    } catch (err) {
      console.error('[POST /blogs]', err);
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }
);

// PUT /api/blogs/:id — update blog
router.put(
  '/:id',
  protect,
  upload.single('coverImage'),
  async (req, res) => {
    try {
      const existing = await Blog.findById(req.params.id);
      if (!existing) return res.status(404).json({ message: 'Blog not found' });

      const data = JSON.parse(req.body.blogData || '{}');

      // Handle cover image update
      let coverImage = existing.coverImage;
      if (req.file) {
        // Delete old image from Cloudinary
        await deleteFromCloudinary(existing.coverImage?.publicId);
        const result = await uploadToCloudinary(req.file.buffer, 'amatir_blogs/covers');
        coverImage = {
          url: result.secure_url,
          publicId: result.public_id,
          altText: data.coverImage?.altText || '',
        };
      } else if (data.coverImage?.url && data.coverImage.url !== existing.coverImage?.url) {
        coverImage = data.coverImage;
      }

      const updates = {
        title: data.title ?? existing.title,
        excerpt: data.excerpt ?? existing.excerpt,
        content: data.content ?? existing.content,
        coverImage,
        category: data.category ?? existing.category,
        tags: data.tags ?? existing.tags,
        author: data.author ?? existing.author,
        seo: { ...(existing.seo?.toObject ? existing.seo.toObject() : existing.seo), ...data.seo },
        status: data.status ?? existing.status,
        featured: data.featured ?? existing.featured,
        slug: data.slug ?? existing.slug,
      };

      // Re-trigger publishedAt logic
      if (data.status === 'published' && !existing.publishedAt) {
        updates.publishedAt = new Date();
      }

      Object.assign(existing, updates);
      await existing.save();

      res.json({ blog: existing });
    } catch (err) {
      console.error('[PUT /blogs/:id]', err);
      res.status(500).json({ message: err.message || 'Server error' });
    }
  }
);

// DELETE /api/blogs/:id — delete blog
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await deleteFromCloudinary(blog.coverImage?.publicId);
    await blog.deleteOne();

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('[DELETE /blogs/:id]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/blogs/:id/toggle-status — quick publish/unpublish
router.patch('/:id/toggle-status', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.status = blog.status === 'published' ? 'draft' : 'published';
    if (blog.status === 'published' && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }
    await blog.save();

    res.json({ blog: { _id: blog._id, status: blog.status, publishedAt: blog.publishedAt } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
