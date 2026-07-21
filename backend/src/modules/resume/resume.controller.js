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
    const { resumeId, jobDescription } = req.body;
    if (!resumeId) return res.status(400).json({ success: false, message: 'resumeId is required' });
    
    const analysis = await resumeService.processResumeAnalysis(resumeId, jobDescription);
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

const aiService = require('./resume.ai');

exports.rewriteResume = async (req, res, next) => {
  try {
    const { bullets } = req.body;
    if (!bullets || !Array.isArray(bullets)) {
      return res.status(400).json({ success: false, message: 'bullets array is required' });
    }
    
    // Algorithmic weak verb detection
    const weakBullets = aiService.detectWeakVerbs(bullets);
    
    // AI rewriting
    const rewrittenBullets = await aiService.rewriteBullets(bullets);
    
    res.status(200).json({ 
      success: true, 
      data: {
        original: bullets,
        weakBulletsDetected: weakBullets,
        rewritten: rewrittenBullets
      } 
    });
  } catch (error) {
    next(error);
  }
};

const versioningService = require('./resume.versioning');

exports.createResumeVersion = async (req, res, next) => {
  try {
    const { resumeId, versionName, parsedData } = req.body;
    if (!resumeId || !parsedData) {
      return res.status(400).json({ success: false, message: 'resumeId and parsedData are required' });
    }
    const version = await versioningService.createVersion(resumeId, versionName, parsedData);
    res.status(201).json({ success: true, data: version });
  } catch (error) {
    next(error);
  }
};

exports.getResumeVersion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const version = await versioningService.getVersion(id);
    res.status(200).json({ success: true, data: version });
  } catch (error) {
    next(error);
  }
};

exports.listResumeVersions = async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const versions = await versioningService.getVersionsByResume(resumeId);
    res.status(200).json({ success: true, data: versions });
  } catch (error) {
    next(error);
  }
};
