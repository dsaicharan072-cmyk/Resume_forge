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
  async generateRecruiterEvaluation(resumeData = {}, companyName = 'Tech Corp') {
    const skills = resumeData.skills || ['JavaScript', 'React'];
    const experience = resumeData.experienceYears || 2;
    
    // Simulate AI LLM evaluation based on inputs
    const isBigTech = ['google', 'amazon', 'meta', 'apple', 'netflix', 'microsoft'].includes(companyName.toLowerCase());
    
    let recruiterPerspective = '';
    let topStrengths = [];
    let topWeaknesses = [];
    let interviewAdvice = '';
    let recommendedChanges = [];

    if (isBigTech) {
      recruiterPerspective = `As a hiring manager at ${companyName}, I look for engineers who can operate at massive scale. The candidate has good foundations with ${skills.slice(0, 2).join(' and ')}, but I need to see more distributed systems experience for this level.`;
      topStrengths = ['Strong core language fundamentals', 'Clean architecture principles'];
      topWeaknesses = ['Lack of hands-on container orchestration (Kubernetes)', 'Limited cloud deployment metrics at scale'];
      interviewAdvice = `Focus your preparation on System Design tradeoffs, specifically around partitioning, replication, and caching at ${companyName}'s scale.`;
      recommendedChanges = [
        'Quantify the impact of your projects with concrete metrics (e.g., "reduced latency by 20%").',
        'Highlight any experience with CI/CD pipelines or cloud infrastructure.'
      ];
    } else {
      recruiterPerspective = `Looking at this profile for ${companyName}, the candidate seems like a solid fit. With ${experience} years of experience and skills in ${skills.slice(0, 2).join(' and ')}, they can hit the ground running on our product teams.`;
      topStrengths = ['Product-focused engineering experience', 'Strong frontend/backend integration skills'];
      topWeaknesses = ['Could use more testing framework exposure', 'Less emphasis on performance optimization'];
      interviewAdvice = 'Be ready to discuss how you collaborate with cross-functional teams and product managers, using the STAR method for behavioral questions.';
      recommendedChanges = [
        'Add more details about the testing tools (Jest, Cypress) you used in your past roles.',
        'Emphasize your ability to work across the stack independently.'
      ];
    }

    return {
      recruiterPerspective,
      topStrengths,
      topWeaknesses,
      interviewAdvice,
      recommendedChanges
    };
  }
}

module.exports = new CareerAI();
