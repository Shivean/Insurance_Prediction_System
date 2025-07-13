import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    // What if token not found in localstorage? --> 
    // We will set loading to false and not update user state 
     
    // 
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    // console.log('Token in localStorage:', localStorage.getItem('token'));
    // console.log('Authorization header:', api.defaults.headers.common['Authorization']);
    try {
      const response = await api.get("/api/users/profile/");
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/users/login/", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;

      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/api/users/register/", userData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;

      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/users/logout/");
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Logout failed",
      };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put("/api/users/profile/update/", profileData);
      setUser({ ...user, ...response.data.user });
      return { success: true };
    } catch (error) {
      console.error("Profile update failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Profile update failed",
      };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await api.put(
        "/api/users/profile/change_password/",
        passwordData
      );
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Change password failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Change password failed",
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
