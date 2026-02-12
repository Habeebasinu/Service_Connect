import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex flex-col justify-between min-h-screen w-16 sm:w-56 bg-white border-r border-gray-200 shadow-lg text-gray-800 transition-all duration-300">
      
      <nav className="flex flex-col items-center sm:items-start p-3 sm:p-5 gap-3">

        <NavLink
          to="/provider/home"
          className={({ isActive }) =>
            `w-full flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <span className="text-center sm:text-left">Dashboard</span>
        </NavLink>

        <NavLink
          to="/provider/service"
          className={({ isActive }) =>
            `w-full flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <span className="text-center sm:text-left">Services</span>
        </NavLink>

        <NavLink
          to="/provider/booking"
          className={({ isActive }) =>
            `w-full flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <span className="text-center sm:text-left">Bookings</span>
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;
