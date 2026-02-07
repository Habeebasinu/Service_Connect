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
        const sort = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-800 text-xl font-medium">
        No services added yet
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">
        My Services
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 hover:shadow-lg"
          >
        <div className="px-4 py-3 bg-purple-600">
              <h3 className="text-white font-bold text-lg truncate">{item.service}</h3>
            </div>

            {item.img && (
              <img
                src={item.img}
                alt={item.service}  className="w-full h-36 object-cover border-b border-gray-200"/>)}

            <div className="p-4 space-y-2 text-gray-700">
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

            {/* Actions */}
            <div className="flex justify-between p-4 border-t border-gray-200">
              <button
                onClick={() => nav(`/serviceupdate/${item._id}`)}
                className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteservic(item._id)}
                className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
              >
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
