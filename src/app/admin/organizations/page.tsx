"use client";

import React, { useEffect, useState } from "react";
import AdminMenu from "@/components/AdminMenu";
import Button from "@/components/Button";
import Link from "next/link"; // Make sure this is imported

interface Organization {
  id: string;
  name: string;
  size: string;
  industry: string;
  contact_person: string;
}

const OrganizationsPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations");
        if (!response.ok) throw new Error("Failed to fetch organizations");
        const result = await response.json();
        setOrganizations(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="flex">
      <AdminMenu />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Organizations</h1>

        {loading ? (
          <p className="text-gray-700">Loading organizations...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((organization) => (
              <div
                key={organization.id}
                className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">{organization.name}</h2>
                <p className="text-gray-600 mb-2">
                  <strong>Size:</strong> {organization.size || "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Industry:</strong> {organization.industry || "N/A"}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Contact:</strong> {organization.contact_person || "N/A"}
                </p>
                <Button
  as={Link}
  href={`/admin/organizations/${organization.id}`}
  variant="primary" // DPA Blue
>
  View Details
</Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrganizationsPage;
