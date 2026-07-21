let mockApplications = [
  { id: 1, company: 'Google', role: 'Frontend Engineer', status: 'interviewing', dateApplied: '2023-10-15', salary: '$150k - $200k', logo: 'G' },
  { id: 2, company: 'Stripe', role: 'UI Engineer', status: 'applied', dateApplied: '2023-10-20', salary: '$140k - $180k', logo: 'S' },
  { id: 3, company: 'Vercel', role: 'Design Engineer', status: 'rejected', dateApplied: '2023-10-10', salary: '$160k - $210k', logo: 'V' },
  { id: 4, company: 'Linear', role: 'Frontend Engineer', status: 'wishlist', dateApplied: null, salary: '$130k - $170k', logo: 'L' },
  { id: 5, company: 'OpenAI', role: 'Software Engineer', status: 'offer', dateApplied: '2023-09-01', salary: '$200k - $250k', logo: 'O' },
  { id: 6, company: 'Notion', role: 'Product Engineer', status: 'interviewing', dateApplied: '2023-10-18', salary: '$140k - $190k', logo: 'N' },
];

export const applicationService = {
  getApplications: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...mockApplications]);
      }, 800);
    });
  },

  updateApplicationStatus: async ({ id, status }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockApplications.findIndex(app => app.id === id);
        if (index === -1) {
          reject(new Error("Application not found"));
          return;
        }
        
        // Create a new array and object to mimic immutable state updates from a real DB
        mockApplications = [
          ...mockApplications.slice(0, index),
          { ...mockApplications[index], status },
          ...mockApplications.slice(index + 1)
        ];
        
        resolve(mockApplications[index]);
      }, 500);
    });
  },

  addApplication: async (applicationData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newApp = {
          id: Date.now(),
          ...applicationData,
          logo: applicationData.company.charAt(0).toUpperCase()
        };
        mockApplications.push(newApp);
        resolve(newApp);
      }, 800);
    });
  }
};
