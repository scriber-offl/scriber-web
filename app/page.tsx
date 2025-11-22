import { Header } from "@/components/header";
import { ModernHero } from "@/components/modern-hero";
import { ModernBusinessSection } from "@/components/modern-business-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <ModernHero />
      <ModernBusinessSection />
      {/* <ModernPartnershipSection /> */}
      <Footer />
    </>
  );
}
