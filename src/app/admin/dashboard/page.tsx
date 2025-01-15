"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin panel. Manage invitations and view results here.</p>
    </div>
  );
};

export default AdminDashboard;
