"use client";

import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const handleLogout = async () => {
    const confirmed = window.confirm("Do you really want to sign out?");
    if (!confirmed) return;

    await signOut({ callbackUrl: "/login" });
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Logout
      </button>
    </main>
  );
}