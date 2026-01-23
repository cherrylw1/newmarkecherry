"use client";

import { useRef } from "react";
import TextHover from "@/components/ui/TextHover";
import { motion, useInView } from "framer-motion";

// Helper component for Word Reveal
const WordReveal = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const words = text.split(" ");

    // Variants for the container to stagger children
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay }
        })
    };

    // Variants for each word
    const child = {
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

        {/* Title uses TextHover for character interaction, but wrapped in motion for fade-in timing? 
            Actually user wants text reveal "as if typing". 
            TextHover splits by letters for HOVER interaction. 
            The REQUEST is for "Scroll-Triggered Text Reveal... Text appears word-by-word".
            
            Conflict: TextHover (Letter Hover) vs WordReveal (Word Entry).
            Can we have both? 
            WordReveal animates IN. Once IN, TextHover logic applies.
            
            Complexity: WordReveal splits by words. TextHover splits by chars.
            If I wrap TextHover in WordReveal, TextHover needs to be the content.
            
            Compromise: The title should probably prioritize the "Word Reveal" entry, then become interactive?
            Or simpler: Title is short. Maybe apply WordReveal to Body Copy mainly? 
            User said: "Headline appears first, then body copy".
            
            Implementation:
            I will use WordReveal for the BODY copy strictly (multi-word).
            For the TITLE, "TextHover" is already splitting it. I can optimize TextHover to also "enter" nicely?
            Or just wrap the Title container in a simple fade-up to let the Body be the star of the "decoding" effect.
            
            Wait, user said: "Each card animates... Headline appears first, then body copy." "Words fade in... from left to right".
            
            Okay, I will replace TextHover in the title with WordReveal for the ENTRY animation, 
            AND... can I inject TextHover logic into the words? 
            That gets messy. 
            
            DECISION: I will keep TextHover on the title but animate the CONTAINER of the title to appear.
            The BODY text will get the full "Word-by-Word" decoding treatment.
        */}

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
