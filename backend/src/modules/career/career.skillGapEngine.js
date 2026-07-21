const skillImportanceData = require('../../data/career/skillImportanceData');

class SkillGapEngine {
  /**
   * Algorithm-based Skill Gap Detection
   * Uses Set difference O(|C| + |R|) to identify missing skills.
   * 
   * @param {Array<string>} candidateSkills 
   * @param {Array<string>} targetRoleSkills 
   * @returns {Object} { presentSkills, missingSkills }
   */
  findSkillGap(candidateSkills = [], targetRoleSkills = []) {
    // Build Normalized Candidate Set (O(|C|))
    const candidateSet = new Set(
      candidateSkills.map(s => String(s).trim().toLowerCase())
    );

    const present = [];
    const missing = [];

    // Evaluate target role skills (O(|R|))
    for (const rawSkill of targetRoleSkills) {
      const normalized = String(rawSkill).trim().toLowerCase();

      if (candidateSet.has(normalized)) {
        present.push(rawSkill);
      } else {
        // Retrieve or generate deterministic importance rationale
        const info = skillImportanceData[normalized] || {
          skill: rawSkill,
          category: 'Domain & Technical Expertise',
          priority: 'Medium',
          whyItMatters: `Required for building production-grade features using ${rawSkill} standards.`
        };

        missing.push(info);
      }
    }

    return {
      totalTargetSkillsCount: targetRoleSkills.length,
      presentSkillsCount: present.length,
      missingSkillsCount: missing.length,
      presentSkills: present,
      missingSkills: missing
    };
  }
}

module.exports = new SkillGapEngine();
