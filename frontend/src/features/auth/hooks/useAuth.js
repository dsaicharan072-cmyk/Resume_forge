import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '../../../store/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Assuming response format: { data: { user, token } } or similar based on backend responseFormatter
      // The backend returns { status: 'success', data: { user, token } } per standard patterns
      const { user, token } = data.data || data;
      setAuth(user, token);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    }
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      const { user, token } = data.data || data;
      setAuth(user, token);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
    }
  });
};

export const useLogout = () => {
  const logoutState = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logoutState();
      toast.success('Successfully logged out!');
      navigate('/login');
    },
    onError: () => {
      // Even if API fails, clear local state
      logoutState();
      navigate('/login');
    }
  });
};
