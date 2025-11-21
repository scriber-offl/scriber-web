"use server";

import { db } from "@/db";
import { portfolio, reviews } from "@/db/schema/portfolio";
import { desc, eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { del } from "@vercel/blob";

async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // @ts-expect-error - role check
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function getPortfolioItems() {
  // Publicly accessible
  return await db.select().from(portfolio).orderBy(desc(portfolio.createdAt));
}

export async function getPortfolioItem(id: string) {
  const [item] = await db.select().from(portfolio).where(eq(portfolio.id, id));
  if (!item) return null;

  // Fetch reviews
  const itemReviews = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      createdAt: reviews.createdAt,
      userName: user.name,
      userId: reviews.userId,
      userImage: user.image,
    })
    .from(reviews)
    .leftJoin(user, eq(reviews.userId, user.id))
    .where(eq(reviews.portfolioId, id));

  const totalRating = itemReviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating =
    itemReviews.length > 0 ? totalRating / itemReviews.length : 0;

  return {
    ...item,
    rating: parseFloat(averageRating.toFixed(1)),
    reviews: itemReviews,
  };
}

// I need to import user for the join above
import { user } from "@/db/schema/auth";

export async function createPortfolioItem(data: typeof portfolio.$inferInsert) {
  await checkAdmin();
  const [inserted] = await db
    .insert(portfolio)
    .values(data)
    .returning({ id: portfolio.id });
  return inserted.id;
}

export async function updatePortfolioItem(
  id: string,
  data: Partial<typeof portfolio.$inferInsert>
) {
  await checkAdmin();
  await db.update(portfolio).set(data).where(eq(portfolio.id, id));
}

export async function deletePortfolioItem(id: string) {
  await checkAdmin();
  const [item] = await db.select().from(portfolio).where(eq(portfolio.id, id));
  if (item && item.image) {
    await del(item.image);
  }
  await db.delete(portfolio).where(eq(portfolio.id, id));
}

export async function deletePortfolioImage(url: string) {
  await checkAdmin();
  await del(url);
}

export async function addReview(
  portfolioId: string,
  rating: number,
  comment: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Must be logged in");

  const [item] = await db
    .select()
    .from(portfolio)
    .where(eq(portfolio.id, portfolioId));
  if (!item) throw new Error("Portfolio item not found");

  const allowedEmails = (item.customerEmails as string[]) || [];
  if (!allowedEmails.includes(session.user.email)) {
    throw new Error("You are not authorized to review this project.");
  }

  const existingReview = await db
    .select()
    .from(reviews)
    .where(
      and(
        eq(reviews.portfolioId, portfolioId),
        eq(reviews.userId, session.user.id)
      )
    );

  if (existingReview.length > 0) {
    throw new Error("You have already reviewed this project.");
  }

  await db.insert(reviews).values({
    portfolioId,
    userId: session.user.id,
    rating,
    comment,
  });
}

export async function deleteReview(id: string) {
  await checkAdmin();
  await db.delete(reviews).where(eq(reviews.id, id));
}

export async function getAllReviews() {
  await checkAdmin();
  return await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      createdAt: reviews.createdAt,
      portfolioTitle: portfolio.title,
      userName: user.name,
      userEmail: user.email,
    })
    .from(reviews)
    .leftJoin(portfolio, eq(reviews.portfolioId, portfolio.id))
    .leftJoin(user, eq(reviews.userId, user.id))
    .orderBy(desc(reviews.createdAt));
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
