import React from "react";
import { FaPlus, FaHistory, FaClock, FaCalculator } from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
      <h2 className="text-6xl mb-4 font-[Open_Sans]">Welcome back, Swarup!</h2>

      <div className="flex gap-4 mb-6 py-4">
        <button className="flex items-center gap-2 bg-[#325259] text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition-colors duration-300 ease-in-out cursor-pointer">
          <FaPlus /> New Prediction
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded shadow bg-white hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer">
          <FaHistory /> View History
        </button>
      </div>
      <hr className="py-4" />
      <div className="flex gap-6 mb-6">
        <StatCard
          icon={<FaCalculator className="text-amber-600" size={30} />}
          label="Total Prediction"
          value="12"
        />
        <StatCard
          icon={<FaClock className="text-green-500" size={30} />}
          label="Last Prediction"
          value="July 8, 2025"
        />
      </div>
      <div className="bg-gray-100 p-6 rounded shadow">
        <h2 className="text-gray-700 font-semibold mb-4">Recent Predictions</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left text-sm">
                <th className="px-4 py-2">S.N.</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder row for empty state */}
              <tr className="text-center text-gray-500">
                <td colSpan="5" className="px-4 py-8">
                  <FaCalculator className="mx-auto mb-2 text-xl" />
                  No predictions yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-gray-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 mx-auto hover:bg-gray-800">
            <FaPlus /> Make Your First Prediction
          </button>
        </div>
      </div>
    </>
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
