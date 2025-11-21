import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AdminDashboard } from "@/components/admin/dashboard";
import { ForbiddenView } from "@/components/admin/forbidden-view";
import { SignInCard } from "@/components/auth/sign-in-card";
import { getContacts, getLeads } from "@/actions/admin";
import { getPortfolioItems, getAllReviews } from "@/actions/portfolio";

export default async function AdminPage() {
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

  const [contacts, leads, portfolioItems, reviews] = await Promise.all([
    getContacts(),
    getLeads(),
    getPortfolioItems(),
    getAllReviews(),
  ]);

  return (
    <AdminDashboard
      initialContacts={contacts}
      initialLeads={leads}
      initialPortfolioItems={portfolioItems}
      initialReviews={reviews}
    />
  );
}
