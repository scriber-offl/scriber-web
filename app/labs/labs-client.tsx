"use client";

import React, { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { CheckCircle } from "lucide-react";
import {
  PortfolioSection,
  PortfolioItem,
} from "@/components/portfolio-section";
import { ServicesSection } from "@/components/services-section";

interface LabsClientProps {
  portfolioItems: PortfolioItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
}

export default function LabsClient({
  portfolioItems,
  services,
}: LabsClientProps) {
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

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <main className="relative">
        {/* Portfolio Section */}
        {portfolioItems.length > 0 && (
          <PortfolioSection
            title="Success Stories"
            description="See how we've helped other businesses achieve their digital goals."
            items={portfolioItems}
            onRequestProject={handleRequestProject}
          />
        )}

        {/* Services Section */}
        <ServicesSection
          services={services}
          title="Our Expertise"
          description="Comprehensive digital solutions designed to elevate your brand and drive results."
        />

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
                  serviceOptions={services.map((s) => s.name)}
                  placeholderText="Describe your business, current challenges, and what you hope to achieve..."
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
