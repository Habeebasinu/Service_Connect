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
    <div className="p-8 min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-extrabold text-purple-700 mb-2">
        Provider Approval Requests
      </h1>
      <p className="text-gray-600 mb-6">
        Review and manage pending service provider registrations.
      </p>

      <div className="bg-white rounded-xl shadow-md p-6 border border-purple-200">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">
          Pending Providers
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-3">Provider Name</th>
                <th className="pb-3">Company Name</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((provider) => (
                <tr
                  key={provider._id}
                  className="border-b last:border-none hover:bg-purple-50 transition"
                >
                  <td className="py-4 flex items-center gap-3">
                    <img
                      src={provider.img}
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                    <span className="font-medium">
                      {provider.service}
                    </span>
                  </td>

                  <td>{provider.companyname}</td>
                  <td className="max-w-xs truncate">{provider.desc}</td>

                  <td>
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

                  <td className="flex gap-2 py-4">
                    {provider.approvalStatus !== "accept" && (
                      <button
                        onClick={() => handleApprove(provider._id)}
                        className="px-4 py-1.5 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                      >
                        Approve
                      </button>
                    )}
                    <button className="px-4 py-1.5 text-sm rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition">
                      Reject
                    </button>
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
