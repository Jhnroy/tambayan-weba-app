"use client";

import { OrganizerSidebar } from "@/components/organizer-sidebar";
import React, { useState } from "react";

export const CreateEvent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="w-64 bg-white h-full shadow-lg p-4">
            <button
              className="mb-4 text-sm text-gray-500"
              onClick={() => setSidebarOpen(false)}
            >
              Close
            </button>
            <OrganizerSidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">

        {/* Mobile Menu Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            ☰ Menu
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Create New Event</h1>
          <p className="text-sm text-gray-500">
            Fill in the details for your community event
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
          <form className="space-y-4">

            {/* Event Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Event Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Barangay Cleanup Drive 2025"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                rows={4}
                placeholder="Describe what volunteers will do..."
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Event Type + Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Type *
                </label>
                <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  <option>Cleanup</option>
                  <option>Tree Planting</option>
                  <option>Relief Operation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Volunteer Slots *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 30"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Time *
                </label>
                <input
                  type="time"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Location *
              </label>
              <input
                type="text"
                placeholder="e.g. Brgy. Hall Covered Court, Sta. Cruz"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Publish Event
              </button>

              <button
                type="button"
                className="w-full sm:w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Save Draft
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};