const ResumeVersion = require('./resumeVersion.model');

exports.createVersion = async (resumeId, versionName, parsedData) => {
  const version = new ResumeVersion({
    resumeId,
    versionName: versionName || 'Custom',
    parsedData
  });
  return await version.save();
};

exports.getVersion = async (versionId) => {
  const version = await ResumeVersion.findById(versionId);
  if (!version) throw new Error("Version not found");
  return version;
};

exports.getVersionsByResume = async (resumeId) => {
  return await ResumeVersion.find({ resumeId }).sort({ createdAt: -1 });
};