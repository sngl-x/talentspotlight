"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminMenu from "@/components/AdminMenu";

interface Response {
  invitation_id: string;
  created_at: string;
}

const ResponsesPage: React.FC = () => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch("/api/responses");
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
  }, []);

  return (
    <div className="flex">
      <AdminMenu />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Responses</h1>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {loading ? (
          <p className="mt-4 text-gray-600">Loading...</p>
        ) : (
          <div className="mt-6 bg-white shadow rounded-lg p-4">
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
                          className="text-blue-600 hover:underline"
                        >
                          View Radar Chart
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
      </main>
    </div>
  );
};

export default ResponsesPage;
