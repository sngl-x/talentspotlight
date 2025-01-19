"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminMenu from "@/components/AdminMenu";
import PageHeader from "@/components/PageHeader";

interface Response {
  invitation_id: string;
  created_at: string;
  organization_id: number;
  submitted_at: string;
}

const ResponsesPage: React.FC = () => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    invitationId: "",
    organizationId: "",
    startDate: "",
    endDate: "",
  });
  const [organizations, setOrganizations] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    // Fetch organizations for the dropdown
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations");
        if (!response.ok) throw new Error("Failed to fetch organizations");
        const result = await response.json();
        setOrganizations(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
    fetchOrganizations();
  }, []);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(
          `/api/responses/filter?invitation_id=${filter.invitationId}&organization_id=${filter.organizationId}&start_date=${filter.startDate}&end_date=${filter.endDate}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch responses");
        }
        const result = await response.json();
        setResponses(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  return (
    <div className="flex">
      <AdminMenu />
      <main className="flex-1">
        <PageHeader
          title="Responses"
          description="View all user responses here. Use the filters below to narrow down results by organization or date."
        />
        <div className="p-6 bg-gray-100">
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {loading ? (
            <p className="mt-4 text-gray-600">Loading...</p>
          ) : (
            <div className="mt-6 bg-white shadow rounded-lg p-4">
              {/* Filter Section */}
              <div className="mb-4 flex gap-4">
                <input
                  type="text"
                  name="invitationId"
                  value={filter.invitationId}
                  onChange={handleFilterChange}
                  className="border px-4 py-2 rounded"
                  placeholder="Search by Invitation ID"
                />
                <select
                  name="organizationId"
                  value={filter.organizationId}
                  onChange={handleFilterChange}
                  className="border px-4 py-2 rounded"
                >
                  <option value="">Select Organization</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>

                {/* Date Range Filters */}
                <input
                  type="date"
                  name="startDate"
                  value={filter.startDate}
                  onChange={handleFilterChange}
                  className="border px-4 py-2 rounded"
                />
                <span>to</span>
                <input
                  type="date"
                  name="endDate"
                  value={filter.endDate}
                  onChange={handleFilterChange}
                  className="border px-4 py-2 rounded"
                />
              </div>

              {/* Responses Table */}
              <table className="min-w-full text-left text-gray-700">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="px-6 py-3">Invitation ID</th>
                    <th className="px-6 py-3">Created At</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.length > 0 ? (
                    responses.map((response, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-6 py-4">{response.invitation_id}</td>
                        <td className="px-6 py-4">{new Date(response.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/responses/${response.invitation_id}`}
                            className="text-[#007A78] hover:text-[#005F5E] transition-all duration-150"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center">
                        No responses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResponsesPage;
