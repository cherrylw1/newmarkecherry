"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SocialDock() {
    // Track which icon is hovered/touched
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const socials = [
        {
            id: "mail",
            label: "COMMS",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            ),
            href: "mailto:hello@cherryontops.in",
            brandColor: "#EA4335", // Gmail Red
        },
        {
            id: "linkedin",
            label: "LINK",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            ),
            href: "https://linkedin.com",
            brandColor: "#0A66C2", // LinkedIn Blue
        },
        {
            id: "instagram",
            label: "FEED",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            ),
            href: "https://instagram.com",
            brandColor: "#E4405F", // Instagram Pink
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-none md:pointer-events-auto scale-75 md:scale-100 origin-bottom-right"
        >
            {/* Status Indicator */}
            <div className="flex items-center gap-2 mb-2 px-2 opacity-80 font-mono text-[10px] tracking-widest text-white select-none shadow-black/50 drop-shadow-md">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                SYSTEM ONLINE
            </div>

            {/* The Dock */}
            <div className="pointer-events-auto flex flex-col bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden py-2 shadow-2xl transition-all duration-300 hover:border-white/30 hover:bg-black/90">
                {socials.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        target={item.id === "mail" ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onTouchStart={() => setHoveredId(item.id)}
                        onTouchEnd={() => setHoveredId(null)}
                        // Base style
                        className="group relative flex items-center justify-between gap-6 px-4 py-2 hover:bg-white/5 transition-colors duration-200 cursor-pointer text-gray-300"
                        // Inline style override for GUARANTEED color change
                        style={{
                            color: hoveredId === item.id ? item.brandColor : undefined
                        }}
                    >
                        {/* Label (Left) */}
                        <div className="flex items-center gap-3">
                            <span className="font-dot text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                                [{item.label}]
                            </span>
                        </div>

                        {/* Icon (Right) */}
                        <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 opacity-90 group-hover:opacity-100">
                            {item.icon}
                        </div>

                        {/* Glitch/Scanline effect on hover (optional subtle line) */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                ))}
            </div>
        </motion.div>
    );
}
