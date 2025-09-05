"use client";

import { useState } from "react";
import { Eye, Plus } from "lucide-react";

export default function OrderPage() {
  // ✅ Dummy Data
  const [orders, setOrders] = useState([
    { _id: "1", customerName: "Rakibul Islam", amount: 250, status: "pending", createdAt: "2025-09-05" },
    { _id: "2", customerName: "Anas Ahmed", amount: 500, status: "confirm", createdAt: "2025-09-04" },
    { _id: "3", customerName: "John Doe", amount: 120, status: "inactive", createdAt: "2025-09-03" },
  ]);

  const [showView, setShowView] = useState(null);
  const [createOrderModalOpen, setCreateOrderModalOpen] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📦 All Orders</h1>
          <button
            onClick={() => setCreateOrderModalOpen(true)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-all duration-200"
          >
            <Plus className="w-5 h-5" /> Add Order
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">#</th>
                <th className="px-6 py-3 text-left font-semibold">Customer</th>
                <th className="px-6 py-3 text-left font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((order, i) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{i + 1}</td>
                  <td className="px-6 py-4 font-medium">{order.customerName}</td>
                  <td className="px-6 py-4 font-medium">${order.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "confirm"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm shadow-sm hover:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                    >
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="confirm">Confirm</option>
                    </select>

                    <button
                      onClick={() => setShowView(order)}
                      className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-md p-2 shadow transition"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    🚫 No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Order Details Modal */}
      {showView && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
            <p><strong>Customer:</strong> {showView.customerName}</p>
            <p><strong>Amount:</strong> ${showView.amount}</p>
            <p><strong>Status:</strong> {showView.status}</p>
            <p><strong>Date:</strong> {showView.createdAt}</p>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowView(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
