"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LightBulbIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ChatBubbleOvalLeftEllipsisIcon,
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
    { name: "Spotlight", href: "/admin/spotlight", icon: LightBulbIcon },
    { name: "Select", href: "/admin/select", icon: CheckCircleIcon },
    { name: "Connect", href: "/admin/connect", icon: UserGroupIcon },
    { name: "Engage", href: "/admin/engage", icon: ChatBubbleOvalLeftEllipsisIcon },
  ];

  return (
    <div
      className={`h-screen bg-white text-primary flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } shadow-lg border-r border-primary font-nunito`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isCollapsed ? (
            <Bars3Icon className="h-8 w-8 text-primary" />
          ) : (
            <XMarkIcon className="h-8 w-8 text-primary" />
          )}
        </button>
      </div>

      {/* Logo */}
      {!isCollapsed && (
        <div className="flex items-center justify-center h-24 bg-white">
          <Image
            src="/images/dpa_logo.svg"
            alt="DPA Logo"
            width={200}
            height={100}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 bg-white">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 rounded-md text-primary hover:text-secondary hover:bg-primary transition duration-300 font-nunito"
              >
                <item.icon
                  className={`h-8 w-8 text-primary hover:text-secondary ${
                    isCollapsed ? "mx-auto" : ""
                  }`}
                />
                {/* Show text only if not collapsed */}
                <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Menu */}
      <div className="relative mt-auto bg-primary p-4">
        <button
          onClick={toggleUserMenu}
          className="flex items-center w-full px-4 py-2 rounded-md text-secondary hover:text-primary hover:bg-secondary transition duration-300 font-nunito"
        >
          <UserIcon className="h-8 w-8 text-secondary hover:text-primary" />
          {/* Show user name only if not collapsed */}
          <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>{session?.user?.name || "Settings"}</span>
        </button>

        {userMenuOpen && (
          <div className="absolute bottom-16 left-4 w-56 bg-white text-gray-800 shadow-lg rounded-md">
            <div className="px-4 py-2 border-b font-nunito">
              <p className="text-sm font-medium">{session?.user?.email}</p>
            </div>
            <ul className="py-2">
              <li>
                <Link
                  href="/admin/profile"
                  className="block px-4 py-2 hover:bg-gray-100 font-nunito"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-nunito"
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
