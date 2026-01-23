"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram } from "lucide-react";

export default function SocialDock() {
    const socials = [
        {
            id: "mail",
            label: "COMMS",
            icon: <Mail className="w-4 h-4" />,
            href: "mailto:hello@cherryontops.in", // Placeholder
            color: "group-hover:text-green-500",
            hoverText: "SEND TRANSMISSION"
        },
        {
            id: "linkedin",
            label: "LINK",
            icon: <Linkedin className="w-4 h-4" />,
            href: "https://linkedin.com", // Placeholder
            color: "group-hover:text-blue-400",
            hoverText: "ESTABLISH UPLINK"
        },
        {
            id: "instagram",
            label: "FEED",
            icon: <Instagram className="w-4 h-4" />,
            href: "https://instagram.com", // Placeholder
            color: "group-hover:text-red-500",
            hoverText: "VISUAL DATA"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2 pointer-events-none md:pointer-events-auto"
        >
            {/* Status Indicator */}
            <div className="flex items-center gap-2 mb-2 px-2 opacity-50 font-mono text-[10px] tracking-widest text-foreground/60 select-none">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                SYSTEM ONLINE
            </div>

            {/* The Dock */}
            <div className="pointer-events-auto flex flex-col bg-black/40 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden py-2 shadow-2xl transition-all duration-300 hover:border-white/30 hover:bg-black/80">
                {socials.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        target={item.id === "mail" ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className={`group relative flex items-center justify-between gap-6 px-4 py-2 hover:bg-white/5 transition-colors duration-200 cursor-pointer text-gray-400 ${item.color}`}
                    >
                        {/* Label (Left) */}
                        <div className="flex items-center gap-3">
                            <span className="font-dot text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                                [{item.label}]
                            </span>
                        </div>

                        {/* Icon (Right) */}
                        <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 opacity-70 group-hover:opacity-100">
                            {item.icon}
                        </div>

                        {/* Glitch/Scanline effect on hover (optional subtle line) */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                ))}
            </div>
        </motion.div>
    );
}
