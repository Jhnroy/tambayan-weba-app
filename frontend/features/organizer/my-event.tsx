"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { MobileSidebar } from "@/components/features/organizer/mobile-sidebar";
import { EventHeader } from "@/components/features/organizer/event-header";
import { EventFilters } from "@/components/features/organizer/event-filters";
import { EventCard } from "@/components/features/organizer/event-card";
import { OrganizerSidebar } from "@/components/organizer-sidebar";

export type EventStatus = "Pending" | "Completed" | "Upcoming";
export type EventCategory = "Feeding" | "Cleanup" | "Seminar" | "Other";

type EventType = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  eventType: string;
  slotLimit: number;
  availableSlots: number;
  stats: string;
};

export const MyEvent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] =
    useState<EventCategory | "All">("All");
  const [filterStatus, setFilterStatus] =
    useState<EventStatus | "All">("All");

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] =
    useState<EventType | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // =========================
  // MAPPINGS
  // =========================

  const eventTypeMap: Record<string, string> = {
    Feeding: "FEEDING PROGRAM",
    Cleanup: "CLEANUP",
    Seminar: "SEMINAR",
    Other: "COMMUNITY SERVICE",
  };

  const reverseEventTypeMap: Record<string, EventCategory> = {
    "FEEDING PROGRAM": "Feeding",
    CLEANUP: "Cleanup",
    SEMINAR: "Seminar",
  };

  const statusMap: Record<string, string> = {
    Upcoming: "ACTIVE",
    Completed: "COMPLETED",
    Pending: "ACTIVE",
  };

  const reverseStatusMap: Record<string, EventStatus> = {
    ACTIVE: "Upcoming",
    COMPLETED: "Completed",
    CANCELLED: "Pending",
  };

  const normalizeType = (type: string) =>
    reverseEventTypeMap[type] || "Other";

  const normalizeStatus = (status: string) =>
    reverseStatusMap[status] || "Pending";

  // =========================
  // FETCH (FIXED)
  // =========================

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/events`);

      console.log("RAW:", res.data);

      const formatted = res.data.data.map((item: any) => {
        const attr = item.attributes || item;

        return {
          id: item.id,
          documentId: item.documentId ?? item.id.toString(),
          title: attr.title ?? "No title",
          description: attr.description ?? "",
          dateTime: attr.dateTime ?? "",
          location: attr.location ?? "",
          eventType: normalizeType(attr.eventType),
          slotLimit: attr.slotLimit ?? 0,
          availableSlots: attr.availableSlots ?? 0,
          stats: normalizeStatus(attr.stats),
        };
      });

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

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (event: EventType) => {
    if (!confirm("Delete this event?")) return;

    try {
      await axios.delete(
        `${API_URL}/api/events/${event.documentId}`
      );

      setEvents((prev) =>
        prev.filter((e) => e.documentId !== event.documentId)
      );
    } catch (err: any) {
      console.error("DELETE ERROR:", err.response?.data || err);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleChange = (e: any) => {
    if (!selectedEvent) return;

    const { name, value } = e.target;

    setSelectedEvent({
      ...selectedEvent,
      [name]:
        name === "slotLimit" || name === "availableSlots"
          ? Number(value)
          : value,
    });
  };

  const handleSave = async () => {
    if (!selectedEvent) return;

    try {
      const payload = {
        title: selectedEvent.title,
        description: selectedEvent.description,
        dateTime: selectedEvent.dateTime
          ? new Date(selectedEvent.dateTime).toISOString()
          : null,
        location: selectedEvent.location,
        eventType: eventTypeMap[selectedEvent.eventType],
        slotLimit: Number(selectedEvent.slotLimit),
        availableSlots: Number(selectedEvent.availableSlots),
        stats: statusMap[selectedEvent.stats],
      };

      await axios.put(
        `${API_URL}/api/events/${selectedEvent.documentId}`,
        { data: payload }
      );

      setEvents((prev) =>
        prev.map((e) =>
          e.documentId === selectedEvent.documentId
            ? selectedEvent
            : e
        )
      );

      setIsModalOpen(false);
    } catch (err: any) {
      console.error(
        "UPDATE ERROR:",
        JSON.stringify(err.response?.data, null, 2)
      );
    }
  };

  // =========================
  // FILTER
  // =========================

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "All" ||
      event.eventType
        .toLowerCase()
        .includes(filterType.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      event.stats
        .toLowerCase()
        .includes(filterStatus.toLowerCase());

    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>

      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 p-3 sm:p-4 md:p-8">
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
          {filteredEvents.map((event) => (
            <div key={event.documentId}>
              <EventCard
                event={{
                  id: event.id,
                  title: event.title,
                  type: event.eventType as EventCategory,
                  description: event.description,
                  date: event.dateTime
                    ? new Date(event.dateTime).toLocaleDateString()
                    : "No date",
                  slots: `${event.availableSlots}/${event.slotLimit}`,
                  status: event.stats as EventStatus,
                }}
              />

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-6 py-3 font-semibold">Title</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Slots</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.documentId} className="border-t">
                  <td className="px-6 py-3">{event.title}</td>
                  <td className="px-6 py-3">{event.eventType}</td>
                  <td className="px-6 py-3">
                    {event.dateTime
                      ? new Date(event.dateTime).toLocaleDateString()
                      : "No date"}
                  </td>
                  <td className="px-6 py-3">
                    {event.availableSlots}/{event.slotLimit}
                  </td>
                  <td className="px-6 py-3">{event.stats}</td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">
            <h2 className="font-bold text-lg">Edit Event</h2>

            <input name="title" value={selectedEvent.title} onChange={handleChange} className="w-full border p-2" />
            <input name="description" value={selectedEvent.description} onChange={handleChange} className="w-full border p-2" />
            
            <input
              type="date"
              name="dateTime"
              value={
                selectedEvent.dateTime
                  ? selectedEvent.dateTime.split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full border p-2"
            />

            <input name="location" value={selectedEvent.location} onChange={handleChange} className="w-full border p-2" />

            <select name="eventType" value={selectedEvent.eventType} onChange={handleChange} className="w-full border p-2">
              <option>Feeding</option>
              <option>Cleanup</option>
              <option>Seminar</option>
              <option>Basketball</option>
              <option>Sports</option>
              <option>Training</option>
              <option>Other</option>
            </select>

            <input type="number" name="slotLimit" value={selectedEvent.slotLimit} onChange={handleChange} className="w-full border p-2" />
            <input type="number" name="availableSlots" value={selectedEvent.availableSlots} onChange={handleChange} className="w-full border p-2" />

            <select name="stats" value={selectedEvent.stats} onChange={handleChange} className="w-full border p-2">
              <option>Pending</option>
              <option>Completed</option>
              <option>Upcoming</option>
            </select>

            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-3 py-1 rounded">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};