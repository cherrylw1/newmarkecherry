"use client";

import { useRef } from "react";
import TextHover from "@/components/ui/TextHover";
import { motion, type Variants } from "framer-motion";

// Helper component for Word Reveal
const WordReveal = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const words = text.split(" ");

    // Variants for the container to stagger children
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay }
        })
    };

    // Variants for each word
    const child: Variants = {
        hidden: {
            opacity: 0,
            y: 5, // Subtle upward motion
            filter: "blur(4px)" // Slight blur for "decoding" feel
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 0.4
            }
        }
    };

    return (
        <motion.div
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }} // Trigger slightly before full view
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="inline-block mr-[0.25em] last:mr-0" // Spacing between words
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

const ServiceCard = ({
    title,
    description,
    outcome,
    delay
}: {
    title: string;
    description: string;
    outcome: string;
    delay: number;
}) => (
    <div
        className="group relative p-8 border border-white/10 bg-black/80 backdrop-blur-xl rounded-xl hover:bg-black/90 transition-all duration-500 overflow-hidden flex flex-col"
    >
        <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

        <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay }}
            className="text-2xl font-bold font-dot mb-4 text-foreground group-hover:text-accent transition-colors block"
        >
            <TextHover text={title} className="pointer-events-auto" />
        </motion.h3>

        <WordReveal
            text={description}
            className="text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors mb-6"
            delay={delay + 0.2} // Start after title
        />

        <div className="mt-auto border-t border-white/10 pt-4">
            <WordReveal
                text={outcome}
                className="text-sm font-bold text-accent/90 uppercase tracking-widest"
                delay={delay + 0.4}
            />
        </div>
    </div>
);

export default function WhatWeDo() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative min-h-[150vh] w-full bg-background py-20">
            {/* Background Animation Layer - VIDEO (Fixed to relative container for simple scroll) 
                 Changed to absolute sticky-like behavior or just standard absolute if we want it to scroll with content?
                 The user asked to keep layout same. Previous layout was sticky 150vh.
             */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen sticky top-0"
                >
                    <source src="/assets/video-bg-what.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center min-h-screen">

                {/* Main Heading */}
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold font-dot text-foreground uppercase tracking-tight mb-4">
                        <TextHover text="THE CHERRY ON TOP" />
                        <br className="hidden md:block" />
                        <TextHover text=" PAID GROWTH FRAMEWORK™" />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <ServiceCard
                        title="Step 1: Diagnose the Leaks"
                        description="Before scaling spend, we identify where money is being wasted. We run a forensic audit across your ad account, tracking setup, and funnel structure to uncover inefficiencies, broken signals, and missed scale opportunities that quietly drain ROI."
                        outcome="Outcome: Wasted spend eliminated. Clear priorities established."
                        delay={0}
                    />
                    <ServiceCard
                        title="Step 2: Engineer the System"
                        description="Paid media doesn’t work in silos — and neither do we. We rebuild your campaigns across Meta, Google, LinkedIn, and TikTok as one coordinated acquisition system, designed to reduce CPA and increase lifetime value."
                        outcome="Outcome: Predictable, scalable performance across channels."
                        delay={0.2}
                    />
                    <ServiceCard
                        title="Step 3: Convert for Revenue"
                        description="Traffic alone is meaningless without conversion. We align ad creative, landing pages, and conversion tracking so every click has a single job: turning intent into revenue."
                        outcome="Outcome: Ad spend directly tied to measurable business growth."
                        delay={0.4}
                    />
                </div>

                {/* Why This Works Section */}
                <div className="max-w-4xl mx-auto text-center bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/5">
                    <h3 className="text-2xl font-bold font-dot text-foreground uppercase mb-4">
                        Why This Works
                    </h3>
                    <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                        This framework is built on real-world experience, not theory. Sharath developed and refined these optimization principles while working on 100+ enterprise ad accounts at LinkedIn, where performance was measured in efficiency, scale, and revenue impact — not vanity metrics.
                    </p>
                </div>
            </div>
        </section>
    );
}
