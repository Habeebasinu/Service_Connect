import React, { useEffect, useState } from "react";
import { viewallservices, approveProvider } from "../../api/api.jsx";

function ManageService() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await viewallservices();
        const sort = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProviders(sort);
      } catch (error) {
        console.log("No service found", error);
      }
    };
    fetchServices();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveProvider(id);
      setProviders((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, approvalStatus: "accept" } : p
        )
      );
    } catch (error) {
      console.log("Approve failed", error);
    }
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 min-h-screen bg-gray-50 w-full">

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-purple-700 mb-2">
        Provider Approval Requests
      </h1>

      <p className="text-gray-600 text-sm sm:text-base mb-6">
        Review and manage pending service provider registrations.
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-purple-200">

        <div className="overflow-x-auto">

          <table className=" w-full text-sm">

            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-gray-600">
                <th className="p-3">Provider Name</th>
                <th className="p-3">Company Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((provider) => (
                <tr
                  key={provider._id}
                  className="border-b hover:bg-purple-50 transition"
                >
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={provider.img}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <span className="font-medium">
                      {provider.service}
                    </span>
                  </td>

                  <td className="p-3">{provider.companyname}</td>

                  <td className="p-3 max-w-xs truncate">
                    {provider.desc}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        provider.approvalStatus === "accept"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {provider.approvalStatus || "Pending"}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {provider.approvalStatus !== "accept" && (
                        <button
                          onClick={() => handleApprove(provider._id)}
                          className="px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                        >
                          Approve
                        </button>
                      )}
                      <button className="px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {providers.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              No pending providers
            </p>
          )}

        </div>
      </div>

    </div>
  );
}

export default ManageService;
