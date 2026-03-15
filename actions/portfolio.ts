"use server";

import { db } from "@/db";
import { portfolio, reviews } from "@/db/schema/portfolio";
import { services } from "@/db/schema/services";
import { desc, eq, and, count, ne, asc, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // @ts-expect-error - role check
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
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

  if (data.featured && data.serviceType) {
    const [{ total }] = await db
      .select({ total: count() })
      .from(portfolio)
      .where(
        and(
          eq(portfolio.serviceType, data.serviceType),
          eq(portfolio.featured, true),
        ),
      );
    if (total >= 3) {
      throw new Error(
        `Maximum 3 featured items allowed per service type. "${data.serviceType}" already has 3.`,
      );
    }
  }

  const [inserted] = await db
    .insert(portfolio)
    .values(data)
    .returning({ id: portfolio.id });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/portfolio");

  return inserted.id;
}

export async function updatePortfolioItem(
  id: string,
  data: Partial<typeof portfolio.$inferInsert>,
) {
  await checkAdmin();

  if (data.featured === true) {
    const [current] = await db
      .select()
      .from(portfolio)
      .where(eq(portfolio.id, id));
    const serviceType = data.serviceType ?? current?.serviceType;
    if (serviceType) {
      const [{ total }] = await db
        .select({ total: count() })
        .from(portfolio)
        .where(
          and(
            eq(portfolio.serviceType, serviceType),
            eq(portfolio.featured, true),
            ne(portfolio.id, id),
          ),
        );
      if (total >= 3) {
        throw new Error(
          `Maximum 3 featured items allowed per service type. "${serviceType}" already has 3.`,
        );
      }
    }
  }

  await db.update(portfolio).set(data).where(eq(portfolio.id, id));

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function deletePortfolioItem(id: string) {
  await checkAdmin();
  const [item] = await db.select().from(portfolio).where(eq(portfolio.id, id));
  if (item && item.image) {
    await del(item.image);
  }
  await db.delete(portfolio).where(eq(portfolio.id, id));

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function deletePortfolioImage(url: string) {
  await checkAdmin();
  await del(url);
}

export async function addReview(
  portfolioId: string,
  rating: number,
  comment: string,
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
        eq(reviews.userId, session.user.id),
      ),
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

// ── Public pagination actions (no auth required) ───────────────────────────

export async function getMorePortfolioByServiceType(
  serviceType: string,
  offset: number,
  limit = 5,
) {
  return db
    .select()
    .from(portfolio)
    .where(
      sql`lower(trim(${portfolio.serviceType})) = lower(trim(${serviceType}))`,
    )
    .limit(limit)
    .offset(offset)
    .orderBy(desc(portfolio.createdAt));
}

export async function getMoreServices(offset: number, limit = 5) {
  return db
    .select()
    .from(services)
    .limit(limit)
    .offset(offset)
    .orderBy(asc(services.createdAt));
}

// ── Admin review actions ─────────────────────────────────────────────────────

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
