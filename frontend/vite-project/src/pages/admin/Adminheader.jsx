import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function AdminHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/log");
  };

  return (
    <header className="w-full bg-white border-b border-purple-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-10 py-4 gap-3 sm:gap-0">

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8">
        <h1 className="text-xl sm:text-2xl font-extrabold text-purple-700">
          ServiceConnect
        </h1>
        <h2 className="text-sm sm:text-lg font-semibold text-gray-700">
          Admin Dashboard
        </h2>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow text-sm sm:text-base"
      >
        <LogOut size={18} />
        Logout
      </button>

    </header>
  );
}

export default AdminHeader;
