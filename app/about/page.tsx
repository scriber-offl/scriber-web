import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us — Scriber",
  description:
    "Learn about Scriber's mission to empower educators through innovation, creativity, and high-quality teaching learning materials.",
  keywords: [
    "About Scriber",
    "Scriber Mission",
    "Scriber Values",
    "Teaching Learning Materials",
    "Educational Aids",
    "TLM",
  ],
};

export default function AboutPage() {
  return <AboutClient />;
}
