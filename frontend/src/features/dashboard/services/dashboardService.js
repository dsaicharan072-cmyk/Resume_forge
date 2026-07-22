import api from '../../../services/api';

export const dashboardService = {
  getDashboardData: async () => {
    // Mock implementation returning comprehensive data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          profileCompletion: 85,
          atsScore: 92,
          resumeVersion: 'v2.1',
          companyMatch: 88,
          missingSkills: [
            { name: 'GraphQL', type: 'technical' },
            { name: 'System Design', type: 'architectural' },
            { name: 'Figma', type: 'design' }
          ],
          weeklyProgress: [
            { name: 'Mon', applications: 2, interviews: 0 },
            { name: 'Tue', applications: 1, interviews: 1 },
            { name: 'Wed', applications: 4, interviews: 0 },
            { name: 'Thu', applications: 0, interviews: 2 },
            { name: 'Fri', applications: 3, interviews: 1 },
            { name: 'Sat', applications: 0, interviews: 0 },
            { name: 'Sun', applications: 1, interviews: 0 },
          ],
          recentApplications: [
            { id: 1, company: 'Google', role: 'Frontend Engineer', status: 'Interviewing', date: '2 days ago' },
            { id: 2, company: 'Stripe', role: 'UI Engineer', status: 'Applied', date: '4 days ago' },
            { id: 3, company: 'Vercel', role: 'Design Engineer', status: 'Rejected', date: '1 week ago' },
          ]
        });
      }, 1500);
    });
  }
};
