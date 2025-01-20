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
  UserIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";

const AdminMenu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Invitations", href: "/admin/invitations", icon: EnvelopeIcon },
    { name: "Responses", href: "/admin/responses", icon: DocumentDuplicateIcon },
    { name: "Organizations", href: "/admin/organizations", icon: BuildingOfficeIcon },
  ];

  return (
    <div
      className={`h-screen bg-teal-700 text-white flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } shadow-lg`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between px-4 py-3 bg-teal-800">
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
        <div className="flex items-center justify-center h-24 bg-teal-800">
          <Image
            src="/images/dpa_logo.svg"
            alt="DPA Logo"
            width={128}
            height={64}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 bg-teal-700">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
              >
                <item.icon className="h-6 w-6 text-white" />
                {/* Show text only if not collapsed */}
                <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Menu */}
      <div className="relative mt-auto bg-teal-800 p-4">
        <button
          onClick={toggleUserMenu}
          className="flex items-center w-full px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
        >
          <UserIcon className="h-6 w-6 text-white" />
          {/* Show user name only if not collapsed */}
          <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>{session?.user?.name || "User"}</span>
        </button>

        {userMenuOpen && (
          <div className="absolute bottom-16 left-4 w-56 bg-white text-gray-800 shadow-lg rounded-md">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium">{session?.user?.email}</p>
            </div>
            <ul className="py-2">
              <li>
                <Link
                  href="/admin/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
