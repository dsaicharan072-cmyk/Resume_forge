const cloudinary = require('../../config/cloudinary');
const resumeRepository = require('./resume.repository');
const parser = require('./resume.parser');
const keywordEngine = require('./resume.keywordEngine');
const atsEngine = require('./resume.atsEngine');

exports.processResumeUpload = async (file, userId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'resumes' },
      async (error, result) => {
        if (error) return reject(error);
        try {
          const savedResume = await resumeRepository.createResume({
            userId: userId || null,
            fileUrl: result.secure_url,
            originalName: file.originalname,
            fileType: file.mimetype,
            size: file.size,
            status: 'UPLOADED'
          });
          resolve(savedResume);
        } catch (dbError) {
          reject(dbError);
        }
      }
    );
    uploadStream.end(file.buffer);
  });
};

exports.processResumeAnalysis = async (resumeId, jobDescription = "") => {
  const resume = await resumeRepository.findResumeById(resumeId);
  if (!resume) throw new Error("Resume not found");
  
  let analysis = await resumeRepository.findAnalysisByResumeId(resumeId);
  
  const text = await parser.extractText(resume.fileUrl, resume.fileType);
  const parsedData = parser.parseResumeText(text);
  const keywordMetrics = keywordEngine.compareKeywords(text, jobDescription);
  const atsScore = atsEngine.calculateScore(parsedData, keywordMetrics);
  
  if (analysis) {
    analysis = await resumeRepository.updateAnalysis(resumeId, {
      parsedData,
      jobDescription,
      keywordMetrics: keywordMetrics || analysis.keywordMetrics,
      atsScore
    });
  } else {
    analysis = await resumeRepository.createAnalysis({
      resumeId,
      jobDescription,
      parsedData,
      keywordMetrics: keywordMetrics || {},
      atsScore
    });
  }
  
  await resumeRepository.updateResumeStatus(resumeId, 'ANALYZED');
  
  return analysis;
};
