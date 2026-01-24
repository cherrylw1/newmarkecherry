"use client";

import { motion } from "framer-motion";

const items = [
    "SAAS: SPEND OPTIMIZED",
    "//",
    "E-COM: MARGINS IMPROVED 25%",
    "//",
    "FINTECH: CONSISTENT SCALING",
    "//",
    "SAAS: SPEND OPTIMIZED",
    "//",
    "E-COM: MARGINS IMPROVED 25%",
    "//",
    "FINTECH: CONSISTENT SCALING",
    "//"
];

export default function TrustTicker() {
    return (
        <div className="md:hidden w-full bg-accent/10 border-y border-accent/20 overflow-hidden py-3 relative z-20 backdrop-blur-sm">
            {/* Scanlines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.8)_50%,transparent_100%)] z-10" />

            <div className="flex overflow-hidden whitespace-nowrap mask-linear-fade">
                <motion.div
                    className="flex gap-4 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 15,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {[...items, ...items].map((item, i) => (
                        <span
                            key={i}
                            className={`text-xs font-mono tracking-widest ${item === "//" ? "text-accent animate-pulse" : "text-white/80"}`}
                        >
                            {item}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
