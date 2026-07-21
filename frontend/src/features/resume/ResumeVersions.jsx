import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getResumeVersions, createResumeVersion } from "./resumeService";

const ResumeVersions = () => {
  const [resumeId, setResumeId] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const [versionName, setVersionName] = useState("Backend Resume");
  
  const queryClient = useQueryClient();

  const { data: versionsData, isLoading, isError, error } = useQuery({
    queryKey: ['resumeVersions', submittedId],
    queryFn: () => getResumeVersions(submittedId),
    enabled: !!submittedId,
  });

  const createVersionMutation = useMutation({
    mutationFn: createResumeVersion,
    onSuccess: () => {
      queryClient.invalidateQueries(['resumeVersions', submittedId]);
    }
  });

  const handleFetch = () => {
    if (resumeId.trim()) setSubmittedId(resumeId.trim());
  };

  const handleCreateVersion = () => {
    // In a real app, this parsedData comes from editing the actual analysis JSON.
    // We mock the payload structure here for the demonstration.
    const mockParsedData = {
      skills: ["Mock Skill"],
      experience: ["Mock Experience modified for " + versionName]
    };
    
    createVersionMutation.mutate({
      resumeId: submittedId,
      versionName: versionName,
      parsedData: mockParsedData
    });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Resume Versions</h2>
      
      <div className="flex gap-4 mb-8">
        <input 
          type="text" 
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          className="flex-grow border p-2 rounded"
          placeholder="Enter Original Document ID..."
        />
        <button 
          onClick={handleFetch} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition-colors"
        >
          Load Versions
        </button>
      </div>

      {submittedId && (
        <div className="mb-8 p-4 bg-gray-50 border rounded-lg flex items-end gap-4">
          <div className="flex-grow">
            <label className="block mb-2 font-medium">Create New Version</label>
            <select 
              value={versionName} 
              onChange={(e) => setVersionName(e.target.value)}
              className="w-full border p-2 rounded bg-white"
            >
              <option value="Backend Resume">Backend Resume</option>
              <option value="Frontend Resume">Frontend Resume</option>
              <option value="AI Resume">AI Resume</option>
              <option value="Full Stack Resume">Full Stack Resume</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <button 
            onClick={handleCreateVersion}
            disabled={createVersionMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold disabled:opacity-50 h-10"
          >
            {createVersionMutation.isPending ? "Saving..." : "Save Snapshot"}
          </button>
        </div>
      )}

      {isLoading && <p>Loading versions...</p>}
      {isError && <p className="text-red-500">{error.message}</p>}
      
      {versionsData && versionsData.data && (
        <div>
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Version History ({versionsData.data.length})</h3>
          {versionsData.data.length === 0 ? (
            <p className="text-gray-500">No versions created yet.</p>
          ) : (
            <div className="space-y-4">
              {versionsData.data.map(version => (
                <div key={version._id} className="border p-4 rounded hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg text-indigo-700">{version.versionName}</h4>
                    <span className="text-xs text-gray-500">{new Date(version.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Version ID: {version._id}</p>
                  <details className="mt-2 text-sm text-gray-800">
                    <summary className="cursor-pointer font-semibold text-blue-600 hover:underline">View Snapshot JSON</summary>
                    <pre className="mt-2 bg-gray-100 p-3 rounded overflow-auto max-h-40">
                      {JSON.stringify(version.parsedData, null, 2)}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeVersions;