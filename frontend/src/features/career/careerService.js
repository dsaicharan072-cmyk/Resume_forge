import { useMutation, useQuery } from '@tanstack/react-query';
import { apiUrl } from '../../services/apiUrl';

const API_BASE = apiUrl('/api/career');

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

async function fetchInterviewPrep(payload) {
  const response = await fetch(`${API_BASE}/interview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to generate interview prep');
  }

  return response.json();
}

async function fetchLiveJobs(minMatchScore = 70, skills = []) {
  const query = new URLSearchParams({ minMatchScore: String(minMatchScore) });
  if (skills.length) query.set('skills', skills.join(','));
  const response = await fetch(`${API_BASE}/jobs?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch live job feed');
  }

  return response.json();
}

async function fetchApplications() {
  const response = await fetch(`${API_BASE}/applications`);

  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }

  return response.json();
}

async function createApplication(payload) {
  const response = await fetch(`${API_BASE}/application`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to create application');
  }

  return response.json();
}

async function fetchRecruiterEvaluation(payload) {
  const response = await fetch(`${API_BASE}/recruiter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to evaluate via AI Recruiter');
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

export function useInterviewPrep() {
  return useMutation({
    mutationFn: fetchInterviewPrep
  });
}

export function useLiveJobs(minMatchScore, skills = []) {
  return useQuery({
    queryKey: ['liveJobs', minMatchScore, skills],
    queryFn: () => fetchLiveJobs(minMatchScore, skills)
  });
}

export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications
  });
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: createApplication
  });
}

export function useRecruiter() {
  return useMutation({
    mutationFn: fetchRecruiterEvaluation
  });
}

export const careerService = {
  fetchCompanyMatch,
  fetchSkillGap,
  fetchLearningRoadmap,
  fetchInterviewPrep,
  fetchLiveJobs,
  fetchApplications,
  createApplication,
  fetchRecruiterEvaluation
};
