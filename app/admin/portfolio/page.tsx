import { getPortfolioItems, getServices } from "@/lib/queries";
import { PortfolioManager } from "@/components/admin/portfolio-manager";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

async function PortfolioData() {
  await connection();
  const [items, services] = await Promise.all([
    getPortfolioItems(),
    getServices(),
  ]);

  return <PortfolioManager items={items} services={services} />;
}

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
        <p className="text-muted-foreground">
          Manage your portfolio items here.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <PortfolioData />
      </Suspense>
    </div>
  );
}
