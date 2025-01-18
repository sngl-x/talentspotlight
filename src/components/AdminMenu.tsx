"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const AdminMenu: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-[#007A78] text-white">
      <div className="flex items-center justify-center h-24 border-b border-gray-700">
        {/* Corrected Image Source */}
        <Image 
          src="/images/dpa_logo.svg" 
          alt="DPA Logo" 
          width={128} // Set the correct width
          height={64} // Set the correct height
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 rounded hover:bg-[#005F5E]"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/invitations"
              className="flex items-center px-4 py-2 rounded hover:bg-[#005F5E]"
            >
              Invitations
            </Link>
          </li>
          <li>
            <Link
              href="/admin/responses"
              className="flex items-center px-4 py-2 rounded hover:bg-[#005F5E]"
            >
              Responses
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-center h-16 border-t border-gray-700">
        <p className="text-sm">© 2025 Lemonaid Insights AB</p>
      </div>
    </div>
  );
};

export default AdminMenu;
