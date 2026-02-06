import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
if (import.meta.env.VITE_API_URL && !API_URL.endsWith('/api')) {
  API_URL += '/api';
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('admin_refresh_token');
        if (refreshToken) {
           const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
             refresh: refreshToken,
           });
           const { access } = response.data;
           localStorage.setItem('admin_access_token', access);
           originalRequest.headers.Authorization = `Bearer ${access}`;
           return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, logout user (clear storage)
        localStorage.removeItem('admin_access_token');
        localStorage.removeItem('admin_refresh_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
