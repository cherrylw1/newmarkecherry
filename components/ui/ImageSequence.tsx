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
            // OPTIMIZATION: Cap DPR at 1.5 to save performance on high-res mobile screens
            // This huge speed boost makes scrolling smooth on phones
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
                context.imageSmoothingQuality = "high";

                renderFrame();
            }
        };

        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(canvas);

        // Initial load
        for (let i = 0; i < frameCount; i++) {
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
