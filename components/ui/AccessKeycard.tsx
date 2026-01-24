"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AccessKeycard() {
    const [isActivating, setIsActivating] = useState(false);
    const [step, setStep] = useState(0);

    const handleUnlock = () => {
        setIsActivating(true);

        // TIMELINE EXTENDED (2x Duration for Readability)
        // 0s-1s: SCANNING
        // 1s-2s: ITEM 1
        // 2s-3s: ITEM 2
        // 3s-4s: ITEM 3
        // 4s-5.5s: TRANSFERRING
        // 5.5s: REDIRECT

        setTimeout(() => setStep(1), 800);  // Scan
        setTimeout(() => setStep(2), 1800); // Item 1
        setTimeout(() => setStep(3), 2800); // Item 2
        setTimeout(() => setStep(4), 3800); // Item 3
        setTimeout(() => setStep(5), 4800); // Transfer msg

        setTimeout(() => {
            setTimeout(() => {
                window.open("https://calendly.com/sharathmb-cherryontops/30min", "_blank");
                // Reset state so they can do it again if they return
                setTimeout(() => {
                    setIsActivating(false);
                    setStep(0);
                }, 1000);
            }, 6500); // Redirect after reading time
        };

        return (
            <>
                {/* =========================================================================
                THE KEYCARD (Idle Button) - Bottom Left
                ========================================================================= */}
                {!isActivating && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:hidden fixed bottom-6 left-6 z-[9990] cursor-pointer group"
                        onClick={handleUnlock}
                    >
                        <div className="relative w-32 h-16 bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-lg overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.15)] group-active:scale-95 transition-transform">
                            {/* Holographic Sheen */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent opacity-50 block" />

                            {/* Pulse Border */}
                            <div className="absolute inset-0 border border-green-500/50 rounded-lg animate-pulse" />

                            {/* Text */}
                            <div className="text-center">
                                <div className="text-[9px] text-green-400/70 font-mono tracking-widest mb-1">EXCLUSIVE OFFER</div>
                                <div className="text-sm font-bold font-dot text-white tracking-wider flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                                    CLAIM ASSETS
                                </div>
                            </div>

                            {/* Scanner Line */}
                            <div className="absolute top-0 w-[2px] h-full bg-green-400/50 blur-[2px] animate-[scan_2s_linear_infinite]" />
                        </div>
                    </motion.div>
                )}

                {/* =========================================================================
                THE LOOT DROP (Activation Overlay)
                ========================================================================= */}
                <AnimatePresence>
                    {isActivating && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-8 text-green-500 font-mono text-xs md:text-sm"
                        >
                            {/* Scan Line Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%] pointer-events-none" />

                            <div className="relative z-10 w-full max-w-sm flex flex-col gap-4">

                                {/* Header */}
                                <div className="text-center mb-6 border-b border-green-900 pb-4">
                                    <h2 className="text-xl font-bold font-dot text-white mb-2 tracking-widest">
                                        {step < 5 ? "> ACCESSING SECURE VAULT..." : "> ACCESS GRANTED"}
                                    </h2>
                                    <div className="h-1 w-full bg-green-900 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-green-500"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 2.5, ease: "linear" }}
                                        />
                                    </div>
                                </div>

                                {/* Loot Items */}
                                <div className="flex flex-col gap-2">
                                    {step >= 1 && (
                                        <LootItem text="SCANNING ID... VERIFIED." delay={0} />
                                    )}
                                    {step >= 2 && (
                                        <LootItem text="[+] 30 MIN STRATEGY SESSION" highlight delay={0.1} />
                                    )}
                                    {step >= 3 && (
                                        <LootItem text="[+] HIGH-QUALITY LANDING PAGE" highlight delay={0.1} />
                                    )}
                                    {step >= 4 && (
                                        <LootItem text="[+] CUSTOM VIDEO AD CREATIVE" highlight delay={0.1} />
                                    )}
                                </div>

                                {/* Footer Redirection */}
                                {step >= 5 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 text-center"
                                    >
                                        <p className="text-white animate-pulse tracking-widest">
                                            TRANSFERRING TO SECURE LINE...
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    }

    function LootItem({ text, highlight = false, delay }: { text: string; highlight?: boolean; delay: number }) {
        return (
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 border ${highlight ? "border-green-500/50 bg-green-500/10 text-white" : "border-transparent text-green-600"}`}
            >
                <span className="mr-2">{highlight ? "✓" : ">"}</span>
                {text}
            </motion.div>
        );
    }
