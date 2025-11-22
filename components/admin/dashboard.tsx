"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactsList } from "./contacts-list";
import { LeadsList } from "./leads-list";
import { PortfolioManager } from "./portfolio-manager";
import { ReviewsList } from "./reviews-list";
import { ServicesManager } from "./services-manager";

interface AdminDashboardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialContacts: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialLeads: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialPortfolioItems: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialReviews: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialServices: any[];
}

export function AdminDashboard({
  initialContacts,
  initialLeads,
  initialPortfolioItems,
  initialReviews,
  initialServices,
}: AdminDashboardProps) {
  return (
    <Tabs defaultValue="contacts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="contacts">Contacts</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>
      <TabsContent value="contacts" className="space-y-4">
        <ContactsList contacts={initialContacts} />
      </TabsContent>
      <TabsContent value="leads" className="space-y-4">
        <LeadsList leads={initialLeads} />
      </TabsContent>
      <TabsContent value="portfolio" className="space-y-4">
        <PortfolioManager
          items={initialPortfolioItems}
          services={initialServices}
        />
      </TabsContent>
      <TabsContent value="reviews" className="space-y-4">
        <ReviewsList reviews={initialReviews} />
      </TabsContent>
      <TabsContent value="services" className="space-y-4">
        <ServicesManager services={initialServices} />
      </TabsContent>
    </Tabs>
  );
}
