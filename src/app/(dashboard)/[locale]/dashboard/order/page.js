"use client";

import { useState } from "react";
import { Eye, Plus, Star } from "lucide-react";


import { useBookingContext } from "@/context/bookingContext";
import useAxiosPost from "@/utils/useAxiosPost";
import { toast } from "react-toastify";
import { useUserContext } from "@/context/userContext";

export default function OrderPage() {
  const { setReload, booking } = useBookingContext();
  const {user}=useUserContext()
  const [showView, setShowView] = useState(null);
  const [showReview, setShowReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [, updatebooking] = useAxiosPost({}, "patch");

  const handleStatusChange = (id, newStatus) => {
    updatebooking(
      `http://localhost:3000/api/v1/booking/${id}`,
      { bookingStatus: newStatus },
      (res) => {
        if (res?.status === "success") {
          setReload((prev) => !prev);
        } else {
          toast.error("Failed to update booking status");
        }
      },
      true
    );
  };

  const handleSubmitReview = async () => {
    if (!rating || !comment.trim()) {
      toast.error("Please provide a rating and comment");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/reviews/${showReview.tour._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ rating, comment ,userId:user?._id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Review added successfully!");
        setShowReview(null);
        setRating(0);
        setComment("");
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  console.log("user",user)
  return (
    <div className="min-h-screen bg-neutral-100 text-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📦 All Orders</h1>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">#</th>
                <th className="px-6 py-3 text-left font-semibold">Customer</th>
                <th className="px-6 py-3 text-left font-semibold">Number of People</th>
                <th className="px-6 py-3 text-left font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Payment Status</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {booking?.data?.map((order, i) => (
                <tr key={order?._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{i + 1}</td>
                  <td className="px-6 py-4 font-medium">{order.user?.firstName}</td>
                  <td className="px-6 py-4 font-medium">{order?.numberOfPeople}</td>
                  <td className="px-6 py-4 font-medium">${order?.totalPrice}</td>
                  <td className="px-6 py-4 font-medium">{order?.paymentStatus}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order?.bookingStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order?.bookingStatus === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {order?.bookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm shadow-sm hover:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                    >
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                    </select>

                    <button
                      onClick={() => setShowView(order)}
                      className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-md p-2 shadow transition"
                    >
                      <Eye size={18} />
                    </button>

                    {/* ✅ Add Review Button only if confirmed */}
                    {order.bookingStatus === "confirmed" && (
                      <button
                        onClick={() => setShowReview(order)}
                        className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2 shadow transition"
                      >
                        <Plus size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {booking?.data?.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
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
            <p><strong>Customer:</strong> {showView.user?.firstName}</p>
            <p><strong>Amount:</strong> ${showView.totalPrice}</p>
            <p><strong>Status:</strong> {showView.bookingStatus}</p>
            <p><strong>Date:</strong> {new Date(showView.createdAt).toLocaleString()}</p>

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

      {/* ✅ Review Modal */}
      {showReview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Review</h2>

            {/* Rating Stars */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer ${
                    rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Comment */}
            <textarea
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              rows={4}
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowReview(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={loading}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
