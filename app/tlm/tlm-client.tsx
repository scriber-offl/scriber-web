"use client";

import React, { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { CheckCircle } from "lucide-react";
import {
  PortfolioSection,
  PortfolioItem,
} from "@/components/portfolio-section";
import { ServicesSection } from "@/components/services-section";
import { WholesaleSection } from "@/components/tlm/wholesale-section";

interface TLMClientProps {
  portfolioItems: PortfolioItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shopProducts: any[];
}

export default function TLMClient({
  portfolioItems,
  services,
  shopProducts,
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
    <div className="bg-background text-foreground overflow-hidden">
      <main className="relative">
        {/* Portfolio Section */}
        {portfolioItems.length > 0 && (
          <PortfolioSection
            title="Recent Projects"
            description="Explore some of the teaching aids we've created for other educators."
            items={portfolioItems}
            onRequestProject={handleRequestProject}
          />
        )}

        <WholesaleSection products={shopProducts} />

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
      </main>
    </div>
  );
}
