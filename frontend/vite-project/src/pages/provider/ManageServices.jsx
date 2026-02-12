import React, { useEffect, useState } from "react";
import { Viewservices, Deleteservices } from "../../api/api.jsx";
import { useNavigate } from "react-router-dom";
import { UsersIcon, CurrencyDollarIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

function ManageServices() {
  const [services, setServices] = useState([]);
  const id = localStorage.getItem("id");
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Viewservices(id);
        const sort = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setServices(sort);
      } catch (error) {
        console.log("no services found", error);
      }
    };
    fetchData();
  }, [id]);

  const deleteservic = async (serviceid) => {
    try {
      await Deleteservices(serviceid);
      setServices(services.filter((item) => item._id !== serviceid));
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  if (!services.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-800 text-lg sm:text-xl font-medium px-4 text-center">
        No services added yet
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center tracking-wide">
        My Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {services.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg sm:hover:scale-105">
            
            <div className="px-4 py-3 bg-purple-600">
              <h3 className="text-white font-bold text-base sm:text-lg truncate">{item.service}</h3>
            </div>

            {item.img && (
              <img src={item.img} alt={item.service} className="w-full h-40 sm:h-36 object-cover border-b border-gray-200" />
            )}

            <div className="p-4 space-y-3 text-gray-700">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">{item.employee} Employees</span>
              </div>

              <div className="flex items-center gap-2">
                <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">₹ {item.price}/hour</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircleIcon className={`w-5 h-5 ${item.status === "Active" ? "text-green-500" : "text-red-500"}`} />
                <span className={`text-sm font-medium ${item.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between p-4 border-t border-gray-200">
              <button onClick={() => nav(`/serviceupdate/${item._id}`)} className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition">
                Edit
              </button>

              <button onClick={() => deleteservic(item._id)} className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition">
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageServices;
