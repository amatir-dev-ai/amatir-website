import mongoose from 'mongoose';

const admissionLeadSchema = new mongoose.Schema(
  {
    // ── Student Details ──────────────────────────────────────────────────
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [100, 'Student name cannot exceed 100 characters'],
    },
    classApplying: {
      type: String,
      required: [true, 'Class is required'],
      trim: true,
    },
    parentName: {
      type: String,
      required: [true, 'Parent / Guardian name is required'],
      trim: true,
      maxlength: [100, 'Parent name cannot exceed 100 characters'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [60, 'City cannot exceed 60 characters'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
      maxlength: [60, 'State cannot exceed 60 characters'],
    },

    // ── Payment Screenshot (Cloudinary) ──────────────────────────────────
    paymentScreenshot: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },

    // ── UPI Transaction ID ────────────────────────────────────────────────
    upiTransactionId: {
      type: String,
      trim: true,
      default: '',
      maxlength: [50, 'Transaction ID cannot exceed 50 characters'],
    },

    // ── Admin metadata ────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ['new', 'contacted', 'enrolled', 'not-interested'],
      default: 'new',
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },

    // ── UTM / source tracking ─────────────────────────────────────────────
    source: {
      type: String,
      trim: true,
      default: 'direct',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Indexes for quick admin listing / searching
admissionLeadSchema.index({ createdAt: -1 });
admissionLeadSchema.index({ status: 1 });
admissionLeadSchema.index({ mobile: 1 });
admissionLeadSchema.index({
  studentName: 'text',
  parentName: 'text',
  mobile: 'text',
  city: 'text',
});

export default mongoose.model('AdmissionLead', admissionLeadSchema);
