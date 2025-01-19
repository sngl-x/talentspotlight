"use client";

import React from "react";

interface TableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
}

const Table = <T,>({ columns, data, renderRow }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-gray-700 border-collapse border border-gray-300">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 border">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => renderRow(row, index))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
