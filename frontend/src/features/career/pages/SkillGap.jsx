import React, { useState } from 'react';

const DEFAULT_CANDIDATE_SKILLS = ['React', 'Node', 'MongoDB'];
const DEFAULT_TARGET_JOB_SKILLS = ['React', 'Node', 'MongoDB', 'Docker', 'AWS', 'System Design'];

const DEFAULT_ANALYSIS = {
  presentSkills: ['React', 'Node', 'MongoDB'],
  missingSkills: [
    {
      skill: 'Docker',
      category: 'DevOps & Containerization',
      priority: 'High',
      whyItMatters: 'Essential for containerizing microservices and ensuring consistent environments across development and production.'
    },
    {
      skill: 'AWS',
      category: 'Cloud Infrastructure',
      priority: 'High',
      whyItMatters: 'Industry-standard cloud provider needed for deploying, scaling, and managing cloud-native applications.'
    },
    {
      skill: 'System Design',
      category: 'Architecture',
      priority: 'High',
      whyItMatters: 'Fundamental for designing fault-tolerant, low-latency distributed systems that scale to millions of users.'
    }
  ]
};

const SkillGap = () => {
  const [candidateSkills] = useState(DEFAULT_CANDIDATE_SKILLS);
  const [targetJobSkills] = useState(DEFAULT_TARGET_JOB_SKILLS);
  const [analysis] = useState(DEFAULT_ANALYSIS);

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'High':
        return { background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' };
      case 'Medium':
        return { background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A' };
      default:
        return { background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' };
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1E293B' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
          ⚡ Skill Gap Engine
        </h1>
        <p style={{ fontSize: '16px', color: '#64748B' }}>
          Deterministic algorithm comparing your current skills against target role standards to identify actionable missing skills.
        </p>
      </header>

      {/* Overview Metric Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Your Current Skills</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#10B981', marginTop: '4px' }}>
            {candidateSkills.length} Skills
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Target Role Standard</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#3B82F6', marginTop: '4px' }}>
            {targetJobSkills.length} Skills
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Identified Skill Gaps</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#EF4444', marginTop: '4px' }}>
            {analysis.missingSkills.length} Missing
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Left Column: Skill Inventory Comparison */}
        <div>
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#0F172A' }}>
              ✅ Present in Resume
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {analysis.presentSkills.map((skill, idx) => (
                <span key={idx} style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#0F172A' }}>
              🎯 Target Job Requirements
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {targetJobSkills.map((skill, idx) => {
                const isPresent = candidateSkills.includes(skill);
                return (
                  <span key={idx} style={{
                    background: isPresent ? '#F1F5F9' : '#FEF2F2',
                    color: isPresent ? '#475569' : '#991B1B',
                    border: isPresent ? '1px solid #CBD5E1' : '1px solid #FECACA',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {skill} {isPresent ? '✓' : '✗'}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Missing Skill Explanations */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
            🚨 Missing Skill Analysis & Importance Rationale
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {analysis.missingSkills.map((item, idx) => {
              const badgeStyle = getPriorityBadgeStyle(item.priority);

              return (
                <div key={idx} style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                        {item.skill}
                      </h3>
                      <span style={{ fontSize: '12px', color: '#64748B', background: '#F1F5F9', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>
                        {item.category}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '16px', ...badgeStyle }}>
                      {item.priority} Priority
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                    <strong style={{ color: '#1E293B' }}>Why it matters: </strong>
                    {item.whyItMatters}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGap;
