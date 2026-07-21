import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchAnalysis = async (id) => {
  const res = await fetch(`/api/resume/${id}/analysis`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch analysis");
  }
  return res.json();
};

const ATSReport = () => {
  const [resumeId, setResumeId] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['atsReport', submittedId],
    queryFn: () => fetchAnalysis(submittedId),
    enabled: !!submittedId,
    retry: false
  });

  const handleFetch = () => {
    if (resumeId.trim()) setSubmittedId(resumeId.trim());
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Explainable ATS Report</h2>
      
      <div className="flex gap-4 mb-8">
        <input 
          type="text" 
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          className="flex-grow border p-2 rounded"
          placeholder="Enter Document ID to View ATS Score..."
        />
        <button 
          onClick={handleFetch} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition-colors"
        >
          View Report
        </button>
      </div>
      
      {isLoading && <p className="text-center text-gray-600 font-medium">Loading ATS Data...</p>}
      {isError && <p className="text-red-500 font-medium bg-red-50 p-4 rounded text-center">{error.message}</p>}
      
      {data && data.data && data.data.atsScore && (
        <div className="mt-8 border-t pt-8">
          <div className="text-center mb-8">
            <h3 className="text-xl text-gray-500 font-semibold uppercase tracking-wider mb-2">Total ATS Score</h3>
            <div className={`text-7xl font-black ${getScoreColor(data.data.atsScore.total)}`}>
              {data.data.atsScore.total}<span className="text-4xl text-gray-400">/100</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 border-b pb-2">Score Breakdown</h3>
          <div className="space-y-4">
            {data.data.atsScore.breakdown.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-grow pr-4">
                  <h4 className="font-bold text-lg text-gray-800">{item.category}</h4>
                  <p className="text-gray-600 text-sm mt-1">{item.reason}</p>
                </div>
                <div className="mt-2 md:mt-0 font-bold text-xl whitespace-nowrap bg-white px-4 py-2 rounded shadow-sm">
                  {item.score} <span className="text-gray-400 text-sm font-normal">/ {item.maxScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSReport;
