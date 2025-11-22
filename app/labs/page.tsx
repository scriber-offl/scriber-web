import { getPortfolioItemsByStream } from "@/actions/portfolio";
import { getServices } from "@/actions/services";
import LabsClient from "./labs-client";
import { Metadata } from "next";

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

export default async function LabsPage() {
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
