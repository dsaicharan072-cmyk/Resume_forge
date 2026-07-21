/**
 * @file app.js
 * @description Express application setup. Configures middlewares, routes, and global error handling.
 */

const express = require('express');
// Require security and utility packages
// These will require `npm install helmet express-rate-limit cors`
let helmet, rateLimit, cors;
try {
  helmet = require('helmet');
  rateLimit = require('express-rate-limit');
  cors = require('cors');
} catch (e) {
  console.warn('Warning: Some security modules are not installed yet.');
}

const authRoutes = require('./modules/auth/auth.routes');
// const connectDB = require('./database/connection'); // Normally called here or in server.js

const app = express();

// Security Middlewares
if (helmet) app.use(helmet());
if (cors) app.use(cors());

if (rateLimit) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });
  app.use('/api', limiter);
}

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
const profileRoutes = require('./modules/profile/profile.routes');
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'ResumeForge API is running' });
});

// Global Error Handler (to be fully implemented in Sprint 4)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Server Error' });
});

module.exports = app;
