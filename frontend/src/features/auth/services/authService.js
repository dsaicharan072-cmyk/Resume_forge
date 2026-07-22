import api from '../../../services/api';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || error.message || 'Login failed');
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || error.message || 'Registration failed');
    }
  }
};
