import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AdminDashboard } from "@/components/admin/dashboard";
import { AdminHeader } from "@/components/admin/admin-header";
import { ForbiddenView } from "@/components/admin/forbidden-view";
import { SignInCard } from "@/components/auth/sign-in-card";
import { getContacts, getLeads } from "@/actions/admin";
import { getAllReviews } from "@/actions/portfolio";
import { getPortfolioItems, getServices } from "@/lib/queries";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

async function AdminData() {
  const [contacts, leads, portfolioItems, reviews, services] =
    await Promise.all([
      getContacts(),
      getLeads(),
      getPortfolioItems(),
      getAllReviews(),
      getServices(),
    ]);

  return (
    <AdminDashboard
      initialContacts={contacts}
      initialLeads={leads}
      initialPortfolioItems={portfolioItems}
      initialReviews={reviews}
      initialServices={services}
    />
  );
}

async function AdminContent() {
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <AdminHeader />
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <Spinner />
            </div>
          }
        >
          <AdminData />
        </Suspense>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Spinner />
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
