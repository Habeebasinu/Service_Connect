import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UserHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/log");
  };

  return (
    <header className="w-full h-16 sm:h-20 md:h-24 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 sm:px-6 md:px-10 z-50">
      
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-purple-600">
        Home
      </h1>

      <div className="flex items-center gap-2 sm:gap-4">
        
        <button
          onClick={logout}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-purple-600 text-white text-sm sm:text-base font-semibold hover:bg-purple-700 transition"
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/user/profiles")}
          aria-label="User Profile"
          className="focus:outline-none"
        >
          <FaUserCircle className="text-2xl sm:text-3xl md:text-4xl text-purple-600 hover:text-purple-500 transition" />
        </button>

      </div>
    </header>
  );
}

export default UserHeader;
