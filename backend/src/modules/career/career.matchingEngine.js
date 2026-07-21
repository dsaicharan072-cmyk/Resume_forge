const targetCompanies = require('../../data/career/targetCompanies');

class MatchingEngine {
  /**
   * Deterministic Company Match Score Calculation
   * Uses Hash Sets for O(N) skill matching & weighted formula.
   * 
   * @param {Object} candidate - { skills: string[], experienceYears: number, keywords: string[] }
   * @param {Array} customCompanies - Optional override list of target companies
   * @returns {Array} List of matched companies with deterministic scores and explanations
   */
  calculateCompanyMatches(candidate = {}, customCompanies = null) {
    const companies = customCompanies || targetCompanies;
    
    // Normalize candidate skills into a HashSet for O(1) lookups
    const candidateSkillSet = new Set(
      (candidate.skills || []).map(s => String(s).trim().toLowerCase())
    );

    const candidateExp = Number(candidate.experienceYears) || 0;

    const results = companies.map(company => {
      // 1. Required Skill Match (Weight: 55%)
      const reqSkills = company.requiredSkills || [];
      const matchedReq = [];
      const missingReq = [];

      for (const skill of reqSkills) {
        if (candidateSkillSet.has(skill.toLowerCase())) {
          matchedReq.push(skill);
        } else {
          missingReq.push(skill);
        }
      }

      const reqRatio = reqSkills.length > 0 ? matchedReq.length / reqSkills.length : 1;
      const reqScore = reqRatio * 55;

      // 2. Preferred Skill Match (Weight: 25%)
      const prefSkills = company.preferredSkills || [];
      const matchedPref = [];
      const missingPref = [];

      for (const skill of prefSkills) {
        if (candidateSkillSet.has(skill.toLowerCase())) {
          matchedPref.push(skill);
        } else {
          missingPref.push(skill);
        }
      }

      const prefRatio = prefSkills.length > 0 ? matchedPref.length / prefSkills.length : 0.5;
      const prefScore = prefRatio * 25;

      // 3. Experience Match (Weight: 20%)
      const minExp = company.minExperienceYears || 0;
      let expScore = 20;
      let expReason = 'Meets or exceeds minimum required experience.';

      if (candidateExp < minExp) {
        const delta = minExp - candidateExp;
        expScore = Math.max(5, 20 - delta * 5);
        expReason = `Under minimum required experience by ${delta} year(s).`;
      }

      // Calculate Final Deterministic Score (Clamped between 40 and 99)
      const rawScore = Math.round(reqScore + prefScore + expScore);
      const score = Math.min(99, Math.max(45, rawScore));

      // Generate Clear Reasons
      const strongReasons = [];
      const gapReasons = [];

      if (matchedReq.length > 0) {
        strongReasons.push(`Matches core requirement stack: ${matchedReq.join(', ')}.`);
      }
      if (matchedPref.length > 0) {
        strongReasons.push(`Possesses bonus stack skills: ${matchedPref.join(', ')}.`);
      }
      if (candidateExp >= minExp) {
        strongReasons.push(expReason);
      }

      if (missingReq.length > 0) {
        gapReasons.push(`Missing key required skills: ${missingReq.join(', ')}.`);
      }
      if (missingPref.length > 0) {
        gapReasons.push(`Missing preferred skills: ${missingPref.join(', ')}.`);
      }
      if (candidateExp < minExp) {
        gapReasons.push(expReason);
      }

      return {
        companyId: company.id,
        companyName: company.name,
        logo: company.logo,
        domain: company.domain,
        score,
        reasons: {
          strongFit: strongReasons,
          gaps: gapReasons,
          summary: `Score of ${score}% based on ${matchedReq.length}/${reqSkills.length} core skills match and experience alignment.`
        },
        matchedSkills: [...matchedReq, ...matchedPref],
        missingSkills: [...missingReq, ...missingPref]
      };
    });

    // Sort descending by match score (O(M log M))
    return results.sort((a, b) => b.score - a.score);
  }
}

module.exports = new MatchingEngine();
