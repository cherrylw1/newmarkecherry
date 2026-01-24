import type { Metadata } from "next";
import { Geist, Geist_Mono, Codystar } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import GridBackground from "@/components/ui/GridBackground";
import SmoothScrolling from "@/components/SmoothScrolling";
import SocialDock from "@/components/ui/SocialDock";
import GlitchProgressBar from "@/components/ui/GlitchProgressBar";
import AccessKeycard from "@/components/ui/AccessKeycard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dotMatrix = Codystar({
  weight: ["400"],
  variable: "--font-dot",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cherryontops.in"),
  title: "Cherry On Top | Digital Experience Agency",
  description: "We don't guess algorithms. We know them. The insider edge for your ads, founded by Sharath MB.",
  openGraph: {
    title: "Cherry On Top | Digital Experience Agency",
    description: "The insider edge for your ads. Specialized optimization strategy for 100+ enterprise accounts.",
    url: "https://cherryontops.in",
    siteName: "Cherry On Top",
    images: [
      {
        url: "/assets/og-image.jpg", // We should ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "Cherry On Top Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cherry On Top | Digital Experience Agency",
    description: "The insider edge for your ads. Optimization strategies from an Ex-LinkedIn Insider.",
    images: ["/assets/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dotMatrix.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScrolling />
        <CustomCursor />
        <GridBackground />
        <GlitchProgressBar />
        <SocialDock />
        <AccessKeycard />
        {children}
      </body>
    </html>
  );
}
