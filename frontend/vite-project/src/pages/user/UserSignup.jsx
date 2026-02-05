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
  const nav=useNavigate()

  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userdata = {
      ...data,
      usertype: "customer"
    };

    console.log("User submit:", userdata);

    try {
      
      const res = await Signup(userdata);
      alert("User registered");
      setData({
        name: "",
        address: "",
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

      <input name="name" value={data.name} onChange={change} placeholder="Name" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40"/>
      <input name="address" value={data.address} onChange={change} placeholder="Address" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40" />
      <input name="email" value={data.email} onChange={change} placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40"/>
      <input name="phone" value={data.phone} onChange={change} placeholder="Phone" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40" />
      <input name="password" value={data.password} onChange={change} placeholder="Password" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-purple-500 text-white placeholder-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/40" />

      <button type="submit" className="btn-primary">
        Create Account
      </button>
    </form>
  );
}

export default UserSignup;
