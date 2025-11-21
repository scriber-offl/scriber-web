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
import { Mail, Trash2, Eye, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { deleteContact } from "@/actions/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export function ContactsList({ contacts }: { contacts: Contact[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id);
      toast.success("Contact deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-card/20 p-6">
      {contacts.map((contact) => (
        <Card key={contact.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold truncate">
                {contact.firstName} {contact.lastName}
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {format(new Date(contact.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {contact.subject}
            </p>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between gap-4">
            <p className="text-sm line-clamp-3 text-muted-foreground">
              {contact.message}
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
                    <DialogTitle>
                      {contact.firstName} {contact.lastName}
                    </DialogTitle>
                    <DialogDescription>{contact.email}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Subject</h4>
                      <p className="text-sm">{contact.subject}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Message</h4>
                      <p className="text-sm whitespace-pre-wrap">
                        {contact.message}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button asChild variant="outline" size="sm">
                        <a href={`mailto:${contact.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      </Button>
                      {/* Assuming phone number isn't in contact form, but if it was: */}
                      {/* <Button asChild variant="outline" size="sm">
                        <a href={`tel:${contact.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </a>
                      </Button> */}
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
                    <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this message from{" "}
                      {contact.firstName}? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(contact.id)}
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
      {contacts.length === 0 && (
        <div className="col-span-full">
          <Empty>
            <EmptyMedia>
              <MessageSquare className="size-10 text-muted-foreground" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No messages yet</EmptyTitle>
              <EmptyDescription>
                Messages from the contact form will appear here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </div>
  );
}
