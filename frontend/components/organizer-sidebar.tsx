"use client";

import React, { useState } from 'react'
import {
  Home,
  Calendar,
  PenTool,
  BarChart3,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export const OrganizerSidebar = () => {
  const [open, setOpen] = useState(false);
  return (

    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h1 className="font-semibold text-lg">Tambayan</h1>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
      >
      
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

       
        <div className="flex flex-col h-full justify-between border-r border-gray-300">
          <div>
            <div className="p-6 flex flex-col items-center border-b border-gray-300">
              <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center mb-2">
                <User className="text-blue-500" />
              </div>
              <h2 className="font-semibold text-gray-800">Maria Santos</h2>
              <p className="text-sm text-gray-500">
                Brgy. Sta. Cruz, Resident
              </p>
              <span className="mt-2 text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                VOLUNTEER
              </span> 
            </div>

           
            <div className="mt-4 px-4">
              <p className="text-xs text-gray-400 font-semibold mb-2">
               
              </p>
              <ul className="space-y-1">
                <li className="flex items-center gap-3 px-3 py-2 bg-blue-100 text-blue-600 rounded-md cursor-pointer">
                  <Home size={18} />
                  Event Feed
                </li>
                <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <Calendar size={18} />
                  Calendar
                </li>
              </ul>

             
              <p className="text-xs text-gray-400 font-semibold mt-6 mb-2">
                MY ACTIVITY
              </p>
              <ul className="space-y-1">
                <li className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <div className="flex items-center gap-3">
                    <PenTool size={18} />
                    My Sign-Ups
                  </div>
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    2
                  </span>
                </li>

                <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <BarChart3 size={18} />
                  Participation History
                </li>

                <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <User size={18} />
                  My Profile
                </li>
              </ul>

             
              <p className="text-xs text-gray-400 font-semibold mt-6 mb-2">
                ACCOUNT
              </p>
              <ul className="space-y-1">
                <li className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bell size={18} />
                    Notifications
                  </div>
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    3
                  </span>
                </li>

                <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
                  <Settings size={18} />
                  Settings
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 border-t border-gray-300">
            <button className="flex items-center gap-3 text-gray-500 hover:text-red-500 w-full">
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
