"use client";

import React, { useState } from "react";
import {
  Home,
  Calendar,
  PenTool,
  Users,
  ClipboardCheck,
  Building2,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
export const OrganizerSidebar = () => {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h1 className="font-semibold text-lg">Tambayan</h1>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        {/* Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={closeSidebar}>
            <X />
          </button>
        </div>

        <div className="flex flex-col h-full border-r border-gray-200">

          {/* Profile */}
          <div className="p-6 flex flex-col items-center border-b">
            <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center mb-2">
              <Building2 className="text-blue-500" />
            </div>

            <h2 className="font-semibold text-gray-800">
              Sagip Kapatid NGO
            </h2>

            <p className="text-sm text-gray-500">
              Juan Dela Cruz • Organizer
            </p>

            <div className="flex flex-row gap-2 items-center">
              <span className="mt-2 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Organizer
              </span>
              <span className="mt-2 text-xs font-semibold text-emerald-600-600 bg-emerald-100 px-3 py-1 rounded-full">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto px-4 py-4">

            {/* OVERVIEW */}
            <ul className="space-y-1">
              <Link href="/organizer/dashboard">
                <li className="flex items-center gap-3 px-3 py-2 bg-blue-100 text-blue-600 rounded-md cursor-pointer">
                  <Home size={18} />
                  Dashboard
                </li>
              </Link>
            </ul>

            {/* EVENTS */}
            <p className="text-xs text-gray-400 font-semibold mt-6 mb-2">
              EVENTS
            </p>

            <ul className="space-y-1">
              <Link href="/organizer/my-event">
                <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <Calendar size={18} />
                  My Events
                </li>
              </Link>

              <Link href="/organizer/create-event">
                <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <PenTool size={18} />
                  Create Event
                </li>
              </Link>
            </ul>

            {/* VOLUNTEERS */}
            <p className="text-xs text-gray-400 font-semibold mt-6 mb-2">
              VOLUNTEERS
            </p>

            <ul className="space-y-1">
              <Link href="/organizer/participant">
                <li className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Users size={18} />
                    Participants
                  </div>
                  <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                    12
                  </span>
                </li>
              </Link>

              <Link href="/organizer/attendance">
                <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <ClipboardCheck size={18} />
                  Mark Attendance
                </li>
              </Link>
            </ul>

            {/* ACCOUNT */}
            <p className="text-xs text-gray-400 font-semibold mt-6 mb-2">
              ACCOUNT
            </p>

            <ul className="space-y-1">
            <Link href="/organizer/profile">
              <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                <Building2 size={18} />
                Organization Profile
              </li>
            </Link>

            <Link href="/organizer/notifications">
              <li className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                <div className="flex items-center gap-3">
                  <Bell size={18} />
                  Notifications
                </div>
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  2
                </span>
              </li>
            </Link>
          </ul>
          </div>

          {/* Logout */}
          <div className="p-4 border-t">
            <button className="flex items-center gap-3 text-gray-500 hover:text-red-500 w-full">
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};