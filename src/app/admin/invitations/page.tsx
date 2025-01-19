"use client";

import React, { useState, useEffect } from "react";
import AdminMenu from "@/components/AdminMenu";
import Table from "@/components/Table";
import Link from "next/link";

interface Invitation {
  recipient: string;
  email: string;
  date_sent: string;
  organization_name: string;
  contact_name?: string;
  organization_id: string;
}

const InvitationsPage: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ organizationId: "" });
  const [organizations, setOrganizations] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
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
    const fetchInvitations = async () => {
      try {
        const response = await fetch(
          `/api/invitations/filter?organization_id=${filter.organizationId}`
        );
        if (!response.ok) throw new Error("Failed to fetch invitations");
        const result = await response.json();
        setInvitations(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, [filter]);

  return (
    <div className="flex">
      <AdminMenu />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Sent Invitations</h1>
        <p className="mt-4 text-gray-600">
          Below is a list of all invitations sent. Use the filters below to view invitations by
          organization.
        </p>

        <div className="mb-4 flex gap-4">
          <select
            name="organizationId"
            value={filter.organizationId}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, organizationId: e.target.value }))
            }
            className="border px-4 py-2 rounded"
          >
            <option value="">Select Organization</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading invitations...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table
            columns={["Recipient", "Email", "Date Sent", "Organization", "Contact Person"]}
            data={invitations}
            renderRow={(invite, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4">{invite.recipient}</td>
                <td className="px-6 py-4">{invite.email}</td>
                <td className="px-6 py-4">
                  {new Date(invite.date_sent).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/organizations/${invite.organization_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {invite.organization_name}
                  </Link>
                </td>
                <td className="px-6 py-4">{invite.contact_name || "N/A"}</td>
              </tr>
            )}
          />
        )}
      </main>
    </div>
  );
};

export default InvitationsPage;
