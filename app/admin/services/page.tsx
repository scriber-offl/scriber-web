import { getServices } from "@/lib/queries";
import { ServicesManager } from "@/components/admin/services-manager";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

async function ServicesData() {
  await connection();
  const services = await getServices();
  return <ServicesManager services={services} />;
}

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <p className="text-muted-foreground">Manage your services here.</p>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <ServicesData />
      </Suspense>
    </div>
  );
}
