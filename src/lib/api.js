import axios from 'axios';

// Production
// In development: VITE_API_URL is not set, so we use '/api' which Vite proxies
// to Render (see vite.config.js server.proxy) — no CORS issue.
// In production (dist build): VITE_API_URL is baked in as the full Render URL.
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// 'Local'
// const BASE_URL = import.meta.env.VITE_API_URL || '/api';


const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, clear auth and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      if (window.location.pathname.startsWith('/dashboard')) {
        window.location.href = '/admin-login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
