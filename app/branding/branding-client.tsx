"use client";

import React, { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";
import { Spotlight } from "@/components/backgrounds/spotlight-bg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Palette, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  PortfolioSection,
  PortfolioItem,
} from "@/components/portfolio-section";
import { Header } from "@/components/header";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { ServicesSection } from "@/components/services-section";

interface BrandingClientProps {
  portfolioItems: PortfolioItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
}

export default function BrandingClient({
  portfolioItems,
  services,
}: BrandingClientProps) {
  const [prefilledValues, setPrefilledValues] = useState<{
    serviceType?: string;
    requirements?: string;
  }>({});

  const handleRequestProject = (item: PortfolioItem) => {
    setPrefilledValues({
      serviceType: item.serviceType,
      requirements: `I love the design of the "${item.title}" project. I'm looking for something with a similar aesthetic.`,
    });
    document
      .getElementById("design-inquiry")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
          <Spotlight
            gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(270, 100%, 85%, .08) 0, hsla(270, 100%, 55%, .02) 50%, hsla(270, 100%, 45%, 0) 80%)"
            gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(270, 100%, 85%, .06) 0, hsla(270, 100%, 55%, .02) 80%, transparent 100%)"
            gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(270, 100%, 85%, .04) 0, hsla(270, 100%, 45%, .02) 80%, transparent 100%)"
          />
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-purple-500/30 bg-purple-500/10 text-purple-500 text-sm font-medium mb-6">
                <Palette className="w-4 h-4" />
                <span>Scriber Branding</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                Crafting Identities <br /> That Resonate
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                We create powerful visual stories that connect with your
                audience and differentiate your brand in the marketplace.
              </p>
              <Button size="lg" asChild>
                <Link href="#design-inquiry">Start Your Project</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection
          services={services}
          title="Design Services"
          description="From concept to execution, we deliver design solutions that elevate your brand's visual presence."
        />

        {/* Portfolio Section */}
        {portfolioItems.length > 0 ? (
          <PortfolioSection
            title="Featured Work"
            description="A selection of our recent branding and design projects."
            items={portfolioItems}
            onRequestProject={handleRequestProject}
          />
        ) : (
          <div className="py-12">
            <Empty className="bg-card/20 border-2">
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <Palette className="w-10 h-10 text-purple-500" />
                </EmptyMedia>
                <EmptyTitle>No Projects Yet</EmptyTitle>
              </EmptyHeader>
              <EmptyDescription>
                We haven&apos;t added any branding projects yet. Check back
                soon!
              </EmptyDescription>
            </Empty>
          </div>
        )}

        {/* Contact Form Section */}
        <section id="design-inquiry" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Let&apos;s Create Something Amazing
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Whether you need a new logo or a complete brand overhaul,
                  we&apos;re here to bring your vision to life. Tell us about
                  your project.
                </p>
                <ul className="space-y-4">
                  {[
                    "Unique, custom designs",
                    "Consistent brand language",
                    "Print & digital ready files",
                    "Unlimited revisions (on select packages)",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <LeadForm
                  title="Design Inquiry"
                  subtitle="Share your vision with us."
                  serviceOptions={services.map((s) => s.name)}
                  placeholderText="Describe your brand, target audience, and design preferences..."
                  prefilledValues={prefilledValues}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
