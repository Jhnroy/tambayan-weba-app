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
    details?: any;
  };
};

/* ================= CONSTANTS ================= */

// UI VALUES
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

// MAP → STRAPI ENUM
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    eventType: "Cleanup",
    slotLimit: "",
    stats: "ACTIVE", // ✅ default
  });

  const [user, setUser] = useState<any>(null);

  /* ================= GET USER ================= */

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      }
    } catch {
      console.error("Invalid user in storage");
    }
  }, []);

  /* ================= FETCH ROLE ================= */

  const { data: roleData, isLoading } = useQuery<UserRole | null>({
    queryKey: ["user-role", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get<StrapiResponse<UserRole>>(
          `/api/user-roles?filters[users_permissions_user][id][$eq]=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res.data.data?.[0] ?? null;
      } catch (err) {
        console.error("Role fetch error:", err);
        return null;
      }
    },
  });

  /* ================= PERMISSIONS ================= */

  const isApproved = roleData?.Stats === "APPROVED";
  const isOrganizer = roleData?.userRole === "ORGANIZER";
  const canCreateEvent = isApproved && isOrganizer;

  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= MUTATION ================= */

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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: () => {
      alert("Event created successfully!");
      window.location.reload();
    },

    onError: (err) => {
      console.error("FULL ERROR:", err);

      if (err.response) {
        console.error("STATUS:", err.response.status);
        console.error("DATA:", err.response.data);
      }

      alert(
        err.response?.data?.error?.message ||
        err.message ||
        "Failed to create event"
      );
    },
  });

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canCreateEvent) {
      alert("Only approved organizers can create events.");
      return;
    }

    if (!user?.id) {
      alert("User not found");
      return;
    }

    const dateTime = new Date(`${form.date}T${form.time}`);

    if (isNaN(dateTime.getTime())) {
      alert("Invalid date/time");
      return;
    }

    const slot = Number(form.slotLimit);

    if (!slot || slot <= 0) {
      alert("Invalid slot limit");
      return;
    }

    const mappedEventType = EVENT_TYPE_MAP[form.eventType];

    if (!mappedEventType) {
      alert("Invalid event type");
      return;
    }

    const payload: EventPayload = {
      title: form.title,
      description: form.description,
      dateTime: dateTime.toISOString(),
      location: form.location,
      eventType: mappedEventType,
      slotLimit: slot,
      availableSlots: slot,
      stats: form.stats,
      users_permissions_user: {
        connect: [{ id: user.id }],
      },
    };

    mutate(payload);
  };

  /* ================= UI ================= */

  if (!user || isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl font-semibold mb-4">Create New Event</h1>

        {!canCreateEvent && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded">
            Only <b>APPROVED ORGANIZERS</b> can create events.
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 max-w-3xl relative">
          {!canCreateEvent && (
            <div className="absolute inset-0 bg-white/60 z-10 rounded-xl"></div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Event Title"
              disabled={!canCreateEvent}
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Description"
              disabled={!canCreateEvent}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                className="border p-2 rounded"
                disabled={!canCreateEvent}
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              <input
                type="number"
                name="slotLimit"
                value={form.slotLimit}
                onChange={handleChange}
                className="border p-2 rounded"
                disabled={!canCreateEvent}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border p-2 rounded"
                disabled={!canCreateEvent}
                required
              />
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="border p-2 rounded"
                disabled={!canCreateEvent}
                required
              />
            </div>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Location"
              disabled={!canCreateEvent}
              required
            />

            
            <select
              name="stats"
              value={form.stats}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={!canCreateEvent}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <button
              type="submit"
              disabled={!canCreateEvent || isPending}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              {isPending ? "Creating..." : "Publish Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};