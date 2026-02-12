import React from "react";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    "Home Cleaning",
    "Plumbing",
    "Carpentry",
    "Electrical",
    "Gardening",
    "Appliance Repair",
    "Painting",
    "Pest Control",
    "Locksmith",
    "HVAC",
  ];

  return (
    <section className="py-16 bg-white w-full overflow-x-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10"
      >
        Explore Our <span className="text-purple-600">Services</span>
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {services.map((service, index) => (
          <motion.div
            key={service}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-white border border-purple-200 rounded-xl p-4 text-center cursor-pointer shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-lg">
                ⚙️
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">
              {service}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Verified professionals
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
