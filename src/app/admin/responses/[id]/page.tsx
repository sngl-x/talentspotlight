"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AdminMenu from "@/components/AdminMenu";
import CustomRadarChart from "@/components/CustomRadarChart";

interface RadarDataPoint {
  category: string;
  value: number;
}

const ResponsePage: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<RadarDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchResponseData = async () => {
      try {
        const response = await fetch(`/api/responses/${id}`);
        if (!response.ok) throw new Error("Failed to fetch response data");

        const rawData = await response.json();

        const chartData = [
          { category: "Leadership distribution", value: parseFloat(rawData.data.q1) || 0 },
          { category: "Self-leadership", value: parseFloat(rawData.data.q2) || 0 },
          { category: "Psychological safety", value: parseFloat(rawData.data.q3) || 0 },
          { category: "Well-being", value: parseFloat(rawData.data.q4) || 0 },
          { category: "Transparency", value: parseFloat(rawData.data.q5) || 0 },
          { category: "Feedback", value: parseFloat(rawData.data.q6) || 0 },
          { category: "Talent acquisition", value: parseFloat(rawData.data.q7) || 0 },
          { category: "Competence development", value: parseFloat(rawData.data.q8) || 0 },
        ];

        setData(chartData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchResponseData();
  }, [id]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminMenu />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Radar Chart</h1>

        <div
          className="bg-white shadow-lg rounded-lg p-6 flex justify-center items-center"
          style={{
            height: "calc(100vh - 150px)", // Adjust height to fit the page
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div
              style={{
                width: "100%",
                maxWidth: "800px", // Limit chart width for better layout
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px", // Extra padding around the chart
              }}
            >
              <CustomRadarChart data={data} size={600} maxValue={5} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResponsePage;
