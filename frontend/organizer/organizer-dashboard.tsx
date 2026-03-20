"use client";

import React, { useState } from "react";
import { OrganizerSidebar } from "@/components/organizer-sidebar";
import { Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
};

type ProgressProps = {
  label: string;
  value: number;
};

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <Card className="rounded-2xl shadow-md border hover:shadow-lg transition">
      <CardContent>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-xs text-green-500">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function Progress({ label, value }: ProgressProps) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full bg-muted h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}



export default function OrganizerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

     
      <div
        className={`fixed inset-0 z-50 flex transition-all duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
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

     
      <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold">Organizer Dashboard</h2>

          <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white">
            + Create Event
          </Button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard title="Active Events" value="5" subtitle="+2 this month" />
          <StatCard title="Total Sign-ups" value="87" subtitle="+12 this week" />
          <StatCard title="Completed" value="64" subtitle="74% completion" />
          <StatCard title="Volunteer Hours" value="192" subtitle="+48 this month" />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
         
          <Card className="lg:col-span-2 rounded-2xl shadow-md border hover:shadow-lg transition">
            <CardContent>
              <h3 className="font-semibold mb-4">Volunteer Sign-ups</h3>

              <div className="h-40 flex items-end gap-2">
                {[40, 60, 90, 55].map((h, i) => (
                  <div
                    key={i}
                    className="bg-blue-600 rounded w-full"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

         
          <Card className="rounded-2xl shadow-md border hover:shadow-lg transition">
            <CardContent>
              <h3 className="font-semibold mb-4">Event Types</h3>
              <Progress label="Cleanup" value={40} />
              <Progress label="Feeding" value={35} />
              <Progress label="Seminar" value={25} />
            </CardContent>
          </Card>
        </div>

       
        <Card className="mt-6 rounded-2xl shadow-md border hover:shadow-lg transition">
          <CardContent>
            <h3 className="font-semibold mb-4">Recent Events</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
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