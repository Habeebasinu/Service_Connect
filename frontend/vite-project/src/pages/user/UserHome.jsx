import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewallservices } from "../../api/api.jsx";
import { motion } from "framer-motion";

function UserHome() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await viewallservices();
        const approvedServices = res.data.filter(
          (service) => service.approvalStatus === "accept"
        );
        setServices(approvedServices);
      } catch (error) {
        console.log("No services found", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-10 py-6 sm:py-10 bg-gray-100">
      
      <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-700 mb-8 sm:mb-10 text-center tracking-wide">
        Available Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 text-base sm:text-lg mt-10 px-4">
          No services available at the moment
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          
          {services.map((service, index) => (
            
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              
              <div className="relative">
                <img
                  src={service.img}
                  alt={service.service}
                  className="w-full h-40 sm:h-44 md:h-48 object-contain bg-gray-100"
                />

                <span className="absolute bottom-2 right-2 bg-white/90 text-purple-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-semibold">
                  ⭐ {service.rating || "N/A"}
                </span>
              </div>

              <div className="p-4">
                
                <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                  <p className="text-xs sm:text-sm text-purple-600">
                    {service.accountStatus}
                  </p>
                  {service.service}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 mb-2 truncate">
                  {service.companyname}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-bold text-sm sm:text-base">
                    ₹ {service.price} / hr
                  </span>

                  <Link
                    to={`/details/${service._id}`}
                    className="text-xs sm:text-sm bg-purple-600 text-white px-3 sm:px-4 py-1.5 rounded-lg hover:bg-purple-700 transition"
                  >
                    Book
                  </Link>
                </div>

              </div>
            </motion.div>

          ))}

        </div>
      )}
    </div>
  );
}

export default UserHome;
