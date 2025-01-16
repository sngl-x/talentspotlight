"use client";

import React from "react";
import AdminMenu from "@/components/AdminMenu";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <AdminMenu />

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default AdminLayout;
