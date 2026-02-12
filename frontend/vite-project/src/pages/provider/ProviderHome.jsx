import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Viewservices, getProviderBookings } from "../../api/api.jsx";
import { Briefcase, CalendarCheck, UserCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function ProviderHome() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const nav = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    getProviderBookings(id).then(res => setBookings(res.data)).catch(() => {});
    Viewservices(id).then(res => setServices(res.data)).catch(() => {});
  }, []);

  const chartData = bookings.reduce((a, c) => {
    const m = new Date(c.date).toLocaleString("default", { month: "short" });
    const e = a.find(i => i.month === m);
    e ? e.bookings++ : a.push({ month: m, bookings: 1 });
    return a;
  }, []);

  const serviceChartData = services.reduce((a, c) => {
    const m = new Date(c.createdAt).toLocaleString("default", { month: "short" });
    const e = a.find(i => i.month === m);
    e ? e.services++ : a.push({ month: m, services: 1 });
    return a;
  }, []);

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-10 py-6 sm:py-8 bg-gray-50 text-gray-800">
      
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Provider Dashboard</h1>
        <p className="text-gray-600 mt-2 text-sm">Overview of your services and bookings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Total Services</p>
            <Briefcase className="text-blue-600" size={22} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">{services.length}</h2>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
            <CalendarCheck className="text-blue-600" size={22} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">{bookings.length}</h2>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Status</p>
            <UserCheck className="text-green-600" size={22} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-3 text-green-600">Active</h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 sm:mt-10">
        <button onClick={() => nav("/addservice")} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition">
          + Add New Service
        </button>

        <button onClick={() => nav("/provider/booking")} className="w-full sm:w-auto bg-white border border-blue-600 text-blue-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition">
          View All Bookings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 sm:mt-12">
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Booking Trends</h2>
          <p className="text-sm text-gray-600 mb-4">Number of bookings over time</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" stroke="#475569" />
              <YAxis stroke="#475569" />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#2563eb" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Service Creation Trends</h2>
          <p className="text-sm text-gray-600 mb-4">Services added per month</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={serviceChartData}>
              <XAxis dataKey="month" stroke="#475569" />
              <YAxis stroke="#475569" />
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <Tooltip />
              <Line type="monotone" dataKey="services" stroke="#16a34a" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ProviderHome;
