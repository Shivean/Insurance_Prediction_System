import axios from "axios";

// Create axios instance
export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API functions
export const authAPI = {
  login: (credentials) => api.post("/api/users/login/", credentials),
  register: (userData) => api.post("/api/users/register/", userData),
  logout: () => api.post("/api/logout/"),
  getProfile: () => api.get("/api/profile/"),
  updateProfile: (profileData) => api.put("/api/profile/update/", profileData),
};

export const predictionAPI = {
  createPrediction: (predictionData) =>
    api.post("/api/predictions/", predictionData),
  getPredictions: () => api.get("/api/predictions/"),
  getPrediction: (id) => api.get(`/api/predictions/${id}/`),
  deletePrediction: (id) => api.delete(`/api/predictions/${id}/`),
  getStats: () => api.get("/api/predictions/stats/"),
};

export default api;
