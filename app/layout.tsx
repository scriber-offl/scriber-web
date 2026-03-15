import type { Metadata } from "next";
import { Geist, Geist_Mono, Unlock } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";

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
    default: "Scriber - Teaching Learning Materials & Educational Aids",
    template: "%s | Scriber",
  },
  description:
    "Scriber crafts high-quality Teaching Learning Materials (TLM) — chart works, working models, and B.Ed project aids tailored to your curriculum.",
  keywords: [
    "Scriber",
    "TLM",
    "Teaching Learning Materials",
    "Chart Works",
    "Working Models",
    "B.Ed Teaching Aids",
    "Educational Materials",
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
        alt: "Scriber - Teaching Learning Materials & Educational Aids",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriber - Teaching Learning Materials & Educational Aids",
    description:
      "Scriber crafts high-quality Teaching Learning Materials (TLM) — chart works, working models, and B.Ed project aids tailored to your curriculum.",
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
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color={"var(--color-primary)"}
            showSpinner={false}
            showForHashAnchor={false}
          />
          {children}
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
