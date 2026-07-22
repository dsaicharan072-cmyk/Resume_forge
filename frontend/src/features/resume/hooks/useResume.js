import { useMutation, useQuery } from '@tanstack/react-query';
import { resumeService } from '../services/resumeService';
import toast from 'react-hot-toast';

export const useUploadResume = () => {
  return useMutation({
    mutationFn: resumeService.uploadResume,
    onSuccess: () => {
      toast.success('Resume uploaded. Preparing your analysis…');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error.message || 'Failed to upload resume');
    }
  });
};

export const useResumeAnalysis = (id) => {
  return useQuery({
    queryKey: ['resume', id],
    queryFn: () => resumeService.getResumeAnalysis(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};
