"use client";

import React, { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, User, Building2 } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// ================= TYPES =================
type RoleType = "resident" | "organizer";

type SignupPayload = {
  username: string;
  email: string;
  password: string;
  role: RoleType;
};

type StrapiErrorResponse = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
};

// ================= API FUNCTION =================
const registerUser = async (payload: SignupPayload) => {
  // STEP 1: Register user
  const res = await axios.post(`${API_URL}/api/auth/local/register`, {
    username: payload.username,
    email: payload.email,
    password: payload.password,
  });

  const user = res.data.user;
  const token = res.data.jwt;

  console.log("✅ USER CREATED:", user);

  try {
    // STEP 2: Create UserRole (FIXED)
    const roleRes = await axios.post(
      `${API_URL}/api/user-roles`,
      {
        data: {
          name: payload.username,
          description: `${payload.role} account`,
          userRole: payload.role.toUpperCase(), // 🔥 FIX
          Stats: "PENDING", // 🔥 FIX
          users_permissions_user: user.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ USER ROLE CREATED:", roleRes.data);
  } catch (err: any) {
    console.error("❌ USER ROLE ERROR:", err?.response?.data || err);
    // hindi natin ibabagsak signup kung dito lang nagfail
  }

  return res.data;
};

// ================= COMPONENT =================
export const Signup = () => {
  const [role, setRole] = useState<RoleType>("organizer");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      console.log("✅ SUCCESS:", data);
      alert("Registered successfully!");
    },

    onError: (err: AxiosError<StrapiErrorResponse>) => {
      console.error("❌ REGISTER ERROR:", err);

      const message =
        err.response?.data?.error?.message ||
        err.message ||
        "Registration failed";

      alert(message);
    },
  });

  // ================= HANDLERS =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      ...formData,
      role,
    });
  };

  // ================= UI =================
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

        {isError && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {(error as AxiosError<StrapiErrorResponse>)?.response?.data?.error
              ?.message || "Registration failed"}
          </p>
        )}

        {isSuccess && (
          <p className="text-green-600 text-sm mb-4 text-center">
            Registered successfully!
          </p>
        )}

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
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Registering..." : "Submit"}
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