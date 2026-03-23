"use client";

import React, { useState } from "react";

import { MobileSidebar } from "@/components/features/organizer/mobile-sidebar";
import { EventHeader } from "@/components/features/organizer/event-header";
import { EventFilters } from "@/components/features/organizer/event-filters";
import { EventCard } from "@/components/features/organizer/event-card";
import { EventRow } from "@/components/features/organizer/event-row";
import { OrganizerSidebar } from "@/components/organizer-sidebar";


export type EventStatus = "Pending" | "Completed" | "Upcoming";
export type EventCategory = "Feeding" | "Cleanup" | "Seminar" | "Other";

type EventType = {
  id: number;
  title: string;
  type: EventCategory; 
  date: string;
  slots: string | number;
  status: EventStatus;
};

const eventsData: EventType[] = [
  {
    id: 1,
    title: "Community Feeding Program",
    type: "Feeding",
    date: "Mar 25, 2025",
    slots: "27/30",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Barangay Cleanup Drive",
    type: "Cleanup",
    date: "Mar 22, 2025",
    slots: "18/20",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "TESDA Skills Workshop",
    type: "Seminar",
    date: "Mar 10, 2025",
    slots: "45/50",
    status: "Completed",
  },
  {
    id: 4,
    title: "Blood Donation Drive",
    type: "Other",
    date: "Apr 2, 2025",
    slots: "5/40",
    status: "Upcoming",
  },
];

export const MyEvent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] =
    useState<EventCategory | "All">("All");

  const [filterStatus, setFilterStatus] =
    useState<EventStatus | "All">("All");

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "All" || event.type === filterType;

    const matchesStatus =
      filterStatus === "All" || event.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>

      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 p-3 sm:p-4 md:p-8">
        
        <div className="md:hidden mb-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full text-sm"
          >
            ☰ Menu
          </button>
        </div>

        <EventHeader />

        <EventFilters
          search={search}
          setSearch={setSearch}
          filterType={filterType}
          setFilterType={setFilterType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* MOBILE */}
        <div className="md:hidden space-y-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No events found
            </div>
          )}
        </div>

        
        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
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
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventRow key={event.id} event={event} />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};