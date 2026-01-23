import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import Booking from "@/components/Booking";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground">
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <Booking />
    </main>
  );
}
