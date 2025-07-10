import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./assets/MainLayout";
import Dashboard from "./Dashboard";
import HealthInsurancePrediction from "./HealthInsurancePrediction";
import CarInsurancePrediction from "./CarInsurancePrediction";
import ScrollToTop from "./ScrollToTop";
import ProfilePage from "./ProfilePage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main layout wraps all child pages */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="health-prediction"
            element={<HealthInsurancePrediction />}
          />
          <Route path="/car-insurance" element={<CarInsurancePrediction />} />
          <Route path="/profile-page" element={<ProfilePage />} />
        </Route>

        {/* Route that bypasses MainLayout */}
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
