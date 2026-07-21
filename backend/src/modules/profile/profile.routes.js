/**
 * @file profile.routes.js
 * @description Express routes for user profile.
 * 
 * Purpose: Map HTTP endpoints to profile controller methods.
 * Input: HTTP requests
 * Output: Routed to controllers
 * Time Complexity: O(1) route matching
 * Space Complexity: O(1)
 * Edge Cases: Multer upload middleware parses multipart form data.
 */

const express = require('express');
const profileController = require('./profile.controller');
const upload = require('../../config/multer');

const router = express.Router();

// Will add authMiddleware to these routes in Sprint 4
router.get('/', profileController.getProfile);
router.put('/', upload.single('avatar'), profileController.updateProfile);
router.patch('/preferences', profileController.updatePreferences);

module.exports = router;
