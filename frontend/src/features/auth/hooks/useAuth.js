import { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const data = await authService.login(credentials);
      setAuth(data.user, data.token);
      toast.success('Successfully logged in!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const data = await authService.register(userData);
      setAuth(data.user, data.token);
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to register');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  };
};
