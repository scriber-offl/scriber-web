import { db } from "@/db";
import { services } from "@/db/schema/services";
import { portfolio, reviews } from "@/db/schema/portfolio";
import { user } from "@/db/schema/auth";
import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  isNull,
  isNotNull,
  ne,
  or,
  sql,
  type SQL,
} from "drizzle-orm";

interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface PortfolioPaginationFilters {
  q?: string;
  featured?: "all" | "featured" | "not-featured";
  image?: "all" | "with" | "without";
  category?: string;
  serviceType?: string;
  sort?: "newest" | "oldest" | "title-asc" | "title-desc";
}

interface ServicesPaginationFilters {
  q?: string;
  featured?: "all" | "featured" | "not-featured";
  image?: "all" | "with" | "without";
  description?: "all" | "with" | "without";
  sort?: "newest" | "oldest" | "name-asc" | "name-desc";
}

export async function getServices() {
  try {
    return await db.select().from(services).orderBy(asc(services.createdAt));
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getServicesPaginated(
  page = 1,
  pageSize = 6,
  filters: ServicesPaginationFilters = {},
): Promise<PaginatedResult<typeof services.$inferSelect>> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 6;

  const whereConditions: SQL[] = [];

  if (filters.q?.trim()) {
    const q = `%${filters.q.trim()}%`;
    whereConditions.push(
      or(ilike(services.name, q), ilike(services.description, q))!,
    );
  }

  if (filters.featured === "featured") {
    whereConditions.push(eq(services.featured, true));
  }
  if (filters.featured === "not-featured") {
    whereConditions.push(eq(services.featured, false));
  }

  if (filters.image === "with") {
    whereConditions.push(
      and(isNotNull(services.image), ne(services.image, ""))!,
    );
  }
  if (filters.image === "without") {
    whereConditions.push(or(eq(services.image, ""), isNull(services.image))!);
  }

  if (filters.description === "with") {
    whereConditions.push(
      and(isNotNull(services.description), ne(services.description, ""))!,
    );
  }
  if (filters.description === "without") {
    whereConditions.push(
      or(eq(services.description, ""), isNull(services.description))!,
    );
  }

  const whereClause =
    whereConditions.length > 0 ? and(...whereConditions) : undefined;

  const serviceSort = (() => {
    if (filters.sort === "oldest") return asc(services.createdAt);
    if (filters.sort === "name-asc") return asc(services.name);
    if (filters.sort === "name-desc") return desc(services.name);
    return desc(services.createdAt);
  })();

  try {
    const countQuery = db.select({ totalItems: count() }).from(services);
    const [{ totalItems }] =
      whereClause === undefined
        ? await countQuery
        : await countQuery.where(whereClause);

    const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
    const currentPage = Math.min(safePage, totalPages);
    const offset = (currentPage - 1) * safePageSize;

    const dataQuery = db
      .select()
      .from(services)
      .orderBy(serviceSort)
      .limit(safePageSize)
      .offset(offset);

    const data =
      whereClause === undefined
        ? await dataQuery
        : await dataQuery.where(whereClause);
    return {
      data,
      totalItems,
      totalPages,
      currentPage,
      pageSize: safePageSize,
    };
  } catch (error) {
    console.error("Failed to fetch paginated services:", error);
    return {
      data: [],
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: safePageSize,
    };
  }
}

async function withRatings(items: (typeof portfolio.$inferSelect)[]) {
  return Promise.all(
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
    }),
  );
}

export async function getFeaturedServicesWithPortfolio() {
  const featuredServices = await db
    .select()
    .from(services)
    .where(eq(services.featured, true))
    .limit(4)
    .orderBy(asc(services.createdAt));

  return Promise.all(
    featuredServices.map(async (service) => {
      const portfolioItems = await db
        .select()
        .from(portfolio)
        .where(
          and(
            eq(portfolio.serviceType, service.name),
            eq(portfolio.featured, true),
          ),
        )
        .limit(3)
        .orderBy(desc(portfolio.createdAt));

      const itemsWithRatings = await withRatings(portfolioItems);

      return { ...service, portfolio: itemsWithRatings };
    }),
  );
}

export async function getPortfolioItems() {
  return await db.select().from(portfolio).orderBy(desc(portfolio.createdAt));
}

export async function getPortfolioItemsPaginated(
  page = 1,
  pageSize = 6,
  filters: PortfolioPaginationFilters = {},
): Promise<PaginatedResult<typeof portfolio.$inferSelect>> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 6;

  const whereConditions: SQL[] = [];

  if (filters.q?.trim()) {
    const q = `%${filters.q.trim()}%`;
    whereConditions.push(
      or(
        ilike(portfolio.title, q),
        ilike(portfolio.description, q),
        ilike(portfolio.category, q),
        ilike(portfolio.serviceType, q),
      )!,
    );
  }

  if (filters.featured === "featured") {
    whereConditions.push(eq(portfolio.featured, true));
  }
  if (filters.featured === "not-featured") {
    whereConditions.push(eq(portfolio.featured, false));
  }

  if (filters.image === "with") {
    whereConditions.push(ne(portfolio.image, ""));
  }
  if (filters.image === "without") {
    whereConditions.push(eq(portfolio.image, ""));
  }

  if (filters.category && filters.category !== "all") {
    whereConditions.push(eq(portfolio.category, filters.category));
  }

  if (filters.serviceType && filters.serviceType !== "all") {
    whereConditions.push(eq(portfolio.serviceType, filters.serviceType));
  }

  const whereClause =
    whereConditions.length > 0 ? and(...whereConditions) : undefined;

  const portfolioSort = (() => {
    if (filters.sort === "oldest") return asc(portfolio.createdAt);
    if (filters.sort === "title-asc") return asc(portfolio.title);
    if (filters.sort === "title-desc") return desc(portfolio.title);
    return desc(portfolio.createdAt);
  })();

  try {
    const countQuery = db.select({ totalItems: count() }).from(portfolio);
    const [{ totalItems }] =
      whereClause === undefined
        ? await countQuery
        : await countQuery.where(whereClause);

    const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
    const currentPage = Math.min(safePage, totalPages);
    const offset = (currentPage - 1) * safePageSize;

    const dataQuery = db
      .select()
      .from(portfolio)
      .orderBy(portfolioSort)
      .limit(safePageSize)
      .offset(offset);

    const data =
      whereClause === undefined
        ? await dataQuery
        : await dataQuery.where(whereClause);
    return {
      data,
      totalItems,
      totalPages,
      currentPage,
      pageSize: safePageSize,
    };
  } catch (error) {
    console.error("Failed to fetch paginated portfolio items:", error);
    return {
      data: [],
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: safePageSize,
    };
  }
}

export async function getPortfolioFilterOptions() {
  const [categories, serviceTypes] = await Promise.all([
    db
      .select({ value: portfolio.category })
      .from(portfolio)
      .groupBy(portfolio.category)
      .orderBy(asc(portfolio.category)),
    db
      .select({ value: services.name })
      .from(services)
      .groupBy(services.name)
      .orderBy(asc(services.name)),
  ]);

  return {
    categories: categories.map((item) => item.value).filter(Boolean),
    serviceTypes: serviceTypes.map((item) => item.value).filter(Boolean),
  };
}

// For the /portfolio browse page — initial SSR fetch
export async function getPortfolioPageData(
  servicesLimit = 5,
  selectedServiceType?: string,
) {
  const normalizedService = selectedServiceType?.trim();

  const [allServices, [{ total: totalServices }]] = await Promise.all([
    normalizedService
      ? db.select().from(services).where(eq(services.name, normalizedService))
      : db
          .select()
          .from(services)
          .orderBy(asc(services.createdAt))
          .limit(servicesLimit),
    db.select({ total: count() }).from(services),
  ]);

  const servicesWithPortfolio = await Promise.all(
    allServices.map(async (service) => {
      const [items, [{ total: totalPortfolio }]] = await Promise.all([
        db
          .select()
          .from(portfolio)
          .where(
            sql`lower(trim(${portfolio.serviceType})) = lower(trim(${service.name}))`,
          )
          .limit(5)
          .orderBy(desc(portfolio.createdAt)),
        db
          .select({ total: count() })
          .from(portfolio)
          .where(
            sql`lower(trim(${portfolio.serviceType})) = lower(trim(${service.name}))`,
          ),
      ]);

      return { ...service, portfolio: items, totalPortfolio };
    }),
  );

  return { services: servicesWithPortfolio, totalServices };
}

/** @deprecated Use getFeaturedServicesWithPortfolio instead */
export async function getPortfolioItemsByStream(_stream: string) {
  void _stream;
  const items = await db
    .select()
    .from(portfolio)
    .orderBy(desc(portfolio.createdAt));

  return withRatings(items);
}
