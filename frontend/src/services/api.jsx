import axios from 'axios';

// Create axios instance
export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions
export const authAPI = {
  login: (credentials) => api.post('/api/users/login/', credentials),
  register: (userData) => api.post('/api/users/register/', userData),
  logout: () => api.post('/api/users/logout/'),
  getProfile: () => api.get('/api/users/profile/'),
  updateProfile: (profileData) => api.put('/api/users/profile/update/', profileData),
  changePassword: (passwordData) => api.put('/api/users/change_password/', passwordData),
};

export const healthPredictionAPI = {
  createPrediction: (predictionData) => api.post('/api/predictions/health_insurance/', predictionData),
  getPredictions: () => api.get('/api/predictions/history/'),
  getStats: () => api.get('/api/predictions/dashboard/'),
  // getPrediction: (id) => api.get(`/api/predictions/${id}/`),
  // deletePrediction: (id) => api.delete(`/api/predictions/${id}/`),
  // getStats: () => api.get('/api/predictions/stats/'),
};

export const carPredictionAPI = {
  createPrediction : (predictionData) => api.post('/api/predictions/car_prediction/', predictionData),
  getPrediction : () => api.get('/api/predictions/car_prediction/')
}

export default api; 