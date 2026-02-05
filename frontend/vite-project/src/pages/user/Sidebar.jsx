import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-54 bg-white text-gray-700 shadow-lg h-full p-6 flex flex-col border-r border-gray-200">
      
      <h1 className="text-2xl font-extrabold text-purple-600 mb-10 text-center">
        ServiceConnect
      </h1>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/user/home"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base font-semibold transition
             ${
               isActive
                 ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600"
                 : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
             }`
          }
        >
          <MdHome className="text-xl" />
          Home
        </NavLink>

        <NavLink
          to="/user/viewbook"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base font-semibold transition
             ${
               isActive
                 ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600"
                 : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
             }`
          }
        >
          <FaCalendarCheck className="text-lg" />
          My Bookings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
