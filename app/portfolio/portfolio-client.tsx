"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Image as ImageIcon, Search } from "lucide-react";
import {
  getMorePortfolioByServiceType,
  getMoreServices,
} from "@/actions/portfolio";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  serviceType: string;
};

type ServiceWithPortfolio = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  portfolio: PortfolioItem[];
  totalPortfolio: number;
};

interface PortfolioClientProps {
  initialServices: ServiceWithPortfolio[];
  totalServices: number;
  serviceTypes: string[];
}

const normalizeServiceName = (value: string) =>
  value.trim().replace(/\s+/g, " ").toLowerCase();

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col border border-border bg-background hover:border-foreground/30 transition-colors overflow-hidden"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm mb-1 line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function ServiceSection({
  service,
  normalizedQuery,
}: {
  service: ServiceWithPortfolio;
  normalizedQuery: string;
}) {
  const [items, setItems] = useState(service.portfolio);
  const [total] = useState(service.totalPortfolio);
  const [isPending, startTransition] = useTransition();

  const hasMore = items.length < total;

  const visibleItems = items.filter((item) => {
    if (!normalizedQuery) return true;

    const searchable =
      `${item.title} ${item.description} ${item.category} ${item.serviceType}`.toLowerCase();
    return searchable.includes(normalizedQuery);
  });

  const loadMore = () => {
    startTransition(async () => {
      const next = await getMorePortfolioByServiceType(
        service.name,
        items.length,
        5,
      );
      setItems((prev) => [
        ...prev,
        ...next.map((n) => ({
          id: n.id,
          title: n.title,
          category: n.category,
          image: n.image,
          description: n.description,
          serviceType: n.serviceType,
        })),
      ]);
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          {service.name}
        </h3>
        {service.description && (
          <p className="text-muted-foreground text-sm mt-1 max-w-lg">
            {service.description}
          </p>
        )}
      </div>

      {visibleItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {visibleItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground italic">
          No loaded items match this filter yet.
        </p>
      )}

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={isPending}
            className="rounded-none border-foreground/30 text-xs font-bold uppercase tracking-wider"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              `Show More (${total - items.length} remaining)`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export function PortfolioClient({
  initialServices,
  totalServices,
  serviceTypes,
}: PortfolioClientProps) {
  const [services, setServices] = useState(initialServices);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedServiceParam = searchParams.get("service")?.trim() || "";
  const selectedService =
    serviceTypes.find(
      (serviceType) =>
        normalizeServiceName(serviceType) ===
        normalizeServiceName(selectedServiceParam),
    ) || "";
  const query = searchParams.get("q") || "";
  const [queryInput, setQueryInput] = useState(query);

  useEffect(() => {
    setQueryInput(query);
  }, [query]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      const trimmed = value.trim();
      if (trimmed) {
        params.set(key, trimmed);
      } else {
        params.delete(key);
      }
    });

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filteredServices = services.filter((service) =>
    selectedService
      ? normalizeServiceName(service.name) ===
        normalizeServiceName(selectedService)
      : true,
  );

  const hasActiveFilters = Boolean(selectedService || query);

  const hasMoreServices = services.length < totalServices;

  const loadMoreServices = () => {
    startTransition(async () => {
      const next = await getMoreServices(services.length, 5);
      // For each new service, also fetch its first 5 portfolio items
      const nextWithPortfolio = await Promise.all(
        next.map(async (s) => {
          const portfolioItems = await getMorePortfolioByServiceType(
            s.name,
            0,
            5,
          );
          // we need count — we fetch 5 and check length, but we don't know total
          // We'll set totalPortfolio to portfolioItems.length and load-more will
          // discover the actual total when it tries to fetch next page (empty result).
          return {
            id: s.id,
            name: s.name,
            description: s.description,
            image: s.image,
            portfolio: portfolioItems.map((p) => ({
              id: p.id,
              title: p.title,
              category: p.category,
              image: p.image,
              description: p.description,
              serviceType: p.serviceType,
            })),
            // We don't have total here, but we'll use a large number
            // so the "show more" button appears when there are exactly 5 items returned.
            totalPortfolio:
              portfolioItems.length < 5 ? portfolioItems.length : 999,
          };
        }),
      );
      setServices((prev) => [...prev, ...nextWithPortfolio]);
    });
  };

  return (
    <div className="space-y-16">
      <div className="border border-border p-4 md:p-5 bg-muted/20">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Service
              </span>
              <Select
                value={selectedService || "all"}
                onValueChange={(value) =>
                  updateParams({ service: value === "all" ? "" : value })
                }
              >
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="All services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All services</SelectItem>
                  {serviceTypes.map((serviceType) => (
                    <SelectItem key={serviceType} value={serviceType}>
                      {serviceType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={queryInput}
              placeholder="Search title, category, or description"
              className="rounded-none"
              onChange={(event) => setQueryInput(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                updateParams({ q: queryInput });
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => updateParams({ q: queryInput })}
              className="rounded-none text-xs font-bold uppercase tracking-wider"
            >
              <Search className="w-3.5 h-3.5 mr-2" />
              Apply Search
            </Button>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="rounded-none text-xs font-bold uppercase tracking-wider"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedService && (
                <Badge variant="secondary" className="rounded-none">
                  Service: {selectedService}
                </Badge>
              )}
              {query && (
                <Badge variant="secondary" className="rounded-none">
                  Query: {query}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {filteredServices.map((service, i) => (
        <div key={service.id}>
          {i > 0 && <Separator className="mb-16" />}
          <ServiceSection
            key={service.id}
            service={service}
            normalizedQuery={normalizedQuery}
          />
        </div>
      ))}

      {filteredServices.length === 0 && (
        <div className="border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No portfolio items match these filters.
          </p>
          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="mt-4 rounded-none text-xs font-bold uppercase tracking-wider"
            >
              Reset and Show All
            </Button>
          )}
        </div>
      )}

      {hasMoreServices && !hasActiveFilters && (
        <div className="pt-4 flex justify-center border-t border-border">
          <Button
            variant="outline"
            onClick={loadMoreServices}
            disabled={isPending}
            className="rounded-none border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground text-xs font-bold uppercase tracking-wider"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              `Load More Services (${totalServices - services.length} more)`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
