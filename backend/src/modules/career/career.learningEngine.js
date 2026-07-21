const learningResources = require('../../data/career/learningResources');
const careerAI = require('./career.ai');

class LearningEngine {
  /**
   * Generates a structured learning roadmap for missing skills.
   * Selection and ranking are 100% deterministic algorithms.
   * AI is used ONLY to explain why resources are useful.
   * 
   * @param {Array<string>} missingSkills 
   * @returns {Object} { totalEstimatedHours, roadmap }
   */
  async generateLearningRoadmap(missingSkills = ['Docker', 'AWS', 'System Design']) {
    const roadmap = [];
    let totalHours = 0;

    for (const rawSkill of missingSkills) {
      const normalized = String(rawSkill).trim().toLowerCase();
      const item = learningResources[normalized] || {
        skill: rawSkill,
        priority: 'Medium',
        difficulty: 'Intermediate',
        estimatedTime: '10 Hours',
        resources: {
          officialDocs: {
            title: `${rawSkill} Official Documentation`,
            url: `https://google.com/search?q=${encodeURIComponent(rawSkill + ' official documentation')}`
          },
          youtubeTutorial: {
            title: `${rawSkill} Full Crash Course`,
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(rawSkill + ' crash course')}`
          },
          practiceProject: {
            title: `Build a production project with ${rawSkill}`,
            estimatedHours: 6,
            difficulty: 'Intermediate',
            resumeValue: 'High'
          }
        },
        defaultExplanation: `Gaining hands-on proficiency in ${rawSkill} enhances your technical versatility for senior role interviews.`
      };

      // Extract numerical hours for total estimate
      const hoursMatch = item.estimatedTime.match(/(\d+)/);
      if (hoursMatch) {
        totalHours += parseInt(hoursMatch[1], 10);
      }

      // Generate AI explanation for utility
      const explanation = await careerAI.generateResourceExplanation(
        item.skill,
        item.resources.officialDocs.title,
        item.defaultExplanation
      );

      roadmap.push({
        skill: item.skill,
        priority: item.priority,
        difficulty: item.difficulty,
        estimatedTime: item.estimatedTime,
        resources: item.resources,
        aiExplanation: explanation
      });
    }

    return {
      totalEstimatedHours: totalHours,
      totalSkillsCount: roadmap.length,
      roadmap
    };
  }
}

module.exports = new LearningEngine();
