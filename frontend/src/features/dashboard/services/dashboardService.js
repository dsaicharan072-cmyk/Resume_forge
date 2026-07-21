/**
 * MOCK DASHBOARD SERVICE
 * 
 * Note to Tech Lead: These endpoints do not exist in the backend yet.
 * We are mocking the data layer here so the React Query hooks and UI components
 * can be fully built. Once the backend APIs are complete, replace the mock returns
 * with `api.get('/endpoint')`.
 */

import api from '../../../services/api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  getStats: async () => {
    // Simulated API call: return api.get('/dashboard/stats');
    await delay(800);
    return {
      profileCompletion: 85,
      atsScore: 92,
      resumeVersion: "v2.1",
      matchesFound: 24,
      liveHiring: 12
    };
  },

  getMatches: async () => {
    // Simulated API call: return api.get('/dashboard/matches');
    await delay(1000);
    return [
      { id: 1, company: "Google", role: "Frontend Engineer", matchScore: 94, isHiring: true },
      { id: 2, company: "Stripe", role: "Product Engineer", matchScore: 88, isHiring: true },
      { id: 3, company: "Vercel", role: "React Developer", matchScore: 91, isHiring: true },
      { id: 4, company: "Netflix", role: "UI Engineer", matchScore: 82, isHiring: false },
    ];
  },

  getSkills: async () => {
    // Simulated API call: return api.get('/dashboard/skills');
    await delay(900);
    return {
      missing: ["GraphQL", "Docker", "AWS S3", "WebSockets"],
      learningProgress: [
        { topic: "System Design", progress: 60 },
        { topic: "Advanced React Patterns", progress: 85 }
      ],
      recommendedProjects: [
        { id: 1, title: "Real-time Chat App", skill: "WebSockets", difficulty: "Medium" },
        { id: 2, title: "Dockerized Node API", skill: "Docker", difficulty: "Hard" }
      ]
    };
  },

  getActivities: async () => {
    // Simulated API call: return api.get('/dashboard/activities');
    await delay(600);
    return {
      upcomingInterviews: [
        { id: 1, company: "Google", date: "2026-07-25T10:00:00Z", round: "Technical" },
        { id: 2, company: "Vercel", date: "2026-07-28T14:30:00Z", round: "System Design" }
      ],
      recentApplications: [
        { id: 1, company: "Stripe", status: "Under Review", date: "2026-07-15" },
        { id: 2, company: "Meta", status: "Rejected", date: "2026-07-10" },
        { id: 3, company: "Linear", status: "Applied", date: "2026-07-20" }
      ],
      weeklyProgress: [
        { name: "Mon", applications: 2, learningHours: 1 },
        { name: "Tue", applications: 0, learningHours: 3 },
        { name: "Wed", applications: 3, learningHours: 2 },
        { name: "Thu", applications: 1, learningHours: 4 },
        { name: "Fri", applications: 4, learningHours: 1 },
        { name: "Sat", applications: 0, learningHours: 5 },
        { name: "Sun", applications: 1, learningHours: 2 }
      ]
    };
  }
};
