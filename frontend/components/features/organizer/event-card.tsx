"use client";

import { useState } from "react";

interface Event {
  title: string;
  description?: string;
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
      
      {/* 🔥 HEADER (IMPROVED) */}
      <div className="flex justify-between items-start gap-3">
        
        {/* LEFT SIDE */}
        <div className="flex-1">
          {/* Title */}
          <h2 className="font-semibold text-base leading-tight">
            {event.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">
            {event.description || "No description available"}
          </p>
        </div>

        {/* RIGHT SIDE (STATUS) */}
        <span
          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
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

      {/* Date */}
      <div className="text-xs text-gray-500">{event.date}</div>

      {/* Type */}
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