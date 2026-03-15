"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Layers,
  Pencil,
  UploadCloud,
  Loader2,
  Star,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  createService,
  deleteService,
  updateService,
  deleteServiceImage,
} from "@/actions/services";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { upload } from "@vercel/blob/client";
import Image from "next/image";

interface Service {
  id: string;
  name: string;
  description: string | null;
  featured: boolean;
  image: string | null;
  createdAt: Date;
}

export function ServicesManager({
  services,
  totalItems,
  currentPage,
  totalPages,
  pageSize,
  initialFilters,
}: {
  services: Service[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  initialFilters: {
    q: string;
    featured: "all" | "featured" | "not-featured";
    image: "all" | "with" | "without";
    description: "all" | "with" | "without";
    sort: "newest" | "oldest" | "name-asc" | "name-desc";
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featured: false,
    image: "",
  });
  const [searchQuery, setSearchQuery] = useState(initialFilters.q);
  const [featuredFilter, setFeaturedFilter] = useState<
    "all" | "featured" | "not-featured"
  >(initialFilters.featured);
  const [imageFilter, setImageFilter] = useState<"all" | "with" | "without">(
    initialFilters.image,
  );
  const [descriptionFilter, setDescriptionFilter] = useState<
    "all" | "with" | "without"
  >(initialFilters.description);
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "name-asc" | "name-desc"
  >(initialFilters.sort);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchQuery(initialFilters.q);
    setFeaturedFilter(initialFilters.featured);
    setImageFilter(initialFilters.image);
    setDescriptionFilter(initialFilters.description);
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
    setDescriptionFilter("all");
    setSortBy("newest");
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(
    initialFilters.q ||
    initialFilters.featured !== "all" ||
    initialFilters.image !== "all" ||
    initialFilters.description !== "all" ||
    initialFilters.sort !== "newest",
  );

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", featured: false, image: "" });
    setServiceId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (serviceId) {
        const result = await updateService(serviceId, {
          name: formData.name,
          description: formData.description,
          featured: formData.featured,
          image: formData.image,
        });
        if (result.success) {
          toast.success(result.message);
          resetForm();
          setIsDialogOpen(false);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await createService({
          name: formData.name,
        });
        if (result.success && result.id) {
          setServiceId(result.id);
          toast.success("Service created! Now add details and image.");
          router.refresh();
        } else {
          toast.error(result.message);
        }
      }
    } catch {
      toast.error(
        serviceId ? "Failed to update service" : "Failed to create service",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setServiceId(service.id);
    setFormData({
      name: service.name,
      description: service.description || "",
      featured: service.featured,
      image: service.image || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteService(id);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to delete service");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!serviceId) {
      toast.error("Please create the service first");
      return;
    }

    const file = e.target.files[0];
    setUploading(true);

    try {
      if (formData.image) {
        await deleteServiceImage(formData.image);
      }

      const blob = await upload(`service/${serviceId}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      await updateService(serviceId, { image: blob.url });
      setFormData((prev) => ({ ...prev, image: blob.url }));
      toast.success("Image uploaded successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async () => {
    if (!formData.image || !serviceId) return;
    setUploading(true);
    try {
      await deleteServiceImage(formData.image);
      await updateService(serviceId, { image: "" });
      setFormData((prev) => ({ ...prev, image: "" }));
      toast.success("Image removed");
      router.refresh();
    } catch {
      toast.error("Failed to remove image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Services</h2>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {serviceId ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              {serviceId && (
                <>
                  <div className="flex items-center justify-between rounded-lg border p-3 bg-muted/30">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Featured on Homepage
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Max 4 services can be featured at once.
                      </p>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Service Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-4 bg-muted/50">
                      {formData.image ? (
                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                          <Image
                            src={formData.image}
                            alt="Service preview"
                            fill
                            className="object-cover"
                          />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                disabled={uploading}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Remove Image
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this image?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleRemoveImage}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ) : (
                        <div className="text-center space-y-2 py-4">
                          <div className="flex justify-center">
                            <div className="p-3 bg-background rounded-full shadow-sm">
                              <UploadCloud className="w-6 h-6 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Click to upload image
                            </p>
                            <p className="text-xs text-muted-foreground">
                              SVG, PNG, JPG or GIF (max. 4MB)
                            </p>
                          </div>
                          <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            id="image-upload"
                            disabled={uploading}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                          >
                            {uploading ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              "Select Image"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              <DialogFooter>
                <Button type="submit" disabled={loading || uploading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {serviceId ? "Saving..." : "Creating..."}
                    </>
                  ) : serviceId ? (
                    "Save Changes"
                  ) : (
                    "Create & Continue"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {totalItems === 0 && !hasActiveFilters && (
        <Empty>
          <EmptyMedia>
            <Layers className="size-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No services found</EmptyTitle>
            <EmptyDescription>
              Add services to display them on your website.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {(services.length > 0 || hasActiveFilters) && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              Filters
            </div>
            <div className="text-xs text-muted-foreground">
              Showing {services.length} services on this page ({totalItems}{" "}
              total)
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Input
              placeholder="Search service name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Select
              value={featuredFilter}
              onValueChange={(value) => {
                setFeaturedFilter(value as "all" | "featured" | "not-featured");
                applyFiltersToUrl({ featured: value });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All featured states</SelectItem>
                <SelectItem value="featured">Featured only</SelectItem>
                <SelectItem value="not-featured">Not featured only</SelectItem>
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
              value={descriptionFilter}
              onValueChange={(value) => {
                setDescriptionFilter(value as "all" | "with" | "without");
                applyFiltersToUrl({ description: value });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Description" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All description states</SelectItem>
                <SelectItem value="with">With description</SelectItem>
                <SelectItem value="without">Without description</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(
                  value as "newest" | "oldest" | "name-asc" | "name-desc",
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
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Reset filters
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader className="pb-2 border-b bg-muted/20">
              <CardTitle className="text-base font-semibold flex items-center justify-between gap-2">
                <span className="truncate">{service.name}</span>
                {service.featured && (
                  <Badge variant="secondary" className="gap-1 shrink-0">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    Featured
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col justify-between gap-4">
              <div className="flex gap-3 items-start">
                {service.image ? (
                  <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Layers className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                {service.description && (
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 justify-end border-t pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => handleEdit(service)}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Service</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{service.name}
                        &quot;? This will remove it from all forms.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(service.id)}
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

        {totalItems === 0 && hasActiveFilters && (
          <div className="col-span-full">
            <Empty>
              <EmptyMedia>
                <Layers className="size-10 text-muted-foreground" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>No matching services</EmptyTitle>
                <EmptyDescription>
                  Adjust filters or search to see matching services.
                </EmptyDescription>
              </EmptyHeader>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Reset filters
              </Button>
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
  );
}
