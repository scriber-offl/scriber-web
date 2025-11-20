"use client";

import { PinContainer } from "@/components/ui/3d-pin-card";
import Link from "next/link";
import { BookOpen, TrendingUp, Palette, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function BusinessSection() {
  const companies = [
    {
      name: "Scriber TLM",
      subtitle: "Teaching & Learning Materials",
      description:
        "Educational marketplace for buying and selling teaching materials, projects, and academic resources",
      url: "/tlm",
      icon: BookOpen,
      features: ["Project Works", "Study Materials", "Academic Resources"],
      stats: "50+ Resources",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "ScriberLabs",
      subtitle: "Digital Marketing Agency",
      description:
        "Full-service digital marketing with SEO, social media, and content creation expertise",
      url: "/labs",
      icon: TrendingUp,
      features: ["SEO Services", "Social Media", "Content Creation"],
      stats: "10+ Clients",
      color: "from-green-600 to-green-800",
    },
    {
      name: "Scriber Branding",
      subtitle: "Brand Design Studio",
      description:
        "Complete branding solutions from logo design to brand identity development",
      url: "/branding",
      icon: Palette,
      features: ["Logo Design", "Brand Identity", "Marketing Materials"],
      stats: "5+ Brands",
      color: "from-purple-600 to-purple-800",
    },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Companies</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three specialized companies working together to provide
            comprehensive solutions for education, marketing, and branding
            needs.
          </p>
        </motion.div>

        {/* Mobile Cards - Hidden on md and up */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              <Card className="w-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <company.icon className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {company.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {company.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {company.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 text-sm font-medium text-muted-foreground">
                    {company.stats}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={company.url}>
                      Visit {company.name}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Desktop Animated Cards - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              <PinContainer
                key={company.name}
                title={`Visit ${company.name}`}
                href={company.url}
                className="w-full sm:min-w-[320px]"
                containerClassName="w-full h-[400px] sm:h-[500px] sm:min-w-[320px]"
              >
                <div className="flex basis-full flex-col p-4 sm:p-6 tracking-tight w-full h-full sm:min-w-[280px]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base sm:text-lg">
                    {company.name}
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-sm">{company.subtitle}</span>
                  </div>
                  <div className="!mt-2 sm:!mt-3 !mb-4 sm:!mb-6 text-sm leading-relaxed">
                    {company.description}
                  </div>

                  {/* Features */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {company.features.map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant={"outline"}
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats and Icon */}
                  <div className="flex justify-between items-end mt-auto">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <company.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                      <span className="text-sm font-medium">
                        {company.stats}
                      </span>
                    </div>
                  </div>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
