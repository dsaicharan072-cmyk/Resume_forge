const resumeRepository = require('./resume.repository');

exports.createVersion = async (resumeId, versionName, parsedData) => {
  return await resumeRepository.createVersion({
    resumeId,
    versionName: versionName || 'Custom',
    parsedData
  });
};

exports.getVersion = async (versionId) => {
  const version = await resumeRepository.findVersionById(versionId);
  if (!version) throw new Error("Version not found");
  return version;
};

exports.getVersionsByResume = async (resumeId) => {
  return await resumeRepository.findVersionsByResumeId(resumeId);
};
