import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserSignup from "../../pages/user/UserSignup";
import ProviderRegister from "../../pages/provider/ProviderRegister";
import img from "../../assets/img11.jpg";

function Register() {
  const [role, setRole] = useState("user");

  const inputClass =
    "w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-400/50 text-white placeholder:text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center relative px-6 bg-cover bg-center"
      style={{
  backgroundImage:
    "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)"
}}
    >
      <div className="absolute inset-0  from-white/40 via-white/20 to-white/10"></div>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">

        <div className="text-black">
          <h1 className="text-5xl font-bold text-purple-700">
            Create Account
          </h1>
          <p className="mt-4 text-gray-700">
            Join us and explore new opportunities
          </p>
        </div>

        <div className="mx-auto w-full max-w-md backdrop-blur-xl bg-white/10 border border-purple-400/30 rounded-2xl shadow-xl p-8">

          <div className="flex bg-black/30 rounded-lg p-1 mb-6">
            <button
              onClick={() => setRole("user")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${ role === "user" ? "bg-purple-600 text-white"  : "text-white/70 hover:text-white"    }`} >
              User
            </button>

            <button
              onClick={() => setRole("provider")} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${  role === "provider"    ? "bg-purple-600 text-white"    : "text-white/70 hover:text-white" }`} >
              Provider
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }} >
              {role === "user" ? ( <UserSignup inputClass={inputClass} /> ) : (  <ProviderRegister inputClass={inputClass} />)}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}

export default Register;
