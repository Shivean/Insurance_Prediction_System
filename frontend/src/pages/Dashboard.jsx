import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { healthPredictionAPI } from '../services/api';
import {
  Calculator,
  Plus,
  BarChart3,
  Calendar,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchDashboardData();
    }
  }, [authLoading, isAuthenticated]);

   const fetchDashboardData = async () => {
    try {
      const [statsResponse, predictionsResponse] = await Promise.all([
        healthPredictionAPI.getStats(),
        healthPredictionAPI.getPredictions()
      ]);

      setStats(statsResponse.data);
      setRecentPredictions(predictionsResponse.data?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (!isAuthenticated) {
    return <div className="flex justify-center items-center h-screen">You must be logged in to view this page.</div>;
  }

  return (

    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.first_name || user?.username || 'User'}!
          {/* Welcome back, User! */}
        </h1>
        <p className="text-gray-600">
          Here's an overview of your insurance predictions and insights.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <Link
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>New Prediction</span>
          </Link>
          <Link
            to="/history"
            className="flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-md border border-gray-200"
          >
            <BarChart3 className="w-5 h-5" />
            <span>View History</span>
          </Link>
        </div>
      </div>

            {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-[#37474F] to-[#263238] text-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-3 font-[Open_Sans]">
              Choose Prediction Type
            </h2>
            <p className="text-gray-300 mb-6 font-[Open_Sans] text-sm">
              Select the type of insurance you'd like to predict.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/services-page/health-prediction");
                }}
                className="bg-[#3a8dad] hover:bg-[#327c94] text-white font-medium px-4 py-2 cursor-pointer rounded-full transition-colors duration-300 ease-in-out"
              >
                Health Insurance
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/services-page/car-insurance");
                }}
                className="bg-[#B36F5C] hover:bg-[#9e5a48] text-white font-medium px-4 py-2 cursor-pointer rounded-full transition-colors duration-300 ease-in-out"
              >
                Car Insurance
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-400 text-sm font-medium mt-2 transition-colors duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label">Total Predictions</p>
              {/* <h3 className="stat-value">0</h3> */}
              <p className="stat-value">{stats?.total_predictions || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Last prediction Date */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label">Last Prediction</p>
              {/* <h3 className="stat-value">July 2, 2025</h3> */}
              <p className="stat-value">{stats?.last_prediction_date || 'NA'}</p>

            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div> 
        </div>

    

      </div>

      {/* Recent Predictions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Predictions</h3>
        </div>

        {recentPredictions.length === 0 ? (
          <div className="text-center py-8">
            <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No predictions yet</p>
            <Link
              to="/predict"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Make Your First Prediction</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">
              <thead className="bg-gray-50">

                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Insurance Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Premium
                  </th>
                </tr>

              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

                {recentPredictions.map((prediction) => (
                  <tr key={prediction.id} className="hover:bg-gray-50">

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {formatDate(prediction?.created_at)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {prediction.insurance_type} 
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {prediction?.input_data?.age || prediction?.input_data?.driver_age} years
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {formatCurrency(prediction?.predicted_premium)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {recentPredictions?.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              to="/main/history"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Predictions →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
