"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the cursor follower
    const springConfig = { damping: 28, stiffness: 500 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Track last touched element to create "hover" effect on mobile dragging
    const lastTouchedRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 6);
            mouseY.set(e.clientY - 6);
        };

        const touchMoveCursor = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                mouseX.set(touch.clientX - 6);
                mouseY.set(touch.clientY - 6);

                // Mobile "Scrub" Effect: Detect element under finger
                const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;

                // Track Cards
                const card = element?.closest('[data-touch-card]') as HTMLElement;

                // If we moved to a new element or card
                // Check if element has changed OR if it's the same element but we might have moved into/out of a card zone
                if (lastTouchedRef.current !== element || element) {
                    /* 
                       Note: logic simplified to just run on move. 
                       Optimization: ideally only run if target changed, but for scrubbing cards, 
                       we need to be sure we catch the transition.
                    */

                    // --- Text Effect ---
                    if (lastTouchedRef.current && lastTouchedRef.current !== element) {
                        if (lastTouchedRef.current.getAttribute('data-text-hover') === 'true') {
                            lastTouchedRef.current.classList.remove('text-accent');
                        }
                    }
                    if (element && element.getAttribute('data-text-hover') === 'true') {
                        element.classList.add('text-accent');
                    }

                    // --- Card Effect ---
                    // Deactivate all other cards if we are not on them
                    // (Using querySelectorAll to be safe ensures clean state)
                    const allCards = document.querySelectorAll('[data-touch-card]');
                    allCards.forEach(c => {
                        if (c !== card) {
                            c.setAttribute('data-active', 'false');
                        }
                    });

                    // Activate current card
                    if (card) {
                        card.setAttribute('data-active', 'true');
                    }

                    lastTouchedRef.current = element;
                }
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("touchmove", touchMoveCursor, { passive: true });
        window.addEventListener("touchstart", touchMoveCursor, { passive: true });
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("touchmove", touchMoveCursor);
            window.removeEventListener("touchstart", touchMoveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="hidden md:block fixed top-0 left-0 bg-accent rounded-full pointer-events-none z-50 mix-blend-difference"
            style={{
                x: cursorX,
                y: cursorY,
                width: 12,
                height: 12,
            }}
            animate={{
                scale: isHovering ? 2 : 1, // Scale up
                opacity: isHovering ? 0.5 : 1, // Lower opacity
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        />
    );
}
