import React from "react";
import { MdOutlinePets } from "react-icons/md";
import { TbGardenCartFilled } from "react-icons/tb";
import { FaGasPump } from "react-icons/fa";

function Section() {
    console.log("Section Rendered");
  return (
    <div className="bg-white p-6 rounded-xl shadow-md m-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Services Available
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div className="flex flex-col items-center">
          <div className="bg-pink-100 p-5 rounded-full">
            <MdOutlinePets className="text-5xl text-pink-600" />
          </div>
          <p className="mt-3 font-semibold">Pet Care</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-5 rounded-full">
            <TbGardenCartFilled className="text-5xl text-green-600" />
          </div>
          <p className="mt-3 font-semibold">Gardening</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-5 rounded-full">
            <FaGasPump className="text-5xl text-yellow-600" />
          </div>
          <p className="mt-3 font-semibold">Fuel Delivery</p>
        </div>

      </div>

    </div>
  );
}

export default Section;