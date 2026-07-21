import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { analyzeResume } from "./resumeService";

const ResumeAnalysis = () => {
  const [resumeId, setResumeId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const analyzeMutation = useMutation({
    mutationFn: analyzeResume,
    onError: (error) => setErrorMsg(error.message)
  });

  const handleAnalyze = () => {
    if (resumeId.trim()) {
      setErrorMsg("");
      analyzeMutation.mutate(resumeId.trim());
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Resume Parsing & Analysis</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Enter Document ID (from upload):</label>
        <input 
          type="text" 
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          className="block w-full border p-2 rounded mb-2"
          placeholder="e.g., 60d21b4667d0d8992e610c85"
        />
      </div>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      <button 
        onClick={handleAnalyze} 
        disabled={!resumeId || analyzeMutation.isPending}
        className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {analyzeMutation.isPending ? "Parsing..." : "Parse Resume"}
      </button>
      
      {analyzeMutation.isSuccess && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Parsed Structured JSON:</h3>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            <pre className="text-sm">
              {JSON.stringify(analyzeMutation.data.data.parsedData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
