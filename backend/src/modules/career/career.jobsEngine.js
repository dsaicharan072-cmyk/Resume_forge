const liveJobsData = require('../../data/career/liveJobsData');
const { MIN_MATCH_SCORE } = require('./career.constants');

class JobsEngine {
  /**
   * Filter and rank live job postings by candidate resume match score
   * 
   * @param {Array<string>} candidateSkills 
   * @param {number} minScoreThreshold 
   * @returns {Object} { totalJobsFound, filteredJobsCount, jobs }
   */
  filterJobsByMatch(candidateSkills = ['React', 'Node.js', 'TypeScript', 'REST APIs'], minScoreThreshold = MIN_MATCH_SCORE) {
    const candidateSet = new Set(
      candidateSkills.map(s => String(s).trim().toLowerCase())
    );

    const scoredJobs = liveJobsData.map(job => {
      const reqSkills = job.requiredSkills || [];
      const matched = reqSkills.filter(s => candidateSet.has(s.toLowerCase()));

      const matchRatio = reqSkills.length > 0 ? matched.length / reqSkills.length : 1;
      const matchScore = Math.round(matchRatio * 100);

      return {
        ...job,
        matchScore,
        matchedSkills: matched
      };
    });

    // Filter by configurable minimum match score threshold
    const filteredJobs = scoredJobs
      .filter(job => job.matchScore >= minScoreThreshold)
      .sort((a, b) => b.matchScore - a.matchScore);

    return {
      totalJobsFound: liveJobsData.length,
      filteredJobsCount: filteredJobs.length,
      minMatchScoreThreshold: minScoreThreshold,
      jobs: filteredJobs
    };
  }
}

module.exports = new JobsEngine();
