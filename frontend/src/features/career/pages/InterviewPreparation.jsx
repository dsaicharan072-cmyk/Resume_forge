import React, { useState, useEffect } from 'react';
import { useInterviewPrep } from '../careerService';

const InterviewPreparation = () => {
  const { mutate: getInterviewPrep, data, isPending, isError } = useInterviewPrep();
  const [activeTab, setActiveTab] = useState('technical');
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    // Generate interview prep for a default fallback role
    getInterviewPrep({ targetRole: 'Senior Full Stack Engineer' });
  }, [getInterviewPrep]);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-primary font-bold animate-pulse">Curating interview questions...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to generate interview preparation. Please try again.
      </div>
    );
  }

  const prep = data || {
    targetRole: 'Loading...',
    technicalQuestions: [],
    behavioralQuestions: [],
    codingTopics: [],
    systemDesignTopics: []
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-slate-900">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          🧠 Interview Preparation Suite
        </h1>
        <p className="text-base text-slate-500">
          Tailored technical questions, behavioral frameworks, coding topics, and system design concepts for <strong className="text-slate-800">{prep.targetRole}</strong>.
        </p>
      </header>

      {/* Tabs Header */}
      <div className="flex gap-4 border-b-2 border-slate-200 mb-8 overflow-x-auto pb-px">
        {[
          { id: 'technical', label: '💻 Technical Questions' },
          { id: 'behavioral', label: '🗣️ Behavioral (STAR)' },
          { id: 'coding', label: '⚡ Coding Topics' },
          { id: 'systemDesign', label: '🏗️ System Design' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setExpandedIndex(null); }}
            className={`px-5 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-4 -mb-[2px] ${
              activeTab === tab.id 
                ? 'text-blue-600 border-blue-600' 
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Technical Questions */}
      {activeTab === 'technical' && (
        <div className="flex flex-col gap-5">
          {prep.technicalQuestions.map((q, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                  {q.topic}
                </span>
                <button
                  onClick={() => toggleExpand(idx)}
                  className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  {expandedIndex === idx ? 'Hide Solution Hint' : 'Show Solution Hint'}
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900 m-0 leading-snug">
                {q.question}
              </h3>

              {expandedIndex === idx && (
                <div className="mt-5 bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                  <p className="m-0 text-sm text-slate-700 leading-relaxed">
                    💡 <strong className="text-slate-900">Answer Key & Key Concepts: </strong>{q.hint}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Behavioral */}
      {activeTab === 'behavioral' && (
        <div className="flex flex-col gap-5">
          {prep.behavioralQuestions.map((q, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-4">
                {q.topic}
              </span>
              <h3 className="text-lg font-bold text-slate-900 m-0 mb-4 leading-snug">
                {q.question}
              </h3>
              <p className="m-0 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                🎯 <strong className="text-slate-900">STAR Method Approach: </strong>{q.hint}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Coding Topics */}
      {activeTab === 'coding' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900 mb-6">
            Top 100 Codeforces / LeetCode Must-Master Topics
          </h3>
          <ul className="m-0 pl-6 text-base text-slate-600 leading-loose list-disc marker:text-blue-500">
            {prep.codingTopics.map((topic, idx) => (
              <li key={idx}><strong className="text-slate-800">{topic}</strong></li>
            ))}
          </ul>
        </div>
      )}

      {/* Tab 4: System Design */}
      {activeTab === 'systemDesign' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900 mb-6">
            High-Scale System Design Interview Architecture Topics
          </h3>
          <ul className="m-0 pl-6 text-base text-slate-600 leading-loose list-disc marker:text-emerald-500">
            {prep.systemDesignTopics.map((topic, idx) => (
              <li key={idx}><strong className="text-slate-800">{topic}</strong></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewPreparation;
