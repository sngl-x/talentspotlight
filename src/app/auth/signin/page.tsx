"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // For the logo image

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const { status } = useSession(); // Only use the status from useSession
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to /admin
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous error
    setLoading(true); // Set loading state to true

    // Call the signIn function with credentials
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      email,
      password,
      callbackUrl: "/admin", // Set the callback URL for redirecting after successful sign-in
    });

    if (!result?.ok) {
      setError("Invalid email or password");
    }

    setLoading(false); // Set loading state to false
  };

  if (status === "authenticated") {
    // Return null to avoid rendering during redirect
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-teal-700 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* DPA Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/dpa_logo.svg" // Your logo file path
            alt="DPA Logo"
            width={300} // Adjust the width of the logo
            height={300} // Adjust the height of the logo
          />
        </div>
        <h1 className="text-3xl font-semibold text-center text-teal-600 mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading} // Disable the button while loading
            className={`w-full px-4 py-2 rounded-lg transition duration-300 ${loading ? 'bg-teal-400' : 'bg-teal-600'} text-white hover:bg-teal-700`}
          >
            {loading ? "Signing In..." : "Sign In"} {/* Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;