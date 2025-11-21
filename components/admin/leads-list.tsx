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
import { Mail, Phone, MessageCircle, Trash2, Eye, Users } from "lucide-react";
import { format } from "date-fns";
import { deleteLead } from "@/actions/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string | null;
  requirements: string;
  createdAt: Date;
}

export function LeadsList({ leads }: { leads: Lead[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteLead(id);
      toast.success("Lead deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-card/20 p-6">
      {leads.map((lead) => (
        <Card key={lead.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold truncate">
                {lead.name}
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {format(new Date(lead.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {lead.serviceType || "General Inquiry"}
            </p>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between gap-4">
            <p className="text-sm line-clamp-3 text-muted-foreground">
              {lead.requirements}
            </p>
            <div className="flex justify-between items-center pt-2 border-t">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{lead.name}</DialogTitle>
                    <DialogDescription>
                      {lead.email} • {lead.phone}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">
                        Service Type
                      </h4>
                      <p className="text-sm">{lead.serviceType || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">
                        Requirements
                      </h4>
                      <p className="text-sm whitespace-pre-wrap">
                        {lead.requirements}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-4 flex-wrap">
                      <Button asChild variant="outline" size="sm">
                        <a href={`mailto:${lead.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={`tel:${lead.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={`https://wa.me/${lead.phone.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Lead</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the lead for {lead.name}?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(lead.id)}
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
      {leads.length === 0 && (
        <div className="col-span-full">
          <Empty>
            <EmptyMedia>
              <Users className="size-10 text-muted-foreground" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No leads yet</EmptyTitle>
              <EmptyDescription>
                Leads from the lead generation forms will appear here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </div>
  );
}
