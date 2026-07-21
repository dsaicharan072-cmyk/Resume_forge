/**
 * @file multer.js
 * @description Multer configuration for handling multipart/form-data (file uploads).
 * 
 * Purpose: Setup in-memory storage or disk storage for temporary file processing.
 * Input: Incoming file buffer
 * Output: Multer upload middleware
 * Time Complexity: O(N) where N is file size (during upload)
 * Space Complexity: O(N) where N is file size (in memory/disk)
 * Edge Cases: Restricts file size and invalid file types.
 */

const multer = require('multer');

// Store file in memory to upload to Cloudinary later
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
});

module.exports = upload;
