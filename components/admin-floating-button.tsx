import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export async function AdminFloatingButton() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // @ts-expect-error - role is added by admin plugin
  if (session?.user?.role !== "admin") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        asChild
        className="shadow-lg h-12 w-12 md:w-auto md:px-6"
      >
        <Link href="/admin">
          <ShieldCheck className="w-5 h-5" />
          <span className="hidden md:inline ml-2">Go to Admin</span>
        </Link>
      </Button>
    </div>
  );
}
