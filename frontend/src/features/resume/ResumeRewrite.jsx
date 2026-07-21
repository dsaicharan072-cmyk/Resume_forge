import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rewriteBullets } from "./resumeService";

const ResumeRewrite = () => {
  const [inputText, setInputText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const rewriteMutation = useMutation({
    mutationFn: rewriteBullets,
    onError: (error) => setErrorMsg(error.message)
  });

  const handleRewrite = () => {
    if (!inputText.trim()) return;
    setErrorMsg("");
    const bullets = inputText.split('\n').filter(b => b.trim().length > 0);
    rewriteMutation.mutate(bullets);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">AI Bullet Rewrite & Weak Verb Detection</h2>
      
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Paste your Resume Bullets (one per line):</label>
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full border p-4 rounded h-40 font-mono text-sm shadow-sm"
          placeholder="- Worked on the frontend using React...&#10;- Helped the team improve performance...&#10;- Responsible for database management..."
        />
      </div>
      
      {errorMsg && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded">{errorMsg}</p>}
      
      <button 
        onClick={handleRewrite} 
        disabled={!inputText.trim() || rewriteMutation.isPending}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded disabled:opacity-50 transition w-full"
      >
        {rewriteMutation.isPending ? "Analyzing & Rewriting..." : "Detect Weak Verbs & Rewrite via AI"}
      </button>
      
      {rewriteMutation.isSuccess && rewriteMutation.data?.data && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-8">
          
          <div className="bg-orange-50 border border-orange-200 p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center">
              <span className="mr-2">⚠️</span> Weak Verbs Detected
            </h3>
            {rewriteMutation.data.data.weakBulletsDetected?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
                {rewriteMutation.data.data.weakBulletsDetected.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-700 font-medium">No weak verbs detected. Great job!</p>
            )}
          </div>

          <div className="bg-green-50 border border-green-200 p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
              <span className="mr-2">✨</span> AI Rewritten Suggestions
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
              {rewriteMutation.data.data.rewritten?.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default ResumeRewrite;