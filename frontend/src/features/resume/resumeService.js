export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const response = await fetch('/api/resume/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to upload resume');
  }
  return response.json();
};

export const analyzeResume = async ({ resumeId, jobDescription }) => {
  const response = await fetch('/api/resume/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeId, jobDescription }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to analyze resume');
  }
  return response.json();
};

export const rewriteBullets = async (bullets) => {
  const response = await fetch('/api/resume/rewrite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bullets }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to rewrite bullets');
  }
  return response.json();
};

export const createResumeVersion = async ({ resumeId, versionName, parsedData }) => {
  const response = await fetch('/api/resume/version', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeId, versionName, parsedData }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create resume version');
  }
  return response.json();
};

export const getResumeVersions = async (resumeId) => {
  const response = await fetch(`/api/resume/${resumeId}/versions`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch resume versions');
  }
  return response.json();
};
