"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlitchProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Glitch State
    const [glitchColor, setGlitchColor] = useState("bg-red-500");

    useEffect(() => {
        // Randomly glitch the color between Red, Green, and White during scroll
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (Math.random() > 0.9) {
                const colors = ["bg-green-500", "bg-white", "bg-red-500", "bg-blue-500"];
                setGlitchColor(colors[Math.floor(Math.random() * colors.length)]);

                // Reset quickly
                setTimeout(() => setGlitchColor("bg-red-500"), 100);
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[99999] block md:hidden pointer-events-none mix-blend-difference">
            {/* Background Track */}
            <div className="absolute inset-0 bg-white/10" />

            {/* The Bar */}
            <motion.div
                className={`absolute inset-0 origin-left ${glitchColor}`}
                style={{ scaleX }}
            />

            {/* Glitch Artifacts (pseudo-random blocks) */}
            <motion.div
                className="absolute top-0 right-0 h-2 w-2 bg-green-500"
                style={{ opacity: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
                animate={{
                    opacity: [0, 1, 0],
                    x: [0, -10, 0]
                }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            />
        </div>
    );
}
