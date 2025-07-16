import axios from 'axios';

// This handles API requests to the backend server.
export const api = axios.create({
  baseURL: 'https://ips-backend-vu6z.onrender.com', // This is where backend is hosted
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
api.interceptors.response.use(
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
  deletePrediction: (id) => api.delete(`/api/predictions/delete/${id}/`),
};

export const carPredictionAPI = {
  createPrediction : (predictionData) => api.post('/api/predictions/car_insurance/', predictionData),
}

export default api; 