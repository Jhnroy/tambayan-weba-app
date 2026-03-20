"use client";
import { ResidentSidebar } from '@/components/resident-sidebar'
import { BellOutlined, MenuOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

export const MySignup = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block w-64 border-r bg-white">
        <ResidentSidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-white shadow-lg">
            <ResidentSidebar />
          </div>
          <div
            className="flex-1 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuOutlined />
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              My Sign-Ups
            </h1>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search events..."
              className="flex-1 sm:w-64 px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
              <BellOutlined />
            </div>
          </div>
        </div>

        {/* Content Placeholder */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Your event sign-ups will appear here.
          </p>
        </div>
      </div>
    </div>
  )
}
