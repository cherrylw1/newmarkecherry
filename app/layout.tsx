import type { Metadata } from "next";
import { Geist, Geist_Mono, Codystar } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import GridBackground from "@/components/ui/GridBackground";
import SmoothScrolling from "@/components/SmoothScrolling";

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
  title: "Cherry On Top",
  description: "Digital Experience Agency",
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
        {children}
      </body>
    </html>
  );
}
