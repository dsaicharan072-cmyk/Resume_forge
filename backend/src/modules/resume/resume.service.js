const cloudinary = require('../../config/cloudinary');
const Resume = require('./resume.model');

exports.processResumeUpload = async (file, userId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'resumes' },
      async (error, result) => {
        if (error) return reject(error);
        
        try {
          const newResume = new Resume({
            userId: userId || null,
            fileUrl: result.secure_url,
            originalName: file.originalname,
            fileType: file.mimetype,
            size: file.size,
            status: 'UPLOADED'
          });
          const savedResume = await newResume.save();
          resolve(savedResume);
        } catch (dbError) {
          reject(dbError);
        }
      }
    );
    uploadStream.end(file.buffer);
  });
};
