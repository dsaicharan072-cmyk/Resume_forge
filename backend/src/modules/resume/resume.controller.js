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

exports.analyzeResume = async (req, res, next) => {
  try {
    const { resumeId } = req.body;
    if (!resumeId) return res.status(400).json({ success: false, message: 'resumeId is required' });
    
    const analysis = await resumeService.processResumeAnalysis(resumeId);
    res.status(200).json({ success: true, data: analysis });
  } catch (error) {
    next(error);
  }
};

exports.getResumeAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const analysis = await resumeService.processResumeAnalysis(id);
    res.status(200).json({ success: true, data: analysis });
  } catch (error) {
    next(error);
  }
};
