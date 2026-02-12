import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ViewServiceById, serviceEdit } from "../../api/api.jsx";
import { motion } from "framer-motion";

function EditServices() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState({
    companyname: "",
    service: "",
    employee: "",
    price: "",
    desc: "",
    accountStatus: "",
    date: "",
    img: null,
    previewImg: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await ViewServiceById(id);
        const data = res.data;

        setService({
          companyname: data.companyname || "",
          service: data.service || "",
          employee: data.employee || "",
          price: data.price || "",
          desc: data.desc || "",
          accountStatus: data.accountStatus || "",
          date: data.date ? data.date.split("T")[0] : "",
          img: null,
          previewImg: data.img || ""
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching service:", error);
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img") {
      setService({ ...service, img: files[0] });
    } else {
      setService({ ...service, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyname", service.companyname);
    formData.append("service", service.service);
    formData.append("employee", service.employee);
    formData.append("price", service.price);
    formData.append("desc", service.desc);
    formData.append("accountStatus", service.accountStatus);
    formData.append("date", service.date);

    if (service.img) {
      formData.append("img", service.img);
    }

    try {
      await serviceEdit(id, formData);
      alert("Service updated successfully");
      navigate("/provider/service");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update service");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 text-lg">
        Loading service...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 sm:px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-purple-200 p-5 sm:p-8"
      >
        
        <h2 className="text-xl sm:text-2xl font-bold text-purple-700 text-center mb-6">
          Edit Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="companyname"
            value={service.companyname}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />

          <input
            type="date"
            name="date"
            value={service.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />

          <input
            type="text"
            name="service"
            value={service.service}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="employee"
              value={service.employee}
              onChange={handleChange}
              placeholder="Employees"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />

            <input
              type="number"
              name="price"
              value={service.price}
              onChange={handleChange}
              placeholder="Price / Hour"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <textarea
            rows="3"
            name="desc"
            value={service.desc}
            onChange={handleChange}
            placeholder="Service Description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            required
          />

          <input
            type="file"
            name="img"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          <select
            name="accountStatus"
            value={service.accountStatus}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Update Service
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
}

export default EditServices;
