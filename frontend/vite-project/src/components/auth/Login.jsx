import React, { useState } from "react";
import { Signin } from "../../api/api.jsx";
import { useNavigate } from "react-router-dom";
import img from "../../assets/img11.jpg";

function Login() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const change = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await Signin(formdata);

    localStorage.setItem("id", response.data.userId);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.usertype);

    if (response.data.usertype === "customer") nav("/user");
    else if (response.data.usertype === "provider") nav("/provider");
    else nav("/admin");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center relative"
style={{
  backgroundImage:
    "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)"
}}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-7">
        <h1 className="text-2xl font-bold text-center text-purple-700">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Login to your account
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={change}
            placeholder="Email"
            className="w-full h-11 rounded-lg border border-gray-300 px-3
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={change}
            placeholder="Password"
            className="w-full h-11 rounded-lg border border-gray-300 px-3
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-purple-600 text-white
                       font-semibold hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-5">
          No account?
          <span className="text-purple-600 ml-1 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
