"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus, Loader2 } from "lucide-react";
import { createShopEnquiry } from "@/actions/create-shop-enquiry";
import { toast } from "sonner";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FormWrapper } from "@/components/form-wrapper";

interface ShopProduct {
  id: string;
  name: string;
  description: string;
  specs: string;
  minOrderQuantity: number;
  image: string | null;
}

interface WholesaleSectionProps {
  products: ShopProduct[];
}

export function WholesaleSection({ products }: WholesaleSectionProps) {
  const { data: session } = authClient.useSession();
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        customerName: session.user.name || "",
        customerEmail: session.user.email || "",
      }));
    }
  }, [session]);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleProductChange = (value: string) => {
    setSelectedProductId(value);
    const product = products.find((p) => p.id === value);
    if (product) {
      setQuantity(product.minOrderQuantity);
    }
  };

  const handleQuantityChange = (delta: number) => {
    if (!selectedProduct) return;
    const newQuantity = quantity + delta;
    if (newQuantity >= selectedProduct.minOrderQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setLoading(true);
    try {
      await createShopEnquiry({
        productId: selectedProduct.id,
        quantity,
        ...formData,
      });
      toast.success("Enquiry submitted successfully!");
      // Don't reset name/email if logged in
      setFormData((prev) => ({
        ...prev,
        customerPhone: "",
      }));
      setSelectedProductId("");
      setQuantity(1);
    } catch {
      toast.error("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-accent relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content & Animation */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Wholesale Stationery Needs
              </h2>
              <p className="text-muted-foreground text-lg">
                Bulk orders for schools, institutions, and businesses. Get the
                best quality materials at competitive prices.
              </p>
            </div>

            {/* SVG Animation */}
            <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center text-foreground/80">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Floating Pencil */}
                <g className="animate-[bounce_4s_infinite]">
                  <g transform="translate(40, 40) rotate(45)">
                    <path
                      d="M0,0 L40,0 L40,6 L0,6 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M40,0 L50,3 L40,6 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </g>
                </g>

                {/* Floating Compass */}
                <g className="animate-[bounce_5s_infinite_1s]">
                  <g transform="translate(140, 40) rotate(-15)">
                    <path
                      d="M10,0 L0,40"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M10,0 L20,40"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle
                      cx="10"
                      cy="0"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M5,20 Q10,25 15,20"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </g>
                </g>

                {/* Floating Chart */}
                <g className="animate-[bounce_6s_infinite_0.5s]">
                  <g transform="translate(30, 120) rotate(-10)">
                    <rect
                      x="0"
                      y="0"
                      width="40"
                      height="30"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <line
                      x1="0"
                      y1="25"
                      x2="40"
                      y2="25"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                    <rect
                      x="5"
                      y="15"
                      width="5"
                      height="10"
                      fill="currentColor"
                      className="opacity-20"
                    />
                    <rect
                      x="15"
                      y="10"
                      width="5"
                      height="15"
                      fill="currentColor"
                      className="opacity-20"
                    />
                    <rect
                      x="25"
                      y="5"
                      width="5"
                      height="20"
                      fill="currentColor"
                      className="opacity-20"
                    />
                  </g>
                </g>

                {/* Floating Papers */}
                <g className="animate-[bounce_5.5s_infinite_1.5s]">
                  <g transform="translate(130, 130) rotate(10)">
                    <rect
                      x="5"
                      y="5"
                      width="30"
                      height="40"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      className="opacity-50"
                    />
                    <rect
                      x="0"
                      y="0"
                      width="30"
                      height="40"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <line
                      x1="5"
                      y1="10"
                      x2="25"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="5"
                      y1="15"
                      x2="25"
                      y2="15"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="5"
                      y1="20"
                      x2="25"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </g>
                </g>

                {/* Floating Note */}
                <g className="animate-[bounce_4.5s_infinite_2s]">
                  <g transform="translate(85, 85)">
                    <path
                      d="M0,0 L25,0 L25,25 L0,25 Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M18,0 L18,7 L25,7"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                    <circle cx="10" cy="12" r="1" fill="currentColor" />
                    <line
                      x1="8"
                      y1="18"
                      x2="18"
                      y2="18"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </g>
                </g>

                {/* Background Elements */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                  strokeDasharray="4 4"
                  className="opacity-10 animate-[spin_30s_linear_infinite]"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                  strokeDasharray="2 2"
                  className="opacity-10 animate-[spin_20s_linear_infinite_reverse]"
                />
              </svg>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-card border rounded-none p-8 shadow-lg relative">
            {/* Decorative sharp corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

            <FormWrapper
              title="Wholesale Enquiry"
              description="Sign in to place a wholesale order"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Product</Label>
                  <Select
                    value={selectedProductId}
                    onValueChange={handleProductChange}
                  >
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Choose a product..." />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProduct && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div className="flex gap-4 items-start">
                      {selectedProduct.image && (
                        <div className="relative w-20 h-20 shrink-0 border rounded-none overflow-hidden">
                          <Image
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">
                          {selectedProduct.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedProduct.specs}
                        </p>
                        <p className="text-xs text-primary mt-1">
                          Min Order: {selectedProduct.minOrderQuantity}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-none"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={
                            quantity <= selectedProduct.minOrderQuantity
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-20 text-center font-mono text-lg border py-2 rounded-none">
                          {quantity}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-none"
                          onClick={() => handleQuantityChange(1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Name</Label>
                      <Input
                        id="customerName"
                        required
                        className="rounded-none"
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customerName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerPhone">Phone</Label>
                      <Input
                        id="customerPhone"
                        required
                        className="rounded-none"
                        value={formData.customerPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customerPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      required
                      readOnly
                      className="rounded-none bg-muted"
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerEmail: e.target.value,
                        })
                      }
                    />
                    <p className="text-[0.8rem] text-muted-foreground">
                      To change email, please sign in with a different account.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-none"
                  disabled={loading || !selectedProduct}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Enquiry
                </Button>
              </form>
            </FormWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
