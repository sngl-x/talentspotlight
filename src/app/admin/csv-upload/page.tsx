"use client";

import React from "react";
import AdminLayout from "@/components/AdminLayout";
import CsvUploader from "@/components/CsvUploader";

const InvitationsPage: React.FC = () => {
  return (
    <AdminLayout>
      <CsvUploader />
    </AdminLayout>
  );
};

export default InvitationsPage;
