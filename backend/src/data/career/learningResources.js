module.exports = {
  docker: {
    skill: 'Docker',
    priority: 'High',
    difficulty: 'Intermediate',
    estimatedTime: '12 Hours',
    resources: {
      officialDocs: {
        title: 'Docker Official Getting Started & CLI Reference',
        url: 'https://docs.docker.com/get-started/'
      },
      youtubeTutorial: {
        title: 'Docker Tutorial for Beginners by TechWorld with Nana',
        url: 'https://www.youtube.com/watch?v=3c-iBn73dDE'
      },
      practiceProject: {
        title: 'Dockerized Microservices Expense Tracker',
        estimatedHours: 8,
        difficulty: 'Intermediate',
        resumeValue: 'High'
      }
    },
    defaultExplanation: 'Containerizing applications ensures seamless deployment without environment drift bugs.'
  },
  aws: {
    skill: 'AWS',
    priority: 'High',
    difficulty: 'Intermediate',
    estimatedTime: '16 Hours',
    resources: {
      officialDocs: {
        title: 'AWS Fundamentals & Cloud Practitioner Documentation',
        url: 'https://aws.amazon.com/getting-started/'
      },
      youtubeTutorial: {
        title: 'AWS Certified Cloud Practitioner Course by freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=3hLmDS179YE'
      },
      practiceProject: {
        title: 'Serverless REST API with AWS Lambda, API Gateway & DynamoDB',
        estimatedHours: 10,
        difficulty: 'Intermediate',
        resumeValue: 'High'
      }
    },
    defaultExplanation: 'Understanding cloud services is essential for deploying and scaling modern distributed web applications.'
  },
  kubernetes: {
    skill: 'Kubernetes',
    priority: 'High',
    difficulty: 'Advanced',
    estimatedTime: '20 Hours',
    resources: {
      officialDocs: {
        title: 'Kubernetes Official Basics & Concepts Tutorials',
        url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/'
      },
      youtubeTutorial: {
        title: 'Kubernetes Tutorial for Beginners by TechWorld with Nana',
        url: 'https://www.youtube.com/watch?v=X48VuDVv0do'
      },
      practiceProject: {
        title: 'K8s Cluster Setup with Automated Rolling Updates',
        estimatedHours: 12,
        difficulty: 'Advanced',
        resumeValue: 'High'
      }
    },
    defaultExplanation: 'Kubernetes is the gold standard for container orchestration, self-healing, and production scaling.'
  },
  systemdesign: {
    skill: 'System Design',
    priority: 'High',
    difficulty: 'Advanced',
    estimatedTime: '24 Hours',
    resources: {
      officialDocs: {
        title: 'System Design Primer Repository',
        url: 'https://github.com/donnemartin/system-design-primer'
      },
      youtubeTutorial: {
        title: 'System Design for Beginners by ByteByteGo',
        url: 'https://www.youtube.com/watch?v=i7twT3U5F7c'
      },
      practiceProject: {
        title: 'Design a Distributed Rate Limiter & URL Shortener',
        estimatedHours: 14,
        difficulty: 'Advanced',
        resumeValue: 'High'
      }
    },
    defaultExplanation: 'System design skills demonstrate your capacity to architect scalable, resilient, and fault-tolerant infrastructure.'
  }
};
