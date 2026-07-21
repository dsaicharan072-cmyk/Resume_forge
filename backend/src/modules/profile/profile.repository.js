/**
 * @file profile.repository.js
 * @description Repository for Profile entity. Handles database interactions.
 * 
 * Purpose: Isolate database logic from profile business logic.
 * Input: Data objects for profile operations
 * Output: Mongoose Documents or null
 * Time Complexity: O(1) database operation overhead
 * Space Complexity: O(1)
 * Edge Cases: Handles non-existent profiles.
 */

const Profile = require('../../database/models/Profile');

class ProfileRepository {
  async getProfileByUserId(userId) {
    return await Profile.findOne({ user: userId }).populate('user', 'name email');
  }

  async createProfile(profileData) {
    const profile = new Profile(profileData);
    return await profile.save();
  }

  async updateProfile(userId, updateData) {
    return await Profile.findOneAndUpdate({ user: userId }, updateData, {
      new: true,
      runValidators: true,
    }).populate('user', 'name email');
  }

  async updatePreferences(userId, preferences) {
    return await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { preferences } },
      { new: true }
    );
  }
}

module.exports = new ProfileRepository();
