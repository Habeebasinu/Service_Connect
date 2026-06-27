import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { viewServiceById } from "../../api/api.jsx";
import socket from "../../Socket";

function BookService() {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const [service, setService] = useState(null);
  const [status, setStatus] = useState("Pending");

  const [inp, setInp] = useState({
    name: "",
    date: "",
    time: "",
    num: "",
    hrs: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await viewServiceById(serviceId);
        setService(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchService();
  }, [serviceId]);

  useEffect(() => {
    if (!userId) return;

    socket.connect();

    socket.emit("join", userId);

    socket.on("bookingConfirmed", () => {
      setStatus("Confirmed");
    });

    socket.on("bookingCompleted", () => {
      setStatus("Completed");
    });

    return () => {
      socket.off("bookingConfirmed");
      socket.off("bookingCompleted");
    };
  }, [userId]);

  const change = (e) => {
    setInp({
      ...inp,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice =
    service && inp.hrs
      ? service.price * Number(inp.hrs)
      : 0;

  const handleContinue = () => {
    if (
      !inp.name ||
      !inp.date ||
      !inp.time ||
      !inp.num ||
      !inp.hrs
    ) {
      alert("Please fill all fields");
      return;
    }

    navigate("/payment", {
      state: {
        serviceId,
        bookingData: inp,
        service,
        totalAmount: totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Left */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {service?.img && (
            <img
              src={service.img}
              alt=""
              className="w-full h-72 object-cover"
            />
          )}

          <div className="p-6">

            <h2 className="text-3xl font-bold mb-4">
              {service?.service}
            </h2>

            <p className="mb-2">
              <b>Price :</b> ₹{service?.price}/Hour
            </p>

            <p className="mb-2">
              <b>Employees :</b> {service?.employee}
            </p>

            <span className="bg-yellow-200 px-4 py-2 rounded-full">
              {status}
            </span>

          </div>
        </div>

        {/* Right */}

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-center mb-6">
            Book Service
          </h2>

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={inp.name}
            onChange={change}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="date"
            name="date"
            value={inp.date}
            onChange={change}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="time"
            name="time"
            value={inp.time}
            onChange={change}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Employees"
            name="num"
            value={inp.num}
            onChange={change}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Hours"
            name="hrs"
            value={inp.hrs}
            onChange={change}
            className="w-full border p-3 rounded mb-4"
          />

          <div className="bg-purple-100 p-4 rounded text-center font-bold text-xl mb-6">
            Total : ₹{totalPrice}
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-purple-700 text-white py-3 rounded-lg"
          >
            Continue to Payment
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookService;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Bookservices, viewServiceById } from "../../api/api.jsx";
// import socket from "../../Socket";

// function BookService() {
//   const { id: serviceId } = useParams();
//   const userId = localStorage.getItem("id");
//   const nav = useNavigate();

//   const [status, setStatus] = useState("pending");
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [inp, setInp] = useState({
//     name: "",
//     date: "",
//     time: "",
//     num: "",
//     hrs: ""
//   });

//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         const res = await viewServiceById(serviceId);
//         setService(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchService();
//   }, [serviceId]);

//   useEffect(() => {
//     if (!userId) return;

//     if (!socket.connected) {
//       socket.connect();
//     }

//     socket.emit("join", userId);

//     socket.on("bookingConfirmed", () => {
//       setStatus("confirmed");
//     });

//     socket.on("bookingCompleted", () => {
//       setStatus("done");
//     });

//     return () => {
//       socket.off("bookingConfirmed");
//       socket.off("bookingCompleted");
//     };
//   }, [userId]);

//   const change = (e) => {
//     setInp({ ...inp, [e.target.name]: e.target.value });
//   };

//   // 💳 Razorpay Payment Function
//  const handlePayment = () => {
//   if (!service) return;

//   if (
//     !inp.name ||
//     !inp.date ||
//     !inp.time ||
//     !inp.num ||
//     !inp.hrs
//   ) {
//     alert("Please fill all fields");
//     return;
//   }

//   const totalAmount = service.price * Number(inp.hrs);

//   nav("/payment", {
//     state: {
//       service,
//       serviceId,
//       bookingData: inp,
//       totalAmount,
//     },
//   });
// };

//   return (
//     <div className="min-h-screen px-4 sm:px-6 py-10 bg-gray-50">
//       <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* Service Card */}
//         <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
//           {service?.img && (
//             <div className="w-full h-72">
//               <img
//                 src={service.img}
//                 alt={service.service}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           )}

//           <div className="p-8 space-y-4">
//             <h3 className="text-xl font-bold text-purple-700">
//               Service Overview
//             </h3>

//             {service && (
//               <>
//                 <p className="text-3xl font-bold">{service.service}</p>
//                 <p>
//                   <span className="font-semibold">Price / Hour:</span> ₹{service.price}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Available Staff:</span> {service.employee}
//                 </p>
//               </>
//             )}

//             <div>
//               <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
//                 {status.toUpperCase()}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 border">
//           <h2 className="text-2xl font-bold text-purple-700 mb-8 text-center">
//             Book Your Service
//           </h2>

//           <div className="space-y-5">
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={inp.name}
//               onChange={change}
//               className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
//               required
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="date"
//                 name="date"
//                 value={inp.date}
//                 onChange={change}
//                 className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
//                 required
//               />
//               <input
//                 type="time"
//                 name="time"
//                 value={inp.time}
//                 onChange={change}
//                 className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="num"
//                 min="1"
//                 placeholder="Employees"
//                 value={inp.num}
//                 onChange={change}
//                 className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
//                 required
//               />
//               <input
//                 type="number"
//                 name="hrs"
//                 min="1"
//                 placeholder="Hours"
//                 value={inp.hrs}
//                 onChange={change}
//                 className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
//                 required
//               />
//             </div>

//             {/* Total Price */}
//             {totalPrice > 0 && (
//               <div className="bg-purple-50 p-4 rounded-lg text-center font-semibold text-lg">
//                 Total Amount: ₹{totalPrice}
//               </div>
//             )}

//             {/* Payment Button */}
//             <button
//               onClick={handlePayment}
//               disabled={loading}
//               className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition"
//             >
//               {loading ? "Processing..." : "Pay & Book Now"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookService;