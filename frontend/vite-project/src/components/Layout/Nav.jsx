import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-purple-700 tracking-wide">
          Connectify
        </h1>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>
            <Link className="hover:text-purple-600 transition">
              Services
            </Link>
          </li>
          <li>
            <Link className="hover:text-purple-600 transition">
              Providers
            </Link>
          </li>
          <li>
            <Link className="hover:text-purple-600 transition">
              How it Works
            </Link>
          </li>
          <li>
            <Link className="hover:text-purple-600 transition">
              About
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to="/log"
            className="px-4 py-2 rounded-lg text-purple-600 border border-purple-300 hover:bg-purple-50 transition font-medium"
          >
            Login
          </Link>

          <Link
            to="/sign"
            className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Nav;
