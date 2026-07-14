import React, { useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { TbGardenCartFilled } from "react-icons/tb";
import { FaGasPump } from "react-icons/fa";
import { viewallservices } from "../../api/api";
import { IoFitness } from "react-icons/io5";
function Section() {
    const [services,setServices]=useState([])
    console.log("Section Rendered");

// const Click=async(Category)=>{
// const res=await viewallservices()
// const filt = res.data.filter((item) => {
//   console.log(
//     "DB:",
//     item.service,
//     "| Category:",
//     Category,
//     "| Match:",
//     item.service.toLowerCase().trim() === Category.toLowerCase().trim()
//   );

//   return item.service.toLowerCase().trim() === Category.toLowerCase().trim();

// });
// setServices(filt)
// console.log(filt);}
const Click = async (category) => {
  try {
    const res = await viewallservices();

    console.log("Category Clicked:", category);

    const filtered = res.data.filter((item) => {
      console.log(item.service);

      return (
        String(item.service).trim().toLowerCase() ===
        String(category).trim().toLowerCase()
      );
    });

    console.log("Filtered Result:", filtered);
    setServices(filtered);
  } catch (err) {
    console.log(err);
  }
};console.log("Services State:", services);
  return (
    <div className="bg-white p-6 rounded-xl shadow-md m-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Services Available
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div className="flex flex-col items-center">
          <div className="bg-pink-100 p-5 rounded-full">
            <MdOutlinePets className="text-5xl text-pink-600"  onClick={() => Click("pet care")}/>
          </div>
          <p className="mt-3 font-semibold">Pet Care</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-5 rounded-full">
            <TbGardenCartFilled className="text-5xl text-green-600"  onClick={() => Click("Gardening")}/>
          </div>
          <p className="mt-3 font-semibold">Gardening</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-5 rounded-full">
            <FaGasPump className="text-5xl text-yellow-600"  onClick={() => Click("plumbing")}/>
          </div>
          <p className="mt-3 font-semibold">plumbing</p>
        </div>
          <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-5 rounded-full">
            < IoFitness className="text-5xl text-yellow-600"  onClick={() => Click("fitness")}/>
          </div>
          <p className="mt-3 font-semibold">Fitness</p>
        </div>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
  {services.map((item) => (
    <div key={item._id} className="border rounded-lg p-4 shadow">
      <img
        src={item.img}
        alt={item.service}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="font-bold mt-2">{item.companyname}</h2>
      <p>{item.service}</p>
      <p>₹{item.price}</p>
    </div>
  ))}
</div>

    </div>
  );
}

export default Section;