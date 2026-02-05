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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5Z49GHZ');`
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dotMatrix.variable} antialiased bg-background text-foreground`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5Z49GHZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
