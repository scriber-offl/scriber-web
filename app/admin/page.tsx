import { getContacts, getLeads } from "@/actions/admin";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ContactsList } from "@/components/admin/contacts-list";
import { LeadsList } from "@/components/admin/leads-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { connection } from "next/server";

async function AdminData() {
  await connection();
  const [contacts, leads] = await Promise.all([getContacts(), getLeads()]);

  return (
    <Tabs defaultValue="contacts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="contacts">Contacts</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
      </TabsList>
      <TabsContent value="contacts" className="space-y-4">
        <ContactsList contacts={contacts} />
      </TabsContent>
      <TabsContent value="leads" className="space-y-4">
        <LeadsList leads={leads} />
      </TabsContent>
    </Tabs>
  );
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your contacts and leads here.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <AdminData />
      </Suspense>
    </div>
  );
}
