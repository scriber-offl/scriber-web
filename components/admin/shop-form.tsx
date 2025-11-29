"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useState, useRef, useEffect } from "react";
import {
  createProduct,
  updateProductImage,
  updateProduct,
  deleteProductImage,
} from "@/actions/shop";
import { toast } from "sonner";
import { upload } from "@vercel/blob/client";
import { Loader2, UploadCloud, Trash2 } from "lucide-react";
import Image from "next/image";

interface ShopProduct {
  id: string;
  name: string;
  description: string;
  specs: string;
  minOrderQuantity: number;
  image: string | null;
}

interface ShopFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  product?: ShopProduct | null;
}

export function ShopForm({
  open,
  onOpenChange,
  onSuccess,
  product,
}: ShopFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    specs: "",
    minOrderQuantity: 1,
    image: "" as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setProductId(product.id);
      setFormData({
        name: product.name,
        description: product.description,
        specs: product.specs,
        minOrderQuantity: product.minOrderQuantity,
        image: product.image,
      });
    } else {
      setProductId(null);
      setFormData({
        name: "",
        description: "",
        specs: "",
        minOrderQuantity: 1,
        image: null,
      });
    }
  }, [product, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (productId) {
        await updateProduct(productId, {
          name: formData.name,
          description: formData.description,
          specs: formData.specs,
          minOrderQuantity: formData.minOrderQuantity,
        });
        toast.success("Product updated");
        onSuccess();
        onOpenChange(false);
      } else {
        const newProduct = await createProduct({
          name: formData.name,
          description: formData.description,
          specs: formData.specs,
          minOrderQuantity: formData.minOrderQuantity,
        });
        if (newProduct) {
          setProductId(newProduct.id);
          toast.success("Product created! Now upload an image.");
          onSuccess();
        }
      }
    } catch {
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!productId) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      if (formData.image) {
        await deleteProductImage(formData.image);
      }

      const blob = await upload(`shop/${productId}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      await updateProductImage(productId, blob.url);
      setFormData((prev) => ({ ...prev, image: blob.url }));
      toast.success("Image uploaded");
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async () => {
    if (!productId || !formData.image) return;
    setUploading(true);
    try {
      await deleteProductImage(formData.image);
      await updateProductImage(productId, "");
      setFormData((prev) => ({ ...prev, image: null }));
      toast.success("Image removed");
      onSuccess();
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
            {productId ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specs">Specifications</Label>
              <Input
                id="specs"
                value={formData.specs}
                onChange={(e) =>
                  setFormData({ ...formData, specs: e.target.value })
                }
                placeholder="e.g. A4, 80gsm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moq">Min. Order Quantity</Label>
              <Input
                id="moq"
                type="number"
                min="1"
                value={formData.minOrderQuantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minOrderQuantity: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          {productId && (
            <div className="space-y-2">
              <Label>Product Image</Label>
              <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-4 bg-muted/50">
                {formData.image ? (
                  <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                      src={formData.image}
                      alt="Product preview"
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
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Select Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {productId ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
