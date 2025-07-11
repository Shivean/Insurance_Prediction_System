import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  DollarSign,
  Plus,
  BarChart3,
  Calendar,
  User
} from 'lucide-react';
// import toast from 'react-hot-toast';

const Dashboard = () => {

  // const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  return (

    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {/* Welcome back, {user?.first_name || user?.username || 'User'}! */}
          Welcome back, User!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your insurance predictions and insights.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/predict"
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

      {/* Statistics Cards */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="stat-label">Total Predictions</p>
              <h3 className="stat-value">0</h3>
              {/* <p className="stat-value">{stats?.total_predictions || 0}</p> */}
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
              <h3 className="stat-value">July 2, 2025</h3>
              {/* <p className="stat-value">${stats?.total_premiums || 0}</p> */}

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
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
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
                        {/* {formatDate(prediction.created_at)} */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {prediction.age} years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {prediction.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {prediction.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {/* {formatCurrency(prediction.predicted_premium)} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {recentPredictions.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              to="/history"
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

const StatCard = ({ icon, label, value }) => (
  <div className="bg-gray-800 text-white rounded p-4 shadow flex-1 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-300">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
    <div className="text-orange-400">{icon}</div>
  </div>
);

export default Dashboard;
