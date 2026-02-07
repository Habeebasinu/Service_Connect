import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex flex-col justify-between min-h-screen w-56 bg-white border-r border-gray-200 shadow-lg text-gray-800">
      
      <nav className="flex flex-col p-5 gap-3">
        <NavLink to="/provider/home"className={({ isActive }) =>`flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${  isActive    ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"  }` }>
          Dashboard
        </NavLink>

        <NavLink
          to="/provider/service"className={({ isActive }) => `flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${ isActive ? "bg-blue-600 text-white shadow-md"  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"}`}>
          Manage Services
        </NavLink>

        <NavLink
          to="/provider/booking"className={({ isActive }) =>  `flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${ isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105" }` }>
          Manage Bookings
        </NavLink>
      </nav>

      
    </div>
  );
}

export default Sidebar;
