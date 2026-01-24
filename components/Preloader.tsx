"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
    { text: "> ESTABLISHING SECURE CONNECTION...", color: "text-green-500" },
    { text: "> DELETING OLD MARKETING PLAYBOOKS...", color: "text-red-500" },
    { text: "> INSTALLING: THE CHERRY ON TOP.", color: "text-amber-500" },
];

export default function Preloader() {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        // Line 1: Instant start (0.1s)
        const timer1 = setTimeout(() => setCurrentLineIndex(1), 100);

        // Line 2: Fast sequence (0.8s)
        const timer2 = setTimeout(() => setCurrentLineIndex(2), 800);

        // Line 3: Fast finish (1.5s)
        const timer3 = setTimeout(() => setCurrentLineIndex(3), 1500);

        // Exit: Quick exit (2.2s)
        const timerExit = setTimeout(() => setShowPreloader(false), 2200);

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
                    exit={{ y: "-100%", opacity: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-start justify-center px-6 md:px-20 font-dot font-bold tracking-wider md:tracking-widest text-sm md:text-3xl leading-relaxed md:leading-loose w-full break-words whitespace-pre-wrap"
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
                                <Typewriter text={line.text} delay={index * 0.1} />
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

// Better Typewriter with char-by-char reveal
const Typewriter = ({ text, delay }: { text: string; delay: number }) => {
    // Split text into characters
    const characters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.01, delayChildren: delay } // Ultra-Fast typing (0.01s)
        })
    };

    const child = {
        visible: {
            opacity: 1,
            display: "inline-block", // ensure spaces take up width
        },
        hidden: {
            opacity: 0,
            display: "none", // hide until typed
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="inline-block"
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={child}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    );
};
