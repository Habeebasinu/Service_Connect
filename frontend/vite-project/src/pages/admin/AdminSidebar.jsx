import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, ClipboardList } from "lucide-react";

function AdminSidebar() {
  return (
    <aside className="h-screen w-54 bg-white text-gray-800 shadow-md flex flex-col p-6 border-r border-purple-300">
      
      <nav className="flex flex-col gap-3">

        <NavLink
          to="/admin/home"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base font-semibold transition-all duration-200
             ${
               isActive
                 ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600 shadow-sm"
                 : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-l-4 border-transparent"
             }`
          }
        >
          <Home className="text-purple-600" size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/manageservice"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base font-semibold transition-all duration-200
             ${
               isActive
                 ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600 shadow-sm"
                 : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-l-4 border-transparent"
             }`
          }
        >
          <Users className="text-purple-600" size={20} />
          Provider Approval
        </NavLink>

        <NavLink
          to="/admin/allbooks"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base font-semibold transition-all duration-200
             ${
               isActive
                 ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600 shadow-sm"
                 : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-l-4 border-transparent"
             }`
          }
        >
          <ClipboardList className="text-purple-600" size={20} />
          Booking Monitoring
        </NavLink>

      </nav>
    </aside>
  );
}

export default AdminSidebar;
