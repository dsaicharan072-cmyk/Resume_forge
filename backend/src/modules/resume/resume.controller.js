const resumeService = require('./resume.service');

exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const userId = req.user ? req.user.id : null;
    const resume = await resumeService.processResumeUpload(req.file, userId);
    res.status(201).json({ success: true, data: resume });
  } catch (error) {
    if (error.message && error.message.includes('Unsupported file type')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};
