import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationService } from '../services/applicationService';
import toast from 'react-hot-toast';

export const useApplications = () => {
  return useQuery({
    queryKey: ['applications'],
    queryFn: applicationService.getApplications,
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: applicationService.updateApplicationStatus,
    onMutate: async ({ id, status }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['applications'] });
      const previousApps = queryClient.getQueryData(['applications']);
      
      queryClient.setQueryData(['applications'], (old) => {
        if (!old) return old;
        return old.map(app => app.id === id ? { ...app, status } : app);
      });
      
      return { previousApps };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['applications'], context.previousApps);
      toast.error('Failed to update status');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
    onSuccess: () => {
      toast.success('Status updated');
    }
  });
};

export const useAddApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: applicationService.addApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Application added successfully');
    },
    onError: () => {
      toast.error('Failed to add application');
    }
  });
};
