import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import MainLayout from "./assets/MainLayout";
import Dashboard from "./pages/Dashboard";
import HealthInsurancePrediction from "./pages/HealthInsurancePrediction";
import CarInsurancePrediction from "./pages/CarInsurancePrediction";
import ScrollToTop from "./ScrollToTop";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import History from "./pages/History";
import "./App.css";
import "./index.css";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="loading-spinner h-20 w-20"></div>
        <p className="font-xl mt-5">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route index element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<MainLayout />}>
              {/* index route under /main */}
              <Route index element={<Dashboard />} />
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
              <Route
                path="health_prediction"
                element={<HealthInsurancePrediction />}
              />
              <Route
                path="car_prediction"
                element={<CarInsurancePrediction />}
              />
              <Route path="profile" element={<ProfilePage />} />

              <Route path="history" element={<History />} />
            </Route>
          </Route>
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
