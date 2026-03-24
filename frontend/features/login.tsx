'use client';

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Building2, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import API from "@/lib/api";

export const Login = () => {
  const [role, setRole] = useState<"resident" | "organizer">("resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log('hiii ', process.env.NEXT_PUBLIC_API_URL);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
        {
          identifier: email,
          password,
        }
      );

      const user = res.data.user;
      const jwt = res.data.jwt;

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Logged in:", user);

      if (role === "organizer") {
        window.location.href = "/organizer/dashboard";
      } else {
        window.location.href = "/resident/dashboard";
      }
    } catch (err: any) {
      console.error("❌ FULL ERROR:", err);
      console.error("❌ RESPONSE:", err.response);
      console.error("❌ DATA:", err.response?.data);

      setError(
        err.response?.data?.error?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <Link href="/" className="font-semibold text-blue-700 text-lg">
          Tambayan
        </Link>
      </nav>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">

          {/* Back */}
          <Link href="/" className="flex items-center gap-2 text-sm mb-4">
            <ArrowLeftOutlined /> Back
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-500 text-sm">Log in to Tambayan</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => setRole("resident")}
              className={`border p-3 rounded flex flex-col items-center ${
                role === "resident"
                  ? "bg-blue-50 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <User size={20} />
              <p className="text-sm mt-1">Resident</p>
            </button>

            <button
              onClick={() => setRole("organizer")}
              className={`border p-3 rounded flex flex-col items-center ${
                role === "organizer"
                  ? "bg-blue-50 border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <Building2 size={20} />
              <p className="text-sm mt-1">Organizer</p>
            </button>
          </div>

          {/* Inputs */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-red-500 mt-3 text-center text-sm">
              {error}
            </p>
          )}

          {/* Divider */}
          <div className="my-6 border-t" />

          {/* Sign up section */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-700 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};