import React, { useEffect, useState } from "react";
import { getProviderBookings, confirmBooking, completeBooking } from "../../api/api.jsx";

function ViewAllBookings() {
  const [bookings, setBookings] = useState([]);
  const providerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProviderBookings(providerId);
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBookings(sorted);
      } catch (error) {
        console.log("No bookings found", error);
      }
    };
    fetchData();
  }, [providerId]);

  const handleConfirm = async (bookingId) => {
    await confirmBooking(bookingId);
    setBookings(prev =>
      prev.map(item => item._id === bookingId ? { ...item, status: "booked" } : item)
    );
  };

  const handleComplete = async (bookingId) => {
    try {
      await completeBooking(bookingId);
      setBookings(prev =>
        prev.map(item => item._id === bookingId ? { ...item, status: "done" } : item)
      );
    } catch {
      console.log("Complete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">
        All Bookings
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg font-medium">
            No bookings found
          </p>
        ) : (
          bookings.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              {/* Top: Name & Status */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800 truncate">
                  {item.userId?.name || "Unknown User"}
                </h2>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                  item.status === "booked" ? "bg-purple-100 text-purple-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Inline info */}
              <div className="flex flex-wrap gap-3 text-gray-600 text-sm font-medium mb-4">
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">📅 {item.date}</span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">⏰ {item.time}</span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">👥 {item.num} Emp</span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">⏳ {item.hrs} hrs</span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">🛠 {item.service_id?.service}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  disabled={item.status !== "pending"}
                  onClick={() => handleConfirm(item._id)}
                  className="flex-1 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition font-semibold"
                >
                  Confirm
                </button>
                <button
                  disabled={item.status !== "booked"}
                  onClick={() => handleComplete(item._id)}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewAllBookings;
