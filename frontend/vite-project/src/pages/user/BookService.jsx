import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bookservices, viewServiceById } from "../../api/api.jsx";
import socket from "../../Socket";

function BookService() {
  const { id: serviceId } = useParams();
  const userId = localStorage.getItem("id");

  const [status, setStatus] = useState("pending");
  const [service, setService] = useState(null);
  const nav = useNavigate();

  const [inp, setInp] = useState({
    name: "",
    date: "",
    time: "",
    num: "",
    hrs: ""
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await viewServiceById(serviceId);
        setService(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load service details");
      }
    };
    fetchService();
  }, [serviceId]);

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
      nav("/user/viewbook");
    } catch (error) {
      console.error(error);
      alert("Booking failed ");
    }
  };

  return (
    <div className="min-h-screen from-purple-50 via-white to-pink-50 px-4 sm:px-6 py-10">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          {service?.img && (
            <div className="w-full h-64 sm:h-72">
              <img
                src={service.img}
                alt={service.service}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-5 sm:p-8 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-4">
              Service Overview
            </h3>

            {service ? (
              <>
                <p className="text-3xl font-bold text-black mb-2">{service.service}</p>
                <p>
                  <span className="font-semibold">Price / Hour:</span> ₹{service.price}
                </p>
                <p>
                  <span className="font-semibold">Available Staff:</span> {service.employee}
                </p>
               
              </>
            ) : (
              <p className="text-gray-500">Loading service details...</p>
            )}

            <div className="mt-6">
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
