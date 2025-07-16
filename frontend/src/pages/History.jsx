import React, { useEffect, useState } from "react";
import { Calendar, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { healthPredictionAPI } from "../services/api";

const PredictionHistory = () => {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPredictions();
  }, []);

  // Fetch predictions from the API
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

  // Filter predictions based on selected type
  const filteredPredictions = predictions.filter((prediction) => {
    const matchesType = !filterType || prediction.insurance_type === filterType;

    return matchesType;
  });

  return (
    <div className="px-4 md:px-12 py-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Prediction History
        </h1>

        {/* Filters */}
        <div className="w-full md:w-60">
          <label className="block text-gray-700 mb-1">Filter by Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="form-input w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Types</option>
            <option value="health">Health</option>
            <option value="car">Car</option>
          </select>
        </div>
      </div>

      <hr className="mb-5 border-gray-400" />

      {/* Modal for choosing prediction type; appears when 'Start by making your first prediction' button clicked */}
      {/* That button appears when there is no prediction history/data */}
      {showModal && (
        <div className="fixed inset-0 bg bg-opacity-20 flex justify-center items-center backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Choose prediction type
            </h3>
            <p className="text-gray-600 mb-4">
              Select the type of insurance you'd like to predict.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/main/health_prediction");
                }}
                className="px-4 py-2 bg-[#325259] rounded text-white hover:bg-rose-600"
              >
                Health Insurance
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/main/car_prediction");
                }}
                className="px-4 py-2 bg-[#325259] text-white rounded hover:bg-rose-600"
              >
                Car Insurance
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-600 text-sm font-medium mt-2 transition-colors duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prediction History Table */}
      {filteredPredictions.length === 0 ? ( // If no predictions found, shows a message and a button to start a new prediction
        <div className="text-center py-10 text-gray-500">
          <p>No prediction history found.</p>
          <Link
            onClick={() => setShowModal(true)}
            className="mt-4 inline-block bg-[#3490b1] text-white px-6 py-3 rounded-md hover:bg-[#05343e] transition"
          >
            Start by making your first prediction
          </Link>
        </div>
      ) : (
        // If predictions are found, shows the table with predictions
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
                      {/* <button
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
