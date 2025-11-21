import { getPortfolioItemsByStream } from "@/actions/portfolio";
import TLMClient from "./tlm-client";

export default async function TLMPage() {
  const portfolioItems = await getPortfolioItemsByStream("tlm");

  const serializedItems = portfolioItems.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
  return <TLMClient portfolioItems={serializedItems} />;
}
