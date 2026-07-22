import React, { useState } from 'react';
import { useLearningRoadmap } from '../careerService';

const RecommendedProjects = () => {
  const [missingSkills] = useState(['Docker', 'AWS', 'System Design']); // Fallback skills
  const { data, isPending, isError } = useLearningRoadmap(missingSkills.join(','));

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-primary font-bold animate-pulse">Curating practice projects...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to load recommended projects. Please try again.
      </div>
    );
  }

  // Extract projects from the roadmap data
  const roadmapData = data?.data || data || {};
  const roadmapSteps = roadmapData?.roadmap || [];
  
  const projects = roadmapSteps.map(step => ({
    skill: step.skill,
    ...step.resources.practiceProject,
    employabilityExplanation: step.aiExplanation,
    techStack: [step.skill] // Could be expanded by AI in the future, fallback to the core skill
  })) || [];

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-foreground">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          🚀 Recommended Practice Projects
        </h1>
        <p className="text-base text-muted">
          Build high-value portfolio projects specifically engineered to demonstrate missing production skills on your resume.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="bg-surface-hover p-10 text-center rounded-2xl border border-border">
          <p className="text-muted font-medium">No recommended projects at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Bridges Gap: {project.skill}
                  </span>
                  <h2 className="text-2xl font-extrabold text-foreground mt-3 m-0">
                    {project.title}
                  </h2>
                </div>

                <div className="flex gap-3 items-center shrink-0">
                  <span className="bg-surface-hover border border-border px-4 py-2 rounded-full text-sm font-bold text-muted">
                    ⏱️ {project.estimatedHours} Hours
                  </span>
                  <span className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full text-sm font-bold text-emerald-700">
                    Resume Value: {project.resumeValue}
                  </span>
                </div>
              </div>

              {/* Employability Explanation */}
              <div className="bg-surface-hover p-5 rounded-xl mb-6 border-l-4 border-emerald-500">
                <p className="m-0 text-sm text-muted leading-relaxed">
                  💡 <strong className="text-foreground">Why building this improves employability: </strong>
                  {project.employabilityExplanation}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <h4 className="text-xs font-bold text-muted mb-3 uppercase tracking-wider">
                  Technologies You Will Master
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="bg-surface text-muted border border-border px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedProjects;
