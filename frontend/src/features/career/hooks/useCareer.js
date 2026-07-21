import { useQuery } from '@tanstack/react-query';
import { careerService } from '../services/careerService';

export const useCompanyMatches = () => useQuery({ queryKey: ['career', 'matches'], queryFn: careerService.getCompanyMatches });
export const useSkillGaps = () => useQuery({ queryKey: ['career', 'skills'], queryFn: careerService.getSkillGaps });
export const useLearningRoadmap = () => useQuery({ queryKey: ['career', 'roadmap'], queryFn: careerService.getLearningRoadmap });
export const useProjects = () => useQuery({ queryKey: ['career', 'projects'], queryFn: careerService.getProjects });
export const useInterviews = () => useQuery({ queryKey: ['career', 'interviews'], queryFn: careerService.getInterviews });
export const useLiveJobs = () => useQuery({ queryKey: ['career', 'jobs'], queryFn: careerService.getLiveJobs });
