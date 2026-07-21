export const careerService = {
  getCompanyMatches: async () => {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        { id: 1, name: "Stripe", logo: "S", match: 92, rationale: "Your React & Node.js experience aligns perfectly with their core stack.", industry: "FinTech" },
        { id: 2, name: "Vercel", logo: "V", match: 88, rationale: "Strong Next.js background, but lacking AWS infrastructure depth.", industry: "Developer Tools" },
        { id: 3, name: "Linear", logo: "L", match: 85, rationale: "Your UI/UX focus matches their product-led growth strategy.", industry: "Productivity" },
        { id: 4, name: "OpenAI", logo: "O", match: 72, rationale: "Missing Python and ML fundamentals required for their frontend roles.", industry: "Artificial Intelligence" },
      ]);
    }, 1000));
  },
  
  getSkillGaps: async () => {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        { id: 1, name: "System Design", current: 40, required: 85, rationale: "Critical for Senior Frontend roles you are targeting." },
        { id: 2, name: "GraphQL", current: 60, required: 90, rationale: "Stripe and Vercel heavily utilize GraphQL in their APIs." },
        { id: 3, name: "Web Performance", current: 75, required: 95, rationale: "Expected core competency for staff-level positions." },
      ]);
    }, 1000));
  },

  getLearningRoadmap: async () => {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        { id: 1, title: "Mastering System Design", duration: "2 weeks", type: "Course", completed: false, rationale: "Bridges your 45% gap in system architecture." },
        { id: 2, title: "GraphQL in Production", duration: "1 week", type: "Tutorial", completed: false, rationale: "Directly improves your match score for Stripe." },
        { id: 3, title: "Advanced Web Vitals", duration: "3 days", type: "Reading", completed: true, rationale: "Completed! Boosted your performance score." },
      ]);
    }, 1000));
  },

  getProjects: async () => {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        { id: 1, title: "Real-time Collaboration Tool", tech: ["React", "WebSockets", "Redis"], difficulty: "Advanced", rationale: "Demonstrates complex state management lacking in your current portfolio." },
        { id: 2, title: "GraphQL E-commerce API", tech: ["Node.js", "GraphQL", "PostgreSQL"], difficulty: "Intermediate", rationale: "Provides concrete proof of your GraphQL knowledge." },
      ]);
    }, 1000));
  },

  getInterviews: async () => {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        { id: 1, question: "How would you design the architecture for a highly scalable frontend app?", category: "System Design", rationale: "AI predicted this based on your weakness in System Design." },
        { id: 2, question: "Explain how you would optimize a React application that is rendering too slowly.", category: "Performance", rationale: "Standard question for Senior UI roles." },
      ]);
    }, 1000));
  },

  getLiveJobs: async () => {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        { id: 1, company: "Stripe", role: "Frontend Engineer", location: "Remote", salary: "$140k - $190k", match: 92, posted: "2h ago", rationale: "High match based on your payment gateway project." },
        { id: 2, company: "Vercel", role: "Senior UI Engineer", location: "New York, NY", salary: "$160k - $210k", match: 88, posted: "5h ago", rationale: "Strong Next.js alignment." },
      ]);
    }, 1000));
  },
};
