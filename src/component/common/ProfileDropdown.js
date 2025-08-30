"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

const ProfileDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
      >
        <img
          src={user?.image || "/avatar.jpg"}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-[9999] overflow-hidden">
          <div className="px-4 py-2 text-sm border-b border-gray-200">
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <button
            onClick={() => console.log("Profile clicked")}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            <User className="w-4 h-4" />
            Profile
          </button>

          <button
            onClick={() => console.log("Settings clicked")}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={() => console.log("Logout clicked")}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
