import { getPortfolioItemsByStream } from "@/actions/portfolio";
import { getServices } from "@/actions/services";
import BrandingClient from "./branding-client";
import { Metadata } from "next";

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

export default async function BrandingPage() {
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
