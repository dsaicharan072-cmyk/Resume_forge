import React, { useState } from 'react';
import { useLearningRoadmap } from '../careerService';

const LearningRoadmap = () => {
  const [missingSkills] = useState(['Docker', 'AWS', 'System Design']); // Fallback skills for demonstration
  const { data, isPending, isError } = useLearningRoadmap(missingSkills.join(','));

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-primary font-bold animate-pulse">Generating your learning roadmap...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to generate learning roadmap. Please try again.
      </div>
    );
  }

  const roadmapData = data?.data || data || { totalEstimatedHours: 0, roadmap: [] };
  const roadmapSteps = roadmapData?.roadmap || [];

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-slate-900">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            🗺️ Personalised Learning Roadmap
          </h1>
          <p className="text-base text-slate-500">
            Curated documentation, video courses, and hands-on projects tailored to bridge your skill gaps.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-6 py-4 rounded-2xl text-right">
          <span className="text-xs text-emerald-700 font-bold tracking-wider uppercase">
            Total Estimated Time
          </span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">
            ~{roadmapData.totalEstimatedHours} Hours
          </div>
        </div>
      </header>

      {/* Roadmap Timeline List */}
      <div className="flex flex-col gap-8">
        {roadmapSteps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"
          >
            {/* Step Header */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-blue-500/20">
                  {idx + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 m-0">
                    {step.skill} Roadmap
                  </h2>
                  <span className="text-sm text-slate-500">
                    Difficulty: <strong className="text-slate-700">{step.difficulty}</strong> • Est. Duration: <strong className="text-slate-700">{step.estimatedTime}</strong>
                  </span>
                </div>
              </div>

              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                step.priority === 'High' 
                  ? 'bg-red-50 text-red-600 border-red-200' 
                  : 'bg-amber-50 text-amber-600 border-amber-200'
              }`}>
                {step.priority} Priority
              </span>
            </div>

            {/* AI Explanation Banner */}
            <div className="bg-blue-50 p-4 rounded-xl mb-8 border-l-4 border-blue-500">
              <p className="m-0 text-sm text-slate-700 leading-relaxed">
                🤖 <strong className="text-slate-900">Why This Matters: </strong>
                {step.aiExplanation}
              </p>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Official Docs */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <span className="text-xs text-blue-600 font-extrabold uppercase tracking-wider">
                  📖 Official Docs
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2 mb-4">
                  {step.resources.officialDocs.title}
                </h4>
                <a
                  href={step.resources.officialDocs.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 font-bold hover:underline"
                >
                  View Documentation →
                </a>
              </div>

              {/* YouTube Tutorial */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <span className="text-xs text-red-500 font-extrabold uppercase tracking-wider">
                  📺 Video Course
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2 mb-4">
                  {step.resources.youtubeTutorial.title}
                </h4>
                <a
                  href={step.resources.youtubeTutorial.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-red-500 font-bold hover:underline"
                >
                  Watch Tutorial →
                </a>
              </div>

              {/* Practice Project */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <span className="text-xs text-emerald-600 font-extrabold uppercase tracking-wider">
                  🛠️ Practice Project
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2 mb-3">
                  {step.resources.practiceProject.title}
                </h4>
                <span className="text-xs text-slate-500 block">
                  Est. Time: {step.resources.practiceProject.estimatedHours} Hours • Resume Value: <strong className="text-emerald-600">High</strong>
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
