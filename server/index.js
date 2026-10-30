import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blogs.js';
import admissionLeadsRoutes from './routes/admissionLeads.js';

// Load .env from the project root (one level up from /server/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  // Production
  'https://www.amatir.org',
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
    : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server / curl requests (no origin header)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin not allowed — ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Prevent browser/CDN from caching API responses
app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admission-leads', admissionLeadsRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);

  // ── Keep-alive: ping self every 14 min so Render never spins down ──────────
  // Only runs in production (Render sets NODE_ENV=production automatically)
  if (process.env.NODE_ENV === 'production') {
    const SELF_URL = process.env.RENDER_EXTERNAL_URL
      ? `${process.env.RENDER_EXTERNAL_URL}/api/health`
      : `http://localhost:${PORT}/api/health`;

    setInterval(async () => {
      try {
        const res = await fetch(SELF_URL);
        console.log(`[keep-alive] ping → ${res.status}`);
      } catch (err) {
        console.warn('[keep-alive] ping failed:', err.message);
      }
    }, 14 * 60 * 1000); // every 14 minutes

    console.log(`🔔 Keep-alive pinging ${SELF_URL} every 14 min`);
  }
});

export default app;
