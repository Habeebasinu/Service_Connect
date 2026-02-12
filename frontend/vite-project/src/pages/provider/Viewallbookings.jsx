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
      prev.map(item =>
        item._id === bookingId ? { ...item, status: "booked" } : item
      )
    );
  };

  const handleComplete = async (bookingId) => {
    try {
      await completeBooking(bookingId);
      setBookings(prev =>
        prev.map(item =>
          item._id === bookingId ? { ...item, status: "done" } : item
        )
      );
    } catch {
      console.log("Complete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center tracking-wide">
        All Bookings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {bookings.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg font-medium">
            No bookings found
          </p>
        ) : (
          bookings.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-5 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                  {item.userId?.name || "Unknown User"}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.status === "booked"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-gray-600 text-xs sm:text-sm font-medium mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded-full">📅 {item.date}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">⏰ {item.time}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">👥 {item.num} Emp</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">⏳ {item.hrs} hrs</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full truncate max-w-full">
                  🛠 {item.service_id?.service}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  disabled={item.status !== "pending"}
                  onClick={() => handleConfirm(item._id)}
                  className="flex-1 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition font-semibold text-sm"
                >
                  Confirm
                </button>
                <button
                  disabled={item.status !== "booked"}
                  onClick={() => handleComplete(item._id)}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition font-semibold text-sm"
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
