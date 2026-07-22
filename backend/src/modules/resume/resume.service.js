const cloudinary = require('../../config/cloudinary');
const resumeRepository = require('./resume.repository');
const parser = require('./resume.parser');
const keywordEngine = require('./resume.keywordEngine');
const atsEngine = require('./resume.atsEngine');
const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');

const hasUsableCloudinaryConfig = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET)
    && /^[a-z0-9-]+$/.test(CLOUDINARY_CLOUD_NAME);
};

const storeLocally = async (file) => {
  const uploadsDirectory = path.join(__dirname, '../../../uploads/resumes');
  await fs.mkdir(uploadsDirectory, { recursive: true });
  const extension = path.extname(file.originalname).toLowerCase() || '.bin';
  const filename = `${crypto.randomUUID()}${extension}`;
  const filePath = path.join(uploadsDirectory, filename);
  await fs.writeFile(filePath, file.buffer);
  return `local://${filePath}`;
};

exports.processResumeUpload = async (file, userId) => {
  const saveResume = async (fileUrl) => resumeRepository.createResume({
    userId: userId || null,
    fileUrl,
    originalName: file.originalname,
    fileType: file.mimetype,
    size: file.size,
    status: 'UPLOADED'
  });

  // Local storage keeps uploads working in development when Cloudinary is not configured.
  if (!hasUsableCloudinaryConfig()) {
    return saveResume(await storeLocally(file));
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'resumes' },
      async (error, result) => {
        if (error) {
          try {
            return resolve(await saveResume(await storeLocally(file)));
          } catch (localError) {
            return reject(localError);
          }
        }
        try {
          const savedResume = await saveResume(result.secure_url);
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
