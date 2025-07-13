import React, { useEffect, useState } from "react";
import { Calendar, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { healthPredictionAPI } from "../services/api";

const PredictionHistory = () => {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await healthPredictionAPI.getPredictions();
      setPredictions(response.data || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      toast.error("Failed to load prediction history");
    } finally {
      setLoading(false);
    }
  };

  // For deleting a prediction
  const handleDelete = async (id) => {
    setDeletingId(id);
    if (window.confirm("Are you sure you want to delete this prediction?")) {
      try {
        await healthPredictionAPI.deletePrediction(id);
        setPredictions(predictions.filter((p) => p.id !== id));
        toast.success("Prediction deleted successfully");
      } catch (error) {
        console.error("Error deleting prediction:", error);
        toast.error("Failed to delete prediction");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="flex justify-center items-center h-64 mt-50">
          <div className="loading-spinner h-20 w-20"></div>
        </div>
      </div>
    );
  }

  const filteredPredictions = predictions.filter((prediction) => {
    const matchesType = !filterType || prediction.insurance_type === filterType;

    return matchesType;
  });

  return (
    <div className="px-4 md:px-12 py-3">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Prediction History
        </h1>

        {/* Filters */}
        <div className="md:w-48">
          <label className="text-gray-700 mb-5">Filter by Type </label>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="form-input bg-white mb-5 mt-1 "
          >
            <option value="">All Types</option>
            <option value="health">Health</option>
            <option value="car">Car</option>
          </select>
        </div>
      </div>
      <hr className="mb-5 border-gray-400" />
      {loading ? (
        <div className="text-center text-gray-500 py-8">
          Loading prediction history...
        </div>
      ) : filteredPredictions.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No prediction history found.</p>
          <Link
            to="/main/health_prediction"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Start by making your first prediction
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">SN</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-0 py-4">Predicted Premium</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-200">
              {filteredPredictions.map((prediction, index) => (
                <tr key={prediction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 items-center">{index + 1}</td>

                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(prediction.created_at)}
                  </td>

                  <td className="px-6 py-4">{prediction.insurance_type}</td>
                  <td className="px-6 py-4">
                    {prediction.input_data.age ||
                      prediction.input_data.driver_age}
                  </td>

                  <td className="px-0 py-4 font-medium text-green-600 ">
                    {formatCurrency(prediction.predicted_premium)}
                  </td>
                  <td className=" py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {/* <butto
                        onClick={() => setSelectedPrediction(prediction)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button> */}
                      <button
                        onClick={() => handleDelete(prediction.id)}
                        className="btn-danger flex items-center justify-center"
                        title="Delete"
                        disabled={deletingId === prediction.id}
                      >
                        {deletingId === prediction.id ? (
                          <span>Deleting...</span> 
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-3" />
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;
