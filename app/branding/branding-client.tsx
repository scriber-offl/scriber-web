"use client";

import React, { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { CheckCircle } from "lucide-react";
import {
  PortfolioSection,
  PortfolioItem,
} from "@/components/portfolio-section";
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
    <div className="bg-background text-foreground overflow-hidden">
      <main className="relative">
        {/* Portfolio Section */}
        {portfolioItems.length > 0 && (
          <PortfolioSection
            title="Featured Work"
            description="A selection of our recent branding and design projects."
            items={portfolioItems}
            onRequestProject={handleRequestProject}
          />
        )}

        {/* Services Section */}
        <ServicesSection
          services={services}
          title="Design Services"
          description="From concept to execution, we deliver design solutions that elevate your brand's visual presence."
        />

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
    </div>
  );
}
