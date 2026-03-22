'use client';

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Building2, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export const Login = () => {

  const [role, setRole] = useState("resident");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-blue-700 text-lg hover:opacity-80"
        >
          Tambayan
        </Link>

        
      </nav>


      {/* PAGE */}
      <div className="flex flex-1 items-center justify-center px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">


          {/* BACK + TITLE */}
          <div className="mb-6">

            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-black text-sm mb-4"
            >
              <ArrowLeftOutlined />
              Back
            </Link>

            <div className="text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-gray-500 text-sm">Log in to Tambayan</p>
            </div>

          </div>


          {/* ROLE SELECT */}
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


          {/* FORM */}
          <div className="space-y-4">

            {/* EMAIL / MOBILE */}
            <div>
              <label className="text-xs text-gray-500">
                EMAIL OR MOBILE
              </label>

              <input
                type="text"
                placeholder="09XXXXXXXXX or email"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            {/* PASSWORD */}
            <div>
              <label className="text-xs text-gray-500">
                PASSWORD
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>


          {/* LOGIN BUTTON */}
          <button className="w-full mt-6 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
            Log In
          </button>


          {/* SIGNUP LINK */}
          <p className="text-center text-sm text-gray-500 mt-4">
            No account?{" "}
            <Link href="/signup">
              <span className="text-blue-600 cursor-pointer hover:underline">
                Sign up free
              </span>
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};