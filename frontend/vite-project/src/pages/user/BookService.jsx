import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bookservices, viewServiceById } from "../../api/api.jsx";
import socket from "../../Socket";

function BookService() {
  const { id: serviceId } = useParams();
  const userId = localStorage.getItem("id");
  const nav = useNavigate();

  const [status, setStatus] = useState("pending");
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);

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
    });

    socket.on("bookingCompleted", () => {
      setStatus("done");
    });

    return () => {
      socket.off("bookingConfirmed");
      socket.off("bookingCompleted");
    };
  }, [userId]);

  const change = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };

  // 💳 Razorpay Payment Function
  const handlePayment = async () => {
    if (!service) return;

    setLoading(true);

    try {
      const totalAmount = service.price * inp.hrs;

      const res = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );

      const order = await res.json();

      const options = {
        key: "YOUR_KEY_ID",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Service Connect",
        description: "Service Booking Payment",

        handler: async function (response) {
          await Bookservices(serviceId, inp);
          alert("Payment Successful ✅");
          nav("/user/viewbook");
        },

        theme: {
          color: "#7C3AED",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }

    setLoading(false);
  };

  const totalPrice = service && inp.hrs
    ? service.price * inp.hrs
    : 0;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Service Card */}
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
          {service?.img && (
            <div className="w-full h-72">
              <img
                src={service.img}
                alt={service.service}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-purple-700">
              Service Overview
            </h3>

            {service && (
              <>
                <p className="text-3xl font-bold">{service.service}</p>
                <p>
                  <span className="font-semibold">Price / Hour:</span> ₹{service.price}
                </p>
                <p>
                  <span className="font-semibold">Available Staff:</span> {service.employee}
                </p>
              </>
            )}

            <div>
              <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                {status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border">
          <h2 className="text-2xl font-bold text-purple-700 mb-8 text-center">
            Book Your Service
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={inp.name}
              onChange={change}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={inp.date}
                onChange={change}
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
              <input
                type="time"
                name="time"
                value={inp.time}
                onChange={change}
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="num"
                min="1"
                placeholder="Employees"
                value={inp.num}
                onChange={change}
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
              <input
                type="number"
                name="hrs"
                min="1"
                placeholder="Hours"
                value={inp.hrs}
                onChange={change}
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            {/* Total Price */}
            {totalPrice > 0 && (
              <div className="bg-purple-50 p-4 rounded-lg text-center font-semibold text-lg">
                Total Amount: ₹{totalPrice}
              </div>
            )}

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition"
            >
              {loading ? "Processing..." : "Pay & Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookService;