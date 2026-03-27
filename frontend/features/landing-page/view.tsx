"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import API from "@/lib/api";

/* ================= TYPES ================= */

type Event = {
  id: number;
  title: string;
  dateTime: string;
  location: string;
  eventType: string;
  slotLimit: number;
  availableSlots: number;
};

/* ================= HELPERS ================= */

const getCategoryColor = (type: string) => {
  switch (type) {
    case "CLEANUP":
      return "bg-green-300";
    case "FEEDING PROGRAM":
      return "bg-yellow-300";
    case "SEMINAR":
      return "bg-blue-300";
    case "MEDICAL MISSION":
      return "bg-purple-300";
    case "BASKETBALL":
      return "bg-pink-300";
    default:
      return "bg-gray-300";
  }
};

const formatDate = (date: string) => {
  try {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "Invalid date";
  }
};

/* ================= COMPONENT ================= */

export const View = () => {
  const [search, setSearch] = useState("");

  /* ================= FETCH EVENTS ================= */

  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await API.get("/api/events");
      return res.data.data;
    },
  });

  /* ================= FILTER ================= */

  const filteredEvents = data?.filter((item: any) => {
    const event: Event = item;

    const keyword = search.toLowerCase();

    return (
      event.title?.toLowerCase().includes(keyword) ||
      event.eventType?.toLowerCase().includes(keyword) ||
      event.location?.toLowerCase().includes(keyword)
    );
  });
  
  return (
    <div className="min-h-screen bg-gray-100">
      
      
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-blue-700">Tambayan</h1>

        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-1 border rounded-md text-sm hover:bg-gray-100">
            Log in
          </Link>
          <Link href="/signup" className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Sign up
          </Link>
        </div>
      </nav>

     
      <section className="bg-linear-to-r from-blue-700 to-blue-500 text-white text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Find Your Community
        </h1>

        <p className="max-w-xl mx-auto text-sm md:text-base mb-6">
          Discover volunteer opportunities and community events in your barangay.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/signup" className="bg-yellow-400 text-black px-5 py-2 rounded-full font-medium hover:bg-yellow-300">
            Join as Resident
          </Link>

          <Link href="/login" className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-gray-200">
            Log in
          </Link>
        </div>
      </section>

      
      <div className="px-4 md:px-10 mt-6">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-full outline-none"
        />
      </div>

    
      <div className="px-4 md:px-10 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        {isLoading && <p>Loading events...</p>}
        {error && <p>Failed to load events</p>}

        {!isLoading && filteredEvents?.length === 0 && (
          <p>No matching events</p>
        )}

        {filteredEvents?.map((item: any) => {
          const event: Event = item;

          const takenSlots =
            (event.slotLimit || 0) - (event.availableSlots || 0);

          const progress =
            event.slotLimit > 0
              ? (takenSlots / event.slotLimit) * 100
              : 0;

          return (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
            
              <div
                className={`h-28 ${getCategoryColor(
                  event.eventType
                )} flex items-center justify-center text-white`}
              >
                <span className="text-sm font-semibold">
                  {event.eventType || "Event"}
                </span>
              </div>

             
              <div className="p-4">
                <h2 className="font-semibold text-sm mb-1">
                  {event.title || "No title"}
                </h2>

                <p className="text-xs text-gray-500 mb-2">
                  {formatDate(event.dateTime)}
                </p>

                <p className="text-xs text-gray-400 mb-2">
                  {event.location || "No location"}
                </p>

                
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div
                    className="bg-green-300 h-1 rounded-full mt-1"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {event.availableSlots} slots left
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};