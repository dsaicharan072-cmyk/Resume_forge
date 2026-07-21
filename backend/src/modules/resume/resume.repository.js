const Resume = require('./resume.model');
const ResumeAnalysis = require('./resumeAnalysis.model');
const ResumeVersion = require('./resumeVersion.model');

exports.createResume = async (data) => {
  const resume = new Resume(data);
  return await resume.save();
};

exports.findResumeById = async (id) => {
  return await Resume.findById(id);
};

exports.updateResumeStatus = async (id, status) => {
  return await Resume.findByIdAndUpdate(id, { status }, { new: true });
};

exports.findAnalysisByResumeId = async (resumeId) => {
  return await ResumeAnalysis.findOne({ resumeId });
};

exports.createAnalysis = async (data) => {
  const analysis = new ResumeAnalysis(data);
  return await analysis.save();
};

exports.updateAnalysis = async (resumeId, updateData) => {
  return await ResumeAnalysis.findOneAndUpdate({ resumeId }, updateData, { new: true });
};

exports.createVersion = async (data) => {
  const version = new ResumeVersion(data);
  return await version.save();
};

exports.findVersionById = async (id) => {
  return await ResumeVersion.findById(id);
};

exports.findVersionsByResumeId = async (resumeId) => {
  return await ResumeVersion.find({ resumeId }).sort({ createdAt: -1 });
};
