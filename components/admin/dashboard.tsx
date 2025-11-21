"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, LogOut, Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ContactsList } from "./contacts-list";
import { LeadsList } from "./leads-list";
import { PortfolioManager } from "./portfolio-manager";
import { ReviewsList } from "./reviews-list";
import { ThemeToggle } from "@/components/theme/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminDashboardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialContacts: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialLeads: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialPortfolioItems: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialReviews: any[];
}

export function AdminDashboard({
  initialContacts,
  initialLeads,
  initialPortfolioItems,
  initialReviews,
}: AdminDashboardProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  const handleRefresh = () => {
    router.refresh();
    toast.success("Data refreshed");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
            <p className="text-muted-foreground">
              Manage contacts, leads, and portfolio items.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>

            {/* Desktop View */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button variant="destructive" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-between p-2 gap-4">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="contacts" className="space-y-4">
            <ContactsList contacts={initialContacts} />
          </TabsContent>
          <TabsContent value="leads" className="space-y-4">
            <LeadsList leads={initialLeads} />
          </TabsContent>
          <TabsContent value="portfolio" className="space-y-4">
            <PortfolioManager items={initialPortfolioItems} />
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4">
            <ReviewsList reviews={initialReviews} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
