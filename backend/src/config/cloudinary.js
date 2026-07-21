/**
 * @file cloudinary.js
 * @description Cloudinary configuration for image/file uploads.
 * 
 * Purpose: Centralize cloudinary SDK configuration.
 * Input: Environment variables
 * Output: Configured cloudinary instance
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * Edge Cases: Missing environment variables will cause upload failures later.
 */

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
