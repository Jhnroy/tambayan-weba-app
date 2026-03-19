'use client';

import React from "react";
import Link from "next/link";

export const View = () => {
  const events = [
    {
      category: "Clean-up",
      title: "Barangay Clean-Up Drive — Purok 3",
      date: "Sun, Nov 12 • 8:00 AM",
      progress: 80,
      slots: 12,
      color: "bg-green-300",
    },
    {
      category: "Feeding",
      title: "Feeding Program for 30 Children",
      date: "Wed, Nov 15 • 7:00 AM",
      progress: 40,
      slots: 25,
      color: "bg-yellow-300",
    },
    {
      category: "Seminar",
      title: "Livelihood Seminar: Handicrafts",
      date: "Sat, Nov 18 • 9:00 AM",
      progress: 60,
      slots: 20,
      color: "bg-blue-300",
    },
    {
      category: "Medical",
      title: "Free Medical Mission",
      date: "Tue, Nov 21 • 6:00 AM",
      progress: 100,
      slots: 0,
      color: "bg-purple-300",
    },
    {
      category: "Cultural",
      title: "Basketball League — Barangay Cup",
      date: "Sun, Nov 26 • 2:00 PM",
      progress: 90,
      slots: 10,
      color: "bg-pink-300",
    },
    {
      category: "Livelihood",
      title: "Soap Making Program",
      date: "Thu, Nov 30 • 8:00 AM",
      progress: 50,
      slots: 15,
      color: "bg-yellow-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-blue-700">Tambayan</h1>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-1 border rounded-md text-sm hover:bg-gray-100"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-linear-to-r from-blue-700 to-blue-500 text-white text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Find Your Community
        </h1>

        <p className="max-w-xl mx-auto text-sm md:text-base mb-6">
          Discover volunteer opportunities and community events in your
          barangay. Sign up in one tap — confirmed by SMS.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/signup"
            className="bg-yellow-400 text-black px-5 py-2 rounded-full font-medium hover:bg-yellow-300"
          >
            Join as Resident
          </Link>

          <Link
            href="/login"
            className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-gray-200"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <div className="px-4 md:px-10 mt-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full md:w-1/3 px-4 py-2 border rounded-full outline-none"
          />

          <div className="flex flex-wrap gap-2">
            {[
              "All Events",
              "Clean-up",
              "Feeding",
              "Seminar",
              "Medical",
              "Livelihood",
              "Cultural",
            ].map((item, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EVENT CARDS */}
      <div className="px-4 md:px-10 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
          >
            
            <div
              className={`h-28 ${event.color} flex items-center justify-center text-white`}
            >
              <span className="text-sm font-semibold">
                {event.category}
              </span>
            </div>

            <div className="p-4">
              <h2 className="font-semibold text-sm mb-1">
                {event.title}
              </h2>

              <p className="text-xs text-gray-500 mb-2">
                {event.date}
              </p>

              <p className="text-xs text-gray-400 mb-2">
                Purok 3, Brgy. Holy Spirit, QC
              </p>

              <div className="w-full bg-gray-200 h-1 rounded-full">
                <div
                  className="bg-green-300 h-1 rounded-full mt-1"
                  style={{ width: `${event.progress}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {event.slots} slots left
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};