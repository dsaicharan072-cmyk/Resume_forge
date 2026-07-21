import React, { useState } from "react";

const ResumeExport = () => {
  const [id, setId] = useState("");
  const [idType, setIdType] = useState("analysis");
  const [format, setFormat] = useState("pdf");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleExport = async () => {
    if (!id.trim()) {
      setErrorMsg("Please enter a valid ID.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/resume/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id.trim(), type: idType, format })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to export document');
      }

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_export.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Export Resume</h2>
      
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Enter Document ID:</label>
        <input 
          type="text" 
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full border p-3 rounded shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          placeholder="e.g., 60d21b4667d..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">ID Type:</label>
          <select 
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className="w-full border p-3 rounded bg-white shadow-sm"
          >
            <option value="analysis">Original Resume ID</option>
            <option value="version">Version Snapshot ID</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Export Format:</label>
          <select 
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full border p-3 rounded bg-white shadow-sm"
          >
            <option value="pdf">PDF (.pdf)</option>
            <option value="docx">Word Document (.docx)</option>
          </select>
        </div>
      </div>

      {errorMsg && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded text-sm font-medium">{errorMsg}</p>}
      
      <button 
        onClick={handleExport}
        disabled={isLoading || !id.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded shadow-md disabled:opacity-50 transition"
      >
        {isLoading ? "Generating Document..." : `Download ${format.toUpperCase()}`}
      </button>
    </div>
  );
};

export default ResumeExport;