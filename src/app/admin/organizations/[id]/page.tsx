"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AdminMenu from "@/components/AdminMenu";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import CsvUploader from "@/components/CsvUploader";

interface Organization {
  id: string;
  name: string;
  size: string;
  industry: string;
  contactPerson: string;
}

interface Response {
  invitation_id: string;
  created_at: string;
  submitted_at: string | null;
}

const OrganizationPage: React.FC = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isCsvUploaderOpen, setCsvUploaderOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchOrganizationData = async () => {
      try {
        const orgResponse = await fetch(`/api/organizations/${id}`);
        const resResponse = await fetch(`/api/responses/filter?organization_id=${id}`);
        if (!orgResponse.ok || !resResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const orgData = await orgResponse.json();
        const resData = await resResponse.json();

        setOrganization(orgData.data);
        setResponses(resData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationData();
  }, [id]);

  const openInviteModal = () => setInviteModalOpen(true);
  const closeInviteModal = () => setInviteModalOpen(false);

  const openCsvUploader = () => setCsvUploaderOpen(true);
  const closeCsvUploader = () => setCsvUploaderOpen(false);

  if (loading) {
    return <p>Loading organization details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex">
      <AdminMenu />
      <main className="flex-1 p-6 bg-gray-100">
        {/* Organization Details */}
        <div className="bg-white p-6 shadow rounded-lg mb-8">
          <h1 className="text-2xl font-bold mb-4">{organization?.name}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Size:</strong> {organization?.size}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Industry:</strong> {organization?.industry}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Contact Person:</strong> {organization?.contactPerson}
          </p>
          <div className="flex mt-4 gap-4">
            <Button onClick={openInviteModal}>Invite User</Button>
            <Button
              className="bg-[#29AFCA] text-white hover:bg-[#2497AF]"
              onClick={openCsvUploader}
            >
              Bulk Import
            </Button>
          </div>
        </div>

        {/* Responses Table */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Responses</h2>
          <Table
            columns={["Invitation ID", "Created At", "Submitted At", "Actions"]}
            data={responses}
            renderRow={(response, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4">{response.invitation_id}</td>
                <td className="px-6 py-4">
                  {new Date(response.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {response.submitted_at
                    ? new Date(response.submitted_at).toLocaleDateString()
                    : "Not Submitted"}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`/admin/responses/${response.invitation_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            )}
          />
        </div>

        {/* Invite User Modal */}
        {isInviteModalOpen && (
          <Modal
  onClose={closeInviteModal}
  title={`Add One User for ${organization?.name}`}
  hideCloseButton // Pass this prop to hide the "Close" button
>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      alert("User invited!");
      closeInviteModal();
    }}
  >
    <label className="block mb-4">
      Name:
      <input
        type="text"
        className="border border-gray-300 rounded w-full p-2 mt-1"
        required
      />
    </label>
    <label className="block mb-4">
      Email:
      <input
        type="email"
        className="border border-gray-300 rounded w-full p-2 mt-1"
        required
      />
    </label>
    <div className="flex justify-end gap-4">
      <button
        type="button"
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        onClick={closeInviteModal}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Invitation
      </button>
    </div>
  </form>
</Modal>

        )}

        {/* Bulk Import Modal */}
        {isCsvUploaderOpen && (
<Modal
  onClose={closeCsvUploader}
  title={`Bulk Import Users for ${organization?.name}`}
  hideCloseButton
>
  <CsvUploader />
</Modal>
        )}
      </main>
    </div>
  );
};

export default OrganizationPage;
