import { getServicesPaginated } from "@/lib/queries";
import { ServicesManager } from "@/components/admin/services-manager";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

const PAGE_SIZE = 6;

interface ServicesSearchParams {
  page?: string;
  q?: string;
  featured?: "all" | "featured" | "not-featured";
  image?: "all" | "with" | "without";
  description?: "all" | "with" | "without";
  sort?: "newest" | "oldest" | "name-asc" | "name-desc";
}

async function ServicesData({
  page,
  filters,
}: {
  page: number;
  filters: ServicesSearchParams;
}) {
  await connection();
  const servicesResult = await getServicesPaginated(page, PAGE_SIZE, {
    q: filters.q,
    featured: filters.featured,
    image: filters.image,
    description: filters.description,
    sort: filters.sort,
  });

  return (
    <ServicesManager
      services={servicesResult.data}
      totalItems={servicesResult.totalItems}
      currentPage={servicesResult.currentPage}
      totalPages={servicesResult.totalPages}
      pageSize={servicesResult.pageSize}
      initialFilters={{
        q: filters.q || "",
        featured: filters.featured || "all",
        image: filters.image || "all",
        description: filters.description || "all",
        sort: filters.sort || "newest",
      }}
    />
  );
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<ServicesSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number.parseInt(resolvedSearchParams.page || "1", 10);
  const page =
    Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;

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
        <ServicesData page={page} filters={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
