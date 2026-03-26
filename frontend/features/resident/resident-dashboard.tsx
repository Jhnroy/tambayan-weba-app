"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { DashboardHeader } from "@/components/features/resident/dashboard-header";
import { EventCard } from "@/components/features/resident/event-card";
import { EventFilters } from "@/components/features/resident/event-filters";
import { WelcomeBanner } from "@/components/features/resident/welcome-banner";
import { ResidentSidebar } from "@/components/resident-sidebar";

type Event = {
  id: number;
  category: "Cleanup" | "Feeding" | "Seminar" | "Other";
  title: string;
  date: string;
  location: string;
  organizer: string;
  slots: string;
  rawSlots: number;
  slotLimit: number;
  status: string;
};

export const ResidentDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  
  const [search, setSearch] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const reverseEventTypeMap: Record<string, Event["category"]> = {
    "FEEDING PROGRAM": "Feeding",
    CLEANUP: "Cleanup",
    SEMINAR: "Seminar",
  };

  const normalizeType = (type: string) => {
    return reverseEventTypeMap[type] || "Other";
  };

  // FETCH EVENTS
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/events`);

      const formatted = res.data.data
        .map((item: any) => {
          const attr = item.attributes || item;

          return {
            id: item.id,
            category: normalizeType(attr.eventType),
            title: attr.title ?? "No title",
            date: attr.dateTime
              ? new Date(attr.dateTime).toLocaleDateString()
              : "No date",
            location: attr.location ?? "No location",
            organizer: attr.organizer ?? "Organizer",
            slots: `${attr.availableSlots ?? 0}/${attr.slotLimit ?? 0}`,
            rawSlots: attr.availableSlots ?? 0,
            slotLimit: attr.slotLimit ?? 0,
            status: attr.stats,
          };
        })
        .filter((event: Event) => event.status === "ACTIVE");

      setEvents(formatted);
    } catch (err: any) {
      console.error("FETCH ERROR:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6">Loading events...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 hidden md:block border-r bg-white">
        <ResidentSidebar />
      </div>

      <div className="flex-1 p-4 md:p-8">
        
        <DashboardHeader search={search} onSearch={setSearch} />

        <WelcomeBanner name="Resident" />

        <EventFilters />

      
        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No available events
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};