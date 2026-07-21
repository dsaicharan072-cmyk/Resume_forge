import React, { useState } from 'react';

// Default mock data for instant preview & demonstration
const DEFAULT_MATCHES = [
  {
    companyId: 'atlassian',
    companyName: 'Atlassian',
    logo: 'https://logo.clearbit.com/atlassian.com',
    domain: 'Enterprise Software & Productivity',
    score: 95,
    reasons: {
      strongFit: [
        'Matches core requirement stack: React, Node.js, TypeScript, REST APIs',
        'Possesses bonus stack skills: GraphQL, Docker',
        'Meets or exceeds minimum required experience.'
      ],
      gaps: ['Missing preferred skills: Jest, CI/CD.'],
      summary: 'Score of 95% based on 4/6 core skills match and experience alignment.'
    },
    matchedSkills: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'GraphQL', 'Docker'],
    missingSkills: ['Jest', 'CI/CD']
  },
  {
    companyId: 'microsoft',
    companyName: 'Microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    domain: 'Cloud, OS, & AI',
    score: 91,
    reasons: {
      strongFit: [
        'Matches core requirement stack: TypeScript, React, Node.js',
        'Possesses bonus stack skills: System Design, SQL',
        'Meets or exceeds minimum required experience.'
      ],
      gaps: ['Missing key required skills: C#.', 'Missing preferred skills: Azure.'],
      summary: 'Score of 91% based on 3/6 core skills match and experience alignment.'
    },
    matchedSkills: ['TypeScript', 'React', 'Node.js', 'System Design', 'SQL'],
    missingSkills: ['C#', 'Azure']
  },
  {
    companyId: 'amazon',
    companyName: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    domain: 'E-commerce & Cloud Computing',
    score: 86,
    reasons: {
      strongFit: [
        'Matches core requirement stack: Node.js, Python',
        'Possesses bonus stack skills: AWS, Microservices',
        'Meets or exceeds minimum required experience.'
      ],
      gaps: ['Missing key required skills: Java, Distributed Systems.'],
      summary: 'Score of 86% based on 2/6 core skills match and experience alignment.'
    },
    matchedSkills: ['Node.js', 'Python', 'AWS', 'Microservices'],
    missingSkills: ['Java', 'Distributed Systems']
  },
  {
    companyId: 'adobe',
    companyName: 'Adobe',
    logo: 'https://logo.clearbit.com/adobe.com',
    domain: 'Creative & Digital Media Software',
    score: 84,
    reasons: {
      strongFit: [
        'Matches core requirement stack: JavaScript, React, HTML5, CSS3',
        'Meets or exceeds minimum required experience.'
      ],
      gaps: ['Missing key required skills: C++, WebGL.', 'Missing preferred skills: WebAssembly.'],
      summary: 'Score of 84% based on 4/6 core skills match and experience alignment.'
    },
    matchedSkills: ['JavaScript', 'React', 'HTML5', 'CSS3'],
    missingSkills: ['C++', 'WebGL', 'WebAssembly']
  },
  {
    companyId: 'google',
    companyName: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    domain: 'Search, Cloud, & AI Infrastructure',
    score: 82,
    reasons: {
      strongFit: [
        'Matches core requirement stack: Python, Data Structures, Algorithms',
        'Possesses bonus stack skills: GCP'
      ],
      gaps: [
        'Missing key required skills: C++, Go, System Design.',
        'Under minimum required experience by 1 year(s).'
      ],
      summary: 'Score of 82% based on 3/7 core skills match and experience alignment.'
    },
    matchedSkills: ['Python', 'Data Structures', 'Algorithms', 'GCP'],
    missingSkills: ['C++', 'Go', 'System Design']
  }
];

const CompanyMatch = () => {
  const [matches] = useState(DEFAULT_MATCHES);
  const [selectedCompany, setSelectedCompany] = useState(DEFAULT_MATCHES[0]);

  const getScoreColor = (score) => {
    if (score >= 90) return '#10B981'; // Emerald
    if (score >= 85) return '#3B82F6'; // Blue
    if (score >= 80) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1E293B' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
          🏢 Target Company Match Engine
        </h1>
        <p style={{ fontSize: '16px', color: '#64748B' }}>
          Deterministic algorithm matching your resume & profile against top tech company standards.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Company List */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Company Rankings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {matches.map((item) => {
              const isSelected = selectedCompany?.companyId === item.companyId;
              const color = getScoreColor(item.score);

              return (
                <div
                  key={item.companyId}
                  onClick={() => setSelectedCompany(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    borderRadius: '12px',
                    border: isSelected ? `2px solid ${color}` : '1px solid #E2E8F0',
                    background: isSelected ? '#F8FAFC' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '18px', color: '#334155' }}>
                      {item.companyName.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#0F172A' }}>{item.companyName}</h3>
                      <span style={{ fontSize: '13px', color: '#64748B' }}>{item.domain}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: color }}>
                      {item.score}%
                    </div>
                    <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500' }}>Match Score</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Company Details */}
        {selectedCompany && (
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  {selectedCompany.companyName}
                </h2>
                <span style={{ fontSize: '14px', color: '#64748B' }}>{selectedCompany.domain}</span>
              </div>
              <div style={{
                background: `${getScoreColor(selectedCompany.score)}15`,
                color: getScoreColor(selectedCompany.score),
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '20px',
                fontWeight: '800'
              }}>
                {selectedCompany.score}% Match
              </div>
            </div>

            <div style={{ marginBottom: '24px', padding: '16px', borderRadius: '8px', background: '#F8FAFC', borderLeft: `4px solid ${getScoreColor(selectedCompany.score)}` }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#334155', fontWeight: '500' }}>
                {selectedCompany.reasons.summary}
              </p>
            </div>

            {/* Strong Fit Reasons */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#10B981', marginBottom: '10px' }}>
                ✅ Key Strengths & Fit
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#334155' }}>
                {selectedCompany.reasons.strongFit.map((reason, idx) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{reason}</li>
                ))}
              </ul>
            </div>

            {/* Skill Gaps */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#EF4444', marginBottom: '10px' }}>
                ⚠️ Identified Gaps
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#334155' }}>
                {selectedCompany.reasons.gaps.map((reason, idx) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{reason}</li>
                ))}
              </ul>
            </div>

            {/* Matched Skills Chips */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Matched Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedCompany.matchedSkills.map((skill, idx) => (
                  <span key={idx} style={{ background: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0', padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: '600' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills Chips */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Missing Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedCompany.missingSkills.map((skill, idx) => (
                  <span key={idx} style={{ background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: '600' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyMatch;
