import React from "react";

const events = [
  {
    title: "Community Feeding Program",
    type: "Feeding",
    date: "Mar 25, 2025",
    slots: "27/30",
    status: "Active",
  },
  {
    title: "Barangay Cleanup Drive",
    type: "Cleanup",
    date: "Mar 22, 2025",
    slots: "18/20",
    status: "Active",
  },
  {
    title: "TESDA Skills Workshop",
    type: "Seminar",
    date: "Mar 10, 2025",
    slots: "45/50",
    status: "Completed",
  },
  {
    title: "Blood Donation Drive",
    type: "Other",
    date: "Apr 2, 2025",
    slots: "5/40",
    status: "Active",
  },
];

export const MyEvent = () => {
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Events</h1>
          <p className="text-gray-500 text-sm">
            All events created by Sagip Kapatid NGO
          </p>
        </div>

        <button className="mt-3 md:mt-0 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          + New Event
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-6 py-3">Title</th>
              <th className="text-left px-6 py-3">Type</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Slots</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4 font-medium">{event.title}</td>

                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                    {event.type}
                  </span>
                </td>

                <td className="px-6 py-4">{event.date}</td>

                <td className="px-6 py-4">{event.slots}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      event.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-2 flex-wrap">
                  {event.status !== "Completed" && (
                    <>
                      <button className="px-3 py-1 border rounded text-blue-600 hover:bg-blue-50">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                        Delete
                      </button>
                    </>
                  )}

                  {event.status === "Completed" && (
                    <button className="px-3 py-1 border rounded text-gray-600">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};