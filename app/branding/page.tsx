import { getPortfolioItemsByStream } from "@/actions/portfolio";
import BrandingClient from "./branding-client";

export default async function BrandingPage() {
  const portfolioItems = await getPortfolioItemsByStream("branding");

  const serializedItems = portfolioItems.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
  return <BrandingClient portfolioItems={serializedItems} />;
}
