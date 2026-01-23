"use client";

import { useRef } from "react";
import TextHover from "@/components/ui/TextHover";
import { motion, useInView, type Variants } from "framer-motion";

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
    delay
}: {
    title: string;
    description: string;
    delay: number;
}) => (
    <div
        className="group relative p-8 border border-white/10 bg-black/80 backdrop-blur-xl rounded-xl hover:bg-black/90 transition-all duration-500 overflow-hidden"
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
            className="text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors"
            delay={delay + 0.2} // Start after title
        />
    </div>
);

export default function WhatWeDo() {
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
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen"
                >
                    <source src="/assets/video-bg-what.mp4" type="video/mp4" />
                </video>

                {/* Content Layer */}
                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ServiceCard
                            title="The Insider Advantage"
                            description="We don't just buy media; we engineer it. Using proprietary algorithmic signals, we audit your ad account to find wasted spend and hidden scaling opportunities others miss."
                            delay={0}
                        />
                        <ServiceCard
                            title="Multi-Channel Growth"
                            description="Meta, Google, LinkedIn, TikTok. We orchestrate campaigns across platforms to create an omnipresent brand halo that drives lower CPA and higher LTV."
                            delay={0.2}
                        />
                        <ServiceCard
                            title="Creative to Conversion"
                            description="Clicks don't pay bills. Revenue does. We align high-octane creative production with landing page CRO to ensure traffic actually converts into cash."
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
