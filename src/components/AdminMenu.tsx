"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  EnvelopeIcon,
  DocumentDuplicateIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const AdminMenu: React.FC = () => {
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Invitations", href: "/admin/invitations", icon: EnvelopeIcon },
    { name: "Responses", href: "/admin/responses", icon: DocumentDuplicateIcon },
    { name: "Organizations", href: "/admin/organizations", icon: BuildingOfficeIcon },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-[#007A78] text-white">
      {/* Logo */}
      <div className="flex items-center justify-center h-24 border-b border-gray-700">
        <Image
          src="/images/dpa_logo.svg"
          alt="DPA Logo"
          width={128}
          height={64}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 rounded hover:bg-[#005F5E] transition duration-300"
              >
                <item.icon className="h-6 w-6 mr-3 text-white" />
                {item.name}
              </Link>
            </li>
          ))}
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
