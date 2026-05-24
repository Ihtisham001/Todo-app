"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "userId",
        response.data.user.id
      );

      alert("Login Successful");

      router.push("/todo");
    } catch (error) {
      console.error(error);

      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center p-10">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[500px]">

        <h1 className="text-5xl font-bold text-center text-black mb-3">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue managing your tasks
        </p>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 transition-all duration-300 text-white p-4 rounded-xl text-lg font-semibold disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </div>

      </div>

    </div>
  );
}