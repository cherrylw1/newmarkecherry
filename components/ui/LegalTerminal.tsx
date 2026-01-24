"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type TerminalType = "PRIVACY" | "TERMS" | null;

interface LegalTerminalProps {
    isOpen: TerminalType;
    onClose: () => void;
}

const PRIVACY_TEXT = `> INITIATING PRIVACY PROTOCOL...
> SCANNING DATA RETENTION POLICIES...

// DATA COLLECTION //
We collect minimal signal data required for optimization algorithms:
- Device Fingerprinting: [ACTIVE]
- Session Duration: [LOGGED]
- Conversion Events: [TRACKED]

// SECURITY CLEARANCE //
Your data is encrypted at rest using AES-256 standards. 
We do not sell data to third-party brokers. 
Data is used strictly for performance modeling and ROI calculation.

// USER RIGHTS //
Subject Access Requests (SAR) can be initiated via secure command line.
Deletion requests are processed within 48 hours of verification.

> PROTOCOL STATUS: SECURE.`;

const TERMS_TEXT = `> LOADING TERMS OF SERVICE...
> VERIFYING USER AGREEMENT...

// SERVICE SCOPE //
Cherry On Top provides algorithmic ad optimization services. 
Results are probabilistic based on platform signals. 
Past performance does not guarantee future scaling limits.

// CLIENT OBLIGATIONS //
Client must provide "Editor" access to relevant ad accounts.
Client acknowledges that platform (Meta/Google/TikTok) volatility is external to our control.

// PAYMENT & TERMINATION //
Services are billed on a measurable performance retainer.
Cancellation requires 30-day notice via secure channel.
Unauthorized replication of our optimization framework is prohibited.

> AGREEMENT STATUS: PENDING ACKNOWLEDGEMENT.`;

export default function LegalTerminal({ isOpen, onClose }: LegalTerminalProps) {
    const [displayText, setDisplayText] = useState("");
    const fullText = isOpen === "PRIVACY" ? PRIVACY_TEXT : TERMS_TEXT;

    // Typewriter Effect
    useEffect(() => {
        if (!isOpen) {
            setDisplayText("");
            return;
        }

        let currentText = "";
        const lines = fullText.split("\n");
        let lineIndex = 0;
        let charIndex = 0;

        const interval = setInterval(() => {
            if (lineIndex >= lines.length) {
                clearInterval(interval);
                return;
            }

            const currentLine = lines[lineIndex];

            if (charIndex < currentLine.length) {
                currentText += currentLine[charIndex];
                charIndex++;
                // Reconstruct full string with newlines for what's already done
            } else {
                currentText += "\n";
                lineIndex++;
                charIndex = 0;
            }

            // This logic is a bit simple, let's just slice the full text for simplicity and speed consistency
        }, 10);

        // Simpler implementation for React state
        let i = 0;
        const typeLoop = setInterval(() => {
            setDisplayText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(typeLoop);
        }, 5); // Fast typing

        return () => clearInterval(typeLoop);
    }, [isOpen, fullText]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl bg-black border border-green-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.1)] relative"
                        onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                    >
                        {/* Header */}
                        <div className="bg-green-900/10 border-b border-green-500/20 p-3 flex justify-between items-center">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-xs font-mono text-green-500/50 tracking-widest">
                                SYSTEM OVERRIDE // {isOpen}
                            </div>
                            <div className="w-10" /> {/* Spacer */}
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 md:p-10 min-h-[300px] font-mono text-sm md:text-base text-green-400 overflow-y-auto max-h-[60vh] leading-relaxed whitespace-pre-wrap">
                            {displayText}
                            <span className="animate-pulse">_</span>
                        </div>

                        {/* Footer / ACKNOWLEDGE */}
                        <div className="p-4 border-t border-green-500/20 flex justify-center bg-green-900/5">
                            <button
                                onClick={onClose}
                                className="group relative px-8 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-bold font-dot tracking-widest uppercase transition-all"
                            >
                                <span className="relative z-10 group-hover:text-green-300">Acknowledge Protocol</span>
                                <div className="absolute inset-0 bg-green-500/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </button>
                        </div>

                        {/* Scanlines Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
