/**
 * @file app.js
 * @description Express application setup. Configures middlewares, routes, and global error handling.
 */

const express = require('express');

const app = express();

// Middlewares (to be implemented in later sprints)
app.use(express.json());

// Routes (to be implemented in later sprints)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'ResumeForge API is running' });
});

// Global Error Handler (to be implemented in later sprints)

module.exports = app;
