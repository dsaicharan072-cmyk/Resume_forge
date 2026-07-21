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
