import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
});

export const getToken = (): string | null => sessionStorage.getItem('token');

export const clearToken = (): void => sessionStorage.removeItem('token');

export const setAuthToken = (token: string | null): void => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    sessionStorage.setItem('token', token);
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    clearToken();
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      setAuthToken(null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
