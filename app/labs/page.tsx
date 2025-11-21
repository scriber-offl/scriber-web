import { getPortfolioItemsByStream } from "@/actions/portfolio";
import LabsClient from "./labs-client";

export default async function LabsPage() {
  const portfolioItems = await getPortfolioItemsByStream("labs");

  const serializedItems = portfolioItems.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return <LabsClient portfolioItems={serializedItems} />;
}
