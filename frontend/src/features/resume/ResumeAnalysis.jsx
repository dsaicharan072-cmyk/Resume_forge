import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { analyzeResume } from "./resumeService";

const ResumeAnalysis = () => {
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const analyzeMutation = useMutation({
    mutationFn: analyzeResume,
    onError: (error) => setErrorMsg(error.message)
  });

  const handleAnalyze = () => {
    if (resumeId.trim()) {
      setErrorMsg("");
      analyzeMutation.mutate({ resumeId: resumeId.trim(), jobDescription: jobDescription.trim() });
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Resume Keyword Engine & Parsing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">Document ID (from upload):</label>
          <input 
            type="text" 
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            className="block w-full border p-2 rounded mb-2"
            placeholder="e.g., 60d21b4667d0d8992e610c85"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Job Description (Optional):</label>
          <textarea 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="block w-full border p-2 rounded mb-2 h-24"
            placeholder="Paste Job Description here to get Keyword Coverage..."
          />
        </div>
      </div>
      
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      <button 
        onClick={handleAnalyze} 
        disabled={!resumeId || analyzeMutation.isPending}
        className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 w-full"
      >
        {analyzeMutation.isPending ? "Analyzing..." : "Analyze Resume & Keywords"}
      </button>
      
      {analyzeMutation.isSuccess && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Keyword Metrics</h3>
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p><strong>Coverage:</strong> {analyzeMutation.data.data.keywordMetrics?.coverage || 0}%</p>
              <p className="mt-2 text-sm text-red-600"><strong>Missing Keywords ({analyzeMutation.data.data.keywordMetrics?.missing?.length || 0}):</strong></p>
              <p className="text-xs">{analyzeMutation.data.data.keywordMetrics?.missing?.join(", ") || "None"}</p>
              
              <p className="mt-2 text-sm text-yellow-600"><strong>Duplicate Keywords ({analyzeMutation.data.data.keywordMetrics?.duplicate?.length || 0}):</strong></p>
              <p className="text-xs">{analyzeMutation.data.data.keywordMetrics?.duplicate?.join(", ") || "None"}</p>
              
              <p className="mt-2 text-sm text-gray-600"><strong>Unused Keywords ({analyzeMutation.data.data.keywordMetrics?.unused?.length || 0}):</strong></p>
              <p className="text-xs truncate">{analyzeMutation.data.data.keywordMetrics?.unused?.slice(0, 15).join(", ")} {analyzeMutation.data.data.keywordMetrics?.unused?.length > 15 && "..."}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Parsed Structured JSON</h3>
            <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              <pre className="text-sm">
                {JSON.stringify(analyzeMutation.data.data.parsedData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
