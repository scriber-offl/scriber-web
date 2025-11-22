"use client";

import {
  Layers,
  PenTool,
  Palette,
  BookOpen,
  Layout,
  Globe,
  Share2,
  BarChart,
  TrendingUp,
  Megaphone,
  Monitor,
  Smartphone,
  Search,
  Mail,
  Video,
  Image as ImageIcon,
  Type,
  Box,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Service {
  id: string;
  name: string;
  description: string | null;
  stream: string;
}

interface ServicesSectionProps {
  services: Service[];
  title?: string;
  description?: string;
}

const ICON_SETS = {
  branding: [Palette, PenTool, Layout, Type, ImageIcon, Box],
  tlm: [BookOpen, Layers, Box, Briefcase, PenTool],
  labs: [
    BarChart,
    Globe,
    Share2,
    TrendingUp,
    Search,
    Megaphone,
    Monitor,
    Smartphone,
    Mail,
    Video,
  ],
  default: [Layers, PenTool, Layout],
};

export function ServicesSection({
  services,
  title = "Our Services",
  description,
}: ServicesSectionProps) {
  if (services.length === 0) return null;

  return (
    <section className="py-20 bg-foreground/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const streamIcons =
              ICON_SETS[service.stream as keyof typeof ICON_SETS] ||
              ICON_SETS.default;
            const iconIndex =
              Math.abs(
                service.name
                  .split("")
                  .reduce((acc, char) => acc + char.charCodeAt(0), 0)
              ) % streamIcons.length;
            const Icon = streamIcons[iconIndex];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <CardTitle>{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
