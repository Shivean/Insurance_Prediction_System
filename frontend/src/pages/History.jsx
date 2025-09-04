import React, { useEffect, useState } from "react";
import { Calendar, Trash2, Eye, Info, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { healthPredictionAPI } from "../services/api";
import { Tooltip as ReactTooltip } from "react-tooltip";

const PredictionHistory = () => {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

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
        setShowDetailModal(false);
      }
    } else {
      setDeletingId(null);
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
            className="form-input bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" className="">All Types</option>
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
          <div className="modal-bg p-6 border border-gray-200 rounded-lg shadow-lg w-96">
            <h3 className="text-lg text-gray-800 font-semibold mb-4">
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
                className="btn-primary"
              >
                Health Insurance
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/main/car_prediction");
                }}
                className="btn-primary"
              >
                Car Insurance
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn-danger"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prediction History Table */}
      {filteredPredictions.length === 0 ? ( // If no predictions found, shows a message and a button to start a new prediction
        <div className="text-center py-10 space-y-6 text-gray-500">
          <p>No prediction history found.</p>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            Start by making your first prediction
          </button>
        </div>
      ) : (
        // If predictions are found, shows the table with predictions
        <div className="shadow overflow-hidden rounded-xl">
          <table className="w-full text-sm text-center">
            <thead className="table-header uppercase text-xs tracking-wider">
              <tr>
                <th className="px-8 py-4">SN</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4">Age</th>
                <th className="px-8 py-4 whitespace-nowrap">Predicted Premium</th>
                <th className="px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-center">
              {filteredPredictions.map((prediction, index) => (
                <tr key={prediction.id}>
                  <td className="px-8 py-4 items-center ">{index + 1}</td>

                  <td className="px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(prediction.created_at)}
                    </div>
                  </td>

                  <td className="px-8 py-4">{prediction.insurance_type}</td>

                  <td className="px-8 py-4">
                    {prediction.input_data.age ||
                      prediction.input_data.driver_age}
                  </td>

                  <td className="px-8 py-4 font-medium text-green-600 ">
                    {formatCurrency(prediction.predicted_premium)}
                  </td>

                  <td className="px-8 py-4 whitespace-nowrap text-sm ">
                    <div className="flex gap-5 justify-between">
                      <button
                        // onClick={() => showPredictionDetail(prediction.id)}
                        onClick={() => {
                          setSelectedPrediction(prediction);
                          setShowDetailModal(true);
                        }}
                        className="btn-primary w-full flex items-center justify-center"
                        // title="View Details"
                      >
                        <Eye className="w-4 h-4 mr-3" />
                        <span>Detail</span>
                      </button>

                      <button
                        onClick={() => handleDelete(prediction.id)}
                        className="btn-danger w-full flex items-center justify-center"
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

      {/* Displays the details using modal */}
      {showDetailModal && selectedPrediction && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md">
          <div className="modal-bg p-6 rounded-lg shadow-lg w-96 border border-gray-300">
            <div className="flex items-center mb-5 justify-between">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold mr-2 items-center">
                  Prediction Details
                </h3>
                <Info
                  className="size-5 opacity-50"
                  data-tooltip-id="my-tooltip-1"
                />

                <ReactTooltip
                  id="my-tooltip-1"
                  place="right-end"
                  variant="info"
                  style={{
                    minWidth: "200px",
                    width: "20vw",
                    height: "auto",
                    textAlign: "justify",
                  }}
                  content="This prediction is based on machine learning algorithms and
                historical data. The actual premium may vary based on additional
                factors and insurance provider policies. This is for
                informational & educational purposes only and should not be considered as a
                final quote."
                />
              </div>

              <X
                className="size-6 opacity-60 hover:opacity-100 cursor-pointer"
                onClick={() => setShowDetailModal(false)}
              />
            </div>

            {selectedPrediction.insurance_type === "health" ? (
              <div className="rounded overflow-hidden border-2 border-gray-200">
                <table className="border border-gray-200 min-w-full rounded-lg">
                  <tbody>
                    <tr>
                      <td className="p-2 border border-gray-200">Age</td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.age} years
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">Height</td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.height} cm
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">Weight</td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.weight} kg
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">
                        Has Diabetes
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.has_diabetes
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">
                        Any Allergies
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.any_allergies
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">
                        Any Body Transplant
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.any_bodytransplant
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">
                        Has Pressure Issue
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.has_pressure_issue
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">
                        Any Chronic Disease
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.any_chronic_disease
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">
                        No. of Major Surgery
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.no_of_major_surgery}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 border border-gray-200">
                        Family History of Cancer
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data
                          .history_of_cancer_in_family
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 font-semibold border border-gray-200">
                        Total Prediction
                      </td>
                      <td className="p-2 border border-gray-200">
                        $ {selectedPrediction.predicted_premium}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded overflow-hidden border-2 border-gray-200">
                <table className="border border-gray-200 rounded-lg min-w-full">
                  <thead>
                    <tr>
                      <td className="p-2  border border-gray-200">
                        Driver's Age
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.driver_age} years
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2  border border-gray-200">
                        Car Manufacturing Year
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.car_mfg_year} AD
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2  border border-gray-200">
                        Previous Accidents
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.prv_accident}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2  border border-gray-200">
                        Annual Mileage
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.annual_mileage * 1000} km
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2  border border-gray-200">
                        Driving Experience
                      </td>
                      <td className="p-2 border border-gray-200">
                        {selectedPrediction.input_data.driving_experience} years
                      </td>
                    </tr>

                    <tr>
                      <td className="p-2 font-semibold border border-gray-200">
                        Predicted Premium
                      </td>
                      <td className="p-2 border border-gray-200">
                        $ {selectedPrediction.predicted_premium}
                      </td>
                    </tr>
                  </thead>
                </table>
              </div>
            )}

            <div className="text-right">
              <button
                onClick={() => handleDelete(selectedPrediction.id)}
                className="bg-white rounded-lg py-2 px-4 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
              >
                {deletingId === selectedPrediction.id ? (
                  <span>Deleting...</span>
                ) : (
                  <span>Delete</span>
                )}
              </button>

              <button
                onClick={() => setShowDetailModal(false)}
                className="btn-primary text-gray-400 text-sm ml-2 mt-2 "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;
