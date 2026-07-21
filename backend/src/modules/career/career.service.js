const matchingEngine = require('./career.matchingEngine');
const careerRepository = require('./career.repository');

class CareerService {
  /**
   * Calculate company matches from Resume Analysis, Profile, and Job Description
   */
  async calculateCompanyMatches(payload = {}, userId = 'anonymous') {
    const { resumeAnalysis = {}, profile = {}, jobDescription = {} } = payload;

    // Consolidate candidate skills from resume and profile
    const skillsSet = new Set([
      ...(resumeAnalysis.skills || []),
      ...(resumeAnalysis.technicalSkills || []),
      ...(profile.skills || []),
      ...(jobDescription.candidateSkills || [])
    ]);

    const skills = Array.from(skillsSet);
    const experienceYears = profile.experienceYears || resumeAnalysis.experienceYears || 2;

    const candidateData = {
      skills,
      experienceYears,
      keywords: resumeAnalysis.keywords || []
    };

    // Calculate deterministic scores
    const matches = matchingEngine.calculateCompanyMatches(candidateData);

    // Save record via Repository
    const savedRecord = await careerRepository.saveJobMatch(userId, candidateData, matches);

    return {
      matchId: savedRecord.id,
      matches,
      totalCompaniesAnalyzed: matches.length
    };
  }
}

module.exports = new CareerService();
