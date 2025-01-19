"use client";

import React from "react";
import AdminMenu from "@/components/AdminMenu";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <AdminMenu />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
