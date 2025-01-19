"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  EnvelopeIcon,
  DocumentDuplicateIcon,
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const AdminMenu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed((prev) => !prev);
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Invitations", href: "/admin/invitations", icon: EnvelopeIcon },
    { name: "Responses", href: "/admin/responses", icon: DocumentDuplicateIcon },
    { name: "Organizations", href: "/admin/organizations", icon: BuildingOfficeIcon },
  ];

  return (
    <div
      className={`h-screen bg-[#007A78] text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isCollapsed ? (
            <Bars3Icon className="h-6 w-6 text-white" />
          ) : (
            <XMarkIcon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Logo */}
      {!isCollapsed && (
        <div className="flex items-center justify-center h-24 border-b border-gray-700">
          <Image
            src="/images/dpa_logo.svg"
            alt="DPA Logo"
            width={128}
            height={64}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 rounded hover:bg-[#005F5E] transition duration-300"
              >
                <item.icon className="h-6 w-6 text-white" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="flex items-center justify-center h-16 border-t border-gray-700">
          <a
            href="https://lemonaid.se"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            © 2025 Lemonaid Insights AB
          </a>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
