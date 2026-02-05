import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex flex-col justify-between min-h-screen w-56 bg-white border-r border-gray-200 shadow-lg text-gray-800">
      
      {/* Top Navigation Links */}
      <nav className="flex flex-col p-5 gap-3">
        <NavLink
          to="/provider/home"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/provider/service"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
            }`
          }
        >
          Manage Services
        </NavLink>

        <NavLink
          to="/provider/booking"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
            }`
          }
        >
          Manage Bookings
        </NavLink>
      </nav>

      {/* Logout Button at the Bottom */}
      <div className="p-5">
        <button
          onClick={() => console.log("Logout clicked")}
          className="w-full flex items-center justify-center p-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
