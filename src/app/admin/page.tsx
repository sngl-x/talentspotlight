"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";

const AdminPage: React.FC = () => {
  const [stats, setStats] = useState({
    invitations: 0,
    responses: 0,
    organizations: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [invitationsRes, responsesRes, organizationsRes] = await Promise.all([
          fetch("/api/invitations"),
          fetch("/api/responses"),
          fetch("/api/organizations"),
        ]);

        if (!invitationsRes.ok || !responsesRes.ok || !organizationsRes.ok) {
          throw new Error("Failed to fetch stats");
        }

        const invitationsData = await invitationsRes.json();
        const responsesData = await responsesRes.json();
        const organizationsData = await organizationsRes.json();

        // Safely access `data` and default to an empty array if undefined
        setStats({
          invitations: invitationsData?.data?.length || 0,
          responses: responsesData?.data?.length || 0,
          organizations: organizationsData?.data?.length || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="px-6 py-8">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Below is a summary of the system&apos;s current state. Click on any card to view more details.
          </p>
        </div>

        {/* Statistics Cards */}
        {loading ? (
          <p className="text-gray-700">Loading statistics...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Invitations Card */}
            <Link
              href="/admin/invitations"
              className="group block bg-white shadow rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-[#E3FF00] text-gray-900 flex items-center justify-center rounded-full">
                  <span className="text-lg font-bold">I</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-[#29AFCA]">
                    {stats.invitations}
                  </h2>
                  <p className="text-gray-600">Invitations Sent</p>
                </div>
              </div>
            </Link>

            {/* Responses Card */}
            <Link
              href="/admin/responses"
              className="group block bg-white shadow rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-[#29AFCA] text-white flex items-center justify-center rounded-full">
                  <span className="text-lg font-bold">R</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-[#2497AF]">
                    {stats.responses}
                  </h2>
                  <p className="text-gray-600">Responses Submitted</p>
                </div>
              </div>
            </Link>

            {/* Organizations Card */}
            <Link
              href="/admin/organizations"
              className="group block bg-white shadow rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-[#2497AF] text-white flex items-center justify-center rounded-full">
                  <span className="text-lg font-bold">O</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-[#29AFCA]">
                    {stats.organizations}
                  </h2>
                  <p className="text-gray-600">Organizations</p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
