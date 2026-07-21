const cloudinary = require('../../config/cloudinary');
const Resume = require('./resume.model');
const ResumeAnalysis = require('./resumeAnalysis.model');
const parser = require('./resume.parser');

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

exports.processResumeAnalysis = async (resumeId) => {
  let analysis = await ResumeAnalysis.findOne({ resumeId });
  if (analysis) return analysis; 
  
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume not found");
  
  const text = await parser.extractText(resume.fileUrl, resume.fileType);
  const parsedData = parser.parseResumeText(text);
  
  analysis = new ResumeAnalysis({
    resumeId,
    parsedData
  });
  await analysis.save();
  
  resume.status = 'PARSED';
  await resume.save();
  
  return analysis;
};
