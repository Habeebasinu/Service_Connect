import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProviderHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/log");
  };

  return (
    <header className="w-full min-h-24 bg-white border-b border-gray-200 shadow-md flex items-center justify-between px-6 md:px-10 py-4">
      
      {/* Logo / Brand */}
      <h1 className="text-xl md:text-2xl font-extrabold text-purple-600">
        ServiceConnect
      </h1>

      {/* Page Title */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-700">
        Dashboard
      </h2>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 shadow-md transition"
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/provider/profiles")}
          aria-label="Provider Profile"
          className="focus:outline-none"
        >
          <FaUserCircle className="text-2xl md:text-3xl text-purple-600 hover:text-purple-500 transition" />
        </button>
      </div>

    </header>
  );
}

export default ProviderHeader;
