import { useMutation, useQuery } from '@tanstack/react-query';

const API_BASE = '/api/career';

async function fetchCompanyMatch(payload) {
  const response = await fetch(`${API_BASE}/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch company matches');
  }

  return response.json();
}

async function fetchSkillGap(payload) {
  const response = await fetch(`${API_BASE}/skill-gap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to calculate skill gap');
  }

  return response.json();
}

async function fetchLearningRoadmap(missingSkills = '') {
  const queryParam = missingSkills ? `?missingSkills=${encodeURIComponent(missingSkills)}` : '';
  const response = await fetch(`${API_BASE}/roadmap${queryParam}`);

  if (!response.ok) {
    throw new Error('Failed to fetch learning roadmap');
  }

  return response.json();
}

export function useCompanyMatch() {
  return useMutation({
    mutationFn: fetchCompanyMatch
  });
}

export function useSkillGap() {
  return useMutation({
    mutationFn: fetchSkillGap
  });
}

export function useLearningRoadmap(missingSkills) {
  return useQuery({
    queryKey: ['learningRoadmap', missingSkills],
    queryFn: () => fetchLearningRoadmap(missingSkills)
  });
}

export const careerService = {
  fetchCompanyMatch,
  fetchSkillGap,
  fetchLearningRoadmap
};
