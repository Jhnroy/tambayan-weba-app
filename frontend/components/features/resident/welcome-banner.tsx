"use client";

import React from "react";

type Props = {
  name?: string | null;
  eventCount?: number;
};

export const WelcomeBanner = ({
  name,
  eventCount = 0,
}: Props) => {
 
  const safeName =
    typeof name === "string" && name.trim().length > 0
      ? name.trim()
      : "Resident";

 
  const safeCount = Number.isFinite(eventCount) ? eventCount : 0;

  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-6 mb-6 flex justify-between">
      <div>
        
        <h2 className="text-xl font-semibold">
          Hi, {safeName}
        </h2>

      
        <p className="text-sm opacity-90">
          {safeCount > 0 ? (
            <>
              {safeCount} new community event
              {safeCount > 1 ? "s" : ""} near you this week
            </>
          ) : (
            "No new community events available right now"
          )}
        </p>
      </div>
    </div>
  );
};