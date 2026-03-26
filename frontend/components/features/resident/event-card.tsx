"use client";

import React from "react";

type Event = {
  category: "Cleanup" | "Feeding" | "Seminar" | "Other";
  title: string;
  date: string;
  location: string;
  organizer: string;
  slots: string;
};

const categoryStyles = {
  Cleanup: {
    badge: "bg-blue-100 text-blue-700",
    border: "border-t-4 border-blue-500",
  },
  Feeding: {
    badge: "bg-orange-100 text-orange-700",
    border: "border-t-4 border-orange-500",
  },
  Seminar: {
    badge: "bg-green-100 text-green-700",
    border: "border-t-4 border-green-500",
  },
  Other: {
    badge: "bg-gray-200 text-gray-600",
    border: "border-t-4 border-gray-400",
  },
};

export const EventCard = ({ event }: { event: Event }) => {
  const [taken = 0, total = 1] = event.slots.split("/").map(Number);
  const percentage = Math.min((taken / total) * 100, 100);

  const style = categoryStyles[event.category] || categoryStyles.Other;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between hover:shadow-md transition ${style.border}`}
    >
      <div>
        {/* CATEGORY */}
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${style.badge}`}
        >
          {event.category.toUpperCase()}
        </span>

        {/* ✅ TITLE FIXED */}
        <h3 className="mt-2 font-semibold text-sm text-gray-800 leading-tight">
          {event.title || "Untitled Event"}
        </h3>

        {/* DETAILS */}
        <div className="mt-2 text-[11px] text-gray-500 space-y-0.5">
          <p>{event.date}</p>
          <p>{event.location}</p>
          <p className="text-gray-600">{event.organizer}</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-[11px] text-gray-500 mb-1">
          <span>Slots available</span>
          <span className="font-medium text-blue-600">
            {taken}/{total}
          </span>
        </div>

        <div className="w-full bg-gray-100 h-1.5 rounded-full mb-2 overflow-hidden">
          <div
            className="bg-blue-600 h-1.5 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <button className="text-[11px] bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </div>
  );
};