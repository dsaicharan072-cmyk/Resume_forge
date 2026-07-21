export const resumeService = {
  uploadResume: async (file) => {
    // Mock implementation for uploading and processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'res_123',
          filename: file.name,
          uploadDate: new Date().toISOString(),
          status: 'processed'
        });
      }, 3000); // 3 second delay to simulate AI processing
    });
  },

  getResumeAnalysis: async (id) => {
    // Mock implementation for full ATS analysis
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          overallScore: 78,
          categories: {
            impact: 65,
            brevity: 82,
            style: 90,
            keywords: 74
          },
          atsFindings: [
            { type: 'warning', message: 'Missing quantifiable metrics in your recent role.', location: 'Experience > Software Engineer' },
            { type: 'success', message: 'Strong use of action verbs throughout.', location: 'General' },
            { type: 'error', message: 'Missing critical keyword: "React.js". ATS systems might filter this out.', location: 'Skills' },
            { type: 'warning', message: 'Summary is slightly too long. Consider keeping it under 3-4 lines.', location: 'Summary' }
          ],
          rewriteSuggestions: [
            { 
              original: "Responsible for creating web components.", 
              suggestion: "Architected and delivered 15+ reusable React web components, accelerating development time by 30%.",
              impact: "High"
            },
            { 
              original: "Worked on fixing bugs and improving performance.", 
              suggestion: "Resolved 50+ critical bugs and optimized rendering performance, improving Lighthouse score from 75 to 98.",
              impact: "High"
            }
          ]
        });
      }, 1000);
    });
  }
};
