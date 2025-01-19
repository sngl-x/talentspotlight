"use client";

import React from "react";
import AdminMenu from "@/components/AdminMenu";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <div className="w-64 fixed h-full">
        <AdminMenu />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
