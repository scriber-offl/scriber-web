"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  Image as ImageIcon,
  Star,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PortfolioForm } from "./portfolio-form";
import { deletePortfolioItem } from "@/actions/portfolio";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  serviceType: string;
  featured: boolean;
  customerEmails: string[] | unknown;
  createdAt: Date;
}

export function PortfolioManager({
  items,
  services,
  totalItems,
  currentPage,
  totalPages,
  pageSize,
  categories,
  serviceTypes,
  initialFilters,
}: {
  items: PortfolioItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  categories: string[];
  serviceTypes: string[];
  initialFilters: {
    q: string;
    featured: "all" | "featured" | "not-featured";
    image: "all" | "with" | "without";
    category: string;
    serviceType: string;
    sort: "newest" | "oldest" | "title-asc" | "title-desc";
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialFilters.q);
  const [featuredFilter, setFeaturedFilter] = useState<
    "all" | "featured" | "not-featured"
  >(initialFilters.featured);
  const [imageFilter, setImageFilter] = useState<"all" | "with" | "without">(
    initialFilters.image,
  );
  const [categoryFilter, setCategoryFilter] = useState(initialFilters.category);
  const [serviceFilter, setServiceFilter] = useState(
    initialFilters.serviceType,
  );
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "title-asc" | "title-desc"
  >(initialFilters.sort);

  useEffect(() => {
    setSearchQuery(initialFilters.q);
    setFeaturedFilter(initialFilters.featured);
    setImageFilter(initialFilters.image);
    setCategoryFilter(initialFilters.category);
    setServiceFilter(initialFilters.serviceType);
    setSortBy(initialFilters.sort);
  }, [initialFilters]);

  const applyFiltersToUrl = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentQ = searchParams.get("q") || "";
      if (searchQuery !== currentQ) {
        applyFiltersToUrl({ q: searchQuery });
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [applyFiltersToUrl, searchParams, searchQuery]);

  const clearFilters = () => {
    setSearchQuery("");
    setFeaturedFilter("all");
    setImageFilter("all");
    setCategoryFilter("all");
    setServiceFilter("all");
    setSortBy("newest");
    router.push(pathname);
  };

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters = Boolean(
    initialFilters.q ||
    initialFilters.featured !== "all" ||
    initialFilters.image !== "all" ||
    initialFilters.category !== "all" ||
    initialFilters.serviceType !== "all" ||
    initialFilters.sort !== "newest",
  );

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePortfolioItem(id);
      toast.success("Item deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
          <p className="text-muted-foreground">
            Manage your portfolio items here.
          </p>
        </div>
        {items.length > 0 && (
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Portfolio
          </Button>
        )}
      </div>

      <div className="space-y-4 bg-card/20 p-6 rounded-lg">
        {(items.length > 0 || hasActiveFilters) && (
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                Filters
              </div>
              <div className="text-xs text-muted-foreground">
                Showing {items.length} projects on this page ({totalItems}{" "}
                total)
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Input
                placeholder="Search title, category, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Select
                value={featuredFilter}
                onValueChange={(value) => {
                  setFeaturedFilter(
                    value as "all" | "featured" | "not-featured",
                  );
                  applyFiltersToUrl({ featured: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All featured states</SelectItem>
                  <SelectItem value="featured">Featured only</SelectItem>
                  <SelectItem value="not-featured">
                    Not featured only
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={imageFilter}
                onValueChange={(value) => {
                  setImageFilter(value as "all" | "with" | "without");
                  applyFiltersToUrl({ image: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Image" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All image states</SelectItem>
                  <SelectItem value="with">With image</SelectItem>
                  <SelectItem value="without">Without image</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={categoryFilter}
                onValueChange={(value) => {
                  setCategoryFilter(value);
                  applyFiltersToUrl({ category: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={serviceFilter}
                onValueChange={(value) => {
                  setServiceFilter(value);
                  applyFiltersToUrl({ serviceType: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All service types</SelectItem>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(
                    value as "newest" | "oldest" | "title-asc" | "title-desc",
                  );
                  applyFiltersToUrl({ sort: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="title-asc">Title A-Z</SelectItem>
                  <SelectItem value="title-desc">Title Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button variant="destructive" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Reset filters
              </Button>
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="flex flex-col pt-0 overflow-hidden">
              <div className="aspect-video bg-muted relative overflow-hidden flex items-center justify-center">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-muted-foreground/20" />
                )}
                {item.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold truncate">
                  {item.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between gap-4">
                <p className="text-sm line-clamp-2 text-muted-foreground">
                  {item.description}
                </p>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;{item.title}
                          &quot;? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
          {totalItems === 0 && !hasActiveFilters && (
            <div className="col-span-full">
              <Empty>
                <EmptyMedia>
                  <FolderOpen className="size-10 text-muted-foreground" />
                </EmptyMedia>
                <EmptyHeader>
                  <EmptyTitle>No projects found</EmptyTitle>
                  <EmptyDescription>
                    Get started by creating a new portfolio project.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button onClick={handleAdd} className="group">
                    <Plus className="w-0 -ml-5 opacity-0 transition-all duration-300 ease-in-out group-hover:w-4 group-hover:ml-0 group-hover:mr-2 group-hover:opacity-100" />
                    Create Project
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          )}

          {totalItems === 0 && hasActiveFilters && (
            <div className="col-span-full">
              <Empty>
                <EmptyMedia>
                  <FolderOpen className="size-10 text-muted-foreground" />
                </EmptyMedia>
                <EmptyHeader>
                  <EmptyTitle>No matching projects</EmptyTitle>
                  <EmptyDescription>
                    Adjust filters or search to see matching projects.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-2" />
                    Reset filters
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages} • {pageSize} per page
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, currentPage - 3), currentPage + 2)
                  .map((page) => (
                    <Button
                      key={page}
                      size="sm"
                      variant={page === currentPage ? "default" : "ghost"}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <PortfolioForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        itemToEdit={editingItem}
        services={services}
      />
    </div>
  );
}
