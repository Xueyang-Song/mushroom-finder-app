"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { login, signup } from "@/app/auth/actions";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
            {decodeURIComponent(error)}
          </div>
        )}
        <h1 className="text-2xl font-bold text-center mb-6 text-green-800">
          🍄 Mushroom Finder
        </h1>

        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 pb-2 text-center font-medium ${
              mode === "login"
                ? "border-b-2 border-green-600 text-green-700"
                : "text-gray-500"
            }`}
            onClick={() => setMode("login")}
          >
            Log In
          </button>
          <button
            className={`flex-1 pb-2 text-center font-medium ${
              mode === "signup"
                ? "border-b-2 border-green-600 text-green-700"
                : "text-gray-500"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form action={mode === "login" ? login : signup} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="mushroomhunter"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
