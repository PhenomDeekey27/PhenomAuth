"use client";

import { AuthProvider } from "@/lib/auth-context";
import React, { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}