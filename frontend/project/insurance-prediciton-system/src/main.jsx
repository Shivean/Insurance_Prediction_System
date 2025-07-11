import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/services-page/Dashboard";
import HealthInsurancePrediction from "./pages/services-page/HealthInsurancePrediction";
import CarInsurancePrediction from "./pages/services-page/CarInsurancePrediction";
import ScrollToTop from "./ScrollToTop";
import ProfilePage from "./pages/services-page/ProfilePage";
import "./index.css";
import ServicesPage from "./pages/ServicesPage";
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Login from "./pages/Login";
import RegisterForm from "./pages/RegisterForm";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main layout wraps all child pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services-page" element={<ServicesPage />}>
            {/* Redirect base /services-page to /services-page/dashboard */}
            <Route path="" element={<Navigate to="dashboard" replace />} />

            {/* Explicit path for Dashboard */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="health-prediction"
              element={<HealthInsurancePrediction />}
            />
            <Route path="car-insurance" element={<CarInsurancePrediction />} />
            <Route path="profile-page" element={<ProfilePage />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Route that bypasses MainLayout */}
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
