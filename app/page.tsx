import { Header } from "@/components/header";
import { ModernHero } from "@/components/modern-hero";
import { TLMIntroSection } from "@/components/tlm-intro-section";
import { InstitutionCollaborationSection } from "@/components/institution-collaboration-section";
import { FeaturedServicesSection } from "@/components/featured-services-section";
import { WholesaleSection } from "@/components/tlm/wholesale-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { getFeaturedServicesWithPortfolio } from "@/lib/queries";
import { getShopProducts } from "@/actions/shop";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

async function LandingDynamicSections() {
  const [featuredServices, shopProducts] = await Promise.all([
    getFeaturedServicesWithPortfolio(),
    getShopProducts(),
  ]);

  const serializedServices = featuredServices.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
    portfolio: s.portfolio.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    })),
  }));

  const serializedProducts = shopProducts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <>
      <FeaturedServicesSection services={serializedServices} />
      <WholesaleSection products={serializedProducts} />
    </>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <ModernHero />
      <TLMIntroSection />
      <InstitutionCollaborationSection />
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <LandingDynamicSections />
      </Suspense>
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
