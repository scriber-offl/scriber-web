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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Trash2,
  Layers,
  Pencil,
  UploadCloud,
  Loader2,
} from "lucide-react";
import { useState, useRef } from "react";
import {
  createService,
  deleteService,
  updateService,
  deleteServiceImage,
} from "@/actions/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  stream: string;
  image: string | null;
  createdAt: Date;
}

export function ServicesManager({ services }: { services: Service[] }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stream: "branding",
    image: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormData({ name: "", description: "", stream: "branding", image: "" });
    setServiceId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (serviceId) {
        // Step 2 or Update: Update existing service with description and image
        const result = await updateService(serviceId, {
          name: formData.name,
          description: formData.description,
          stream: formData.stream,
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
        // Step 1: Create service with name and stream
        const result = await createService({
          name: formData.name,
          stream: formData.stream,
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
        serviceId ? "Failed to update service" : "Failed to create service"
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
      stream: service.stream,
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
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (!serviceId) {
      toast.error("Please create the service first");
      return;
    }

    const file = e.target.files[0];
    setUploading(true);

    try {
      // If there's an existing image, delete it first
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
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.stream]) acc[service.stream] = [];
    acc[service.stream].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Services</h2>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              resetForm();
            }
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
              <div className="space-y-2">
                <Label htmlFor="stream">Stream</Label>
                <Select
                  value={formData.stream}
                  onValueChange={(value) =>
                    setFormData({ ...formData, stream: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branding">Branding</SelectItem>
                    <SelectItem value="tlm">TLM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {serviceId && (
                <>
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
                                  This action cannot be undone.
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

      {Object.entries(groupedServices).length === 0 && (
        <Empty>
          <EmptyMedia>
            <Layers className="size-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No services found</EmptyTitle>
            <EmptyDescription>
              Add services to display them on your website forms.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedServices).map(([stream, streamServices]) => (
          <Card key={stream} className="flex flex-col">
            <CardHeader className="pb-2 border-b bg-muted/20">
              <CardTitle className="text-lg font-semibold capitalize flex items-center justify-between">
                {stream}
                <Badge variant="outline">{streamServices.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {streamServices.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 items-start">
                      {service.image ? (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                          <Layers className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        {service.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => handleEdit(service)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Service</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete &quot;
                              {service.name}
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
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
