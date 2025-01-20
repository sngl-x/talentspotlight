"use client";

import React, { useState } from "react";
import Button from "@/components/Button";

const HashPasswordPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [hashedPassword, setHashedPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleHashPassword = async () => {
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError(null); // Clear any previous error

    try {
      const response = await fetch("/api/hash-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to hash the password.");
      }

      const data = await response.json();
      setHashedPassword(data.hashedPassword);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold">Hash Password Tool</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hash a Password</h2>
          <p className="text-gray-700 mb-6">
            Enter a plain-text password to generate a hashed version.
          </p>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            onClick={handleHashPassword}
            className="bg-[#007A78] text-white hover:bg-[#005F5D] px-6 py-3 rounded-lg font-bold"
          >
            Hash Password
          </Button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {hashedPassword && (
            <div className="mt-6">
              <label htmlFor="hashedPassword" className="block text-sm font-medium text-gray-700">
                Hashed Password
              </label>
              <textarea
                id="hashedPassword"
                value={hashedPassword}
                readOnly
                className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 mt-2"
                rows={4}
              />
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Hash Tool. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HashPasswordPage;
