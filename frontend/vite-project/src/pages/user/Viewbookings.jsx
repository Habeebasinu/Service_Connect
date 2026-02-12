import React, { useEffect, useState } from "react";
import { Viewbook, Deletebooking } from "../../api/api.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Viewbookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const deleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      await Deletebooking(bookingId);
      setBookings((prev) => prev.filter((item) => item._id !== bookingId));
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 sm:mb-10">
        My Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg mb-4">
            No bookings found
          </p>
          <button
            onClick={() => nav("/")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Explore Services
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {bookings.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                  {item.service_name}
                </h2>

                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
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

              <div className="space-y-2 text-gray-600 text-sm">
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

              <div className="flex flex-col sm:flex-row gap-2 mt-5">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => nav(`/editbooking/${item._id}`)}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-purple-700 transition"
                >
                  Edit
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteBooking(item._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                >
                  Delete
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => nav(`/rateservice/${item.service_id}`)}
                  className="flex-1 bg-yellow-400 text-white py-2 rounded-md text-sm font-semibold hover:bg-yellow-500 transition"
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
