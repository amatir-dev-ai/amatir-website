import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    // ── Core content ──────────────────────────────────────────────────
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
      type: String, // TipTap HTML output
      required: [true, 'Content is required'],
    },

    // ── Cover image (Cloudinary) ──────────────────────────────────────
    coverImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      altText: { type: String, default: '' },
    },

    // ── Classification ────────────────────────────────────────────────
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    tags: [{ type: String, trim: true, lowercase: true }],

    // ── Author ────────────────────────────────────────────────────────
    author: {
      name: { type: String, trim: true, default: 'Amatir Team' },
      avatar: { type: String, default: '' },
      bio: { type: String, default: '' },
    },

    // ── SEO ───────────────────────────────────────────────────────────
    seo: {
      metaTitle: { type: String, trim: true, maxlength: 70, default: '' },
      metaDescription: { type: String, trim: true, maxlength: 160, default: '' },
      canonicalUrl: { type: String, trim: true, default: '' },
      ogImage: { type: String, default: '' },
      keywords: [{ type: String, trim: true }],
    },

    // ── Publishing ────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    readingTime: {
      type: Number, // minutes
      default: 0,
    },

    // ── Engagement ────────────────────────────────────────────────────
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// ── Auto-generate slug from title ─────────────────────────────────────────────
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// ── Auto reading time from HTML content ───────────────────────────────────────
function calcReadingTime(html) {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200)); // 200 wpm average
}

blogSchema.pre('save', async function (next) {
  // Slug generation
  if (!this.slug || this.isModified('title')) {
    const baseSlug = generateSlug(this.title);
    let slug = baseSlug;
    let counter = 1;
    while (await mongoose.model('Blog').findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter++}`;
    }
    this.slug = slug;
  }

  // Reading time
  if (this.isModified('content')) {
    this.readingTime = calcReadingTime(this.content);
  }

  // Auto fill SEO meta title/description from blog fields
  if (!this.seo.metaTitle && this.title) {
    this.seo.metaTitle = this.title.slice(0, 70);
  }
  if (!this.seo.metaDescription && this.excerpt) {
    this.seo.metaDescription = this.excerpt.slice(0, 160);
  }

  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Index for common queries
blogSchema.index({ slug: 1 });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ featured: 1 });

export default mongoose.model('Blog', blogSchema);
