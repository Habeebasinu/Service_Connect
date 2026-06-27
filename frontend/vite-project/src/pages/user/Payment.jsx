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
      const res = await createOrder(totalAmount);

      const order = res.data;

      const options = {
        key: "rzp_test_T6JaC2uxfnDoRv",

        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "Service Connect",
        description: "Service Booking",

        prefill: {
          name: bookingData.name,
        },

        theme: {
          color: "#7C3AED",
        },

        handler: async function (response) {
          const data = {
            ...bookingData,

            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,

            paymentStatus: "paid",

            amount: totalAmount,
          };

          await Bookservices(serviceId, data);

          alert("Payment Successful");

          navigate("/user/viewbook");
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
          alt={service.service}
          className="w-full h-60 object-cover rounded"
        />

        <h2 className="text-xl font-bold mt-4">
          {service.service}
        </h2>

        <p className="mt-2">
          Name: <b>{bookingData.name}</b>
        </p>

        <p>
          Date: <b>{bookingData.date}</b>
        </p>

        <p>
          Time: <b>{bookingData.time}</b>
        </p>

        <p>
          Hours: <b>{bookingData.hrs}</b>
        </p>

        <p className="text-2xl font-bold text-purple-700 mt-4">
          ₹ {totalAmount}
        </p>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800"
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
// import { Bookservices, createOrder } from "../../api/api";

// function Payment() {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   if (!state) {
//     return (
//       <h2 className="text-center text-2xl mt-20">
//         No Booking Found
//       </h2>
//     );
//   }

//   const { service, bookingData, serviceId, totalAmount } = state;

//   const handlePayment = async () => {
//     try {
//       // Create Razorpay Order
//       const res = await createOrder(totalAmount);

//       const order = res.data;

//       const options = {
//         key: "rzp_test_T6JaC2uxfnDoRv", // Your Razorpay Test Key

//         amount: order.amount,

//         currency: order.currency,

//         order_id: order.id,

//         name: "Service Connect",

//         description: "Service Booking",

//         handler: async function (response) {
//           // Save booking only after payment success
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

//       <div className="bg-white shadow-xl rounded-xl w-[450px] p-8">

//         <h1 className="text-3xl font-bold text-center mb-6">
//           Payment
//         </h1>

//         <img
//           src={service.img}
//           alt=""
//           className="w-full h-60 object-cover rounded"
//         />

//         <h2 className="text-xl font-bold mt-4">
//           {service.service}
//         </h2>

//         <p className="mt-2">
//           Name :
//           <b> {bookingData.name}</b>
//         </p>

//         <p>
//           Date :
//           <b> {bookingData.date}</b>
//         </p>

//         <p>
//           Time :
//           <b> {bookingData.time}</b>
//         </p>

//         <p>
//           Hours :
//           <b> {bookingData.hrs}</b>
//         </p>

//         <p className="text-2xl font-bold text-purple-700 mt-4">
//           ₹ {totalAmount}
//         </p>

//         <button
//           onClick={handlePayment}
//           className="w-full mt-6 bg-purple-700 text-white py-3 rounded-lg"
//         >
//           Pay Now
//         </button>

//       </div>

//     </div>
//   );
// }

// export default Payment;


