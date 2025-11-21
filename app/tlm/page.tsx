import { getPortfolioItemsByStream } from "@/actions/portfolio";
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
  const portfolioItems = await getPortfolioItemsByStream("tlm");

  const serializedItems = portfolioItems.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
  return <TLMClient portfolioItems={serializedItems} />;
}
