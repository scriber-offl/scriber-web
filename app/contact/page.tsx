import { Metadata } from "next";
import ContactClient from "./contact-client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact Us — Scriber",
  description:
    "Get in touch with Scriber. We are ready to help you with teaching learning materials, chart works, working models, and educational aids.",
  keywords: [
    "Contact Scriber",
    "Scriber Support",
    "Order TLM",
    "Teaching Aids Enquiry",
    "Business Inquiry",
  ],
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactClient />
      <Footer />
    </>
  );
}
