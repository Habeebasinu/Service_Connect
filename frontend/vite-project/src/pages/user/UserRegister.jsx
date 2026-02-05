import React, { useState } from "react";

function UserRegister() {
  const [data,setData]=useState({
    name:"",
    address:"",
    email:"",
    phone:"",
    password:""

  })
  const change = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("User Data:", data);
};

  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <input
        type="text"name="name"value={data.name} onChange={change} placeholder="First Name"className="input" />

      <input type="text" name="address" value={data.address } onChange={change} placeholder="Address" className="input"/>

      <input type="email" name="email" value={data.email} onChange={change} placeholder="Email Address" className="input"/>

      <input type="tel" name="phone"value={data.phone} onChange={change} placeholder="Phone Number"className="input" />

      <input  type="password"  name="password"  value={data.password} onChange={change} placeholder="Password" className="input" />
    
    </form>
  
  );
}

export default UserRegister;
