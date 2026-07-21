import api from '../../../services/api';

export const authService = {
  login: async (credentials) => {
    // Mock implementation for UI development
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          resolve({ user: { id: 1, name: 'Test User', email: credentials.email }, token: 'mock-token-123' });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },
  
  register: async (userData) => {
    // Mock implementation for UI development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: { id: 1, name: userData.name, email: userData.email }, token: 'mock-token-123' });
      }, 1000);
    });
  }
};
