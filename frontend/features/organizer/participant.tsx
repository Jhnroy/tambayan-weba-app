"use client";

import { OrganizerSidebar } from "@/components/organizer-sidebar";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Participation = {
  id: number;
  Stats: string;
  event: {
    title: string;
    location: string;
    dateTime: string;
  } | null;
  users_permissions_user: {
    username: string;
    email: string;
  } | null;
};

export const Participant = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    setToken(storedToken);
  }, []);

  // ✅ FIXED FETCH (NO MORE EXTRA API CALLS)
  const fetchParticipants = async (): Promise<Participation[]> => {
    if (!token) return [];

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/participations?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("FIXED DATA:", res.data);

    return res.data.data.map((item: any) => {
      return {
        id: item.id,
        Stats: item.Stats,

        event: item.event
          ? {
              title: item.event.title,
              location: item.event.location,
              dateTime: item.event.dateTime,
            }
          : null,

        users_permissions_user: item.users_permissions_user
          ? {
              username: item.users_permissions_user.username,
              email: item.users_permissions_user.email,
            }
          : null,
      };
    });
  };

  const {
    data: participants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["participants", token],
    queryFn: fetchParticipants,
    enabled: !!token,
  });

  if (token === null) {
    return <p className="p-6">Checking authentication...</p>;
  }

  if (!token) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          You are not logged in. Please login first.
        </p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Participants</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* SIDEBAR */}
      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 mt-16 md:mt-0">
        <h2 className="text-2xl font-bold mb-4">
          All Signed-up Residents
        </h2>

        {isLoading && <p>Loading...</p>}

        {isError && (
          <p className="text-red-500">
            Failed to load participants
          </p>
        )}

        {!isLoading && participants.length === 0 && (
          <p>No participants found.</p>
        )}

        <div className="space-y-4">
          {participants.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h3 className="font-semibold text-lg">
                {p.users_permissions_user?.username ?? "No Name"}
              </h3>

              <p className="text-sm text-gray-500">
                {p.users_permissions_user?.email ?? "No Email"}
              </p>

              <div className="mt-2 text-sm">
                <p>
                  <span className="font-medium">Event:</span>{" "}
                  {p.event?.title ?? "No Event"}
                </p>

                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {p.event?.location ?? "N/A"}
                </p>

                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {p.event?.dateTime
                    ? new Date(p.event.dateTime).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                {p.Stats}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};