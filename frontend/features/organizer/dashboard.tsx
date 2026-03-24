"use client";

import React, { useState } from "react";
import { OrganizerSidebar } from "@/components/organizer-sidebar";
import { Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventTypesChart } from "@/components/features/organizer/graph/event-graph";
import { VolunteerChart } from "@/components/features/organizer/graph/volunteer-graph";

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const volunteerData = [
    { name: "Jan", signups: 40 },
    { name: "Feb", signups: 60 },
    { name: "Mar", signups: 90 },
    { name: "Apr", signups: 55 },
  ];

  const eventData = [
    { type: "Cleanup", value: 40 },
    { type: "Feeding", value: 35 },
    { type: "Seminar", value: 25 },
    { type: "Brgy Sports", value: 50 },
    { type: "Medical", value: 30 },
    { type: "Tree Planting", value: 20 },
    { type: "Relief Ops", value: 45 },
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

      <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold">Organizer Dashboard</h2>
          <Button className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto">
            + Create Event
          </Button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard title="Active Events" value="5" subtitle="+2 this month" />
          <StatCard title="Total Sign-ups" value="87" subtitle="+12 this week" />
          <StatCard title="Completed" value="64" subtitle="74% completion" />
          <StatCard title="Volunteer Hours" value="192" subtitle="+48 this month" />
        </div>

        
        <Card className="mt-6 rounded-2xl shadow-sm border border-blue-200 bg-blue-50">
          <CardContent className="p-5 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                Organizer Verification
              </h3>
              <p className="text-sm text-gray-600">
                Verify your organization to unlock full features like publishing
                events and managing volunteers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Organization Name"
                className="w-full border rounded-lg p-2 text-sm"
              />

              <select className="w-full border rounded-lg p-2 text-sm">
                <option>Select Organization Type</option>
                <option>Barangay</option>
                <option>NGO</option>
                <option>School</option>
                <option>Private Group</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <p className="text-xs text-gray-500">
                ⚠️ Verification usually takes 1–2 days
              </p>

              <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                Submit for Verification
              </Button>
            </div>
          </CardContent>
        </Card>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <Card className="lg:col-span-2 rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Volunteer Sign-ups</h3>
              <VolunteerChart data={volunteerData} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Event Types</h3>
              <EventTypesChart data={eventData} />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-2xl shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Recent Events</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Event</th>
                    <th>Date</th>
                    <th>Slots</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2">Community Feeding</td>
                    <td>Mar 25</td>
                    <td>27/30</td>
                    <td className="text-blue-500">Active</td>
                  </tr>
                  <tr>
                    <td className="py-2">Cleanup Drive</td>
                    <td>Mar 22</td>
                    <td>18/20</td>
                    <td className="text-blue-500">Active</td>
                  </tr>
                  <tr>
                    <td className="py-2">Skills Workshop</td>
                    <td>Mar 10</td>
                    <td>45/50</td>
                    <td className="text-green-600">Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-xs text-green-500">{subtitle}</p>
      </CardContent>
    </Card>
  );
}