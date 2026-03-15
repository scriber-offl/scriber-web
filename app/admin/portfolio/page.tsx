import {
  getPortfolioFilterOptions,
  getPortfolioItemsPaginated,
  getServices,
} from "@/lib/queries";
import { PortfolioManager } from "@/components/admin/portfolio-manager";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

const PAGE_SIZE = 6;

interface PortfolioSearchParams {
  page?: string;
  q?: string;
  featured?: "all" | "featured" | "not-featured";
  image?: "all" | "with" | "without";
  category?: string;
  serviceType?: string;
  sort?: "newest" | "oldest" | "title-asc" | "title-desc";
}

async function PortfolioData({
  page,
  filters,
}: {
  page: number;
  filters: PortfolioSearchParams;
}) {
  await connection();
  const [portfolioResult, services, filterOptions] = await Promise.all([
    getPortfolioItemsPaginated(page, PAGE_SIZE, {
      q: filters.q,
      featured: filters.featured,
      image: filters.image,
      category: filters.category,
      serviceType: filters.serviceType,
      sort: filters.sort,
    }),
    getServices(),
    getPortfolioFilterOptions(),
  ]);

  return (
    <PortfolioManager
      items={portfolioResult.data}
      services={services}
      totalItems={portfolioResult.totalItems}
      currentPage={portfolioResult.currentPage}
      totalPages={portfolioResult.totalPages}
      pageSize={portfolioResult.pageSize}
      categories={filterOptions.categories}
      serviceTypes={filterOptions.serviceTypes}
      initialFilters={{
        q: filters.q || "",
        featured: filters.featured || "all",
        image: filters.image || "all",
        category: filters.category || "all",
        serviceType: filters.serviceType || "all",
        sort: filters.sort || "newest",
      }}
    />
  );
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<PortfolioSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number.parseInt(resolvedSearchParams.page || "1", 10);
  const page =
    Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;

  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <PortfolioData page={page} filters={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
