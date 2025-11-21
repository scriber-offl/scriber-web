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
} from "lucide-react";
import { useState } from "react";
import { PortfolioForm } from "./portfolio-form";
import { deletePortfolioItem } from "@/actions/portfolio";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
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
  stream: string;
  image: string;
  description: string;
  fullDescription: string;
  serviceType: string;
  customerEmails: string[] | unknown;
  createdAt: Date;
}

export function PortfolioManager({ items }: { items: PortfolioItem[] }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

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
    <div className="space-y-4 bg-card/20 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg flex items-center justify-center">
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
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="capitalize">
                  {item.stream}
                </Badge>
              </div>
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
        {items.length === 0 && (
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
      </div>

      <PortfolioForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        itemToEdit={editingItem}
      />
    </div>
  );
}
