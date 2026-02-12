import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserSignup from "../../pages/user/UserSignup";
import ProviderRegister from "../../pages/provider/ProviderRegister";

function Register() {
  const [role, setRole] = useState("user");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

        <div className="text-center md:text-left text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Create Account
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-200">
            Join us and explore new opportunities
          </p>
        </div>

        <div className="mx-auto w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-h-[80vh] overflow-y-auto">

          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setRole("user")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                role === "user"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              User
            </button>

            <button
              onClick={() => setRole("provider")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                role === "provider"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Provider
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {role === "user" ? (
                <UserSignup />
              ) : (
                <ProviderRegister />
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}

export default Register;
