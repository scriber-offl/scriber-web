"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import {
  ArrowLeft,
  BookOpen,
  TrendingUp,
  Palette,
  ExternalLink,
  Target,
  Users,
  Lightbulb,
  Award,
} from "lucide-react";

export default function AboutClient() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "High-quality solutions that exceed expectations.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with clients to achieve their goals.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Staying ahead with cutting-edge solutions.",
    },
    {
      icon: Award,
      title: "Integrity",
      description: "Honest, transparent, and ethical practices.",
    },
  ];

  const companies = [
    {
      name: "Scriber TLM",
      subtitle: "Teaching & Learning Materials",
      description:
        "An educational marketplace where educators and students can buy and sell teaching materials, project works, and academic resources.",
      url: "/tlm",
      icon: BookOpen,
      services: ["Project Works", "Study Materials", "Teaching Aids"],
    },
    {
      name: "Scriber Branding",
      subtitle: "Brand Design & Digital Marketing",
      description:
        "From logo design to complete brand identity and digital marketing strategies, we help create memorable brands that grow online.",
      url: "/branding",
      icon: Palette,
      services: [
        "Brand Identity",
        "Digital Marketing",
        "SEO",
        "Content Creation",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-0 left-0 p-6 z-50">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs font-bold uppercase tracking-wider border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground rounded-none"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Home
          </Button>
        </Link>
      </div>

      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
          suppressHydrationWarning
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            suppressHydrationWarning
          >
            About Scriber
          </h1>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            suppressHydrationWarning
          >
            We are a collective of specialized companies dedicated to empowering
            businesses and educators through innovation, design, and strategy.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
          suppressHydrationWarning
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
            suppressHydrationWarning
          >
            <h2
              className="text-2xl font-semibold mb-4"
              suppressHydrationWarning
            >
              Our Mission
            </h2>
            <div className="h-1 w-20 bg-foreground mx-auto mb-6 rounded-full" />
            <p
              className="text-muted-foreground max-w-xl mx-auto"
              suppressHydrationWarning
            >
              To empower businesses and educators with innovative solutions that
              drive growth and excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="p-8 border border-border bg-background hover:bg-foreground/5 transition-colors relative overflow-hidden group flex flex-col justify-between"
              suppressHydrationWarning
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity z-0 pointer-events-none">
                <Target className="w-12 h-12" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4" suppressHydrationWarning>
                  What We Believe
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  suppressHydrationWarning
                >
                  Great achievements start with the right tools, strategy, and
                  identity. We create comprehensive solutions that work together
                  seamlessly to elevate your potential.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-8 border border-border bg-background hover:bg-foreground/5 transition-colors relative overflow-hidden group flex flex-col justify-between"
              suppressHydrationWarning
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity z-0 pointer-events-none">
                <Users className="w-12 h-12" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4" suppressHydrationWarning>
                  Our Approach
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  suppressHydrationWarning
                >
                  We build partnerships, not just provide services. Our
                  integrated approach means every element aligns with your
                  vision, ensuring consistent and impactful results.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
          suppressHydrationWarning
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
            suppressHydrationWarning
          >
            <h2
              className="text-3xl font-bold mb-4 tracking-tight"
              suppressHydrationWarning
            >
              Our Values
            </h2>
            <div className="h-1 w-20 bg-foreground mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-border">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="p-8 border-r border-b border-border text-center hover:bg-foreground/5 transition-colors group relative"
                suppressHydrationWarning
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M8,30 L8,8 L30,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="opacity-20"
                    />
                    <path
                      d="M92,70 L92,92 L70,92"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="opacity-20"
                    />
                  </svg>
                </div>
                <value.icon className="h-10 w-10 mx-auto mb-6 text-foreground group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-bold mb-3 text-lg" suppressHydrationWarning>
                  {value.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  suppressHydrationWarning
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Companies Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
          suppressHydrationWarning
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
            suppressHydrationWarning
          >
            <h2
              className="text-3xl font-bold mb-4 tracking-tight"
              suppressHydrationWarning
            >
              Our Companies
            </h2>
            <div className="h-1 w-20 bg-foreground mx-auto mb-6" />
            <p className="text-muted-foreground" suppressHydrationWarning>
              Specialized companies working together across education,
              marketing, and design.
            </p>
          </motion.div>

          <div className="space-y-8">
            {companies.map((company) => (
              <motion.div
                key={company.name}
                variants={itemVariants}
                className="group border border-border p-8 hover:border-foreground transition-all duration-300 bg-background relative overflow-hidden"
                suppressHydrationWarning
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-foreground/5 rounded-full blur-3xl group-hover:bg-foreground/10 transition-colors duration-500"></div>

                <div className="flex flex-col md:flex-row md:items-start gap-8 relative z-10">
                  <div className="p-4 bg-foreground text-background inline-block self-start">
                    <company.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3
                          className="text-2xl font-bold tracking-tight"
                          suppressHydrationWarning
                        >
                          {company.name}
                        </h3>
                        <p
                          className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1"
                          suppressHydrationWarning
                        >
                          {company.subtitle}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 self-start md:self-auto border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground transition-colors rounded-none"
                        asChild
                      >
                        <Link href={company.url}>
                          Visit Website
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>

                    <p
                      className="text-muted-foreground leading-relaxed mb-6 text-lg"
                      suppressHydrationWarning
                    >
                      {company.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {company.services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground bg-background"
                          suppressHydrationWarning
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center border border-border p-16 bg-foreground text-background relative overflow-hidden"
          suppressHydrationWarning
        >
          <div className="relative z-10">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              suppressHydrationWarning
            >
              Ready to Work Together?
            </h2>
            <p
              className="text-background/80 mb-8 max-w-md mx-auto"
              suppressHydrationWarning
            >
              Whether you need educational resources, marketing expertise, or
              brand design, we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
                asChild
              >
                <Link href="/">Get Started</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="mailto:contact@scriber.in">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Abstract Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
            </svg>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
