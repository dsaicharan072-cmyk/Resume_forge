/**
 * @file Profile.js
 * @description Mongoose schema and model for User Profile entity.
 * 
 * Purpose: Store extended user information and preferences.
 * Input: Profile data object
 * Output: Mongoose Model
 * Time Complexity: O(1) for schema definition
 * Space Complexity: O(1)
 * Edge Cases: Handles missing optional fields.
 */

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // One-to-one relationship
  },
  headline: {
    type: String,
    trim: true,
    default: '',
  },
  bio: {
    type: String,
    trim: true,
    default: '',
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    trim: true,
    default: '',
  },
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    }
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);
