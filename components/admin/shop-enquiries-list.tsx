"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import {
  Eye,
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { deleteShopEnquiry } from "@/actions/shop";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ShopEnquiry {
  id: string;
  productId: string;
  productName: string | null;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: string;
  createdAt: Date;
}

interface ShopEnquiriesListProps {
  enquiries: ShopEnquiry[];
}

export function ShopEnquiriesList({ enquiries }: ShopEnquiriesListProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteShopEnquiry(id);
      toast.success("Enquiry deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete enquiry");
    }
  };

  if (enquiries.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <MessageSquare className="size-10 text-muted-foreground" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No enquiries yet</EmptyTitle>
          <EmptyDescription>
            Enquiries from customers will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {enquiries.map((enquiry) => (
        <Card key={enquiry.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold truncate">
                {enquiry.customerName}
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {format(new Date(enquiry.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {enquiry.productName || "Unknown Product"}
            </p>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Qty: {enquiry.quantity}</Badge>
              <Badge
                variant={
                  enquiry.status === "completed"
                    ? "default"
                    : enquiry.status === "contacted"
                    ? "secondary"
                    : "outline"
                }
              >
                {enquiry.status}
              </Badge>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Enquiry Details</DialogTitle>
                    <DialogDescription>
                      From {enquiry.customerName}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Product</h4>
                        <p className="text-sm text-muted-foreground">
                          {enquiry.productName}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Quantity</h4>
                        <p className="text-sm text-muted-foreground">
                          {enquiry.quantity}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Email</h4>
                        <p className="text-sm text-muted-foreground">
                          {enquiry.customerEmail}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Phone</h4>
                        <p className="text-sm text-muted-foreground">
                          {enquiry.customerPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() =>
                          window.open(`tel:${enquiry.customerPhone}`)
                        }
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() =>
                          window.open(`mailto:${enquiry.customerEmail}`)
                        }
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${enquiry.customerPhone.replace(
                              /\D/g,
                              ""
                            )}`
                          )
                        }
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Enquiry</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this enquiry? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(enquiry.id)}
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
    </div>
  );
}
