import { Header } from "@/components/header";
import { ModernHero } from "@/components/modern-hero";
import { ModernBusinessSection } from "@/components/modern-business-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <ModernHero />
      <ModernBusinessSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
