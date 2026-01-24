"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceProps {
    folderPath: string;
    frameCount: number;
    className?: string;
    triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function ImageSequence({
    folderPath,
    frameCount,
    className,
    triggerRef,
}: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Optimize context: alpha false if possible (but we use opacity in parent usually)
        // We keep default for flexibility but ensure high quality.
        const context = canvas.getContext("2d");
        if (!context) return;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        const getFrameUrl = (index: number) => {
            const paddedIndex = (index + 1).toString().padStart(3, "0");
            return `${folderPath}/ezgif-frame-${paddedIndex}.jpg`;
        };

        const images: HTMLImageElement[] = [];
        const frame = { index: 0 };
        let canvasWidth = 0;
        let canvasHeight = 0;

        const renderFrame = () => {
            const img = images[Math.round(frame.index)];
            if (!img || !img.complete) return;

            // Safety check
            if (canvasWidth === 0 || canvasHeight === 0) return;

            // Calculate aspect ratio (object-cover logic)
            const hRatio = canvasWidth / img.width;
            const vRatio = canvasHeight / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvasWidth - img.width * ratio) / 2;
            const centerShift_y = (canvasHeight - img.height * ratio) / 2;

            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        };

        const handleResize = () => {
            // OPTIMIZATION: Mobile Turbo Patch
            // Mobile: Force 1.0x DPR for max speed. Desktop: Cap at 1.5x for quality.
            const isMobile = window.innerWidth < 768;
            const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

            const rect = canvas.getBoundingClientRect();

            const newWidth = rect.width * dpr;
            const newHeight = rect.height * dpr;

            if (newWidth !== canvasWidth || newHeight !== canvasHeight) {
                canvasWidth = newWidth;
                canvasHeight = newHeight;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                // Context resets on resize, restore settings
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = isMobile ? "medium" : "high"; // Faster scaling on mobile

                renderFrame();
            }
        };

        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(canvas);

        // Initial load
        const isMobileLoad = window.innerWidth < 768;

        for (let i = 0; i < frameCount; i++) {
            // FRAME SKIPPING LOGIC (Mobile Only)
            // If mobile, recycle every odd frame to save 50% bandwidth/memory
            if (isMobileLoad && i % 2 !== 0 && i > 0) {
                // Point to previous image object (Zero memory cost, mostly smooth)
                // We push a placeholder that will "eventually" be the previous image
                // But wait, array logic. We can just reference the same Image object if we want.
                // Actually, simpler: just don't load. renderFrame needs to handle `undefined`?
                // No, safer to clone reference.
                // However, we can't clone 'images[i-1]' yet because the loop runs instantly.
                // We can just create a new Image with the SAME src? No, that triggers request.

                // Better approach for loop:
                // We actually want images[i] to be images[i-1].
                images[i] = images[i - 1];
                continue;
            }

            const img = new Image();
            img.src = getFrameUrl(i);
            img.onload = () => {
                // If first frame, render immediately to avoid flash
                if (i === 0) {
                    handleResize();
                    renderFrame();
                }
            };
            images.push(img);
            // Fix index alignment if we skipped pushed? 
            // images.push puts it at end.
            // If we skip, we must ensure images[i] is filled.
        }

        // CORRECTION: The loop above with images.push and images[i] = ... is mixing paradigms.
        // Let's rewrite the loop properly.
        images.length = 0; // Clear

        for (let i = 0; i < frameCount; i++) {
            if (isMobileLoad && i % 2 !== 0 && i > 0) {
                // Reuse previous reference
                images.push(images[i - 1]);
            } else {
                const img = new Image();
                img.src = getFrameUrl(i);
                if (i === 0) {
                    img.onload = () => {
                        handleResize();
                        renderFrame();
                    };
                }
                images.push(img);
            }
        }

        if (!triggerRef?.current) return;

        const cleanup = gsap.to(frame, {
            index: frameCount - 1,
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Momentum scrubbing
            },
            onUpdate: () => {
                renderFrame();
            },
        });

        return () => {
            cleanup.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
            resizeObserver.disconnect();
        };
    }, [folderPath, frameCount, triggerRef]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
