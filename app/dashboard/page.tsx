import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main className="p-6">
        <p>You are not signed in.</p>
      </main>
    );
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Logged as <span className="font-medium">{session.user.email}</span> — role{" "}
          <span className="font-medium">{session.user.role}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your current session info</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>
              <span className="text-muted-foreground">User ID:</span>{" "}
              <span className="font-mono">{session.user.id}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Role:</span>{" "}
              <span className="font-medium">{session.user.role}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin area</CardTitle>
            <CardDescription>Only visible for ADMIN users</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            {isAdmin ? (
              <Button asChild>
                <Link href="/admin">Go to /admin</Link>
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link href="/forbidden">Request denied</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
