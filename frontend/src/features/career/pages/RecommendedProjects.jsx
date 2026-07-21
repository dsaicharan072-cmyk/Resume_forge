import React, { useState } from 'react';

const DEFAULT_PROJECTS = [
  {
    title: 'Dockerized Microservices Expense Tracker',
    skill: 'Docker',
    difficulty: 'Intermediate',
    estimatedTime: '8 Hours',
    resumeValue: 'High',
    techStack: ['Docker', 'Node.js', 'Express', 'MongoDB', 'Nginx'],
    employabilityExplanation: 'Demonstrates your ability to containerize multi-tier applications, configure Nginx reverse proxies, and solve real-world environment consistency problems that production engineering teams face.'
  },
  {
    title: 'Serverless REST API & File Processing Pipeline',
    skill: 'AWS',
    difficulty: 'Intermediate',
    estimatedTime: '10 Hours',
    resumeValue: 'High',
    techStack: ['AWS Lambda', 'API Gateway', 'S3', 'DynamoDB', 'Node.js'],
    employabilityExplanation: 'Proves hands-on competence with cloud-native serverless architecture, event-driven computing, and cloud database optimization.'
  },
  {
    title: 'High-Throughput Distributed Rate Limiter & URL Shortener',
    skill: 'System Design',
    difficulty: 'Advanced',
    estimatedTime: '14 Hours',
    resumeValue: 'High',
    techStack: ['Node.js', 'Redis', 'PostgreSQL', 'Docker', 'Locust'],
    employabilityExplanation: 'Validates your mastery of sliding-window algorithms, in-memory caching strategies, rate-limiting headers, and database partitioning under peak load.'
  }
];

const RecommendedProjects = () => {
  const [projects] = useState(DEFAULT_PROJECTS);

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1E293B' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
          🚀 Recommended Practice Projects
        </h1>
        <p style={{ fontSize: '16px', color: '#64748B' }}>
          Build high-value portfolio projects specifically engineered to demonstrate missing production skills on your resume.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '24px' }}>
        {projects.map((project, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#2563EB', background: '#EFF6FF', padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase' }}>
                  Bridges Gap: {project.skill}
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginTop: '8px', margin: 0 }}>
                  {project.title}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>
                  ⏱️ {project.estimatedTime}
                </span>
                <span style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', color: '#047857' }}>
                  Resume Value: {project.resumeValue}
                </span>
              </div>
            </div>

            {/* Employability Explanation */}
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', marginBottom: '20px', borderLeft: '4px solid #10B981' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                💡 <strong style={{ color: '#1E293B' }}>Why building this improves employability: </strong>
                {project.employabilityExplanation}
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '8px', textTransform: 'uppercase' }}>
                Technologies You Will Master
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.techStack.map((tech, tIdx) => (
                  <span key={tIdx} style={{ background: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1', padding: '4px 10px', borderRadius: '14px', fontSize: '12px', fontWeight: '600' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProjects;
