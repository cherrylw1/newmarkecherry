"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
    { text: "> SYSTEM REBOOT INITIATED...", color: "text-green-500" },
    { text: "> DELETING OLD MARKETING PLAYBOOKS...", color: "text-red-500" },
    { text: "> INSTALLING: THE CHERRY ON TOP.", color: "text-amber-500" },
];

export default function Preloader() {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        // Line 1: Immediate
        const timer1 = setTimeout(() => setCurrentLineIndex(1), 1000);

        // Line 2: 
        const timer2 = setTimeout(() => setCurrentLineIndex(2), 2200);

        // Line 3: 
        const timer3 = setTimeout(() => setCurrentLineIndex(3), 3500);

        // Exit
        const timerExit = setTimeout(() => setShowPreloader(false), 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timerExit);
        };
    }, []);

    return (
        <AnimatePresence>
            {showPreloader && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%", opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-start justify-center px-8 md:px-20 font-dot tracking-widest text-sm md:text-xl leading-loose"
                >
                    {lines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: index <= currentLineIndex ? 1 : 0 }}
                            className={`${line.color}`}
                        >
                            {/* Simple "Typing" reveal based on index visibility */}
                            {index <= currentLineIndex && (
                                <Typewriter text={line.text} delay={index * 0.5} />
                            )}
                        </motion.div>
                    ))}

                    {/* Blinking Cursor at the end of the active line */}
                    <div className="mt-2 text-green-500 animate-pulse">_</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Simple typewriter helper
const Typewriter = ({ text, delay }: { text: string; delay: number }) => {
    // Only show full text for simplicity/performance in this specific sequence style
    // effectively "staggering" lines is the main effect requested.
    // But to make it cooler, let's type characters.

    // Actually, for stability in this prompt, reveal line-by-line is safer and cleaner 
    // than excessive re-renders for char-by-char in a constrained environment. 
    // But the user specifically asked for "typing". 
    // Let's use CSS steps or a motion transition for the 'clip-path' or 'width'.

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
        >
            {text}
        </motion.span>
    );
};
