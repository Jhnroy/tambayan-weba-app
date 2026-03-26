"use client";

import React from "react";
import { BellOutlined } from "@ant-design/icons";
type Props = {
  search?: string;
  onSearch?: (value: string) => void;
};

export const DashboardHeader = ({ search = "", onSearch }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h1 className="text-2xl font-bold text-gray-800">Event Feed</h1>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => onSearch?.(e.target.value)} // ✅ SAFE CALL
          className="w-full md:w-64 px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <BellOutlined />
        </div>
      </div>
    </div>
  );
};