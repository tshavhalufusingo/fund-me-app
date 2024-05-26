"use client";

import { SessionProvider } from "next-auth/react";

// AuthSessionProvider component to wrap the application with session context
export default function AuthSessionProvider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
