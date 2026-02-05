import React from "react";
import { motion } from "framer-motion";
import ServicesSection from "./ServicesSection";
import FeaturedServices from "./FeaturedServices";
import Work from "./Work";

const Home = () => {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600880292089-90a7e086ee0c)" }}
        />

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md bg-white p-6 rounded-2xl shadow-2xl border border-purple-300"
          >
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-2">
              Reliable <span className="text-purple-600">Services</span> Near You
            </h1>

            <p className="text-gray-600 text-sm text-center mb-4">
              Find trusted professionals in your area
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your location"
                className="flex-1 bg-white text-gray-800 border border-gray-300 px-3 py-2 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
              />
              <button className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition">
                Find
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              ✔ Verified providers • ✔ Fast booking
            </p>
          </motion.div>
        </div>
      </section>

      <ServicesSection />
      <FeaturedServices />
      <Work />
    </>
  );
};

export default Home;
