"use client";

import { OrganizerSidebar } from "@/components/organizer-sidebar";
import React, { useState, useEffect } from "react";
import API from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

/* ================= TYPES ================= */

type EventPayload = {
  title: string;
  description: string;
  dateTime: string;
  location: string;
  eventType: string;
  slotLimit: number;
  availableSlots: number;
  stats: "ACTIVE" | "CANCELLED";
  users_permissions_user: {
    connect: { id: number }[];
  };
};

type UserRole = {
  id: number;
  Stats: "PENDING" | "APPROVED";
  userRole: "ORGANIZER" | "RESIDENT";
};

type StrapiResponse<T> = {
  data: T[];
};

type StrapiError = {
  error?: {
    message?: string;
  };
};

/* ================= CONSTANTS ================= */

const EVENT_TYPES = [
  "Cleanup",
  "Tree Planting",
  "Relief Operation",
  "Basketball",
  "Volleyball",
  "Meeting",
  "Seminar",
  "Workshop",
  "Feeding Program",
  "Medical Mission",
  "Fundraising",
  "Community Service",
];

const EVENT_TYPE_MAP: Record<string, string> = {
  "Cleanup": "CLEANUP",
  "Tree Planting": "TREE PLANTING",
  "Relief Operation": "RELIEF OPERATION",
  "Basketball": "BASKETBALL",
  "Volleyball": "VOLLEYBALL",
  "Meeting": "MEETING",
  "Seminar": "SEMINAR",
  "Workshop": "WORKSHOP",
  "Feeding Program": "FEEDING PROGRAM",
  "Medical Mission": "MEDICAL MISSION",
  "Fundraising": "FUNDRAISING",
  "Community Service": "COMMUNITY SERVICE",
};

/* ================= COMPONENT ================= */

export const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    eventType: "Cleanup",
    slotLimit: "",
    stats: "ACTIVE",
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  

  const { data: roleData, isLoading } = useQuery<UserRole | null>({
    queryKey: ["user-role", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await API.get<StrapiResponse<UserRole>>(
        `/api/user-roles?filters[users_permissions_user][id][$eq]=${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.data?.[0] ?? null;
    },
  });

  const canCreateEvent =
    roleData?.Stats === "APPROVED" &&
    roleData?.userRole === "ORGANIZER";


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const slotNumber = Number(form.slotLimit) || 0;
  const formattedDateTime =
    form.date && form.time
      ? new Date(`${form.date}T${form.time}`).toLocaleString()
      : "Not set";

 

  const { mutate, isPending } = useMutation<
    any,
    AxiosError<StrapiError>,
    EventPayload
  >({
    mutationFn: async (payload) => {
      const token = localStorage.getItem("token");

      return API.post(
        "/api/events",
        { data: payload },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      alert("Event created successfully!");
      window.location.reload();
    },
    onError: (err) => {
      alert(err.response?.data?.error?.message || "Failed to create event");
    },
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canCreateEvent) return alert("Not allowed");

    const dateTime = new Date(`${form.date}T${form.time}`);

    if (isNaN(dateTime.getTime()))
      return alert("Invalid date/time");

    if (slotNumber <= 0)
      return alert("Slot must be greater than 0");

    const payload: EventPayload = {
      title: form.title,
      description: form.description,
      dateTime: dateTime.toISOString(),
      location: form.location,
      eventType: EVENT_TYPE_MAP[form.eventType],
      slotLimit: slotNumber,
      availableSlots: slotNumber,
      stats: form.stats,
      users_permissions_user: {
        connect: [{ id: user.id }],
      },
    };

    mutate(payload);
  };



  if (!user || isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl font-semibold mb-4">
          Create New Event
        </h1>

        {!canCreateEvent && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded">
            Only <b>APPROVED ORGANIZERS</b> can create events.
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 max-w-3xl relative">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <input name="title" value={form.title} onChange={handleChange}
              className="w-full border p-2 rounded" placeholder="Event Title" required />

            <textarea name="description" value={form.description} onChange={handleChange}
              className="w-full border p-2 rounded" placeholder="Description" required />

            <div className="grid grid-cols-2 gap-4">
              <select name="eventType" value={form.eventType} onChange={handleChange}
                className="border p-2 rounded">
                {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>

              <input type="number" name="slotLimit" value={form.slotLimit}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Slots"
                required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="date" value={form.date}
                onChange={handleChange} className="border p-2 rounded" required />

              <input type="time" name="time" value={form.time}
                onChange={handleChange} className="border p-2 rounded" required />
            </div>

            <input name="location" value={form.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Location" required />

            <select name="stats" value={form.stats}
              onChange={handleChange}
              className="border p-2 rounded">
              <option value="ACTIVE">ACTIVE</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <button type="submit"
              disabled={!canCreateEvent || isPending}
              className="bg-orange-500 text-white px-4 py-2 rounded">
              {isPending ? "Creating..." : "Publish Event"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};