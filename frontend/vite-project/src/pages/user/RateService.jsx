import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewService } from "../../api/api.jsx";
import { motion } from "framer-motion";

function RateService() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (rating === 0) return alert("Please select a rating");
    if (!review.trim()) return alert("Please write a review");

    try {
      await ReviewService(id, { rating, review });
      alert("Review submitted successfully!");
      navigate(-1);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Failed to submit review. Please try again.";

      alert(msg);
      console.error("Review failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-lg p-5 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-purple-700 text-center mb-5 sm:mb-6">
          Rate This Service
        </h2>

        <form onSubmit={submit} className="space-y-5 sm:space-y-6">
          
          <div className="flex justify-center gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl sm:text-4xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your feedback..."
            className="w-full h-28 sm:h-32 border border-gray-300 rounded-lg p-3 sm:p-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-purple-700 transition"
          >
            Submit Review
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-purple-600 text-sm sm:text-base block mx-auto"
        >
          ← Back
        </button>
      </motion.div>
    </div>
  );
}

export default RateService;
