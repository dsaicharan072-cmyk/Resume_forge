const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

/**
 * Uses Vite's local /api proxy during development and the Render backend URL
 * for the separately hosted production frontend.
 */
export const apiUrl = (path) => `${configuredApiUrl || ''}${path}`;

