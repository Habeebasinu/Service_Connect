import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bookservices, createOrder } from "../../api/api";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <h2 className="text-center text-2xl mt-20">
        No Booking Found
      </h2>
    );
  }

  const { service, bookingData, serviceId, totalAmount } = state;

  const handlePayment = async () => {
    try {
      // Create Razorpay Order
      const res = await createOrder(totalAmount);

      const order = res.data;

      const options = {
        key: "rzp_test_T6JaC2uxfnDoRv", // Your Razorpay Test Key

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Service Connect",

        description: "Service Booking",

        handler: async function (response) {
          // Save booking only after payment success
          await Bookservices(serviceId, bookingData);

          alert("Payment Successful");

          navigate("/user/viewbook");
        },

        prefill: {
          name: bookingData.name,
        },

        theme: {
          color: "#7C3AED",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {
      console.log(err);

      alert("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl w-[450px] p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Payment
        </h1>

        <img
          src={service.img}
          alt=""
          className="w-full h-60 object-cover rounded"
        />

        <h2 className="text-xl font-bold mt-4">
          {service.service}
        </h2>

        <p className="mt-2">
          Name :
          <b> {bookingData.name}</b>
        </p>

        <p>
          Date :
          <b> {bookingData.date}</b>
        </p>

        <p>
          Time :
          <b> {bookingData.time}</b>
        </p>

        <p>
          Hours :
          <b> {bookingData.hrs}</b>
        </p>

        <p className="text-2xl font-bold text-purple-700 mt-4">
          ₹ {totalAmount}
        </p>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-purple-700 text-white py-3 rounded-lg"
        >
          Pay Now
        </button>

      </div>

    </div>
  );
}

export default Payment;


// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { createOrder, Bookservices } from "../../api/api";

// function Payment() {

//   const navigate = useNavigate();

//   const { state } = useLocation();

//   const { service, bookingData, totalAmount, serviceId } = state;

//   const handlePayment = async () => {

//     try {

//       const response = await createOrder(totalAmount);

//       const order = response.data;

//       const options = {

//         key: "rzp_test_T6JaC2uxfnDoRv",

//         amount: order.amount,

//         currency: order.currency,

//         order_id: order.id,

//         name: "Service Connect",

//         description: "Booking Payment",

//         handler: async function () {

//           await Bookservices(serviceId, bookingData);

//           alert("Payment Successful");

//           navigate("/user/viewbook");
//         },

//         prefill: {

//           name: bookingData.name,

//         },

//         theme: {

//           color: "#7C3AED",

//         },

//       };

//       const razor = new window.Razorpay(options);

//       razor.open();

//     } catch (err) {

//       console.log(err);

//       alert("Payment Failed");

//     }

//   };

//   return (

//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">

//       <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">

//         <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">

//           Payment

//         </h2>

//         <div className="space-y-3">

//           <p>

//             <b>Service :</b> {service.service}

//           </p>

//           <p>

//             <b>Price / Hour :</b> ₹{service.price}

//           </p>

//           <p>

//             <b>Hours :</b> {bookingData.hrs}

//           </p>

//           <p>

//             <b>Name :</b> {bookingData.name}

//           </p>

//           <p>

//             <b>Date :</b> {bookingData.date}

//           </p>

//           <p>

//             <b>Time :</b> {bookingData.time}

//           </p>

//           <hr />

//           <h3 className="text-2xl font-bold text-purple-700">

//             Total : ₹{totalAmount}

//           </h3>

//         </div>

//         <button

//           onClick={handlePayment}

//           className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"

//         >

//           Pay Now

//         </button>

//       </div>

//     </div>

//   );

// }

// export default Payment;