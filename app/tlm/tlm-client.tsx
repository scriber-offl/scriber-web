"use client";

import React, { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";
import { Spotlight } from "@/components/backgrounds/spotlight-bg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, CheckCircle, BookOpen } from "lucide-react";
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

interface TLMClientProps {
  portfolioItems: PortfolioItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
}

export default function TLMClient({
  portfolioItems,
  services,
}: TLMClientProps) {
  const [prefilledValues, setPrefilledValues] = useState<{
    serviceType?: string;
    requirements?: string;
  }>({});

  const handleRequestProject = (item: PortfolioItem) => {
    setPrefilledValues({
      serviceType: item.serviceType,
      requirements: `I am interested in a project similar to "${item.title}". Please provide a quote.`,
    });
    document
      .getElementById("order-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
          <Spotlight />
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-500 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Scriber TLM</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                Empowering Education <br /> with Creative Aids
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Your premier marketplace for B.Ed teaching aids, chart works,
                and working models. We bring educational concepts to life.
              </p>
              <Button size="lg" asChild>
                <Link href="#order-form">Get a Quote</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services/Portfolio Section */}
        <ServicesSection
          services={services}
          title="Our Offerings"
          description="We specialize in creating high-quality teaching and learning materials tailored to your curriculum needs."
        />

        {/* Order Form Section */}
        <section id="order-form" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Place Your Order
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Tell us what you need, and we&apos;ll craft the perfect
                  teaching aid for you. Whether it&apos;s a complex working
                  model or a detailed chart, we&apos;ve got you covered.
                </p>
                <ul className="space-y-4">
                  {[
                    "Customized to your syllabus",
                    "High-quality materials used",
                    "On-time delivery",
                    "Affordable pricing for students",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <LeadForm
                  title="Order Form"
                  subtitle="Fill in the details below to get started."
                  serviceOptions={services.map((s) => s.name)}
                  placeholderText="Describe the topic, subject, and specific requirements for your model or chart..."
                  prefilledValues={prefilledValues}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        {portfolioItems.length > 0 ? (
          <PortfolioSection
            title="Recent Projects"
            description="Explore some of the teaching aids we've created for other educators."
            items={portfolioItems}
            onRequestProject={handleRequestProject}
          />
        ) : (
          <div className="py-12">
            <Empty className="bg-card/20 border-2">
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <BarChart className="w-10 h-10 text-blue-500" />
                </EmptyMedia>
              </EmptyHeader>
              <EmptyTitle>No Projects Yet</EmptyTitle>
              <EmptyDescription>
                We haven&apos;t added any TLM projects yet. Check back soon!
              </EmptyDescription>
            </Empty>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
