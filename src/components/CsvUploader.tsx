"use client";

import React, { useState } from "react";
import Papa from "papaparse";

const CsvUploader: React.FC = () => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [nameColumn, setNameColumn] = useState<string | null>(null);
  const [emailColumn, setEmailColumn] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<Record<string, string | number>[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/csv") {
      parseCsv(file);
      setError(null);
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const parseCsv = (file: File) => {
    Papa.parse<Record<string, string | number>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.meta.fields) {
          setHeaders(results.meta.fields);
          setPreviewData(results.data as Record<string, string | number>[]);
        } else {
          setError("Could not read CSV headers. Please check the file.");
        }
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`);
      },
    });
  };

  const handleSendInvites = () => {
    if (!nameColumn || !emailColumn) {
      setError("Please select both Name and Email columns.");
      return;
    }
    const mappedData = previewData.map((row) => ({
      name: row[nameColumn],
      email: row[emailColumn],
    }));
    console.log("Mapped Data:", mappedData);
    alert("Invites would be sent to console-logged data!");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">CSV Uploader</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#29AFCA] hover:border-gray-400"
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {headers.length > 0 && (
        <div className="flex flex-col w-full">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Name Column</label>
            <select
              value={nameColumn || ""}
              onChange={(e) => setNameColumn(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#29AFCA] hover:border-gray-400 w-full"
            >
              <option value="">Select Column</option>
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Email Column</label>
            <select
              value={emailColumn || ""}
              onChange={(e) => setEmailColumn(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#29AFCA] hover:border-gray-400 w-full"
            >
              <option value="">Select Column</option>
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-lg font-medium text-gray-900 mb-4">Preview Data</h2>
          <div className="overflow-x-auto w-full max-h-64">
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {previewData.slice(0, 5).map((row, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      {nameColumn ? row[nameColumn] : "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {emailColumn ? row[emailColumn] : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleSendInvites}
            className="mt-4 px-6 py-2 font-medium text-white bg-[#29AFCA] rounded-lg hover:bg-[#2497AF] transition-all duration-150"
          >
            Send Invites
          </button>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
