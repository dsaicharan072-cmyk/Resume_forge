import React, { useState } from 'react';

const DEFAULT_ROADMAP_DATA = {
  totalEstimatedHours: 56,
  totalSkillsCount: 3,
  roadmap: [
    {
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
      aiExplanation: 'Containerizing applications ensures seamless deployment without environment drift bugs, enabling true cloud portability.'
    },
    {
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
      aiExplanation: 'Understanding cloud infrastructure is essential for deploying and scaling modern distributed web applications.'
    },
    {
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
      aiExplanation: 'System design skills demonstrate your capacity to architect scalable, resilient, and fault-tolerant infrastructure.'
    }
  ]
};

const LearningRoadmap = () => {
  const [data] = useState(DEFAULT_ROADMAP_DATA);

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1E293B' }}>
      <header style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
            🗺️ Personalised Learning Roadmap
          </h1>
          <p style={{ fontSize: '16px', color: '#64748B' }}>
            Curated documentation, video courses, and hands-on projects tailored to bridge your skill gaps.
          </p>
        </div>

        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px 24px', borderRadius: '16px', textAlign: 'right' }}>
          <span style={{ fontSize: '13px', color: '#166534', fontWeight: '700' }}>TOTAL ESTIMATED TIME</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#15803D' }}>
            ~{data.totalEstimatedHours} Hours
          </div>
        </div>
      </header>

      {/* Roadmap Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {data.roadmap.map((step, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '28px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            {/* Step Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#3B82F6',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '18px'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    {step.skill} Roadmap
                  </h2>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>
                    Difficulty: <strong>{step.difficulty}</strong> • Est. Duration: <strong>{step.estimatedTime}</strong>
                  </span>
                </div>
              </div>

              <span style={{
                background: step.priority === 'High' ? '#FEF2F2' : '#FFFBEB',
                color: step.priority === 'High' ? '#DC2626' : '#D97706',
                border: step.priority === 'High' ? '1px solid #FECACA' : '1px solid #FDE68A',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '700'
              }}>
                {step.priority} Priority
              </span>
            </div>

            {/* AI Explanation Banner */}
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', marginBottom: '24px', borderLeft: '4px solid #3B82F6' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>
                🤖 <strong style={{ color: '#1E293B' }}>Why This Matters: </strong>
                {step.aiExplanation}
              </p>
            </div>

            {/* Resource Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {/* Official Docs */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#3B82F6', fontWeight: '800', textTransform: 'uppercase' }}>
                  📖 Official Docs
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', marginTop: '6px', marginBottom: '12px' }}>
                  {step.resources.officialDocs.title}
                </h4>
                <a
                  href={step.resources.officialDocs.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '13px', color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}
                >
                  View Documentation →
                </a>
              </div>

              {/* YouTube Tutorial */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '800', textTransform: 'uppercase' }}>
                  📺 Video Course
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', marginTop: '6px', marginBottom: '12px' }}>
                  {step.resources.youtubeTutorial.title}
                </h4>
                <a
                  href={step.resources.youtubeTutorial.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '13px', color: '#DC2626', fontWeight: '600', textDecoration: 'none' }}
                >
                  Watch Tutorial →
                </a>
              </div>

              {/* Practice Project */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '800', textTransform: 'uppercase' }}>
                  🛠️ Practice Project
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', marginTop: '6px', marginBottom: '8px' }}>
                  {step.resources.practiceProject.title}
                </h4>
                <span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>
                  Est. Time: {step.resources.practiceProject.estimatedHours} Hours • Resume Value: High
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningRoadmap;
