import React, { useEffect, useState } from "react";
import { Viewbookbyid, Editbooking } from "../../api/api.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    service_name: "",
    date: "",
    time: "",
    num: "",
    hrs: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await Viewbookbyid(id);
        const data = res.data;

        setBooking({
          service_name: data.service_name || "",
          date: data.date ? data.date.split("T")[0] : "",
          time: data.time || "",
          num: data.num || "",
          hrs: data.hrs || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Editbooking(id, booking);
    navigate("/user/viewbook");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-base sm:text-lg px-4 text-center">
        Loading booking...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-lg rounded-xl shadow-lg p-5 sm:p-8 border border-gray-200"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-purple-700 text-center mb-5 sm:mb-6">
          Edit Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="service_name"
            value={booking.service_name}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={booking.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
            />

            <input
              type="time"
              name="time"
              value={booking.time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="num"
              value={booking.num}
              onChange={handleChange}
              placeholder="Persons"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
            />

            <input
              type="number"
              name="hrs"
              value={booking.hrs}
              onChange={handleChange}
              placeholder="Hours"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-purple-700 transition"
          >
            Update Booking
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
}

export default EditBooking;
