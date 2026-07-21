import React, { useState } from 'react';

const DEFAULT_PREP = {
  targetRole: 'Full Stack Engineer',
  technicalQuestions: [
    {
      topic: 'Node.js Event Loop & Non-blocking I/O',
      question: 'Explain how Node.js handles asynchronous non-blocking I/O operations despite being single-threaded.',
      hint: 'Focus on libuv thread pool, event loop phases (timers, poll, check), and microtask queue vs macrotask queue.'
    },
    {
      topic: 'React Virtual DOM & Reconciliation',
      question: 'How does React Virtual DOM diffing algorithm work, and why are keys important in lists?',
      hint: 'Mention heuristic O(N) diffing algorithm, element type comparisons, and key-based reconciliation across renders.'
    },
    {
      topic: 'Docker Container Isolation',
      question: 'What kernel features enable Docker container isolation on Linux?',
      hint: 'Discuss Linux Namespaces for process/network isolation and Cgroups for resource limit constraints.'
    }
  ],
  behavioralQuestions: [
    {
      topic: 'Conflict Resolution',
      question: 'Describe a situation where you disagreed with a technical design decision. How did you resolve it?',
      hint: 'Use STAR method (Situation, Task, Action, Result). Highlight objective benchmark metrics and respectful communication.'
    },
    {
      topic: 'Handling Production Outages',
      question: 'Tell me about a time you managed a critical production outage or urgent bug fix.',
      hint: 'Detail root cause analysis (RCA), emergency mitigation steps, clear stakeholder communication, and blameless post-mortem.'
    }
  ],
  codingTopics: [
    'Sliding Window & Two Pointer Techniques',
    'Dynamic Programming & Knapsack Variants',
    'Graph Traversal (BFS / DFS & Topological Sort)',
    'Trie Data Structures for Prefix Auto-complete'
  ],
  systemDesignTopics: [
    'Designing a High-Scale Distributed Rate Limiter',
    'Designing a Real-Time Collaborative Document Editor (Operational Transformation / CRDTs)',
    'Database Sharding & Consistent Hashing for Distributed Caches'
  ]
};

const InterviewPreparation = () => {
  const [prep] = useState(DEFAULT_PREP);
  const [activeTab, setActiveTab] = useState('technical');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1E293B' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
          🧠 Interview Preparation Suite
        </h1>
        <p style={{ fontSize: '16px', color: '#64748B' }}>
          Tailored technical questions, behavioral frameworks, coding topics, and system design concepts for <strong>{prep.targetRole}</strong>.
        </p>
      </header>

      {/* Tabs Header */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid #E2E8F0', marginBottom: '28px' }}>
        {[
          { id: 'technical', label: '💻 Technical Questions' },
          { id: 'behavioral', label: '🗣️ Behavioral (STAR)' },
          { id: 'coding', label: '⚡ Coding Topics' },
          { id: 'systemDesign', label: '🏗️ System Design' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setExpandedIndex(null); }}
            style={{
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: '700',
              color: activeTab === tab.id ? '#2563EB' : '#64748B',
              borderBottom: activeTab === tab.id ? '3px solid #2563EB' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '-2px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Technical Questions */}
      {activeTab === 'technical' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {prep.technicalQuestions.map((q, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563EB', background: '#EFF6FF', padding: '4px 10px', borderRadius: '10px' }}>
                  {q.topic}
                </span>
                <button
                  onClick={() => toggleExpand(idx)}
                  style={{ background: '#F1F5F9', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                >
                  {expandedIndex === idx ? 'Hide Solution Hint' : 'Show Solution Hint'}
                </button>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                {q.question}
              </h3>

              {expandedIndex === idx && (
                <div style={{ marginTop: '14px', background: '#F8FAFC', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
                  <p style={{ margin: 0, fontSize: '14px', color: '#334155' }}>
                    💡 <strong>Answer Key & Key Concepts: </strong>{q.hint}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Behavioral */}
      {activeTab === 'behavioral' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {prep.behavioralQuestions.map((q, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '10px' }}>
                {q.topic}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginTop: '8px', marginBottom: '12px' }}>
                {q.question}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', background: '#F8FAFC', padding: '12px', borderRadius: '8px' }}>
                🎯 <strong>STAR Method Approach: </strong>{q.hint}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Coding Topics */}
      {activeTab === 'coding' && (
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>
            Top 100 Codeforces / LeetCode Must-Master Topics
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '15px', color: '#334155', lineHeight: '2' }}>
            {prep.codingTopics.map((topic, idx) => (
              <li key={idx}><strong>{topic}</strong></li>
            ))}
          </ul>
        </div>
      )}

      {/* Tab 4: System Design */}
      {activeTab === 'systemDesign' && (
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>
            High-Scale System Design Interview Architecture Topics
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '15px', color: '#334155', lineHeight: '2' }}>
            {prep.systemDesignTopics.map((topic, idx) => (
              <li key={idx}><strong>{topic}</strong></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewPreparation;
