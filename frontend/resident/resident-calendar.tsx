import { ResidentSidebar } from '@/components/resident-sidebar'
import { BellOutlined } from '@ant-design/icons'
import React from 'react'

export const ResidentCalendar = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 hidden md:block border-r bg-white">
              <ResidentSidebar />
      </div>

    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full md:w-64 px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-sm ">
              <BellOutlined />
            </div>
          </div>
        </div>


        
    </div>
      
    </div>
  )
}
