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
    <header className="w-full bg-white border-b border-gray-200 shadow-md flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 gap-3 sm:gap-0">
      
      <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-purple-600 text-center sm:text-left">
        ServiceConnect
      </h1>

      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 text-center">
        Dashboard
      </h2>

      <div className="flex items-center gap-3 sm:gap-4">
        <button onClick={logout} className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-red-500 hover:bg-red-600 shadow-md transition">
          Logout
        </button>

        <button onClick={() => navigate("/provider/profiles")} aria-label="Provider Profile" className="focus:outline-none">
          <FaUserCircle className="text-2xl sm:text-3xl text-purple-600 hover:text-purple-500 transition" />
        </button>
      </div>

    </header>
  );
}

export default ProviderHeader;
