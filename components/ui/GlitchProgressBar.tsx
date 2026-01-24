"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function GlitchProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[99999] block md:hidden pointer-events-none mix-blend-difference">
            {/* Background Track */}
            <div className="absolute inset-0 bg-white/10" />

            {/* The Bar - Solid Red */}
            <motion.div
                className="absolute inset-0 origin-left bg-accent"
                style={{ scaleX }}
            />
        </div>
    );
}
