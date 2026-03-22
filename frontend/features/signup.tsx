"use client";

import React, { useState } from "react";
import { ArrowLeft, User, Building2, Paperclip } from "lucide-react";
import Link from "next/link";

export const Signup = () => {
  const [role, setRole] = useState("organizer");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      
      

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80">
          <ArrowLeft />
          Back
        </Link>
        {/* Logo + Title */}
        <div className="text-center mb-6">
          <div className="text-2xl font-bold">Join Tambayan</div>
          <p className="text-gray-500 text-sm">
            Create your free community account
          </p>
        </div>

        {/* Role Selection */}
        <p className="text-xs text-gray-500 mb-2">I AM A...</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => setRole("resident")}
            className={`border rounded-lg p-3 flex flex-col items-center text-sm ${
              role === "resident"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <User size={20} />
            <span className="font-medium mt-1">Resident</span>
            <span className="text-xs text-gray-500">
              Browse & join events
            </span>
          </button>

          <button
            onClick={() => setRole("organizer")}
            className={`border rounded-lg p-3 flex flex-col items-center text-sm ${
              role === "organizer"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <Building2 size={20} />
            <span className="font-medium mt-1">Organizer</span>
            <span className="text-xs text-gray-500">
              Post & manage events
            </span>
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* Name + Mobile */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">FULL NAME</label>
              <input
                type="text"
                placeholder="Maria Santos"
                className="w-full border rounded-lg p-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium">MOBILE (PH)</label>
              <input
                type="text"
                placeholder="09XXXXXXXXX"
                className="w-full border rounded-lg p-2 mt-1 text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium">EMAIL</label>
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full border rounded-lg p-2 mt-1 text-sm"
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">PASSWORD</label>
              <input
                type="password"
                placeholder="Min 6 chars"
                className="w-full border rounded-lg p-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium">CONFIRM</label>
              <input
                type="password"
                placeholder="Re-enter"
                className="w-full border rounded-lg p-2 mt-1 text-sm"
              />
            </div>
          </div>

          {/* Organizer Verification */}
          {role === "organizer" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">

              <p className="text-xs font-semibold text-blue-700">
                ORGANIZER VERIFICATION
              </p>

              <div>
                <label className="text-xs font-medium">
                  ORGANIZATION NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Brgy. Holy Spirit LGU"
                  className="w-full border rounded-lg p-2 mt-1 text-sm"
                />
              </div>

              {/* Upload */}
              <div>
                <label className="text-xs font-medium">
                  PERMIT DOCUMENT (PDF OR IMAGE)
                </label>

                <label className="mt-2 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                  <Paperclip size={20} />
                  <span className="text-xs mt-2">
                    Click to upload barangay/LGU permit
                  </span>

                  <input type="file" className="hidden" />
                </label>
              </div>

              <p className="text-xs text-blue-700">
                Your account will be reviewed by admin before you can post
                events.
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Submit for Verification
          </button>

          {/* Login */}
          <p className="text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};