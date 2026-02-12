import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, ClipboardList } from "lucide-react";

function AdminSidebar() {
  return (
    <aside className="w-16 md:w-56 bg-white text-gray-700 shadow-lg md:h-full p-2 md:p-6 flex flex-col border-r border-gray-200">
      
      <nav className="flex flex-col gap-3">

        <NavLink
          to="/admin/home"
          end
          className={({ isActive }) =>
            `flex items-center justify-center sm:justify-start gap-3 p-2 sm:p-3 rounded-lg text-xs sm:text-base font-semibold transition-all duration-200 ${
              isActive
                ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600 shadow-sm"
                : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-l-4 border-transparent"
            }`
          }
        >
          <Home size={20} />
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/manageservice"
          className={({ isActive }) =>
            `flex items-center justify-center sm:justify-start gap-3 p-2 sm:p-3 rounded-lg text-xs sm:text-base font-semibold transition-all duration-200 ${
              isActive
                ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600 shadow-sm"
                : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-l-4 border-transparent"
            }`
          }
        >
          <Users size={20} />
          <span className="hidden sm:inline">Provider Approval</span>
        </NavLink>

        <NavLink
          to="/admin/allbooks"
          className={({ isActive }) =>
            `flex items-center justify-center sm:justify-start gap-3 p-2 sm:p-3 rounded-lg text-xs sm:text-base font-semibold transition-all duration-200 ${
              isActive
                ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600 shadow-sm"
                : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-l-4 border-transparent"
            }`
          }
        >
          <ClipboardList size={20} />
          <span className="hidden sm:inline">Booking Monitoring</span>
        </NavLink>

      </nav>
    </aside>
  );
}

export default AdminSidebar;
