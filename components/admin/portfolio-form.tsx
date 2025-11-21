"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import {
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioImage,
} from "@/actions/portfolio";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  stream: string;
  image: string;
  description: string;
  fullDescription: string;
  serviceType: string;
  customerEmails: string[] | unknown;
}

interface PortfolioFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemToEdit?: PortfolioItem | null;
}

const SERVICE_OPTIONS = {
  branding: [
    "Logo Design",
    "Brand Identity Package",
    "Flyers & Posters",
    "Social Media Graphics",
    "Packaging Design",
  ],
  labs: [
    "SEO & Content Marketing",
    "Social Media Management",
    "Paid Advertising (PPC)",
    "Web Design & Development",
    "Full Digital Strategy",
  ],
  tlm: [
    "Chart Work",
    "Working Model",
    "Static Model",
    "Flash Cards",
    "Other Teaching Aid",
  ],
};

export function PortfolioForm({
  open,
  onOpenChange,
  itemToEdit,
}: PortfolioFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [itemId, setItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    stream: "branding",
    image: "",
    description: "",
    fullDescription: "",
    serviceType: "",
    customerEmails: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (itemToEdit) {
      setItemId(itemToEdit.id);
      setFormData({
        title: itemToEdit.title,
        category: itemToEdit.category,
        stream: itemToEdit.stream,
        image: itemToEdit.image,
        description: itemToEdit.description,
        fullDescription: itemToEdit.fullDescription,
        serviceType: itemToEdit.serviceType,
        customerEmails: Array.isArray(itemToEdit.customerEmails)
          ? itemToEdit.customerEmails.join(", ")
          : "",
      });
    } else {
      setItemId(null);
      setFormData({
        title: "",
        category: "",
        stream: "branding",
        image: "",
        description: "",
        fullDescription: "",
        serviceType: "",
        customerEmails: "",
      });
    }
  }, [itemToEdit, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const emails = formData.customerEmails
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    try {
      if (itemId) {
        // Update existing
        await updatePortfolioItem(itemId, {
          ...formData,
          customerEmails: emails,
        });
        toast.success("Portfolio item updated");
        router.refresh();
        onOpenChange(false);
      } else {
        // Create new
        const newId = await createPortfolioItem({
          ...formData,
          customerEmails: emails,
        });
        setItemId(newId);
        toast.success("Item created! Now upload an image.");
        router.refresh();
      }
    } catch {
      toast.error("Failed to save portfolio item");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (!itemId) {
      toast.error("Please create the item first");
      return;
    }

    const file = e.target.files[0];
    setUploading(true);

    try {
      // If there's an existing image, delete it first
      if (formData.image) {
        await deletePortfolioImage(formData.image);
      }

      const blob = await upload(`portfolio/${itemId}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      await updatePortfolioItem(itemId, { image: blob.url });
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
    if (!formData.image || !itemId) return;

    setUploading(true);
    try {
      await deletePortfolioImage(formData.image);
      await updatePortfolioItem(itemId, { image: "" });
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {itemId ? "Edit Portfolio Item" : "Add Portfolio Item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g. Brand Identity"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  <SelectItem value="labs">Labs</SelectItem>
                  <SelectItem value="tlm">TLM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) =>
                  setFormData({ ...formData, serviceType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS[
                    formData.stream as keyof typeof SERVICE_OPTIONS
                  ]?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {itemId && (
            <div className="space-y-2">
              <Label>Project Image</Label>
              <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-4 bg-muted/50">
                {formData.image ? (
                  <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                      src={formData.image}
                      alt="Project preview"
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
                          <AlertDialogTitle>Remove Image</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this image? This
                            action cannot be undone.
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
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description</Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) =>
                setFormData({ ...formData, fullDescription: e.target.value })
              }
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmails">
              Customer Emails (comma separated)
            </Label>
            <Input
              id="customerEmails"
              value={formData.customerEmails}
              onChange={(e) =>
                setFormData({ ...formData, customerEmails: e.target.value })
              }
              placeholder="client@example.com, other@example.com"
            />
            <p className="text-xs text-muted-foreground">
              These users will be able to leave a review for this project.
            </p>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : itemId ? (
                "Save Changes"
              ) : (
                "Create & Add Image"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
