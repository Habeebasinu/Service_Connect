import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-16 md:w-56 bg-white text-gray-700 shadow-lg md:h-full p-2 md:p-6 flex flex-col border-r border-gray-200">
      
      <h1 className="hidden md:block text-2xl font-extrabold text-purple-600 mb-6 text-center">
        ServiceConnect
      </h1>

      <nav className="flex flex-col gap-4 w-full items-center md:items-start">
        
        <NavLink
          to="/user/home"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-3 p-2 md:p-3 rounded-lg font-semibold transition w-full
             ${
               isActive
                 ? "bg-purple-100 text-purple-700 md:border-l-4 border-purple-600"
                 : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
             }`
          }
        >
          <MdHome className="text-xl" />
          <span className="hidden md:inline">Home</span>
        </NavLink>

        <NavLink
          to="/user/viewbook"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-3 p-2 md:p-3 rounded-lg font-semibold transition w-full
             ${
               isActive
                 ? "bg-purple-100 text-purple-700 md:border-l-4 border-purple-600"
                 : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
             }`
          }
        >
          <FaCalendarCheck className="text-xl" />
          <span className="hidden md:inline">My Bookings</span>
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;
