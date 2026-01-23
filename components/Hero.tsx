"use client";

import { useRef } from "react";
import ImageSequence from "@/components/ui/ImageSequence";
import TextHover from "@/components/ui/TextHover";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <ImageSequence
                    folderPath="/images/hero-sequence"
                    frameCount={89}
                    triggerRef={containerRef}
                    className="w-full h-full object-cover"
                />

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
