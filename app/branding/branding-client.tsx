"use client";

import React, { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";
import { Spotlight } from "@/components/backgrounds/spotlight-bg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Palette, PenTool, CheckCircle, Layout } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface BrandingClientProps {
  portfolioItems: PortfolioItem[];
}

export default function BrandingClient({
  portfolioItems,
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

  const services = [
    {
      title: "Logo Design",
      description:
        "Memorable and timeless logos that capture the essence of your brand.",
      icon: PenTool,
    },
    {
      title: "Brand Identity",
      description:
        "Complete visual identity systems including color palettes, typography, and guidelines.",
      icon: Palette,
    },
    {
      title: "Marketing Materials",
      description:
        "Stunning designs for flyers, brochures, business cards, and social media assets.",
      icon: Layout,
    },
  ];

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
        <section className="py-20 bg-foreground/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Design Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From concept to execution, we deliver design solutions that
                elevate your brand&apos;s visual presence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                      <service.icon className="w-10 h-10 text-purple-500 mb-4" />
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

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
                    <EmptyMedia variant={"icon"}><Palette className="w-10 h-10 text-purple-500" /></EmptyMedia>
                    <EmptyTitle>No Projects Yet</EmptyTitle>
                  </EmptyHeader>
                    <EmptyDescription>
                      We haven&apos;t added any branding projects yet. Check
                      back soon!
                    </EmptyDescription>
                </Empty>
              </div>
            )}
          </div>
        </section>

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
                  serviceOptions={[
                    "Logo Design",
                    "Brand Identity Package",
                    "Flyers & Posters",
                    "Social Media Graphics",
                    "Packaging Design",
                  ]}
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
