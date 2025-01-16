"use client";

import React, { useState, useEffect } from "react";
import AdminMenu from "@/components/AdminMenu";

interface Invitation {
  recipient: string;
  email: string;
  date_sent: string;
  organization_name: string;
  organization_location?: string;
  organization_size?: string;
  organization_industry?: string;
  organization_type?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

const InvitationsPage: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await fetch("/api/invitations");
        if (!response.ok) {
          throw new Error("Failed to fetch invitations");
        }
        const data: Invitation[] = await response.json();
        setInvitations(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <AdminMenu />

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Sent Invitations</h1>
        <p className="mt-4 text-gray-600">
          Below is a list of all invitations sent. Use the button below to bulk upload new invitations.
        </p>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}

        {/* Loading State */}
        {loading ? (
          <p className="mt-4 text-gray-600">Loading invitations...</p>
        ) : (
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full text-left text-gray-700">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Recipient</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Date Sent</th>
                  <th className="px-6 py-3">Organization</th>
                  <th className="px-6 py-3">Contact Person</th>
                </tr>
              </thead>
              <tbody>
                {invitations.length > 0 ? (
                  invitations.map((invite, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4">{invite.recipient}</td>
                      <td className="px-6 py-4">{invite.email}</td>
                      <td className="px-6 py-4">{new Date(invite.date_sent).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        {invite.organization_name} ({invite.organization_type})
                        <br />
                        {invite.organization_industry}, {invite.organization_size}
                        <br />
                        {invite.organization_location}
                      </td>
                      <td className="px-6 py-4">
                        {invite.contact_name} ({invite.contact_email})
                        <br />
                        {invite.contact_phone}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      No invitations sent yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Button for CSV Upload */}
        <button
          onClick={() => (window.location.href = "/admin/csv-upload")}
          className="mt-6 px-6 py-3 font-medium text-white bg-[#007A78] rounded-lg hover:bg-[#005F5E] transition-all duration-150"
        >
          Bulk Upload Invitations
        </button>
      </main>
    </div>
  );
};

export default InvitationsPage;
