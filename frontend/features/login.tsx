'use client';

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Building2, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import API from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type LoginPayload = {
  identifier: string;
  password: string;
};

type User = {
  id: number;
  username: string;
  email: string;
};

type UserRole = {
  id: number;
  userRole: "RESIDENT" | "ORGANIZER";
  Stats: "PENDING" | "APPROVED";
};

type LoginResponse = {
  jwt: string;
  user: User;
  userRole: UserRole | null;
};

type StrapiError = {
  error: {
    message: string;
  };
};

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await API.post("/api/auth/local", payload);
  const { jwt, user } = res.data;

  try {
    const roleRes = await API.get(
      `/api/user-roles?filters[users_permissions_user][id][$eq]=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const userRole = roleRes.data.data[0] || null;

    return { jwt, user, userRole };
  } catch (error) {
    console.error("ROLE FETCH ERROR:", error);
    return { jwt, user, userRole: null };
  }
};

export const Login = () => {
  const [role, setRole] = useState<"resident" | "organizer">("resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError, error } = useMutation<
    LoginResponse,
    AxiosError<StrapiError>,
    LoginPayload
  >({
    mutationFn: loginUser,

    onSuccess: (data) => {
      const { jwt, user, userRole } = data;

      if (!userRole) {
        alert("No role assigned to this account.");
        return;
      }

      const realRole = userRole.userRole;
      const status = userRole.Stats;
      const selectedRole = role.toUpperCase();

      // 🔥 ROLE VALIDATION ONLY
      if (realRole !== selectedRole) {
        alert("Wrong role selected!");
        return;
      }

      // ✅ ALLOW LOGIN EVEN IF PENDING
      if (status === "PENDING") {
        alert("Your account is pending. Some features are disabled.");
      }

      // ✅ SAVE AUTH
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", realRole);
      localStorage.setItem("status", status); // 🔥 important

      // ✅ REDIRECT
      if (realRole === "ORGANIZER") {
        window.location.href = "/organizer/dashboard";
      } else {
        window.location.href = "/resident/dashboard";
      }
    },

    onError: (err) => {
      if (err.response) {
        console.error("API ERROR:", err.response.data);
      } else if (err.request) {
        console.error("NO RESPONSE:", err.request);
      } else {
        console.error("CUSTOM ERROR:", err.message);
      }
    },
  });

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    mutate({
      identifier: email.trim(),
      password: password.trim(),
    });
  };

  const errorMessage =
    error?.response?.data?.error?.message ||
    "Invalid email or password";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <Link href="/" className="font-semibold text-blue-700 text-lg">
          Tambayan
        </Link>
      </nav>

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
          
          <Link href="/" className="flex items-center gap-2 text-sm mb-4">
            <ArrowLeftOutlined /> Back
          </Link>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-500 text-sm">Log in to Tambayan</p>
          </div>

          {/* ROLE SELECT */}
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

          <button
            onClick={handleLogin}
            disabled={isPending}
            className="w-full bg-blue-700 text-white py-2 rounded"
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>

          {isError && (
            <p className="text-red-500 mt-3 text-center text-sm">
              {errorMessage}
            </p>
          )}

          <div className="my-6 border-t" />

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-700 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};