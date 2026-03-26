"use client";

import React, { useState } from "react";
import axios from "axios";

type Event = {
  id?: number;
  documentId?: string;
  category: "Cleanup" | "Feeding" | "Seminar" | "Other";
  title: string;
  date: string;
  location: string;
  organizer: string;
  slots: string; // format: "10/20"
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

type Props = {
  event: Event;
};

export const EventCard = ({ event }: Props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  // ✅ LOCAL SLOT STATE (IMPORTANT)
  const [localSlots, setLocalSlots] = useState(event.slots);

  // ✅ SLOT LOGIC
  const [taken, total] = (() => {
    if (!localSlots || !localSlots.includes("/")) return [0, 1];

    const parts = localSlots.split("/").map((n) => Number(n));

    return [
      isNaN(parts[0]) ? 0 : parts[0],
      isNaN(parts[1]) || parts[1] === 0 ? 1 : parts[1],
    ];
  })();

  const percentage = Math.min((taken / total) * 100, 100);
  const style = categoryStyles[event.category] || categoryStyles.Other;
  const isFull = taken >= total;

  const handleSignup = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in");
        return;
      }

      let eventId = event.id;

      // ✅ fallback via documentId
      if (!eventId && event.documentId) {
        const res = await axios.get(
          `${API_URL}/api/events?filters[documentId][$eq]=${event.documentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const eventData = res.data.data[0];
        if (!eventData) throw new Error("Event not found");

        eventId = eventData.id;
      }

      if (!eventId) {
        alert("Invalid event");
        return;
      }

      // ✅ get user
      let userId = null;
      try {
        const userRes = await axios.get(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        userId = userRes.data.id;
      } catch {}

      // ✅ CREATE PARTICIPATION
      await axios.post(
        `${API_URL}/api/participations`,
        {
          data: {
            event: eventId,
            Stats: "JOINED",
            ...(userId && { users_permissions_user: userId }),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔥 OPTIMISTIC SLOT UPDATE (UI ONLY)
      const newTaken = taken + 1;
      setLocalSlots(`${newTaken}/${total}`);

      setJoined(true);
    } catch (err: any) {
      console.error("FULL ERROR:", err);
      console.error("DATA:", err?.response?.data);

      alert(
        err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          err.message ||
          "Failed to join event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between hover:shadow-md transition ${style.border}`}
    >
      <div>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${style.badge}`}
        >
          {event.category.toUpperCase()}
        </span>

        <h3 className="mt-2 font-semibold text-sm text-gray-800 leading-tight">
          {event.title || "Untitled Event"}
        </h3>

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
            className="bg-blue-600 h-1.5 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={isFull || loading || joined}
          className={`text-[11px] px-3 py-1 rounded-md w-full transition
            ${
              isFull || joined
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          {loading
            ? "Signing up..."
            : joined
            ? "Joined"
            : isFull
            ? "Full"
            : "Sign Up"}
        </button>
      </div>
    </div>
  );
};