import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./assets/MainLayout";
import Dashboard from "./pages/Dashboard";
import HealthInsurancePrediction from "./pages/HealthInsurancePrediction";
import CarInsurancePrediction from "./pages/CarInsurancePrediction";
import ScrollToTop from "./ScrollToTop";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";
import { LogIn } from "lucide-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main layout wraps all child pages */}
        {/* <Route index element={<Login />} /> */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/health-prediction"
            element={<HealthInsurancePrediction />}
          />
          <Route path="/car_insurance" element={<CarInsurancePrediction />} />
          <Route path="/profile-page" element={<ProfilePage />} />
        </Route>

        {/* Route that bypasses MainLayout */}
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
