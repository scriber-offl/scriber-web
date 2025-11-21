"use client";

import React, { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";
import { Spotlight } from "@/components/backgrounds/spotlight-bg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, BarChart, Globe, Share2, CheckCircle } from "lucide-react";
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

interface LabsClientProps {
  portfolioItems: PortfolioItem[];
}

export default function LabsClient({ portfolioItems }: LabsClientProps) {
  const [prefilledValues, setPrefilledValues] = useState<{
    serviceType?: string;
    requirements?: string;
  }>({});

  const handleRequestProject = (item: PortfolioItem) => {
    setPrefilledValues({
      serviceType: item.serviceType,
      requirements: `I am interested in a digital strategy similar to the "${item.title}" project.`,
    });
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      title: "SEO Optimization",
      description:
        "Improve your search rankings and drive organic traffic to your website.",
      icon: BarChart,
    },
    {
      title: "Social Media Marketing",
      description:
        "Engage your audience and build brand loyalty across all major platforms.",
      icon: Share2,
    },
    {
      title: "Web Development",
      description:
        "Custom, high-performance websites designed to convert visitors into customers.",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
          <Spotlight
            gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(150, 100%, 85%, .08) 0, hsla(150, 100%, 55%, .02) 50%, hsla(150, 100%, 45%, 0) 80%)"
            gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(150, 100%, 85%, .06) 0, hsla(150, 100%, 55%, .02) 80%, transparent 100%)"
            gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(150, 100%, 85%, .04) 0, hsla(150, 100%, 45%, .02) 80%, transparent 100%)"
          />
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-green-500/30 bg-green-500/10 text-green-500 text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>ScriberLabs</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                Digital Excellence <br /> for Your Business
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                We help businesses grow online through data-driven strategies,
                creative content, and cutting-edge technology.
              </p>
              <Button size="lg" asChild>
                <Link href="#contact-form">Start Your Growth</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-foreground/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive digital solutions designed to elevate your brand
                and drive results.
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
                  <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-green-500/50 transition-colors">
                    <CardHeader>
                      <service.icon className="w-10 h-10 text-green-500 mb-4" />
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
                title="Success Stories"
                description="See how we've helped other businesses achieve their digital goals."
                items={portfolioItems}
                onRequestProject={handleRequestProject}
              />
            ) : (
              <div className="py-12">
                <Empty className="bg-card/20 border-2">
                  <EmptyHeader>
                    <EmptyMedia variant={"icon"}>
                      <BarChart className="w-10 h-10 text-green-500" />
                    </EmptyMedia>
                    <EmptyTitle>No Projects Yet</EmptyTitle>
                    <EmptyDescription>
                      We haven&apos;t added any labs projects yet. Check back
                      soon!
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            )}
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Let&apos;s Grow Together
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Ready to take your digital presence to the next level? Fill
                  out the form, and our team will craft a strategy tailored to
                  your goals.
                </p>
                <ul className="space-y-4">
                  {[
                    "Data-driven strategies",
                    "Transparent reporting",
                    "Dedicated account manager",
                    "Proven track record",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <LeadForm
                  title="Get a Free Consultation"
                  subtitle="Tell us about your business goals."
                  serviceOptions={[
                    "SEO & Content Marketing",
                    "Social Media Management",
                    "Paid Advertising (PPC)",
                    "Web Design & Development",
                    "Full Digital Strategy",
                  ]}
                  placeholderText="Describe your business, current challenges, and what you hope to achieve..."
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
