import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardService.getStats,
  });
};

export const useDashboardMatches = () => {
  return useQuery({
    queryKey: ['dashboard', 'matches'],
    queryFn: dashboardService.getMatches,
  });
};

export const useDashboardSkills = () => {
  return useQuery({
    queryKey: ['dashboard', 'skills'],
    queryFn: dashboardService.getSkills,
  });
};

export const useDashboardActivities = () => {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: dashboardService.getActivities,
  });
};
