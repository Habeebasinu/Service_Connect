import React from "react";
import { motion } from "framer-motion";

function FeaturedServices() {
  const featuredServices = [
    {
      title: "Deep Home Cleaning",
      provider: "By ProClean Experts",
      price: "₹1499",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    },
    {
      title: "Emergency Plumbing Fix",
      provider: "By Rapid Plumbers",
      price: "₹999",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da",
    },
    {
      title: "Custom Woodwork",
      provider: "By Skilled Carpenters",
      price: "₹1999",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-gray-900 mb-14"
      >
        Our <span className="text-purple-600">Featured Services</span>
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {featuredServices.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white rounded-2xl overflow-hidden border border-purple-200 shadow-md hover:shadow-purple-300/40 transition"
          >
            <div className="relative">
              <img
                src={service.image}
                alt={service.title}
                className="h-52 w-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                ⭐ {service.rating}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                {service.provider}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-bold">
                  {service.price}
                </span>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedServices;
