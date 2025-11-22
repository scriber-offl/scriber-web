import { db } from "@/db";
import { services } from "@/db/schema/services";
import { portfolio, reviews } from "@/db/schema/portfolio";
import { user } from "@/db/schema/auth";
import { eq, desc } from "drizzle-orm";

export async function getServices(stream?: string) {
  try {
    if (stream) {
      return await db
        .select()
        .from(services)
        .where(eq(services.stream, stream));
    }
    return await db.select().from(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getPortfolioItemsByStream(stream: string) {
  const items = await db
    .select()
    .from(portfolio)
    .where(eq(portfolio.stream, stream))
    .orderBy(desc(portfolio.createdAt));

  const itemsWithReviews = await Promise.all(
    items.map(async (item) => {
      const itemReviews = await db
        .select({
          user: user.name,
          userId: reviews.userId,
          comment: reviews.comment,
          rating: reviews.rating,
        })
        .from(reviews)
        .leftJoin(user, eq(reviews.userId, user.id))
        .where(eq(reviews.portfolioId, item.id));

      const totalRating = itemReviews.reduce((acc, r) => acc + r.rating, 0);
      const averageRating =
        itemReviews.length > 0 ? totalRating / itemReviews.length : 0;

      return {
        ...item,
        rating: parseFloat(averageRating.toFixed(1)),
        reviews: itemReviews.map((r) => ({
          user: r.user || "Anonymous",
          userId: r.userId,
          comment: r.comment,
          rating: r.rating,
        })),
      };
    })
  );

  return itemsWithReviews;
}

export async function getPortfolioItems() {
  // Publicly accessible
  return await db.select().from(portfolio).orderBy(desc(portfolio.createdAt));
}
