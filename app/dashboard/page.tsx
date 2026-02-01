import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Dashboard</h1>
      <p style={{ opacity: 0.8 }}>Logged in as: {session?.user?.email}</p>

      <div style={{ marginTop: 16 }}>
        <Link href="/api/auth/signout">Logout</Link>
      </div>
    </main>
  );
}