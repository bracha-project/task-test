import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const storedAuth = sessionStorage.getItem('auth');

  if (storedAuth) {
    try {
      const auth = JSON.parse(storedAuth);

      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    } catch {
      sessionStorage.removeItem('auth');
    }
  }

  return config;
});

export default apiClient;