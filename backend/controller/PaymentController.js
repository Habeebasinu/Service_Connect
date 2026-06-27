import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert ₹ to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};


// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.KEY_ID,
//   key_secret: process.env.KEY_SECRET,
// });

// export const createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`
//     };

//     const order = await razorpay.orders.create(options);

//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Order creation failed",
//       error: error.message,
//     });
//   }
// };