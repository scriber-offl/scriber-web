"use client";

import { useState, useEffect } from "react";
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
import { Star, User, ArrowRight, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { addReview } from "@/actions/portfolio";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string; // In a real app, this would be a URL. We'll use placeholders or colors.
  description: string;
  fullDescription: string;
  rating: number;
  customerEmails?: string[] | null;
  reviews: {
    user: string;
    userId: string;
    comment: string;
    rating: number;
  }[];
  serviceType: string; // To map to form
}

function ReviewStack({ reviews }: { reviews: PortfolioItem["reviews"] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (reviews.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center border border-dashed rounded-lg bg-muted/30">
        <p className="text-muted-foreground text-sm italic">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="relative h-[140px] w-full flex items-center justify-center">
      {reviews.map((review, i) => {
        const length = reviews.length;
        const offset = (i - index + length) % length;

        // Show top 3 cards and the one leaving
        if (offset > 2 && offset !== length - 1) return null;

        let zIndex = 3 - offset;
        let scale = 1 - offset * 0.05;
        let y = offset * 10;
        let opacity = 1 - offset * 0.2;

        // The card that is leaving (moving to back)
        if (length > 1 && offset === length - 1) {
          zIndex = 0;
          scale = 0.9;
          y = 20;
          opacity = 0;
        }

        return (
          <motion.div
            key={`${review.userId}-${i}`}
            className="absolute w-full bg-card p-6 rounded-xl border shadow-lg flex flex-col gap-3"
            initial={false}
            animate={{
              zIndex,
              scale,
              y,
              opacity,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              transformOrigin: "top center",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">
                  {review.user}
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, starI) => (
                    <Star
                      key={starI}
                      className={`w-3 h-3 ${
                        starI < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm italic line-clamp-3">
              &quot;{review.comment}&quot;
            </p>
          </motion.div>
        );
      })}
    </div>
  );
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
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (portfolioId: string) => {
    if (!reviewComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    setIsSubmitting(true);
    try {
      await addReview(portfolioId, reviewRating, reviewComment);
      toast.success("Review submitted successfully!");
      setReviewComment("");
      setReviewRating(5);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedItems.map((item, index) => {
              const isAdmin = session?.user?.role === "admin";
              const canReview =
                session?.user &&
                !isAdmin &&
                item.customerEmails?.includes(session.user.email!) &&
                !item.reviews.some((r) => r.userId === session.user.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  layout
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-border/50 pt-0">
                    <div className="h-48 bg-muted relative overflow-hidden group">
                      {item.image && item.image !== "/placeholder.jpg" ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary/20">
                          <span className="text-4xl font-bold opacity-20">
                            {item.category}
                          </span>
                        </div>
                      )}
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
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden relative">
                                  {item.image &&
                                  item.image !== "/placeholder.jpg" ? (
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                      <span className="text-lg">
                                        Project Image (Large)
                                      </span>
                                    </div>
                                  )}
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
                                    ({item.rating} / 5)
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2 md:col-span-2 flex flex-col justify-center">
                                <div>
                                  <h4 className="font-semibold mb-2 text-lg">
                                    About the Project
                                  </h4>
                                  <p className="text-muted-foreground text-base leading-relaxed">
                                    {item.fullDescription}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-4 text-lg">
                                    Client Reviews
                                  </h4>
                                  <ReviewStack reviews={item.reviews} />
                                </div>

                                {isAdmin && (
                                  <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 mt-4">
                                    <h4 className="font-semibold mb-1 text-sm text-destructive flex items-center gap-2">
                                      <ShieldAlert className="w-4 h-4" />
                                      Admin Access
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      Administrators are not permitted to leave
                                      reviews on portfolio items.
                                    </p>
                                  </div>
                                )}

                                {canReview && (
                                  <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mt-4">
                                    <h4 className="font-semibold mb-3 text-sm">
                                      Leave a Review
                                    </h4>
                                    <div className="space-y-3">
                                      <div>
                                        <Label className="text-xs mb-1.5 block">
                                          Rating
                                        </Label>
                                        <div className="flex gap-1">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                              key={star}
                                              type="button"
                                              onClick={() =>
                                                setReviewRating(star)
                                              }
                                              className="focus:outline-none"
                                            >
                                              <Star
                                                className={`w-5 h-5 ${
                                                  star <= reviewRating
                                                    ? "text-yellow-500 fill-yellow-500"
                                                    : "text-muted-foreground"
                                                }`}
                                              />
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <Label
                                          htmlFor="comment"
                                          className="text-xs mb-1.5 block"
                                        >
                                          Comment
                                        </Label>
                                        <Textarea
                                          id="comment"
                                          placeholder="Share your experience..."
                                          value={reviewComment}
                                          onChange={(e) =>
                                            setReviewComment(e.target.value)
                                          }
                                          className="min-h-[80px] text-sm"
                                        />
                                      </div>
                                      <Button
                                        size="sm"
                                        onClick={() =>
                                          handleSubmitReview(item.id)
                                        }
                                        disabled={isSubmitting}
                                        className="w-full"
                                      >
                                        {isSubmitting
                                          ? "Submitting..."
                                          : "Submit Review"}
                                      </Button>
                                    </div>
                                  </div>
                                )}
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
                            <DialogDescription>
                              {item.category}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid md:grid-cols-5 gap-8 py-4">
                            <div className="space-y-4 md:col-span-3">
                              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden relative">
                                {item.image &&
                                item.image !== "/placeholder.jpg" ? (
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                    <span className="text-lg">
                                      Project Image (Large)
                                    </span>
                                  </div>
                                )}
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
                                  ({item.rating} / 5)
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
                                <ReviewStack reviews={item.reviews} />
                              </div>

                              {isAdmin && (
                                <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 mt-4">
                                  <h4 className="font-semibold mb-1 text-sm text-destructive flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4" />
                                    Admin Access
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    Administrators are not permitted to leave
                                    reviews on portfolio items.
                                  </p>
                                </div>
                              )}

                              {canReview && (
                                <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mt-4">
                                  <h4 className="font-semibold mb-3 text-sm">
                                    Leave a Review
                                  </h4>
                                  <div className="space-y-3">
                                    <div>
                                      <Label className="text-xs mb-1.5 block">
                                        Rating
                                      </Label>
                                      <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                              setReviewRating(star)
                                            }
                                            className="focus:outline-none"
                                          >
                                            <Star
                                              className={`w-5 h-5 ${
                                                star <= reviewRating
                                                  ? "text-yellow-500 fill-yellow-500"
                                                  : "text-muted-foreground"
                                              }`}
                                            />
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <Label
                                        htmlFor="comment"
                                        className="text-xs mb-1.5 block"
                                      >
                                        Comment
                                      </Label>
                                      <Textarea
                                        id="comment"
                                        placeholder="Share your experience..."
                                        value={reviewComment}
                                        onChange={(e) =>
                                          setReviewComment(e.target.value)
                                        }
                                        className="min-h-[80px] text-sm"
                                      />
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleSubmitReview(item.id)
                                      }
                                      disabled={isSubmitting}
                                      className="w-full"
                                    >
                                      {isSubmitting
                                        ? "Submitting..."
                                        : "Submit Review"}
                                    </Button>
                                  </div>
                                </div>
                              )}
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
              );
            })}
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
