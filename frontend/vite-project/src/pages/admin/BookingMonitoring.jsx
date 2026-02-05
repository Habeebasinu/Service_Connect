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
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <h2 className="mb-8 text-center text-3xl font-bold text-purple-700">
        Booking List
      </h2>

      {inp.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {inp.map((item, index) => (
            <div
              key={item._id || index}
              className="rounded-xl bg-white border border-purple-200 p-6 shadow-md
                         hover:shadow-purple-300/40 hover:-translate-y-1
                         transition-all duration-300"
            >
              <p className="mb-2">
                <span className="font-semibold text-purple-700">Name:</span>{" "}
                {item.name}
              </p>

              <p className="mb-2">
                <span className="font-semibold text-purple-700">Date:</span>{" "}
                {item.date}
              </p>

              <p>
                <span className="font-semibold text-purple-700">Status:</span>{" "}
                <span className="font-bold text-green-600">
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
