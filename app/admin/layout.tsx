import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ForbiddenView } from "@/components/admin/forbidden-view";
import { SignInCard } from "@/components/auth/sign-in-card";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

async function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md border rounded-xl p-6 shadow-sm bg-card">
          <SignInCard
            title="Admin Access"
            description="Sign in to access the admin console"
            callbackURL="/admin"
          />
        </div>
      </div>
    );
  }

  // @ts-expect-error - role is added by admin plugin or schema extension
  if (session.user.role !== "admin") {
    return <ForbiddenView />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-background min-h-screen">
        <div className="flex items-center p-4 border-b bg-background sticky top-0 z-10">
          <SidebarTrigger />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Spinner className="size-10" />
        </div>
      }
    >
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
