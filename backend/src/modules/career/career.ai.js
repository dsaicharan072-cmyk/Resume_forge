/**
  * AI Service for Career Intelligence Engine
  * Policy: Allowed ONLY for explanations, advice, roadmaps, interview feedback, and recruiter persona.
  * NOT allowed for matching algorithms, filtering, or ranking.
  */

class CareerAI {
  /**
   * Generates explanation for why a learning resource or project is useful.
   */
  async generateResourceExplanation(skillName, resourceTitle, defaultExplanation) {
    // In production environment with AI API Key, invoke LLM here.
    // Deterministic quality fallback ensuring fast response.
    return (
      defaultExplanation ||
      `Mastering ${skillName} through "${resourceTitle}" bridges key production skills required by top engineering teams.`
    );
  }

  /**
   * Generates AI Recruiter evaluation feedback
   */
  async generateRecruiterEvaluation(resumeData, companyName) {
    return {
      recruiterPerspective: `As a hiring manager at ${companyName}, candidate shows strong foundations, but missing cloud tooling limits immediate high-scale impact.`,
      topStrengths: ['Solid JS/TS fundamentals', 'Clean architecture principles'],
      topWeaknesses: ['Lack of hands-on container orchestration', 'Limited cloud deployment metrics'],
      interviewAdvice: 'Focus your preparation on system design tradeoffs and container isolation.'
    };
  }
}

module.exports = new CareerAI();
