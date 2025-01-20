"use client";

import React from "react";
import AdminLayout from "@/components/AdminLayout"; // Ensures menu sidebar
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button"; // Use existing Button component
import { useSession } from "next-auth/react";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Page Header */}
        <PageHeader
          title="Your Profile"
          description="View and manage your profile information."
        />

        {/* Profile Card */}
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
          <p className="text-sm text-gray-600">Manage your personal details.</p>

          {/* User Details */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <p className="mt-1 text-gray-900">
                {session?.user?.name || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-gray-900">{session?.user?.email}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6">
            <Button
              onClick={() => alert("Edit Profile functionality coming soon!")}
              className="bg-blue-500 hover:bg-blue-600"
              disabled // Placeholder for future enhancements
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;
