"use client";

import { useState } from "react";
import { useAuth } from "../lib/auth-context";

export default function UserAvatar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!user) return null;

  // Debug logging to check user data
  console.log("UserAvatar user data:", {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    providerData: user.providerData,
  });

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center focus:outline-none"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border-2 border-neon-purple/50 hover:border-neon-purple transition-colors"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gradient-to-b from-deep-violet/90 to-deep-navy/95 backdrop-blur-lg rounded-xl shadow-2xl border border-neon-purple/30 overflow-hidden z-50 transform transition-all duration-200 origin-top-right">
          {/* User Info Section */}
          <div className="px-4 py-4 bg-gradient-to-r from-neon-purple/10 to-mid-purple/10 border-b border-neon-purple/20">
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-neon-purple/50 shadow-lg"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple/30 to-mid-purple/30 border-2 border-neon-purple/50 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-300 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="py-2">
            <button
              onClick={() => {
                logout();
                setIsDropdownOpen(false);
              }}
              className="group w-full text-left px-4 py-3 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/20 hover:border-l-2 hover:border-red-500 flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
