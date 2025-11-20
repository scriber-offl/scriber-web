import type { Metadata } from "next";
import { Geist, Geist_Mono, Unlock } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const unlock = Unlock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-unlock",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Scriber - Digital Solutions & Educational Marketplace",
    template: "%s | Scriber",
  },
  description:
    "Scriber: TLM Marketplace for educational materials, ScriberLabs for digital marketing, and Scriber Branding for complete business branding solutions.",
  keywords: [
    "Scriber",
    "TLM",
    "Teaching Learning Materials",
    "Digital Marketing",
    "Branding",
    "Educational Marketplace",
    "ScriberLabs",
    "Scriber Branding",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Scriber" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unlock.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
