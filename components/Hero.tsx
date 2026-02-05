"use client";

import { useRef } from "react";
import Image from "next/image";
import ImageSequence from "@/components/ui/ImageSequence";
import TextHover from "@/components/ui/TextHover";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Mobile: Static Image (LCP Optimized) */}
                <div className="absolute inset-0 md:hidden z-0">
                    <Image
                        src="/images/hero-sequence/ezgif-frame-001.jpg"
                        alt="Cherry On Top Hero"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover opacity-80"
                    />
                </div>

                {/* Desktop: Canvas Sequence */}
                <div className="hidden md:block w-full h-full relative z-0">
                    <ImageSequence
                        folderPath="/images/hero-sequence"
                        frameCount={89}
                        triggerRef={containerRef}
                        className="w-full h-full object-cover"
                        disableOnMobile={true}
                    />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-white">
                    <div className="text-[12vw] font-bold font-dot uppercase leading-none tracking-tighter text-center flex flex-col items-center pointer-events-auto">
                        <TextHover text="CHERRY" />
                        <TextHover text="ON TOP" />
                    </div>
                    <p className="mt-8 text-xl tracking-widest uppercase opacity-70">
                        Digital Experience Agency
                    </p>
                </div>
            </div>
        </section>
    );
}
