"use client";

import React, { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";
import { Spotlight } from "@/components/backgrounds/spotlight-bg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, BookOpen, CheckCircle, Layers, PenTool } from "lucide-react";
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

interface TLMClientProps {
  portfolioItems: PortfolioItem[];
}

export default function TLMClient({ portfolioItems }: TLMClientProps) {
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

  const services = [
    {
      title: "Chart Works",
      description:
        "High-quality educational charts for all subjects and levels.",
      icon: PenTool,
    },
    {
      title: "Working Models",
      description:
        "Interactive cardboard models that demonstrate scientific concepts.",
      icon: Layers,
    },
    {
      title: "Teaching Aids",
      description:
        "Custom teaching aids designed to enhance classroom engagement.",
      icon: BookOpen,
    },
  ];

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
        <section className="py-20 bg-foreground/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Offerings</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We specialize in creating high-quality teaching and learning
                materials tailored to your curriculum needs.
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
                  <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                    <CardHeader>
                      <service.icon className="w-10 h-10 text-blue-500 mb-4" />
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
          </div>
        </section>

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
                  serviceOptions={[
                    "Chart Work",
                    "Working Model",
                    "Static Model",
                    "Flash Cards",
                    "Other Teaching Aid",
                  ]}
                  placeholderText="Describe the topic, subject, and specific requirements for your model or chart..."
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
