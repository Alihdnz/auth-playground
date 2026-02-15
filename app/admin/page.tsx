import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="p-6 space-y-2">
      <h1 className="text-xl font-semibold">Admin</h1>
      <p className="text-sm text-muted-foreground">
        Logged as {session?.user?.email} (role: {session?.user?.role})
      </p>
    </main>
  );
}
