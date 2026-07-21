import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadResume } from "./resumeService";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const uploadMutation = useMutation({
    mutationFn: uploadResume,
    onSuccess: (data) => {
      console.log("Upload successful:", data);
    },
    onError: (error) => {
      setErrorMsg(error.message);
    }
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMsg("File size must be less than 5MB");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setErrorMsg("");
    }
  };

  const handleUpload = () => {
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <div className="resume-upload-container p-6 bg-white rounded shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select PDF or DOCX (Max 5MB)</label>
        <input 
          type="file" 
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          onChange={handleFileChange} 
          className="block w-full border p-2 rounded"
        />
      </div>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      <button 
        onClick={handleUpload} 
        disabled={!file || uploadMutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploadMutation.isPending ? "Uploading..." : "Upload Resume"}
      </button>
      
      {uploadMutation.isSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded border border-green-300">
          Resume uploaded successfully! Document ID: {uploadMutation.data.data._id}
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
