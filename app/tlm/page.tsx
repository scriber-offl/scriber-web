import { getPortfolioItemsByStream, getServices } from "@/lib/queries";
import { getShopProducts } from "@/actions/shop";
import TLMClient from "./tlm-client";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TLMHero } from "./tlm-hero";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Scriber TLM - Teaching & Learning Materials Marketplace",
  description:
    "Scriber TLM is an educational marketplace where educators and students can buy and sell teaching materials, project works, and academic resources.",
  keywords: [
    "Scriber TLM",
    "Teaching Learning Materials",
    "Educational Marketplace",
    "Project Works",
    "Study Materials",
    "Teaching Aids",
    "Academic Resources",
  ],
};

async function TLMData() {
  await connection();
  const [portfolioItems, services, shopProducts] = await Promise.all([
    getPortfolioItemsByStream("tlm"),
    getServices("tlm"),
    getShopProducts(),
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

  const serializedProducts = shopProducts.map((product) => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return (
    <TLMClient
      portfolioItems={serializedItems}
      services={serializedServices}
      shopProducts={serializedProducts}
    />
  );
}

export default async function TLMPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <TLMHero />
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <TLMData />
      </Suspense>
      <Footer />
    </div>
  );
}
