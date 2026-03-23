"use client";

interface Event {
  title: string;
  type: string;
  date: string;
  slots: string | number;
  status: "Pending" | "Completed" | "Upcoming";
}

export const EventRow = ({ event }: { event: Event }) => {
  return (
    <tr className="border-t">
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
              : event.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {event.status}
        </span>
      </td>

      <td className="px-6 py-4 flex gap-2">
        {event.status !== "Completed" ? (
          <>
            <button className="px-3 py-1 border rounded text-blue-600">
              Edit
            </button>
            <button className="px-3 py-1 bg-red-100 text-red-600 rounded">
              Delete
            </button>
          </>
        ) : (
          <button className="px-3 py-1 border rounded text-gray-600">
            View
          </button>
        )}
      </td>
    </tr>
  );
};