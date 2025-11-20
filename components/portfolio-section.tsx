"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string; // In a real app, this would be a URL. We'll use placeholders or colors.
  description: string;
  fullDescription: string;
  rating: number;
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
  serviceType: string; // To map to form
}

interface PortfolioSectionProps {
  title?: string;
  description?: string;
  items: PortfolioItem[];
  onRequestProject: (item: PortfolioItem) => void;
}

export function PortfolioSection({
  title = "Our Work",
  description = "Check out some of our recent projects.",
  items,
  onRequestProject,
}: PortfolioSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                layout
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-border/50">
                  <div className="h-48 bg-muted relative overflow-hidden group">
                    {/* Placeholder for image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary/20">
                      <span className="text-4xl font-bold opacity-20">
                        {item.category}
                      </span>
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-7xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">
                              {item.title}
                            </DialogTitle>
                            <DialogDescription>
                              {item.category}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid md:grid-cols-5 gap-8 py-4">
                            <div className="space-y-4 md:col-span-3">
                              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden">
                                {/* In a real app, use Next.js Image component here */}
                                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                  <span className="text-lg">
                                    Project Image (Large)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-5 h-5 ${
                                        i < Math.floor(item.rating)
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-base text-muted-foreground font-medium">
                                  ({item.rating} / 5.0)
                                </span>
                              </div>
                            </div>

                            <div className="space-y-6 md:col-span-2 flex flex-col justify-center">
                              <div>
                                <h4 className="font-semibold mb-2 text-lg">
                                  About the Project
                                </h4>
                                <p className="text-muted-foreground text-base leading-relaxed">
                                  {item.fullDescription}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3 text-lg">
                                  Client Reviews
                                </h4>
                                <div className="space-y-4">
                                  {item.reviews.map((review, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-muted/50 p-4 rounded-lg text-sm border border-border/50"
                                    >
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                          <User className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="font-medium">
                                          {review.user}
                                        </span>
                                      </div>
                                      <p className="text-muted-foreground italic">
                                        &quot;{review.comment}&quot;
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <DialogFooter className="sm:justify-between gap-4 items-center border-t pt-4 mt-4">
                            <div className="text-xs text-muted-foreground">
                              Want something similar?
                            </div>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => onRequestProject(item)}
                                className="w-full sm:w-auto"
                              >
                                Request This Project
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </DialogTrigger>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-1">
                          {item.title}
                        </CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.rating} ★
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full group">
                          Know More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-7xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            {item.title}
                          </DialogTitle>
                          <DialogDescription>{item.category}</DialogDescription>
                        </DialogHeader>

                        <div className="grid md:grid-cols-5 gap-8 py-4">
                          <div className="space-y-4 md:col-span-3">
                            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden">
                              {/* In a real app, use Next.js Image component here */}
                              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                <span className="text-lg">
                                  Project Image (Large)
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                      i < Math.floor(item.rating)
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-base text-muted-foreground font-medium">
                                ({item.rating} / 5.0)
                              </span>
                            </div>
                          </div>

                          <div className="space-y-6 md:col-span-2 flex flex-col justify-center">
                            <div>
                              <h4 className="font-semibold mb-2 text-lg">
                                About the Project
                              </h4>
                              <p className="text-muted-foreground text-base leading-relaxed">
                                {item.fullDescription}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3 text-lg">
                                Client Reviews
                              </h4>
                              <div className="space-y-4">
                                {item.reviews.map((review, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-muted/50 p-4 rounded-lg text-sm border border-border/50"
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="w-3 h-3 text-primary" />
                                      </div>
                                      <span className="font-medium">
                                        {review.user}
                                      </span>
                                    </div>
                                    <p className="text-muted-foreground italic">
                                      &quot;{review.comment}&quot;
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <DialogFooter className="sm:justify-between gap-4 items-center border-t pt-4 mt-4">
                          <div className="text-xs text-muted-foreground">
                            Want something similar?
                          </div>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => onRequestProject(item)}
                              className="w-full sm:w-auto"
                            >
                              Request This Project
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </DialogTrigger>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length > 3 && (
          <div className="mt-12 text-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More Projects"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
