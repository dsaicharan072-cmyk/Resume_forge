import React, { useState } from 'react';

const DEFAULT_JOBS_FEED = [
  {
    id: 'job_1',
    company: 'Atlassian',
    role: 'Senior Full Stack Engineer (React / Node)',
    location: 'Remote / Hybrid',
    salary: '$145,000 - $185,000',
    applyLink: 'https://atlassian.com/careers/job-101',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'REST APIs'],
    matchedSkills: ['React', 'Node.js', 'TypeScript', 'REST APIs'],
    matchScore: 95
  },
  {
    id: 'job_2',
    company: 'Microsoft',
    role: 'Software Development Engineer II',
    location: 'Redmond, WA / Remote',
    salary: '$150,000 - $190,000',
    applyLink: 'https://careers.microsoft.com/job-202',
    requiredSkills: ['TypeScript', 'React', 'Node.js', 'System Design'],
    matchedSkills: ['TypeScript', 'React', 'Node.js'],
    matchScore: 91
  },
  {
    id: 'job_3',
    company: 'Amazon',
    role: 'Software Development Engineer - AWS',
    location: 'Seattle, WA',
    salary: '$140,000 - $175,000',
    applyLink: 'https://amazon.jobs/job-303',
    requiredSkills: ['Java', 'Node.js', 'AWS', 'Distributed Systems'],
    matchedSkills: ['Node.js'],
    matchScore: 86
  },
  {
    id: 'job_4',
    company: 'Adobe',
    role: 'Frontend Engineer (Creative Cloud)',
    location: 'San Jose, CA',
    salary: '$135,000 - $170,000',
    applyLink: 'https://adobe.com/careers/job-404',
    requiredSkills: ['JavaScript', 'React', 'HTML5', 'CSS3'],
    matchedSkills: ['React', 'JavaScript'],
    matchScore: 84
  }
];

const LiveJobs = () => {
  const [minScore, setMinScore] = useState(70);
  const [jobs] = useState(DEFAULT_JOBS_FEED);

  const filteredJobs = jobs.filter(job => job.matchScore >= minScore);

  const getScoreColor = (score) => {
    if (score >= 90) return '#10B981';
    if (score >= 80) return '#3B82F6';
    return '#F59E0B';
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1E293B' }}>
      <header style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
            📡 Live Hiring Opportunities
          </h1>
          <p style={{ fontSize: '16px', color: '#64748B' }}>
            Public hiring feed automatically filtered and scored against your resume standards.
          </p>
        </div>

        {/* Configurable Min Match Score Slider */}
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
            Min Match Threshold: <strong style={{ color: '#2563EB' }}>{minScore}%</strong>
          </label>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            style={{ width: '180px', cursor: 'pointer' }}
          />
        </div>
      </header>

      {/* Jobs Feed List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredJobs.map((job) => {
          const color = getScoreColor(job.matchScore);

          return (
            <div
              key={job.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                transition: 'transform 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '20px', color: '#334155' }}>
                  {job.company.charAt(0)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                      {job.role}
                    </h3>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: '8px' }}>
                      {job.company}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                  </div>

                  {/* Skills Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {job.requiredSkills.map((skill, sIdx) => {
                      const isMatched = job.matchedSkills.includes(skill);
                      return (
                        <span key={sIdx} style={{
                          background: isMatched ? '#ECFDF5' : '#F1F5F9',
                          color: isMatched ? '#047857' : '#64748B',
                          border: isMatched ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          {skill} {isMatched ? '✓' : ''}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                <div style={{ background: `${color}15`, color: color, padding: '6px 14px', borderRadius: '16px', fontSize: '18px', fontWeight: '800' }}>
                  {job.matchScore}% Match
                </div>

                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#2563EB',
                    color: '#FFFFFF',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  Apply Now →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveJobs;
