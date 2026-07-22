import React, { useState, useEffect } from 'react';
import { useCompanyMatch } from '../careerService';

const CompanyMatch = () => {
  const { mutate: getMatches, data, isPending, isError } = useCompanyMatch();
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    // Fetch matches with a default fallback payload representing a standard user
    getMatches({
      profile: {
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        experienceYears: 2
      }
    });
  }, [getMatches]);

  useEffect(() => {
    if (data?.matches?.length > 0) {
      setSelectedCompany(data.matches[0]);
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

  const matches = data?.matches || [];

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans text-slate-900">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          🏢 Target Company Match Engine
        </h1>
        <p className="text-base text-slate-500">
          Deterministic algorithm matching your resume & profile against top tech company standards.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Company Rankings</h2>
          <div className="flex flex-col gap-4">
            {matches.map((item) => {
              const isSelected = selectedCompany?.companyId === item.companyId;
              const color = getScoreColor(item.score);

              return (
                <div
                  key={item.companyId}
                  onClick={() => setSelectedCompany(item)}
                  className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-slate-50 border-transparent shadow-md' 
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                  style={{
                    borderColor: isSelected ? color : undefined,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-lg text-slate-700">
                      {item.companyName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold m-0 text-slate-900">{item.companyName}</h3>
                      <span className="text-sm text-slate-500">{item.domain}</span>
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
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 m-0">
                  {selectedCompany.companyName}
                </h2>
                <span className="text-sm text-slate-500">{selectedCompany.domain}</span>
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
              className="mb-6 p-4 rounded-lg bg-slate-50 border-l-4"
              style={{ borderLeftColor: getScoreColor(selectedCompany.score) }}
            >
              <p className="m-0 text-sm text-slate-700 font-medium">
                {selectedCompany.reasons.summary}
              </p>
            </div>

            {/* Strong Fit Reasons */}
            <div className="mb-5">
              <h4 className="text-sm font-bold text-emerald-500 mb-2">
                ✅ Key Strengths & Fit
              </h4>
              <ul className="m-0 pl-5 text-sm text-slate-700 list-disc">
                {selectedCompany.reasons.strongFit.map((reason, idx) => (
                  <li key={idx} className="mb-1">{reason}</li>
                ))}
              </ul>
            </div>

            {/* Skill Gaps */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-red-500 mb-2">
                ⚠️ Identified Gaps
              </h4>
              <ul className="m-0 pl-5 text-sm text-slate-700 list-disc">
                {selectedCompany.reasons.gaps.map((reason, idx) => (
                  <li key={idx} className="mb-1">{reason}</li>
                ))}
              </ul>
            </div>

            {/* Matched Skills Chips */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Matched Skills</h4>
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
              <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Missing Skills</h4>
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
