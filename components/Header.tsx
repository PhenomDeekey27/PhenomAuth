"use client";

import { useAuth } from "../lib/auth-context";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

export default function Header() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-deep-navy/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-white">
              PhenomAuth
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-navy/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            PhenomAuth
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <UserAvatar />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-white hover:text-neon-purple transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-medium text-white hover:text-neon-purple transition-colors"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
