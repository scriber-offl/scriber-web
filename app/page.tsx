import { Header } from "@/components/header";
import { ModernHero } from "@/components/modern-hero";
import { ModernBusinessSection } from "@/components/modern-business-section";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import { AdminFloatingButton } from "@/components/admin-floating-button";

export default function Home() {
  return (
    <>
      <Header />
      <ModernHero />
      <ModernBusinessSection />
      {/* <ModernPartnershipSection /> */}
      <Footer />
      <Suspense fallback={null}>
        <AdminFloatingButton />
      </Suspense>
    </>
  );
}
