"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AdminMenu from "@/components/AdminMenu";
import CustomRadarChart from "@/components/CustomRadarChart";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";

interface RadarDataPoint {
  category: string;
  value: number;
}

const ResponsePage: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<RadarDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responseDetails, setResponseDetails] = useState<{
    invitation_id: string;
    organization_name: string;
  } | null>(null);

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

        // Set the response data for chart rendering
        setData(chartData);

        // Set the response details (invitation_id, organization_name)
        setResponseDetails({
          invitation_id: rawData.data.invitation_id,
          organization_name: rawData.data.organization_name || "N/A",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchResponseData();
  }, [id]);

  // Function to download the SVG of the chart
  const downloadSVG = () => {
    const svgElement = document.querySelector("svg");
    if (svgElement) {
      const svgBlob = new Blob([svgElement.outerHTML], { type: "image/svg+xml" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const a = document.createElement("a");
      a.href = svgUrl;
      a.download = `response-${id}-chart.svg`;
      a.click();
      URL.revokeObjectURL(svgUrl);
    }
  };

  return (
    <div className="flex">
      <AdminMenu />
      <main className="flex-1">
        <PageHeader
          title="Response Details"
          description={`Response ID: ${responseDetails?.invitation_id || "Loading..."} | Organization: ${
            responseDetails?.organization_name || "Loading..."
          }`}
        />
        <div className="p-6 bg-gray-100">
          {/* Download Button positioned near the chart */}
          <div className="flex justify-end mb-4">
            <Button onClick={downloadSVG} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              Download Chart as SVG
            </Button>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-6 flex justify-center items-center"
            style={{
              height: "calc(100vh - 250px)", // Adjust height to fit the page
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
        </div>
      </main>
    </div>
  );
};

export default ResponsePage;
