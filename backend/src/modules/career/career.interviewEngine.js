const interviewData = require('../../data/career/interviewQuestionsData');
const careerAI = require('./career.ai');

class InterviewEngine {
  /**
   * Generates interview preparation modules tailored to candidate profile and target role.
   * Selection algorithm is deterministic. AI is used only for explanations & hints.
   */
  async generateInterviewPrep(targetRole = 'Full Stack Engineer') {
    const technical = interviewData.technical;
    const behavioral = interviewData.behavioral;
    const codingTopics = interviewData.codingTopics;
    const systemDesignTopics = interviewData.systemDesignTopics;

    return {
      targetRole,
      technicalQuestions: technical,
      behavioralQuestions: behavioral,
      codingTopics,
      systemDesignTopics
    };
  }
}

module.exports = new InterviewEngine();
