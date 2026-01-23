"use client";

import { useRef } from "react";
import TextHover from "@/components/ui/TextHover";

export default function WhoWeAre() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative h-[150vh] w-full bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-10">
                {/* Background Animation Layer - VIDEO */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 contrast-125"
                >
                    <source src="/assets/video-bg-who.mp4" type="video/mp4" />
                </video>

                {/* Content Layer */}
                <div className="relative z-10">
                    <h2 className="text-[6vw] font-bold font-dot uppercase leading-none mb-4 text-foreground mix-blend-difference flex flex-col">
                        <TextHover text="THE INSIDER EDGE" />
                        <TextHover text="FOR YOUR ADS." />
                    </h2>
                    <h3 className="text-xl md:text-2xl font-light text-accent uppercase tracking-widest mb-10 mix-blend-difference">
                        Founded by Sharath MB (Ex-LinkedIn Marketing).
                    </h3>

                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        <p className="text-xl md:text-3xl leading-relaxed max-w-4xl text-foreground/90 mix-blend-difference">
                            We don't guess algorithms. We know them. Founded by a former LinkedIn Insider who personally optimized over 100 enterprise accounts. We apply officially trained optimization secrets to squeeze every drop of ROI from your budget. From high-converting creative to forensic tracking, we handle the entire ecosystem.
                        </p>

                        <div className="border border-white/20 px-6 py-4 rounded-lg bg-white/5 backdrop-blur-sm self-start whitespace-nowrap">
                            <span className="block text-sm text-foreground/60 uppercase tracking-wider mb-1">Verified</span>
                            <span className="text-lg font-bold text-foreground">100+ Accounts Optimized Strategy</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
