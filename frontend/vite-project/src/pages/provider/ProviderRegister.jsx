import React, { useState } from "react";
import { Signup } from "../../api/api.jsx";
import { useNavigate } from "react-router-dom";

function ProviderRegister() {
  const [data, setData] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!data.name.trim()) newErrors.name = "Owner name is required";
    if (!data.business.trim()) newErrors.business = "Business name is required";

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (data.phone.length < 10) {
      newErrors.phone = "Phone must be at least 10 digits";
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
      usertype: "provider"
    };

    try {
      await Signup(userdata);

      setData({
        name: "",
        business: "",
        email: "",
        phone: "",
        password: ""
      });

      setErrors({});
      alert("Provider registered successfully");
      nav('/log')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <div>
        <input className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          type="text" name="name" value={data.name} onChange={change} placeholder="Owner Name" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          type="text" name="business" value={data.business} onChange={change} placeholder="Business Name" />
        {errors.business && <p className="text-red-500 text-sm mt-1">{errors.business}</p>}
      </div>

      <div>
        <input className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          type="email" name="email" value={data.email} onChange={change} placeholder="Email" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <input className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          type="number" name="phone" value={data.phone} onChange={change} placeholder="Phone" />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <input className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          type="password" name="password" value={data.password} onChange={change} placeholder="Password" />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <button type="submit" className="btn-primary">
        Create Account
      </button>

    </form>
  );
}

export default ProviderRegister;
