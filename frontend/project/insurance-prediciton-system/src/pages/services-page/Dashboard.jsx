import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  DollarSign,
  Plus,
  BarChart3,
  Calendar,
  User,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with actual API calls
        const dummyStats = {
          total_predictions: 5,
          last_prediction: "2025-07-02",
        };

        const dummyPredictions = [
          {
            id: 1,
            created_at: "2025-07-02",
            age: 28,
            gender: "male",
            region: "northeast",
            predicted_premium: 4500.25,
          },
          {
            id: 2,
            created_at: "2025-06-30",
            age: 34,
            gender: "female",
            region: "southwest",
            predicted_premium: 5200.75,
          },
        ];

        setStats(dummyStats);
        setRecentPredictions(dummyPredictions);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container px-4 md:px-8">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, User!
        </h1>
        <p className="text-gray-600 text-xl">
          Here's an overview of your insurance predictions and insights.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/predict"
            className="flex items-center space-x-2 bg-gradient-to-r from-[#3a8dad] to-[#78c6ff] text-white px-6 py-3 rounded-lg hover:from-[#327c94] hover:to-[#5fb9ff] transition-all duration-200 shadow-lg"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-white rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Predictions</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats?.total_predictions ?? 0}
            </h3>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Last Prediction</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats?.last_prediction
                ? formatDate(stats.last_prediction)
                : "N/A"}
            </h3>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Recent Predictions */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Predictions
          </h3>
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
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPredictions.map((prediction) => (
                    <tr key={prediction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          {formatDate(prediction.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {prediction.age} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 capitalize">
                        {prediction.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 capitalize">
                        {prediction.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                        {formatCurrency(prediction.predicted_premium)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/history"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Predictions →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
