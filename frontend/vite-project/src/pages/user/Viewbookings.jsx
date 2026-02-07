import React, { useEffect, useState } from "react";
import { Viewbook, Deletebooking } from "../../api/api.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Viewbookings() {
  const [bookings, setBookings] = useState([]);
  const id = localStorage.getItem("id");
  const nav = useNavigate();

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await Viewbook(id);

      const sortedBookings = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBookings(sortedBookings);
    } catch (error) {
      console.log("Booking not found", error);
    }
  };

  fetchData();
}, [id]);


  const deleteBooking = async (bookingId) => {
    try {
      await Deletebooking(bookingId);
      setBookings(bookings.filter(item => item._id !== bookingId));
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

 return (
  <div className="min-h-screen bg-gray-100 py-10 px-6">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
      My Bookings
    </h1>

    {bookings.length === 0 ? (
      <p className="text-center text-gray-500 text-lg mt-10">
        No bookings found
      </p>
    ) : (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {bookings.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white w-full max-w-xs rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-gray-800 truncate">
                {item.service_name}
              </h2>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  item.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : item.status === "booked"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="space-y-1.5 text-gray-600 text-xs">
              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-medium">{item.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span className="font-medium">{item.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Hours</span>
                <span className="font-medium">{item.hrs} hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Employees</span>
                <span className="font-medium">{item.num}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => nav(`/editbooking/${item._id}`)}
                className="flex-1 bg-purple-600 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-purple-700 transition"
              >
                Edit
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteBooking(item._id)}
                className="flex-1 bg-red-500 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-red-600 transition"
              >
                Delete
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => nav(`/rateservice/${item.service_id}`)}
                className="flex-1 bg-yellow-400 text-white py-1.5 rounded-md text-xs font-semibold hover:bg-yellow-500 transition"
              >
                Rate
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
);

}

export default Viewbookings;
