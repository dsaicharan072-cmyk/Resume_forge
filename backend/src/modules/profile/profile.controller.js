/**
 * @file profile.controller.js
 * @description Controllers for profile routes.
 * 
 * Purpose: Handle HTTP requests and responses for profiles.
 * Input: HTTP Request (req), Response (res)
 * Output: JSON responses
 * Time Complexity: O(1) for routing
 * Space Complexity: O(1)
 * Edge Cases: User not authenticated (handled by middleware in Sprint 4).
 */

const profileService = require('./profile.service');

class ProfileController {
  async getProfile(req, res) {
    try {
      // Assuming `req.user.id` will be set by an auth middleware (Sprint 4)
      // For now, we mock it or expect it in headers for testing
      const userId = req.user ? req.user.id : req.header('X-User-Id'); 
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const profile = await profileService.getProfile(userId);
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user ? req.user.id : req.header('X-User-Id');
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      // If a file is uploaded, multer adds it to req.file
      // We pass req.body and optionally req.file to service
      const updateData = { ...req.body };
      
      const profile = await profileService.updateProfile(userId, updateData);
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async updatePreferences(req, res) {
    try {
      const userId = req.user ? req.user.id : req.header('X-User-Id');
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

      const profile = await profileService.updatePreferences(userId, req.body);
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new ProfileController();
