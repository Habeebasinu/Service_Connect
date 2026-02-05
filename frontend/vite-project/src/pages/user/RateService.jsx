import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewService } from "../../api/api.jsx";
import { motion } from "framer-motion";

function RateService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [inp, setInp] = useState({ review: "" });

  const change = (e) => setInp({ ...inp, [e.target.name]: e.target.value });

const submit = async (e) => {
  e.preventDefault();
  if (rating === 0) return alert("Please select a rating");

  try {
    await ReviewService(id, { review: inp.review, rating });
    alert("Review submitted!");
    setInp({ review: "" });
    setRating(0);
  } catch (error) {
    console.error("Review failed:", error);
    alert("Failed to submit review — please login or try again.");
  }
};



 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
        Rate This Service
      </h2>

      <form onSubmit={submit} className="space-y-6">
      
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setRating(star)}
              className={`text-4xl transition ${
                star <= rating
                  ? "text-yellow-400 scale-110"
                  : "text-gray-300"
              }`}
            >
              ★
            </motion.button>
          ))}
        </div>

        <textarea
          name="review"
          value={inp.review}
          onChange={change}
          placeholder="Write your feedback..."
          className="w-full h-32 border border-gray-300 rounded-lg p-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
        />

       
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition"
        >
          Submit Review
        </motion.button>
      </form>

      
      <button
        onClick={() => navigate(-1)}
        className="mt-6 text-sm text-purple-600 hover:underline block mx-auto"
      >
        ← Back
      </button>
    </motion.div>
  </div>
);

}

export default RateService;
