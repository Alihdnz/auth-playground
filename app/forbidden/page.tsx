import  Link  from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function ForbiddenPage(){
    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        403 - Forbidden
                    </CardTitle>

                    <CardDescription>
                        You Don't have permission to access this page.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex gap-2">
                    <Button asChild variant="outline" className="w-full">
                            <Link href="/login">Sign in</Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}