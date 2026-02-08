"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LegalTerminal from "@/components/ui/LegalTerminal";

export default function Booking() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // Lockbox State
    const [isDenied, setIsDenied] = useState(false);

    const handleLockboxClick = () => {
        // Trigger "Access Denied" Shake
        setIsDenied(true);
        setTimeout(() => setIsDenied(false), 500);
    };

    // Legal Terminal State
    const [legalType, setLegalType] = useState<"PRIVACY" | "TERMS" | null>(null);

    const handleClick = () => {
        setIsExpanded(true);

        // Show text sequence
        setTimeout(() => {
            setShowContent(true);
        }, 600);

        // Redirect
        setTimeout(() => {
            window.location.href = "https://calendly.com/sharathmb-cherryontops/30min";
        }, 2000);
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-transparent px-4 text-center overflow-hidden">
            {/* Legal Terminal Modal */}
            <LegalTerminal isOpen={legalType} onClose={() => setLegalType(null)} />

            {/* Layer 1 (Back): Competitor Intel Lockbox (Interactive) */}
            <motion.div
                className="absolute inset-0 z-[-1]"
                onClick={handleLockboxClick}
                animate={isDenied ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
            >
                {/* The Forbidden Image */}
                <img
                    src="/assets/competitor-intel.png"
                    alt="Restricted Data"
                    className="w-full h-full object-cover opacity-30 blur-[2px] transition-all duration-300"
                    style={{ filter: isDenied ? "grayscale(100%) contrast(150%) brightness(0.5) blur(4px)" : undefined }}
                />

                {/* Denial Overlay (Flashes Red on Click) */}
                <motion.div
                    className="absolute inset-0 bg-red-500/0 flex items-center justify-center pointer-events-none"
                    animate={isDenied ? { backgroundColor: "rgba(255, 0, 0, 0.2)" } : { backgroundColor: "rgba(0,0,0,0)" }}
                >
                    <AnimatePresence>
                        {isDenied && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.2 }}
                                exit={{ opacity: 0 }}
                                className="border-4 border-red-500 text-red-500 font-black text-4xl uppercase px-6 py-2 rotate-[-15deg] backdrop-blur-sm"
                            >
                                ACCESS DENIED
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Exclusive Offer Text Block */}
            <div className="relative z-10 max-w-3xl mb-12 flex flex-col items-center gap-6 mix-blend-difference">
                {/* Headline with Live Pulse */}
                <div className="group flex items-center gap-3 cursor-default">
                    <h3 className="text-2xl md:text-4xl font-bold font-dot uppercase tracking-widest text-foreground group-hover:text-accent transition-colors duration-300">
                        &gt; EXCLUSIVE OFFER: FIRST 50 SPOTS
                    </h3>
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                </div>

                {/* OPERATOR BADGE - Trust Signal (Universal) */}
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full pr-4 pl-1 py-1 mt-2 mb-4 md:mt-4 md:mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="w-5 h-5 md:w-6 md:h-6 text-white/70"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest leading-none mb-0.5">Verified Operator</div>
                        <div className="text-xs md:text-sm text-white font-bold font-dot tracking-wide leading-none">Sharath MB: No Sales Reps.</div>
                    </div>
                </div>

                {/* Body Text */}
                <p className="text-lg md:text-xl text-foreground/80 font-sans font-light leading-relaxed max-w-2xl">
                    Don't just get advice, get the assets. Book now and I'll build you a <span className="text-white font-medium">High-Quality Landing Page + Custom Video Ad</span> for free.
                    <br /><br />
                    <span className="font-dot text-base md:text-lg uppercase tracking-wider text-white font-bold block mb-2">Status: No strings attached.</span>
                    <span className="font-dot text-base md:text-lg uppercase tracking-wider text-white font-bold block">Next Step: Book your free strategy meeting with Sharath below.</span>
                </p>
            </div>

            {/* Container to prevent layout shift when button becomes fixed overlay */}
            <div className="relative z-10 w-full flex justify-center h-20">
                <AnimatePresence>
                    {!isExpanded ? (
                        <motion.button
                            layoutId="booking-button"
                            onClick={handleClick}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-accent text-white px-8 py-5 rounded-full text-xl md:text-2xl font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,46,46,0.3)] whitespace-nowrap"
                        >
                            GET THE CHERRY ON TOP
                        </motion.button>
                    ) : (
                        <motion.div
                            layoutId="booking-button"
                            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-600 text-white"
                            initial={{ borderRadius: "50px" }}
                            animate={{ borderRadius: "0px" }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1] // "Premium" ease
                            }}
                        >
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="text-center"
                                    >
                                        <h2 className="text-[5vw] font-bold font-dot uppercase leading-none mb-4">
                                            Good choice.
                                        </h2>
                                        <p className="text-xl md:text-2xl font-dot font-bold uppercase tracking-widest opacity-90">
                                            This is where optimization begins.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Legal Footer - CYBER AMBER - CENTER STACK FIX */}
            <div className="absolute bottom-1 md:bottom-4 left-0 w-full text-center z-30 pointer-events-auto">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-[10px] md:text-xs font-dot tracking-widest text-white/80 max-w-[60%] md:max-w-none mx-auto">
                    <span>CHERRY ON TOP © 2025 // SYSTEM SECURE</span>
                    <span className="hidden md:inline text-amber-500/20">|</span>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
                        <button onClick={() => setLegalType("PRIVACY")} className="hover:text-amber-400 transition-colors duration-300 uppercase">PRIVACY_PROTOCOL</button>
                        <button onClick={() => setLegalType("TERMS")} className="hover:text-amber-400 transition-colors duration-300 uppercase">TERMS_OF_SERVICE</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
