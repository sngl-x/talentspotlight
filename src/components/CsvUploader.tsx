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
        setPreviewData(results.data as Record<string, string | number>[]); // Cast the type explicitly
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">CSV Uploader</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {headers.length > 0 && (
        <div className="flex flex-col items-center w-full max-w-2xl">
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">Select Name Column</label>
            <select
              value={nameColumn || ""}
              onChange={(e) => setNameColumn(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Column</option>
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">Select Email Column</label>
            <select
              value={emailColumn || ""}
              onChange={(e) => setEmailColumn(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
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
          <div className="overflow-x-auto w-full">
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
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send Invites
          </button>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
