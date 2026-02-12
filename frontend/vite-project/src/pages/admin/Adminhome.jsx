import React, { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Box,
  Calendar,
  CheckSquare,
  ClipboardList,
  Settings,
} from "lucide-react";
import { fetchbookings, Getservicer } from "../../api/api.jsx";

function Adminhome() {
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetchbookings();
        setBookings(res.data);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };
    fetchBooking();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await Getservicer();
        setProviders(res.data.filter(u => u.usertype === "provider"));
        setUsers(res.data.filter(u => u.usertype === "customer"));
      } catch (error) {
        console.log("Service error:", error);
      }
    };
    fetchService();
  }, []);

  return (
    <div className="p-3 sm:p-6 lg:p-8 min-h-screen bg-gray-50 w-full">

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700 mb-6 sm:mb-10">
        Admin Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">

        {[
          { icon: Users, value: users.length, label: "Total Users" },
          { icon: Briefcase, value: providers.length, label: "Service Providers" },
          { icon: Box, value: 521, label: "Active Services" },
          { icon: Calendar, value: bookings.length, label: "Total Bookings" },
        ].map(({ icon: Icon, value, label }, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 sm:p-6 border border-purple-200 shadow-sm hover:shadow-md transition duration-300"
          >
            <Icon className="text-purple-700 mb-3" size={28} />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              {value}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {label}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-lg sm:text-2xl font-bold text-purple-700 mb-6 sm:mb-8">
        Quick Management Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

        {[
          {
            icon: CheckSquare,
            title: "Provider Approval",
            desc: "Review and approve pending service provider registrations.",
          },
          {
            icon: ClipboardList,
            title: "Booking Monitoring",
            desc: "Track all service bookings across the platform.",
          },
          {
            icon: Settings,
            title: "System Settings",
            desc: "Manage global platform configurations and user roles.",
          },
        ].map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 sm:p-6 border border-purple-200 shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
          >
            <Icon className="text-purple-700 mb-3" size={26} />
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Adminhome;
