import { useMutation, useQuery } from '@tanstack/react-query';

// API Base URL helper
const API_BASE = '/api/career';

/**
 * Fetch company matches using mock/fetch wrapper (Never call Axios directly rule per guidelines if required, or native fetch)
 */
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

export function useCompanyMatch() {
  return useMutation({
    mutationFn: fetchCompanyMatch
  });
}

export const careerService = {
  fetchCompanyMatch
};
