"use client";

import React, { useState, useEffect } from "react";
import AdminMenu from "@/components/AdminMenu";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Link from "next/link";

interface Organization {
  id: string;
  name: string;
  location: string | null;
  size: string | null;
  industry: string | null;
  type: string | null; // Non-profit, public, profit
}

const OrganizationsPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations");
        if (!response.ok) throw new Error("Failed to fetch organizations");
        const result = await response.json();
        console.log("Fetched organizations:", result.data);
        setOrganizations(result.data || []);
      } catch (err) {
        console.error("Error fetching organizations:", err);
        setError("Failed to fetch organizations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const openModal = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrganization(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleSave = async (updatedFields: Partial<Organization>) => {
    if (!selectedOrganization) return;

    const updatedOrganization = {
      ...selectedOrganization,
      ...updatedFields,
    };

    try {
      const response = await fetch(`/api/organizations/${updatedOrganization.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrganization),
      });

      if (!response.ok) {
        throw new Error("Failed to update organization");
      }

      const result = await response.json();
      console.log("Updated organization:", result.data);

      setOrganizations((prev) =>
        prev.map((org) => (org.id === updatedOrganization.id ? result.data : org))
      );
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Failed to save changes. Please try again.");
    }
  };

  const handleAddOrganization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOrganization = {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      size: formData.get("size") as string,
      industry: formData.get("industry") as string,
      type: formData.get("type") as string,
    };

    fetch("/api/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrganization),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add organization");
        return res.json();
      })
      .then((data) => {
        setOrganizations((prev) => [...prev, data.data]);
        closeAddModal();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add organization. Please try again.");
      });
  };

  return (
    <div className="flex">
      <AdminMenu />
      <main className="flex-1">
        <PageHeader
          title="Organizations"
          description="Manage and view all your organizations here."
        />
        <div className="p-6 bg-gray-100">
          <div className="flex justify-end mb-4">
            <Button onClick={openAddModal} variant="primary">
              Add Organization
            </Button>
          </div>
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
                    <strong>Location:</strong> {organization.location || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Size:</strong> {organization.size || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Industry:</strong> {organization.industry || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Type:</strong> {organization.type || "N/A"}
                  </p>
                  <div className="flex space-x-4">
                    <Button as={Link} href={`/admin/organizations/${organization.id}`} variant="primary">
                      View Details
                    </Button>
                    <Button variant="secondary" onClick={() => openModal(organization)}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isModalOpen && selectedOrganization && (
            <Modal title={`Edit ${selectedOrganization.name}`} onClose={closeModal}>
              <div className="space-y-4">
                {/* Modal Inputs */}
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <Button onClick={closeModal} variant="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleSave({
                      location: selectedOrganization.location || "",
                      size: selectedOrganization.size || "",
                      industry: selectedOrganization.industry || "",
                      type: selectedOrganization.type || "Profit",
                    })
                  }
                  variant="primary"
                >
                  Save
                </Button>
              </div>
            </Modal>
          )}

          {isAddModalOpen && (
            <Modal title="Add New Organization" onClose={closeAddModal}>
              <form onSubmit={handleAddOrganization} className="space-y-4">
                {/* Add Organization Form */}
                <div className="mt-6 flex justify-end space-x-4">
                  <Button type="button" onClick={closeAddModal} variant="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Add Organization
                  </Button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrganizationsPage;
