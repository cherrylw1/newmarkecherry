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

            <p className="text-xl md:text-2xl text-foreground/60 mb-8 max-w-xl relative z-10 mix-blend-difference">
                Sharath has personally optimized 100+ accounts. Book your 1:1 strategy session.
            </p>

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
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-[10px] md:text-xs font-dot tracking-widest text-white/40">
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
