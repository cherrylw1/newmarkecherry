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

            if (canvasWidth === 0 || canvasHeight === 0) return;

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
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            const rect = canvas.getBoundingClientRect();

            const newWidth = rect.width * dpr;
            const newHeight = rect.height * dpr;

            if (newWidth !== canvasWidth || newHeight !== canvasHeight) {
                canvasWidth = newWidth;
                canvasHeight = newHeight;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = "high";

                renderFrame();
            }
        };

        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(canvas);

        // Load all frames
        for (let i = 0; i < frameCount; i++) {
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
