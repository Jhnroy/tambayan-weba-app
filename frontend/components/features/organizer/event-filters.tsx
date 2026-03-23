"use client";

import React from "react";

// Reuse the same shape as your EventType
type Status = "Pending" | "Completed" | "Upcoming";
type Type = "Feeding" | "Cleanup" | "Seminar" | "Other";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  filterType: Type | "All";
  setFilterType: React.Dispatch<
    React.SetStateAction<Type | "All">
  >;

  filterStatus: Status | "All";
  setFilterStatus: React.Dispatch<
    React.SetStateAction<Status | "All">
  >;
};

export const EventFilters = ({
  search,
  setSearch,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search events..."
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* TYPE FILTER */}
      <select
        value={filterType}
        onChange={(e) =>
          setFilterType(e.target.value as Type | "All")
        }
        className="border p-2 rounded"
      >
        <option value="All">All Types</option>
        <option value="Feeding">Feeding</option>
        <option value="Cleanup">Cleanup</option>
        <option value="Seminar">Seminar</option>
        <option value="Other">Other</option>
      </select>

      {/* STATUS FILTER */}
      <select
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value as Status | "All")
        }
        className="border p-2 rounded"
      >
        <option value="All">All Status</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
};