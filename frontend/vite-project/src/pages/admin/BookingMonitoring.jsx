import React, { useEffect, useState } from "react";
import { Allbooking } from "../../api/api.jsx";

function BookingMonitoring() {
  const [inp, setInp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Allbooking();
        const sort = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setInp(sort);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6 lg:p-8 w-full">
      
      <h2 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700">
        Booking List
      </h2>

      {inp.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {inp.map((item, index) => (
            <div
              key={item._id || index}
              className="rounded-xl bg-white border border-purple-200 p-4 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300"
            >
              <p className="mb-2 text-sm sm:text-base">
                <span className="font-semibold text-purple-700">Name:</span>{" "}
                {item.name}
              </p>

              <p className="mb-2 text-sm sm:text-base">
                <span className="font-semibold text-purple-700">Date:</span>{" "}
                {item.date}
              </p>

              <p className="text-sm sm:text-base">
                <span className="font-semibold text-purple-700">Status:</span>{" "}
                <span
                  className={`font-bold ${
                    item.status === "pending"
                      ? "text-yellow-600"
                      : item.status === "booked"
                      ? "text-purple-600"
                      : "text-green-600"
                  }`}
                >
                  {item.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingMonitoring;
