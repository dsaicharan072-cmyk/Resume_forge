const cloudinary = require('../../config/cloudinary');
const Resume = require('./resume.model');
const ResumeAnalysis = require('./resumeAnalysis.model');
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

exports.processResumeAnalysis = async (resumeId, jobDescription = "") => {
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume not found");
  
  let analysis = await ResumeAnalysis.findOne({ resumeId });
  
  const text = await parser.extractText(resume.fileUrl, resume.fileType);
  const parsedData = parser.parseResumeText(text);
  const keywordMetrics = keywordEngine.compareKeywords(text, jobDescription);
  const atsScore = atsEngine.calculateScore(parsedData, keywordMetrics);
  
  if (analysis) {
    analysis.parsedData = parsedData;
    analysis.jobDescription = jobDescription;
    if (keywordMetrics) analysis.keywordMetrics = keywordMetrics;
    analysis.atsScore = atsScore;
    await analysis.save();
  } else {
    analysis = new ResumeAnalysis({
      resumeId,
      jobDescription,
      parsedData,
      keywordMetrics: keywordMetrics || {},
      atsScore: atsScore
    });
    await analysis.save();
  }
  
  resume.status = 'ANALYZED';
  await resume.save();
  
  return analysis;
};
