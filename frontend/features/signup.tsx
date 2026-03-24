"use client";

import React, { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { ArrowLeft, User, Building2 } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:1337";

export const Signup = () => {
  const [role, setRole] = useState<"resident" | "organizer">("organizer");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  type StrapiErrorResponse = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    console.log("API URL:", API_URL);
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/local/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          // role, // 👈 uncomment if your backend expects it
        }
      );

      console.log("✅ SUCCESS:", res.data);
      alert("Registered successfully!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        
        const axiosError = err as AxiosError<StrapiErrorResponse>;

        const message =
          axiosError.response?.data?.error?.message ||
          axiosError.message ||
          "Registration failed";

        console.error("❌ AXIOS ERROR:", axiosError.response?.data);
        alert(message);
      } else {
        console.error("❌ UNKNOWN ERROR:", err);
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg hover:opacity-80"
        >
          <ArrowLeft />
          Back
        </Link>

        <div className="text-center mb-6">
          <div className="text-2xl font-bold">Join Tambayan</div>
          <p className="text-gray-500 text-sm">
            Create your free community account
          </p>
        </div>

        <p className="text-xs text-gray-500 mb-2">I AM A...</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => setRole("resident")}
            className={`border rounded-lg p-3 flex flex-col items-center text-sm ${
              role === "resident"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <User size={20} />
            <span className="font-medium mt-1">Resident</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("organizer")}
            className={`border rounded-lg p-3 flex flex-col items-center text-sm ${
              role === "organizer"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <Building2 size={20} />
            <span className="font-medium mt-1">Organizer</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium">FULL NAME</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              className="w-full border rounded-lg p-2 mt-1 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium">EMAIL</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full border rounded-lg p-2 mt-1 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium">PASSWORD</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="w-full border rounded-lg p-2 mt-1 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Submit"}
          </button>

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