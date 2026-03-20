import { ResidentSidebar } from "@/components/resident-sidebar";
import React from "react";

const events = [
  {
    category: "Cleanup",
    title: "Barangay Cleanup Drive",
    date: "Mar 22, 2025 • 7:00 AM",
    location: "Brgy. Sta. Cruz, Main Street",
    organizer: "Brgy. Officials Task Force",
    slots: "12/20",
  },
  {
    category: "Feeding",
    title: "Community Feeding Program",
    date: "Mar 25, 2025 • 9:00 AM",
    location: "Brgy. Hall Covered Court",
    organizer: "Sagi Kapit NGO",
    slots: "3/30",
  },
  {
    category: "Seminar",
    title: "Livelihood Skills Seminar",
    date: "Mar 28, 2025 • 1:00 PM",
    location: "DOST Barangay Office",
    organizer: "DOST District 1",
    slots: "20/50",
  },
  {
    category: "Other",
    title: "Blood Donation Drive",
    date: "Apr 2, 2025 • 8:00 AM",
    location: "Brgy. Health Center",
    organizer: "Philippine Red Cross",
    slots: "15/40",
  },
  {
    category: "Cleanup",
    title: "Tree Planting Activity",
    date: "Apr 5, 2025 • 6:30 AM",
    location: "Quezon Circle, QC",
    organizer: "LGU Environment Team",
    slots: "7/35",
  },
];

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "Cleanup":
      return "bg-blue-50 text-blue-600";
    case "Feeding":
      return "bg-orange-50 text-orange-600";
    case "Seminar":
      return "bg-green-50 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const ResidentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      
      <div className="w-64 hidden md:block border-r bg-white">
        <ResidentSidebar />
      </div>

     
      <div className="flex-1 p-4 md:p-8">

       
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Event Feed</h1>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full md:w-64 px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border">
              🔔
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-5 md:p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Hi, Maria </h2>
            <p className="text-sm opacity-90">
              3 new community events near you this week
            </p>
          </div>
          <div className="hidden md:flex text-3xl opacity-80">🌍</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Cleanup", "Feeding", "Seminar", "Other"].map((filter, i) => (
            <button
              key={filter}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                i === 0
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => {
            const [taken, total] = event.slots.split("/").map(Number);
            const percentage = (taken / total) * 100;

            return (
              <div
                key={index}
                className="bg-white border-gray-500  p-2 rounded-2xl  flex flex-col justify-between shadow-md 
                hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                
                <div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryStyle(
                      event.category
                    )}`}
                  >
                    {event.category}
                  </span>

                  <h3 className="mt-3 font-semibold text-base text-gray-800 leading-snug">
                    {event.title}
                  </h3>

                  <div className="mt-3 space-y-1 text-xs text-gray-500">
                    <p>Date: {event.date}</p>
                    <p>Loc: {event.location}</p>
                    <p className="text-gray-400"> {event.organizer}</p>
                  </div>
                </div>

           
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Slots</span>
                    <span className="font-medium">{event.slots}</span>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full mb-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition">
                    Sign Up
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};