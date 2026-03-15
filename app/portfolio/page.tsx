import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PortfolioClient } from "./portfolio-client";
import { getPortfolioFilterOptions, getPortfolioPageData } from "@/lib/queries";
import { connection } from "next/server";
import { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "Portfolio — Scriber",
  description:
    "Browse all of Scriber's teaching and learning materials — chart works, working models, B.Ed aids, and more.",
};

type PortfolioPageSearchParams = {
  service?: string;
  category?: string;
  q?: string;
};

const normalizeServiceName = (value: string) =>
  value.trim().replace(/\s+/g, " ").toLowerCase();

async function PortfolioData({
  searchParamsPromise,
}: {
  searchParamsPromise?: Promise<PortfolioPageSearchParams>;
}) {
  const searchParams = searchParamsPromise
    ? await searchParamsPromise
    : undefined;

  await connection();
  const selectedService = searchParams?.service?.trim() || "";

  const filterOptions = await getPortfolioFilterOptions();
  const normalizedSelected = normalizeServiceName(selectedService);
  const matchedServiceType =
    filterOptions.serviceTypes.find(
      (serviceType) => normalizeServiceName(serviceType) === normalizedSelected,
    ) || "";

  const pageData = await getPortfolioPageData(
    5,
    matchedServiceType || undefined,
  );

  const { services, totalServices } = pageData;

  const serialized = services.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    image: s.image,
    totalPortfolio: s.totalPortfolio,
    portfolio: s.portfolio.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image,
      description: p.description,
      serviceType: p.serviceType,
    })),
  }));

  return (
    <PortfolioClient
      initialServices={serialized}
      totalServices={totalServices}
      serviceTypes={filterOptions.serviceTypes}
    />
  );
}

export default function PortfolioPage({
  searchParams,
}: {
  searchParams?: Promise<PortfolioPageSearchParams>;
}) {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="mb-12 max-w-2xl">
            <div className="inline-block border border-foreground/20 px-3 py-1 text-xs font-mono tracking-widest uppercase mb-4">
              All Work
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Our Portfolio
            </h1>
            <p className="text-muted-foreground text-lg">
              A complete collection of teaching aids, chart works, and learning
              materials crafted for educators and students.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <Spinner />
              </div>
            }
          >
            <PortfolioData searchParamsPromise={searchParams} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
