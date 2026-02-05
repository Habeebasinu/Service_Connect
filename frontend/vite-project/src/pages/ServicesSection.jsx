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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08 },
    }),
  };

  return (
    <section className="py-24 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-gray-900 mb-14"
      >
        Explore Our <span className="text-purple-600">Services</span>
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {services.map((service, index) => (
          <motion.div
            key={service}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-white border border-purple-200 rounded-2xl p-6 text-center cursor-pointer shadow-md hover:shadow-purple-300/40 transition"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
                ⚙️
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {service}
            </h3>
            <p className="text-sm text-gray-600">
              Verified professionals near you
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
