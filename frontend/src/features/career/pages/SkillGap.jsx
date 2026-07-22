import React, { useState, useEffect } from 'react';
import { useSkillGap } from '../careerService';
import { getCareerProfile, targetSkillsFor } from '../careerProfile';

const SkillGap = () => {
  const { mutate: getSkillGap, data, isPending, isError } = useSkillGap();
  const profile = getCareerProfile();
  const candidateSkills = profile.skills;
  const targetJobSkills = targetSkillsFor(profile);

  useEffect(() => {
    getSkillGap({
      candidateSkills,
      targetRoleSkills: targetJobSkills,
      targetRole: profile.targetRole
    });
  }, [getSkillGap, profile.targetRole, candidateSkills.join(','), targetJobSkills.join(',')]);

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-primary font-bold animate-pulse">Calculating skill gaps...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to calculate skill gap. Please try again.
      </div>
    );
  }

  const analysis = data?.data || data || { presentSkills: [], missingSkills: [] };
  const presentSkills = analysis.presentSkills || [];
  const missingSkills = analysis.missingSkills || [];

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-foreground">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          ⚡ Skill Gap Engine
        </h1>
        <p className="text-base text-muted">
          {candidateSkills.length
            ? `Using the skills detected in ${profile.resumeName}, aligned to a ${profile.targetRole} path.`
            : 'Upload and analyse a resume to build a personalised skill inventory.'}
        </p>
      </header>

      {/* Overview Metric Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <span className="text-sm text-muted font-semibold">Your Current Skills</span>
          <div className="text-3xl font-extrabold text-emerald-500 mt-1">
            {candidateSkills.length} Skills
          </div>
        </div>
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <span className="text-sm text-muted font-semibold">Target Role Standard</span>
          <div className="text-3xl font-extrabold text-blue-500 mt-1">
            {targetJobSkills.length} Skills
          </div>
        </div>
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <span className="text-sm text-muted font-semibold">Identified Skill Gaps</span>
          <div className="text-3xl font-extrabold text-red-500 mt-1">
            {missingSkills.length} Missing
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Skill Inventory Comparison */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-foreground">
              ✅ Present in Resume
            </h3>
            <div className="flex flex-wrap gap-2">
              {presentSkills.map((skill, idx) => (
                <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-foreground">
              🎯 Target Job Requirements
            </h3>
            <div className="flex flex-wrap gap-2">
              {targetJobSkills.map((skill, idx) => {
                const isPresent = candidateSkills.includes(skill);
                return (
                  <span key={idx} className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${
                    isPresent 
                      ? 'bg-surface-hover text-muted border-border' 
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {skill} {isPresent ? '✓' : '✗'}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Missing Skill Explanations */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-extrabold text-foreground mb-4">
            🚨 Missing Skill Analysis & Importance Rationale
          </h2>

          <div className="flex flex-col gap-4">
            {missingSkills.map((item, idx) => {
              const badgeStyle = getPriorityBadgeStyle(item.priority);

              return (
                <div key={idx} className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
                  <div className="flex flex-wrap items-center justify-between mb-3 gap-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-extrabold text-foreground m-0">
                        {item.skill}
                      </h3>
                      <span className="text-xs text-muted bg-surface-hover px-3 py-1 rounded-full font-semibold">
                        {item.category || 'Core Tech'}
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeStyle}`}>
                      {item.priority} Priority
                    </span>
                  </div>

                  <p className="m-0 text-sm text-muted leading-relaxed">
                    <strong className="text-foreground">Why it matters: </strong>
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
