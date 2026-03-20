import React, { useState } from "react";
import { OrganizerSidebar } from "@/components/organizer-sidebar";
import { Menu } from "lucide-react";

export const OrganizerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow w-full fixed top-0 left-0 z-50">
        <h1 className="font-semibold text-lg">Dashboard</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>

      {/* Sidebar (Mobile Drawer) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="bg-black/50 flex-1"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <div className="w-64 bg-white h-full shadow-lg">
            <OrganizerSidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0 mt-16 md:mt-0 p-4 md:p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-bold">
            Organizer Dashboard
          </h2>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full md:w-auto">
            + Create Event
          </button>
        </div>

        {/* Example Content Area */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">Card 1</div>
          <div className="bg-white p-4 rounded-xl shadow">Card 2</div>
          <div className="bg-white p-4 rounded-xl shadow">Card 3</div>
          <div className="bg-white p-4 rounded-xl shadow">Card 4</div>
        </div>

        {/* Charts / Tables Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow lg:col-span-2">
            Chart Area
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            Event Types
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          Recent Events Table
        </div>

      </div>
    </div>
  );
};