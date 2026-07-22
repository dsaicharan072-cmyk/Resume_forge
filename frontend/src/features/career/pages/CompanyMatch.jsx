import React, { useState, useEffect } from 'react';
import { Building2, CheckCircle2, ShieldCheck, Sparkles, TriangleAlert } from 'lucide-react';
import { useCompanyMatch } from '../careerService';
import { getCareerProfile } from '../careerProfile';

const CompanyMatch = () => {
  const { mutate: getMatches, data, isPending, isError } = useCompanyMatch();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const profile = getCareerProfile();
  const skillsKey = profile.skills.join(',');

  useEffect(() => {
    getMatches({
      profile: {
        skills: profile.skills,
        experienceYears: profile.experienceYears
      }
    });
  }, [getMatches, profile.experienceYears, skillsKey]);

  useEffect(() => {
    const matches = data?.data?.matches ?? data?.matches ?? [];
    if (matches.length > 0) {
      setSelectedCompany(matches[0]);
    }
  }, [data]);

  const getScoreColor = (score) => {
    if (score >= 90) return '#10B981'; // Emerald
    if (score >= 85) return '#3B82F6'; // Blue
    if (score >= 80) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-primary font-bold animate-pulse">Analyzing company matches...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to load company matches. Please try again.
      </div>
    );
  }

  const matches = data?.data?.matches ?? data?.matches ?? [];

  return (
    <div className="max-w-7xl mx-auto font-sans text-foreground">
      <header className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <Sparkles size={14} /> Profile-based ranking
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Company match
        </h1>
        <p className="text-base text-muted">
          {profile.skills.length
            ? `Ranked from ${profile.resumeName} for a ${profile.targetRole} path.`
            : 'Upload and analyse a resume first to receive personalised company matches.'}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Company Rankings</h2>
          <div className="flex flex-col gap-4">
            {matches.length === 0 ? (
              <div className="rounded-xl border border-border bg-surface p-6 text-center text-muted">
                No company matches are available yet. Add skills to your profile and try again.
              </div>
            ) : matches.map((item) => {
              const isSelected = selectedCompany?.companyId === item.companyId;
              const color = getScoreColor(item.score);

              return (
                <div
                  key={item.companyId}
                  onClick={() => setSelectedCompany(item)}
                  className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'bg-primary/5 shadow-md'
                      : 'bg-surface border-border hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: isSelected ? color : undefined,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Building2 size={21} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold m-0 text-foreground">{item.companyName}</h3>
                      <span className="text-sm text-muted">{item.domain}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-extrabold" style={{ color }}>
                      {item.score}%
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Match Score</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Company Details */}
        {selectedCompany && (
            <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm h-fit">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground m-0">
                  {selectedCompany.companyName}
                </h2>
                <span className="text-sm text-muted">{selectedCompany.domain}</span>
              </div>
              <div 
                className="px-4 py-2 rounded-full text-lg font-extrabold"
                style={{
                  background: `${getScoreColor(selectedCompany.score)}15`,
                  color: getScoreColor(selectedCompany.score),
                }}
              >
                {selectedCompany.score}% Match
              </div>
            </div>

            <div 
              className="mb-6 p-4 rounded-lg bg-surface-hover border-l-4"
              style={{ borderLeftColor: getScoreColor(selectedCompany.score) }}
            >
              <p className="m-0 text-sm text-muted font-medium">
                {selectedCompany.reasons.summary}
              </p>
            </div>

            {/* Strong Fit Reasons */}
            <div className="mb-5">
              <h4 className="text-sm font-bold text-emerald-500 mb-2">
                <CheckCircle2 size={16} className="inline mr-1.5 -mt-0.5" /> Key strengths & fit
              </h4>
              <ul className="m-0 pl-5 text-sm text-muted list-disc">
                {selectedCompany.reasons.strongFit.map((reason, idx) => (
                  <li key={idx} className="mb-1">{reason}</li>
                ))}
              </ul>
            </div>

            {/* Skill Gaps */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-red-500 mb-2">
                <TriangleAlert size={16} className="inline mr-1.5 -mt-0.5" /> Identified gaps
              </h4>
              <ul className="m-0 pl-5 text-sm text-muted list-disc">
                {selectedCompany.reasons.gaps.map((reason, idx) => (
                  <li key={idx} className="mb-1">{reason}</li>
                ))}
              </ul>
            </div>

            {/* Matched Skills Chips */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-muted mb-2 uppercase tracking-wider"><ShieldCheck size={14} className="inline mr-1.5 -mt-0.5" />Matched skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.matchedSkills.map((skill, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills Chips */}
            <div>
              <h4 className="text-xs font-bold text-muted mb-2 uppercase tracking-wider">Missing Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.missingSkills.map((skill, idx) => (
                  <span key={idx} className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold">
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
