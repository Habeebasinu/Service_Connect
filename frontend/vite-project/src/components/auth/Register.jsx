import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserSignup from "../../pages/user/UserSignup";
import ProviderRegister from "../../pages/provider/ProviderRegister";

function Register() {
  const [role, setRole] = useState("user");

  const inputClass =
    "w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)",
      }}
    >
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-14 items-center">

        <div className="text-black">
          <h1 className="text-6xl font-extrabold text-purple-700 leading-tight">
            Create Account
          </h1>
          <p className="mt-4 text-xl font-medium text-gray-700">
            “Connect with trusted professionals near you”
          </p>
        </div>

        <div className="mx-auto w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-200 p-8">

          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setRole("user")}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
                role === "user"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              User
            </button>

            <button
              onClick={() => setRole("provider")}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
                role === "provider"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Provider
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              {role === "user" ? (
                <UserSignup inputClass={inputClass} />
              ) : (
                <ProviderRegister inputClass={inputClass} />
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}

export default Register;
