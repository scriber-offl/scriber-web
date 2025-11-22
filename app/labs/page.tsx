import { getPortfolioItemsByStream, getServices } from "@/lib/queries";
import LabsClient from "./labs-client";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LabsHero } from "./labs-hero";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "ScriberLabs - Digital Marketing & SEO",
  description:
    "ScriberLabs helps businesses grow online through SEO, social media marketing, and digital advertising strategies. Boost your online presence today.",
  keywords: [
    "ScriberLabs",
    "Digital Marketing",
    "SEO",
    "Social Media Marketing",
    "Content Creation",
    "Online Growth",
    "Digital Advertising",
  ],
};

async function LabsData() {
  await connection();
  const [portfolioItems, services] = await Promise.all([
    getPortfolioItemsByStream("labs"),
    getServices("labs"),
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
    <LabsClient
      portfolioItems={serializedItems}
      services={serializedServices}
    />
  );
}

export default async function LabsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <LabsHero />
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <LabsData />
      </Suspense>
      <Footer />
    </div>
  );
}
