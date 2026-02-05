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
  const nav=useNavigate()


  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userdata = {
      ...data,
      usertype: "provider"
    };

    console.log("Provider submit:", userdata);

    try {
      
      const res = await Signup(userdata)

      setData({
        name: "",
        business: "",
        email: "",
        phone: "",
        password: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      <input className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40" type="text" name="name" value={data.name} onChange={change} placeholder="Owner Name" />
      <input className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40"type="text" name="business" value={data.business} onChange={change} placeholder="Business Name" />
      <input className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40" type="email" name="email" value={data.email} onChange={change} placeholder="Email" />
      <input className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40" type="number" name="phone" value={data.phone} onChange={change} placeholder="Phone" />
      <input className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40"type="password" name="password" value={data.password} onChange={change} placeholder="Password" />

      <button type="submit" className="btn-primary" >
        Create Account
      </button>
    </form>
  );
}

export default ProviderRegister;
