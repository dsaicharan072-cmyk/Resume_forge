import React, { useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, Building2, MapPin, SlidersHorizontal, Sparkles, Wallet } from 'lucide-react';
import { useLiveJobs } from '../careerService';

const LiveJobs = () => {
  const [minScore, setMinScore] = useState(70);
  const { data: responseData, isPending, isError } = useLiveJobs(minScore);
  const jobs = responseData?.data?.jobs ?? responseData?.jobs ?? [];
  const totalJobsFound = responseData?.data?.totalJobsFound ?? responseData?.totalJobsFound ?? 0;

  const getScoreColor = (score) => {
    if (score >= 90) return '#10B981'; // Emerald
    if (score >= 80) return '#3B82F6'; // Blue
    return '#F59E0B'; // Amber
  };

  return (
    <div className="max-w-6xl mx-auto font-sans text-foreground">
      <header className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles size={14} /> Curated opportunities
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Live job matches
          </h1>
          <p className="text-base text-muted">
            Explore roles scored against your current skills and experience.
          </p>
        </div>

        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm min-w-[280px]">
          <label className="flex items-center justify-between text-sm font-semibold text-foreground mb-3">
            <span className="inline-flex items-center gap-2"><SlidersHorizontal size={15} className="text-primary" /> Minimum match</span>
            <strong className="text-primary">{minScore}%</strong>
          </label>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full cursor-pointer accent-primary"
          />
        </div>
      </header>

      {!isPending && !isError && (
        <div className="mb-6 flex items-center gap-3 text-sm text-muted">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border"><BriefcaseBusiness size={16} className="text-primary" /></span>
          <span><strong className="text-foreground">{jobs.length}</strong> matching roles from {totalJobsFound} open opportunities</span>
        </div>
      )}

      {isPending && (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-primary font-semibold animate-pulse">Finding your strongest opportunities...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 text-center text-red-700 p-8">
          We couldn’t load job matches. Please refresh and try again.
        </div>
      )}

      {/* Jobs Feed List */}
      {!isPending && !isError && jobs && (
        <div className="flex flex-col gap-5">
          {jobs.length === 0 ? (
            <div className="bg-surface p-10 text-center rounded-2xl border border-border">
              <p className="font-semibold text-foreground">No jobs meet this threshold.</p>
              <p className="mt-1 text-sm text-muted">Try reducing the minimum match score to see more opportunities.</p>
            </div>
          ) : (
            jobs.map((job) => {
              const color = getScoreColor(job.matchScore);

              return (
                <div
                  key={job.id}
                  className="group bg-surface rounded-2xl border border-border p-6 flex flex-col md:flex-row md:items-center justify-between shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg gap-6"
                >
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Building2 size={22} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-foreground m-0">
                          {job.role}
                        </h3>
                        <span className="text-xs font-semibold text-muted bg-surface-hover px-3 py-1 rounded-full">
                          {job.company}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted mb-4">
                        <span className="inline-flex items-center gap-1.5"><MapPin size={15} /> {job.location}</span>
                        <span className="inline-flex items-center gap-1.5"><Wallet size={15} /> {job.salary}</span>
                      </div>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, sIdx) => {
                          const isMatched = job.matchedSkills.includes(skill);
                          return (
                            <span key={sIdx} className={`px-3 py-1 rounded-full text-xs font-bold border ${
                              isMatched 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-surface-hover text-muted border-border'
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
                      className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg text-sm font-semibold no-underline transition-colors"
                    >
                      View role <ArrowUpRight size={16} />
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
