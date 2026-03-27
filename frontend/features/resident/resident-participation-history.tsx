"use client";

import { ResidentSidebar } from "@/components/resident-sidebar";
import { BellOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import API from "@/lib/api";

type Participation = {
  id: number;
  Stats: string;
  event: {
    id: number;
    title: string;
    dateTime: string;
    location: string;
    eventType: string;
  };
};

export const ResidentParticipationHistory = () => {
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<Participation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ GET USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ FETCH PARTICIPATIONS
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.id) return;

        const token = localStorage.getItem("token");

        const res = await API.get(
          `/api/participations?filters[users_permissions_user][id][$eq]=${user.id}&populate=event`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formatted = res.data.data.map((item: any) => ({
          id: item.id,
          Stats: item.Stats,
          event: item.event,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // ✅ EVENT STATUS FUNCTION
  const getEventStatus = (dateTime: string) => {
    if (!dateTime) return "Unknown";

    const now = new Date();
    const eventDate = new Date(dateTime);

    if (eventDate > now) return "Upcoming";

    // OPTIONAL: same day = ongoing
    const isSameDay =
      eventDate.toDateString() === now.toDateString();

    if (isSameDay) return "Ongoing";

    return "Past";
  };

  // ✅ SEARCH FILTER
  const filtered = data.filter((item) =>
    item.event?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 hidden md:block border-r bg-white">
        <ResidentSidebar />
      </div>

      <div className="flex-1 p-4 md:p-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Participation History
          </h1>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
              <BellOutlined />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-gray-500">Loading history...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No participation yet.</p>
        ) : (
          <div className="grid gap-4">
            {filtered.map((item) => {
              const status = getEventStatus(item.event?.dateTime);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.event?.title || "Untitled Event"}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(item.event?.dateTime).toLocaleString()}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.event?.location}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {/* JOIN STATUS */}
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.Stats === "JOINED"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.Stats}
                      </span>

                      {/* EVENT STATUS */}
                      <span
                        className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                          status === "Upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : status === "Ongoing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};