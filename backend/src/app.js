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

const errorHandler = require('./middlewares/errorHandler');
// Security Middlewares
if (helmet) app.use(helmet());
if (cors) app.use(cors());

// HTTP Request Logger
let morgan;
try {
  morgan = require('morgan');
  app.use(morgan('dev'));
} catch (e) {
  console.warn('Warning: morgan is not installed.');
}

if (rateLimit) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
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
const careerRoutes = require('./modules/career/career.routes');
app.use('/api/career', careerRoutes);
const resumeRoutes = require('./modules/resume/resume.routes');
app.use('/api/resume', resumeRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'ResumeForge API is running' });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
