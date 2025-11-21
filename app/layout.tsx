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
  metadataBase: new URL("https://scriber.in"),
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scriber.in",
    siteName: "Scriber",
    images: [
      {
        url: "/scriber-og.png",
        width: 1200,
        height: 630,
        alt: "Scriber - Digital Solutions & Educational Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriber - Digital Solutions & Educational Marketplace",
    description:
      "Scriber: TLM Marketplace for educational materials, ScriberLabs for digital marketing, and Scriber Branding for complete business branding solutions.",
    images: ["/scriber-og.png"],
  },
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
