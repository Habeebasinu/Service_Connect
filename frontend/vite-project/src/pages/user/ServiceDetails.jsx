import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { viewServiceById } from "../../api/api.jsx";

function ServiceDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await viewServiceById(id);
        setService(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Service not found", error);
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const click = () => {
    if (service?.accountStatus === "Available") {
      nav(`/books/${id}`);
    } else {
      alert("Service is not available right now");
      nav(-1);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-base sm:text-lg px-4">
        Loading service details...
      </p>
    );
  }

  if (!service) {
    return (
      <p className="text-center mt-10 text-red-500 text-base sm:text-lg px-4">
        Service not found
      </p>
    );
  }

  return (
    <div className="min-h-screen from-purple-50 via-white to-pink-50 px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {service.img && (
          <div className="relative w-full h-72 sm:h-80 md:h-96">
            <img
              src={service.img}
              alt={service.service}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <h1 className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
              {service.service}
            </h1>
          </div>
        )}

        <div className="p-5 sm:p-8 space-y-6">
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {service.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-500">Employees</p>
              <p className="text-base sm:text-lg font-bold text-purple-700">
                {service.employee}
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-500">Price / Hour</p>
              <p className="text-base sm:text-lg font-bold text-green-700">
                ₹ {service.price}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-500">Status</p>
              <p className="text-base sm:text-lg font-bold text-blue-700 capitalize">
                {service.status} {service.accountStatus}
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              onClick={() => click(id)}
              className="px-8 sm:px-10 py-3 bg-purple-600 text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:bg-purple-700 hover:scale-105 hover:shadow-xl transition transform duration-200 ease-in-out"
            >
              Book Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
