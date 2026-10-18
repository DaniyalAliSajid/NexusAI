import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationAndWebsiteJsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nexusai.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NexusAI — Frontier AI Tools Directory & Benchmark Matrix",
    template: "%s | NexusAI",
  },
  description:
    "Authoritative AI tools directory and telemetry engine. Discover, compare, and benchmark 4,200+ verified foundation models, autonomous coding agents, and generative workflows.",
  keywords: [
    "AI Tools Directory",
    "Best AI Tools 2026",
    "Coding Agents",
    "Reasoning LLMs",
    "Generative Art",
    "AI Video Generators",
    "AI Benchmarks",
    "NexusAI",
    "LLM Latency Telemetry",
  ],
  authors: [{ name: "NexusAI Editorial & Engineering Team", url: SITE_URL }],
  creator: "NexusAI",
  publisher: "NexusAI",
  applicationName: "NexusAI Directory",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "NexusAI — Frontier AI Tools Directory & Benchmark Matrix",
    description:
      "Explore 4,200+ hand-vetted AI tools with empirical latency benchmarks, token economics, and authentic community ratings.",
    url: SITE_URL,
    siteName: "NexusAI Directory",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og?title=NexusAI%20Directory&badge=FRONTIER%20AI%20INDEX",
        width: 1200,
        height: 630,
        alt: "NexusAI Social Preview & Benchmark Index",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusAI — Frontier AI Tools Directory",
    description:
      "Verified latency benchmarks, autonomous coding agents, and live head-to-head comparison matrix.",
    images: ["/api/og?title=NexusAI%20Directory&badge=FRONTIER%20AI%20INDEX"],
    creator: "@nexusai_dev",
  },
  verification: {
    google: "google-site-verification-nexusai-token",
    yandex: "yandex-verification-token",
    other: {
      "msvalidate.01": "bing-site-verification-token",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Machine-readable AI Agent discovery link (AEO / GEO standard) */}
        <link rel="author" href="/llms.txt" type="text/plain" title="LLMs.txt" />
        <OrganizationAndWebsiteJsonLd />
      </head>
      <body className="relative flex min-h-screen flex-col bg-[#fafaf8] text-stone-900 dark:bg-[#0c0a09] dark:text-[#fafaf8] font-sans selection:bg-amber-500/20 selection:text-amber-800 dark:selection:text-amber-300 transition-colors duration-150">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Subtle monochrome ambient light */}
          <div className="fixed inset-0 bg-gradient-to-tr from-black/[0.01] via-transparent to-black/[0.01] dark:from-white/[0.02] dark:to-white/[0.02] pointer-events-none z-0" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
