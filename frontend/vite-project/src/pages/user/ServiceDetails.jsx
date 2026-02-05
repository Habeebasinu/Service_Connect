import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { viewServiceById } from "../../api/api.jsx";

function ServiceDetails() {
  const { id } = useParams();
  const nav=useNavigate()      
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await viewServiceById(id);
        setService(res.data);
        console.log(res.data)
        setLoading(false);
      } catch (error) {
        console.error("Service not found", error);
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading service details...</p>;
  }

  if (!service) {
    return <p className="text-center mt-10 text-red-500">Service not found</p>;
  }

return (
  <div className="min-h-screen  from-purple-50 via-white to-pink-50 px-4 py-10">
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

      <div className="relative">
        <img
          src={service.img}
          alt={service.service}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="absolute bottom-6 left-6 text-3xl font-extrabold text-white drop-shadow-lg">
          {service.service}
        </h1>
      </div>

      <div className="p-8">
        <p className="text-gray-700 leading-relaxed">
          {service.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Employees</p>
            <p className="text-lg font-bold text-purple-700">
              {service.employee}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Price / Hour</p>
            <p className="text-lg font-bold text-green-700">
              ₹ {service.price}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-lg font-bold text-blue-700 capitalize">
              {service.status}
            </p>
          </div>
        </div>

     
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => nav(`/books/${id}`)}
            className="px-10 py-3  from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition"
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
