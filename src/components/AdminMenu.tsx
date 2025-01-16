"use client";

import React from "react";

const AdminMenu: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-[#007A78] text-white">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-24 border-b border-gray-700">
        <img src="/images/dpa_logo.svg" alt="DPA Logo" className="h-16 w-auto" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <a href="/admin" className="flex items-center px-4 py-2 rounded hover:bg-[#005F5E]">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/admin/invitations" className="flex items-center px-4 py-2 rounded hover:bg-[#005F5E]">
              Invitations
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-center h-16 border-t border-gray-700">
        <p className="text-sm">© 2025 DPA Assessments</p>
      </div>
    </div>
  );
};

export default AdminMenu;
