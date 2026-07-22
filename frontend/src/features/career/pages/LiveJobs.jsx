import React, { useState } from 'react';
import { useLiveJobs } from '../careerService';

const LiveJobs = () => {
  const [minScore, setMinScore] = useState(70);
  const { data: jobs, isPending, isError } = useLiveJobs(minScore);

  const getScoreColor = (score) => {
    if (score >= 90) return '#10B981'; // Emerald
    if (score >= 80) return '#3B82F6'; // Blue
    return '#F59E0B'; // Amber
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-slate-900">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            📡 Live Hiring Opportunities
          </h1>
          <p className="text-base text-slate-500">
            Public hiring feed automatically filtered and scored against your resume standards.
          </p>
        </div>

        {/* Configurable Min Match Score Slider */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm min-w-[240px]">
          <label className="text-sm font-bold text-slate-600 block mb-3">
            Min Match Threshold: <strong className="text-blue-600 ml-1">{minScore}%</strong>
          </label>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full cursor-pointer accent-blue-600"
          />
        </div>
      </header>

      {isPending && (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-primary font-bold animate-pulse">Scanning live job boards...</p>
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500 p-8">
          Failed to fetch live job feed. Please try again.
        </div>
      )}

      {/* Jobs Feed List */}
      {!isPending && !isError && jobs && (
        <div className="flex flex-col gap-5">
          {jobs.length === 0 ? (
            <div className="bg-slate-50 p-10 text-center rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-medium">No jobs found matching your minimum score threshold.</p>
            </div>
          ) : (
            jobs.map((job) => {
              const color = getScoreColor(job.matchScore);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow gap-6"
                >
                  <div className="flex gap-5 items-start">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center font-extrabold text-xl text-slate-700">
                      {job.company.charAt(0)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-xl font-extrabold text-slate-900 m-0">
                          {job.role}
                        </h3>
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                          {job.company}
                        </span>
                      </div>

                      <div className="flex gap-4 text-sm font-medium text-slate-500 mb-4">
                        <span>📍 {job.location}</span>
                        <span>💰 {job.salary}</span>
                      </div>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, sIdx) => {
                          const isMatched = job.matchedSkills.includes(skill);
                          return (
                            <span key={sIdx} className={`px-3 py-1 rounded-full text-xs font-bold border ${
                              isMatched 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
                              {skill} {isMatched ? '✓' : ''}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0">
                    <div 
                      className="px-4 py-2 rounded-full text-lg font-extrabold"
                      style={{ background: `${color}15`, color: color }}
                    >
                      {job.matchScore}% Match
                    </div>

                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold no-underline inline-block transition-colors"
                    >
                      Apply Now →
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default LiveJobs;
