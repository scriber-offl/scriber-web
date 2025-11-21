import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Scriber. We are ready to help you transform your ideas into reality. Contact us for educational resources, digital marketing, or branding solutions.",
  keywords: [
    "Contact Scriber",
    "Scriber Support",
    "Scriber Email",
    "Scriber Location",
    "Business Inquiry",
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}
