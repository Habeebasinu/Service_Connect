import React, { useState } from "react";
import { Signup } from "../../api/api";
import { useNavigate } from "react-router-dom";

function UserSignup() {
  const [data, setData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!data.address.trim()) newErrors.address = "Address is required";
    
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!data.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; 

    const userdata = {
      ...data,
      usertype: "customer"
    };

    console.log("User submit:", userdata);

    try {
      const res = await Signup(userdata);
      alert("User registered successfully!");
      setData({
        name: "",
        address: "",
        email: "",
        phone: "",
        password: ""
      });
      setErrors({});
      nav("/log"); 
    } catch (err) {
      console.error(err);
      alert("Failed to register user. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
      <div>
        <input
          name="name"
          value={data.name}
          onChange={change}
          placeholder="Name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input
          name="address"
          value={data.address}
          onChange={change}
          placeholder="Address"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <div>
        <input
          name="email"
          value={data.email}
          onChange={change}
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          name="phone"
          value={data.phone}
          onChange={change}
          placeholder="Phone"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={change}
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button type="submit" className="btn-primary mt-3 py-2 px-4 rounded-lg bg-purple-500 text-white hover:bg-purple-600">
        Create Account
      </button>
    </form>
  );
}

export default UserSignup;
