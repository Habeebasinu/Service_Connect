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
    <header className="w-full min-h-24 bg-white border-b border-purple-300 shadow-sm flex items-center justify-between px-6 md:px-10 py-4">
      
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-extrabold text-purple-700">
          ServiceConnect
        </h1>
        <h2 className="text-lg font-semibold text-gray-700">
          Admin Dashboard
        </h2>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 
                   bg-purple-600 text-white rounded-lg 
                   font-semibold hover:bg-purple-700 
                   transition shadow"
      >
        <LogOut size={18} />
        Logout
      </button>

    </header>
  );
}

export default AdminHeader;
