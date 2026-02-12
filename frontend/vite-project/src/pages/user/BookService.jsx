import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bookservices } from "../../api/api.jsx";
import socket from "../../Socket";

function BookService() {
  const { id: serviceId } = useParams();
  const userId = localStorage.getItem("id");

  const [status, setStatus] = useState("pending");
  const nav = useNavigate();

  const [inp, setInp] = useState({
    name: "",
    date: "",
    time: "",
    num: "",
    hrs: ""
  });

  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", userId);

    socket.on("bookingConfirmed", () => {
      setStatus("confirmed");
      alert("Booking confirmed by provider ✅");
    });

    socket.on("bookingCompleted", () => {
      setStatus("done");
      alert("Service completed");
    });

    return () => {
      socket.off("bookingConfirmed");
      socket.off("bookingCompleted");
    };
  }, [userId]);

  const change = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await Bookservices(serviceId, inp);

      setStatus("pending");

      setInp({
        name: "",
        date: "",
        time: "",
        num: "",
        hrs: ""
      });

      alert("Booking placed successfully ⏳");
    } catch (error) {
      console.error(error);
      alert("Booking failed ");
    }
  };

  return (
    <div className="min-h-screen  from-purple-50 via-white to-pink-50 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

        {/* Service Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 border border-purple-100">
          
          <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-6">
            Service Overview
          </h3>

          <div className="space-y-3 text-gray-700 text-sm sm:text-base">
            <p>
              <span className="font-semibold">Service ID:</span> {serviceId}
            </p>
            <p>
              <span className="font-semibold">Price / Hour:</span> ₹500
            </p>
            <p>
              <span className="font-semibold">Available Staff:</span> 5
            </p>
          </div>

          <div className="mt-8">
            <span
              className={`inline-block px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide
              ${
                status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "confirmed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {status.toUpperCase()}
            </span>
          </div>
        </div>

     
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 border border-purple-100">
          
          <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-6 sm:mb-8 text-center">
            Book Your Service
          </h2>

          <form onSubmit={submit} className="space-y-4 sm:space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={inp.name}
              onChange={change}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none text-sm sm:text-base"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={inp.date}
                onChange={change}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none text-sm sm:text-base"
                required
              />

              <input
                type="time"
                name="time"
                value={inp.time}
                onChange={change}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                name="num"
                min="1"
                placeholder="Employees"
                value={inp.num}
                onChange={change}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none text-sm sm:text-base"
                required
              />

              <input
                type="number"
                name="hrs"
                min="1"
                placeholder="Hours"
                value={inp.hrs}
                onChange={change}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none text-sm sm:text-base"
                required
              />
            </div>

            <button
              type="submit"
              onClick={() => nav("/user/viewbook")}
              className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md hover:bg-purple-700 transition"
            >
              Confirm Booking
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default BookService;
