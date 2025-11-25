import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Scriber's mission to empower businesses and educators through innovation, design, and strategy. Discover our specialized companies: Scriber TLM and Scriber Branding.",
  keywords: [
    "About Scriber",
    "Scriber Mission",
    "Scriber Values",
    "Scriber TLM",
    "Scriber Branding",
    "Education Technology",
    "Digital Marketing Agency",
    "Branding Agency",
  ],
};

export default function AboutPage() {
  return <AboutClient />;
}
