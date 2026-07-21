const matchingEngine = require('./career.matchingEngine');
const skillGapEngine = require('./career.skillGapEngine');
const learningEngine = require('./career.learningEngine');
const interviewEngine = require('./career.interviewEngine');
const jobsEngine = require('./career.jobsEngine');
const careerRepository = require('./career.repository');

class CareerService {
  /**
   * Calculate company matches from Resume Analysis, Profile, and Job Description
   */
  async calculateCompanyMatches(payload = {}, userId = 'anonymous') {
    const { resumeAnalysis = {}, profile = {}, jobDescription = {} } = payload;

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

    const matches = matchingEngine.calculateCompanyMatches(candidateData);
    const savedRecord = await careerRepository.saveJobMatch(userId, candidateData, matches);

    return {
      matchId: savedRecord.id,
      matches,
      totalCompaniesAnalyzed: matches.length
    };
  }

  /**
   * Calculate deterministic Skill Gap Analysis
   */
  async calculateSkillGap(payload = {}, userId = 'anonymous') {
    const candidateSkills = payload.candidateSkills || ['React', 'Node', 'MongoDB'];
    const targetRoleSkills = payload.targetRoleSkills || ['React', 'Node', 'MongoDB', 'Docker', 'AWS'];
    const targetRole = payload.targetRole || 'Senior Full Stack Engineer';

    const analysis = skillGapEngine.findSkillGap(candidateSkills, targetRoleSkills);
    const savedRecord = await careerRepository.saveSkillGap(userId, targetRole, analysis);

    return {
      skillGapId: savedRecord.id,
      targetRole,
      ...analysis
    };
  }

  /**
   * Get learning recommendation roadmap for missing skills
   */
  async getLearningRoadmap(query = {}, userId = 'anonymous') {
    const missingSkills = query.missingSkills
      ? String(query.missingSkills).split(',')
      : ['Docker', 'AWS', 'System Design'];

    const roadmapData = await learningEngine.generateLearningRoadmap(missingSkills);
    const savedRecord = await careerRepository.saveLearningPlan(userId, roadmapData);

    return {
      planId: savedRecord.id,
      ...roadmapData
    };
  }

  /**
   * Generate interview preparation content
   */
  async generateInterviewPrep(payload = {}, userId = 'anonymous') {
    const targetRole = payload.targetRole || 'Full Stack Engineer';
    const prepData = await interviewEngine.generateInterviewPrep(targetRole);
    const savedRecord = await careerRepository.saveInterviewPrep(userId, targetRole, prepData);

    return {
      prepId: savedRecord.id,
      ...prepData
    };
  }

  /**
   * Fetch live hiring feed filtered by candidate match %
   */
  async getLiveJobs(query = {}) {
    const minMatchScore = Number(query.minMatchScore) || 70;
    const candidateSkills = query.skills
      ? String(query.skills).split(',')
      : ['React', 'Node.js', 'TypeScript', 'REST APIs'];

    return jobsEngine.filterJobsByMatch(candidateSkills, minMatchScore);
  }
}

module.exports = new CareerService();
