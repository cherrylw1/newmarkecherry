"use client";

import { motion } from "framer-motion";

interface RedactedRevealProps {
    children: React.ReactNode;
    className?: string; // Wrapper className
    blockClassName?: string; // Color of the redaction block
    delay?: number;
}

export default function RedactedReveal({
    children,
    className = "",
    blockClassName = "bg-accent", // Default to red accent for high impact
    delay = 0
}: RedactedRevealProps) {
    return (
        <div className={`relative inline-block overflow-hidden ${className}`}>
            {/* The Content (Starts hidden/invisible via simple opacity or just covered? Covered is better) */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0, delay: delay }} // Instant appear when block starts moving
            >
                {children}
            </motion.div>

            {/* The Redaction Block */}
            <motion.div
                className={`absolute inset-0 z-20 ${blockClassName}`}
                initial={{ x: "0%" }}
                whileInView={{ x: "101%" }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1], // Sharp "easeOutQuart" feel
                    delay: delay
                }}
            />
        </div>
    );
}
