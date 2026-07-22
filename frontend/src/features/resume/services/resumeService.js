import api from '../../../services/api';

export const resumeService = {
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
  },

  getResumeAnalysis: async (id) => {
    const response = await api.get(`/resume/${id}/analysis`);
    return response.data.data;
  }
};
