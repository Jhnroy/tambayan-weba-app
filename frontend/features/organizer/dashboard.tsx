"use client";

import React, { useState, useEffect } from "react";
import { OrganizerSidebar } from "@/components/organizer-sidebar";
import { Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventTypesChart } from "@/components/features/organizer/graph/event-graph";
import { VolunteerChart } from "@/components/features/organizer/graph/volunteer-graph";
import { useQuery, useMutation } from "@tanstack/react-query";
import API from "@/lib/api";
import type { AxiosError } from "axios";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
};

type UserRole = {
  id: number;
  documentId: string; // ✅ IMPORTANT
  name: string;
  position: string;
  organizationType: string;
  Stats: "PENDING" | "APPROVED";
};

const POSITIONS = [
  "Barangay Captain",
  "Barangay Kagawad",
  "SK Chairman",
  "SK Kagawad",
  "Event Organizer",
  "Volunteer Coordinator",
  "Program Head",
  "Project Manager",
];

const ORG_TYPES = [
  "Barangay",
  "NGO",
  "School",
  "Private Group",
  "Government Agency",
  "Youth Organization",
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [orgType, setOrgType] = useState("");
  const [user, setUser] = useState<any>(null);

  // ✅ Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  
    const {
    data: roleData,
    refetch,
    isLoading,
  } = useQuery<UserRole | null>({
    queryKey: ["user-role", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const res = await API.get(
        `/api/user-roles?filters[users_permissions_user][id][$eq]=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const raw = res.data?.data?.[0];
      if (!raw) return null;

      console.log("RAW ROLE:", raw); 

      return {
        id: raw.id,
        documentId: raw.documentId, 
        name: raw.name,
        position: raw.position,
        organizationType: raw.organizationType,
        Stats: raw.Stats,
      };
    },
  });

  
  useEffect(() => {
    if (roleData) {
      setPosition(roleData.position || "");
      setOrgType(roleData.organizationType || "");
    }
  }, [roleData]);

  
  const { mutate, isPending } = useMutation({
  mutationFn: async () => {
    if (!roleData?.documentId) {
      throw new Error("No existing role. Contact admin.");
    }

    if (!position || !orgType) {
      throw new Error("Missing fields");
    }

    const token = localStorage.getItem("token");

    console.log("UPDATING DOCUMENT ID:", roleData.documentId);

    return API.put(
      `/api/user-roles/${roleData.documentId}`, 
      {
        data: {
          position,
          organizationType: orgType,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  onSuccess: () => {
    alert("Updated!");
    refetch();
  },

  onError: (err: AxiosError<any>) => {
    console.error(err.response?.data);
    alert(err.response?.data?.error?.message || "Update failed");
  },
});

  const handleSubmit = () => {
    if (!position || !orgType) {
      alert("Fill all fields");
      return;
    }
    mutate();
  };

  const isApproved = roleData?.Stats === "APPROVED";
  const isPendingStatus = roleData?.Stats === "PENDING";

  if (!user) return <p className="p-4">Loading user...</p>;
  if (isLoading) return <p className="p-4">Loading dashboard...</p>;

  const volunteerData = [
    { name: "Jan", signups: 40 },
    { name: "Feb", signups: 60 },
    { name: "Mar", signups: 90 },
  ];

  const eventData = [
    { type: "Cleanup", value: 40 },
    { type: "Feeding", value: 35 },
    { type: "Seminar", value: 25 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="w-64 bg-white h-full p-4">
            <button onClick={() => setSidebarOpen(false)}>Close</button>
            <OrganizerSidebar />
          </div>
        </div>
      )}

      <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <h2 className="text-2xl font-bold">Organizer Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <StatCard title="Status" value={roleData?.Stats || "-"} subtitle="Verification" />
          <StatCard title="Position" value={position || "-"} subtitle="Role" />
          <StatCard title="Type" value={orgType || "-"} subtitle="Org Type" />
          {/* <StatCard title="User ID" value={user?.id || "-"} subtitle="Account" /> */}
        </div>

        <Card className="mt-6 rounded-2xl border bg-blue-50">
          <CardContent className="p-5 space-y-4">
            <h3 className="text-lg font-semibold">Organizer Verification</h3>

            {isPendingStatus && (
              <p className="text-yellow-600 text-sm">
                Waiting for admin approval...
              </p>
            )}

            {isApproved && (
              <p className="text-green-600 text-sm">
                You are verified!
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-3">
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="border p-2 rounded"
                disabled={isApproved}
              >
                <option value="">Select Position</option>
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>

              <select
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                className="border p-2 rounded"
                disabled={isApproved}
              >
                <option value="">Select Type</option>
                {ORG_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!roleData?.documentId || isApproved || isPending}
            >
              {isPending ? "Saving..." : "Update"}
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent>
              <h3 className="mb-4">Volunteer Sign-ups</h3>
              <VolunteerChart data={volunteerData} />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="mb-4">Event Types</h3>
              <EventTypesChart data={eventData} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </CardContent>
    </Card>
  );
}