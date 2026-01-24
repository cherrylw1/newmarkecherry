"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Booking() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showContent, setShowContent] = useState(false);

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
            {/* Layer 1 (Back): 3D Render Image */}
            <div className="absolute inset-0 z-[-1] opacity-20">
                <img src="/assets/bg-book.jpg" alt="The Portal" className="w-full h-full object-cover" />
            </div>

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
                    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20">
                        <img
                            src="/assets/sharath-profile.jpg"
                            alt="Sharath MB"
                            className="w-full h-full object-cover grayscale opacity-90 contrast-125"
                        />
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
            {/* Legal Footer - CYBER AMBER */}
            <div className="absolute bottom-4 left-0 w-full text-center z-30 pointer-events-auto">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-[10px] md:text-xs font-dot tracking-widest text-white/80">
                    <span>CHERRY ON TOP © 2025 // SYSTEM SECURE</span>
                    <span className="hidden md:inline text-amber-500/20">|</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-amber-400 transition-colors duration-300">PRIVACY_PROTOCOL</a>
                        <a href="#" className="hover:text-amber-400 transition-colors duration-300">TERMS_OF_SERVICE</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
