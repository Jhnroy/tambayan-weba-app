"use client";

import { useState } from "react";

interface Event {
  title: string;
  status: "Pending" | "Completed" | "Upcoming";
  date: string;
  type: string;
  slots: string | number;
}

export const EventCard = ({ event }: { event: Event }) => {
  const [showConfirm, setShowConfirm] = useState(false);

 
  const getProgress = () => {
    if (typeof event.slots === "string" && event.slots.includes("/")) {
      const [taken, total] = event.slots.split("/").map(Number);
      return (taken / total) * 100;
    }
    return 0;
  };

  const progress = getProgress();

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-sm">{event.title}</h2>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            event.status === "Completed"
              ? "bg-green-100 text-green-700"
              : event.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {event.status}
        </span>
      </div>

     
      <div className="text-xs text-gray-500">{event.date}</div>
      

      
      <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
        {event.type}
      </span>

      {/* Slots + Progress */}
      <div>
        <div className="text-xs mb-1">Slots: {event.slots}</div>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {event.status !== "Completed" ? (
          <>
            <button className="flex-1 px-2 py-1 border rounded text-blue-600 text-xs">
              Edit
            </button>

            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 px-2 py-1 bg-red-100 text-red-600 rounded text-xs"
            >
              Delete
            </button>
          </>
        ) : (
          <button className="w-full px-2 py-1 border rounded text-gray-600 text-xs">
            View
          </button>
        )}
      </div>

      {/* 🔴 Delete Confirmation */}
      {showConfirm && (
        <div className="mt-3 p-3 border rounded-lg bg-red-50">
          <p className="text-xs text-red-700 mb-2">
            Are you sure you want to delete this event?
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowConfirm(false);
                alert("Deleted (demo only)");
              }}
              className="flex-1 bg-red-500 text-white text-xs py-1 rounded"
            >
              Yes, Delete
            </button>

            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 border text-xs py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};