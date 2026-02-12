import React, { useState } from "react";

function UserRegister() {
  const [data, setData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", data);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 py-6">
      
      <div className="w-full max-w-md bg-white p-5 rounded-xl shadow-md">
        
        <h2 className="text-lg font-semibold text-purple-700 text-center mb-4">
          User Registration
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="text"
            name="name"
            value={data.name}
            onChange={change}
            placeholder="First Name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="text"
            name="address"
            value={data.address}
            onChange={change}
            placeholder="Address"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={change}
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={change}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="password"
            name="password"
            value={data.password}
            onChange={change}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-purple-700 transition"
          >
            Register
          </button>

        </form>
      </div>

    </div>
  );
}

export default UserRegister;
