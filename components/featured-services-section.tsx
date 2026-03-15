"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

export interface FeaturedPortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  serviceType: string;
  rating: number;
}

export interface FeaturedService {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  portfolio: FeaturedPortfolioItem[];
}

function PortfolioCard({ item }: { item: FeaturedPortfolioItem }) {
  return (
    <div className="group flex flex-col border border-border bg-background hover:border-foreground/30 transition-colors overflow-hidden h-full">
      <div className="relative aspect-video bg-muted overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 80vw, 33vw"
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
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h4 className="font-semibold text-sm leading-snug line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
          {item.description}
        </p>
        {item.rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-medium">{item.rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileCarousel({ items }: { items: FeaturedPortfolioItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div key={item.id} className="snap-center shrink-0 w-[80vw] max-w-xs">
            <PortfolioCard item={item} />
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="flex justify-center gap-3 mt-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-none h-8 w-8"
            onClick={() => scroll("left")}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-none h-8 w-8"
            onClick={() => scroll("right")}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function ServiceBlock({
  service,
  index,
}: {
  service: FeaturedService;
  index: number;
}) {
  const serviceLink = {
    pathname: "/portfolio",
    query: { service: service.name },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="py-12 border-t border-border first:border-t-0"
    >
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1">
            {service.name}
          </h3>
          {service.description && (
            <p className="text-muted-foreground text-sm max-w-lg">
              {service.description}
            </p>
          )}
        </div>
        <Link
          href={serviceLink}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group shrink-0"
        >
          View all
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {service.portfolio.length > 0 ? (
        <>
          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {service.portfolio.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
          {/* Mobile carousel */}
          <div className="md:hidden">
            <MobileCarousel items={service.portfolio} />
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground italic">
          Portfolio items coming soon.
        </p>
      )}
    </motion.div>
  );
}

interface FeaturedServicesSectionProps {
  services: FeaturedService[];
}

export function FeaturedServicesSection({
  services,
}: FeaturedServicesSectionProps) {
  if (services.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-4">
          <div className="inline-block border border-foreground/20 px-3 py-1 text-xs font-mono tracking-widest uppercase mb-4">
            Our Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-xl">
            A curated selection of our best teaching and learning materials
            across our service offerings.
          </p>
        </div>

        {/* Service blocks */}
        <div className="mt-10">
          {services.map((service, i) => (
            <ServiceBlock key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-10 border-t border-border text-center">
          <Link href="/portfolio">
            <Button
              variant="outline"
              className="gap-2 rounded-none border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground text-xs font-bold uppercase tracking-wider"
            >
              Explore All Work
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
