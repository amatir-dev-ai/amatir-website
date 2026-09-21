import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * Generate a signed JWT for an admin
 */
const signToken = (admin) =>
  jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

// ─── POST /api/auth/login ────────────────────────────────────────────────────
router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { username, password } = req.body;

    try {
      const admin = await Admin.findOne({ username: username.toLowerCase() });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = signToken(admin);
      res.json({
        token,
        admin: { id: admin._id, username: admin.username },
      });
    } catch (err) {
      console.error('[Auth Login Error]', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
// Verify current token and return admin info
router.get('/me', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ admin: { id: admin._id, username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── POST /api/auth/setup ─────────────────────────────────────────────────────
// One-time setup route: creates the first admin account.
// Disabled automatically once any admin exists.
router.post(
  '/setup',
  [
    body('username').trim().isLength({ min: 3 }).withMessage('Username min 3 chars'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
    body('setupSecret').notEmpty().withMessage('Setup secret required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { username, password, setupSecret } = req.body;

    // Validate the setup secret from env
    if (setupSecret !== process.env.ADMIN_SETUP_SECRET) {
      return res.status(403).json({ message: 'Invalid setup secret' });
    }

    try {
      const existingCount = await Admin.countDocuments();
      if (existingCount > 0) {
        return res.status(400).json({ message: 'Admin already exists. Setup disabled.' });
      }

      const admin = await Admin.create({ username, password });
      const token = signToken(admin);

      res.status(201).json({
        message: 'Admin created successfully',
        token,
        admin: { id: admin._id, username: admin.username },
      });
    } catch (err) {
      console.error('[Auth Setup Error]', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
