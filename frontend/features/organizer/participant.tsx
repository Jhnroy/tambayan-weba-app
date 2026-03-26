"use client";
import { OrganizerSidebar } from '@/components/organizer-sidebar'
import { Menu } from 'lucide-react'
import React from 'react'

export const Participant = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  return (
    <div>
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <div className="hidden md:flex md:w-64 bg-white border-r">
        <OrganizerSidebar />
      </div>
    </div>
  )
}
