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
import { Plus, Trash2, ImageIcon, Pencil, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShopForm } from "./shop-form";
import { deleteProduct } from "@/actions/shop";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ShopEnquiriesList } from "./shop-enquiries-list";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ShopProduct {
  id: string;
  name: string;
  description: string;
  specs: string;
  minOrderQuantity: number;
  image: string | null;
  createdAt: Date;
}

interface ShopManagerProps {
  initialProducts: ShopProduct[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialEnquiries?: any[];
}

export function ShopManager({
  initialProducts,
  initialEnquiries = [],
}: ShopManagerProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(
    null
  );

  const handleDelete = async (id: string, image: string | null) => {
    try {
      await deleteProduct(id, image);
      toast.success("Product deleted");
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = (product: ShopProduct) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Shop Products</h2>
          {products.length > 0 && (
            <Button
              onClick={() => {
                setSelectedProduct(null);
                setIsFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          )}
        </div>

        {products.length === 0 ? (
          <Empty>
            <EmptyMedia>
              <ShoppingBag className="size-10 text-muted-foreground" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No products found</EmptyTitle>
              <EmptyDescription>
                Get started by creating a new product.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => {
                  setSelectedProduct(null);
                  setIsFormOpen(true);
                }}
                className="group"
              >
                <Plus className="w-0 -ml-5 opacity-0 transition-all duration-300 ease-in-out group-hover:w-4 group-hover:ml-0 group-hover:mr-2 group-hover:opacity-100" />
                Create Product
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative aspect-video w-full bg-muted">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <Badge variant="secondary">
                      MOQ: {product.minOrderQuantity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the product.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDelete(product.id, product.image)
                            }
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
          </div>
        )}
      </div>

      {/* Enquiries Section */}
      <div className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-bold tracking-tight">Shop Enquiries</h2>
        <ShopEnquiriesList enquiries={initialEnquiries} />
      </div>

      <ShopForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={selectedProduct}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
