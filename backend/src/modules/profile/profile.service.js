/**
 * @file profile.service.js
 * @description Business logic for user profiles.
 * 
 * Purpose: Handle profile retrieval and updates, including interactions with Cloudinary.
 * Input: User ID, Profile Data, File Buffer (optional)
 * Output: Profile object
 * Time Complexity: O(1) for DB ops, O(N) for image upload
 * Space Complexity: O(1)
 * Edge Cases: Creating a profile if it doesn't exist upon get request.
 */

const profileRepository = require('./profile.repository');
// const cloudinary = require('../../config/cloudinary'); // Will be used for image uploads later

class ProfileService {
  async getProfile(userId) {
    let profile = await profileRepository.getProfileByUserId(userId);
    
    // Auto-create empty profile if it doesn't exist
    if (!profile) {
      profile = await profileRepository.createProfile({ user: userId });
    }
    
    return profile;
  }

  async updateProfile(userId, updateData) {
    // If we were handling image uploads, we'd process the file buffer with cloudinary here
    // and set updateData.avatarUrl to the resulting secure_url.
    
    const profile = await profileRepository.updateProfile(userId, updateData);
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }

  async updatePreferences(userId, preferences) {
    const profile = await profileRepository.updatePreferences(userId, preferences);
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }
}

module.exports = new ProfileService();
