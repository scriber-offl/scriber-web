import { getPortfolioItemsByStream } from "@/actions/portfolio";
import { getServices } from "@/actions/services";
import TLMClient from "./tlm-client";
import { Metadata } from "next";

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

export default async function TLMPage() {
  const [portfolioItems, services] = await Promise.all([
    getPortfolioItemsByStream("tlm"),
    getServices("tlm"),
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
    <TLMClient portfolioItems={serializedItems} services={serializedServices} />
  );
}
