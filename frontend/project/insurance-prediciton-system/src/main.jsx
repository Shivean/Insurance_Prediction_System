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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main layout wraps all child pages */}
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

        {/* Route that bypasses MainLayout */}
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
