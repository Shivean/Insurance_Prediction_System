import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const PredictionHistory = () => {
  const [history, setHistory] = useState([]);
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
    const fetchHistory = async () => {
      try {
        // Replace this with an actual API call
        const dummyData = [
          {
            id: 1,
            created_at: "2025-07-02",
            age: 28,
            gender: "male",
            region: "northeast",
            predicted_premium: 4500.25,
            type: "Health",
          },
          {
            id: 2,
            created_at: "2025-06-30",
            age: 34,
            gender: "female",
            region: "southwest",
            predicted_premium: 5200.75,
            type: "Health",
          },
          {
            id: 3,
            created_at: "2025-06-25",
            age: 30,
            gender: "male",
            region: "midwest",
            predicted_premium: 6100.5,
            type: "Car",
          },
        ];

        setHistory(dummyData);
      } catch (error) {
        console.error("Failed to fetch prediction history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="px-4 md:px-12 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Prediction History
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 py-8">
          Loading prediction history...
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No prediction history found.</p>
          <Link
            to="/predict"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Make a New Prediction
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Predicted Premium</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-200">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(item.created_at)}
                  </td>
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">{item.age}</td>
                  <td className="px-6 py-4 capitalize">{item.gender}</td>
                  <td className="px-6 py-4 capitalize">{item.region}</td>
                  <td className="px-6 py-4 font-medium text-green-600">
                    {formatCurrency(item.predicted_premium)}
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
