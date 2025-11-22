import { getPortfolioItemsByStream, getServices } from "@/lib/queries";
import BrandingClient from "./branding-client";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandingHero } from "./branding-hero";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Scriber Branding - Brand Design & Identity",
  description:
    "Scriber Branding helps create memorable brands that resonate with audiences. From logo design to complete brand identity and marketing materials.",
  keywords: [
    "Scriber Branding",
    "Brand Design",
    "Logo Design",
    "Brand Identity",
    "Marketing Materials",
    "Corporate Branding",
  ],
};

async function BrandingData() {
  await connection();
  const [portfolioItems, services] = await Promise.all([
    getPortfolioItemsByStream("branding"),
    getServices("branding"),
  ]);

  const serializedItems = portfolioItems.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  const serializedServices = services.map((service) => ({
    ...service,
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString(),
  }));

  return (
    <BrandingClient
      portfolioItems={serializedItems}
      services={serializedServices}
    />
  );
}

export default function BrandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <BrandingHero />
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <BrandingData />
      </Suspense>
      <Footer />
    </div>
  );
}
