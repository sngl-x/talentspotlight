"use client";

import React from "react";
import AdminLayout from "@/components/AdminLayout";

const AdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">
        Use the menu on the left to navigate through the admin features.
      </p>
    </AdminLayout>
  );
};

export default AdminPage;
