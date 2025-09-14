// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  SIMPLIFY_TEXT: `${API_BASE_URL}/api/simplify-text`,
  EXTRACT_CLAUSES: `${API_BASE_URL}/api/extract-clauses`,
};

export default API_ENDPOINTS;
