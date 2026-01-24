"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1, // Dark mode
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [1, 0.1, 0.1], // Red marker
            glowColor: [1, 1, 1],
            markers: [
                // Bangalore coordinates: 12.9716° N, 77.5946° E
                { location: [12.9716, 77.5946], size: 0.1 },
            ],
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phi;
                phi += 0.01; // Rotation speed
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            />
        </div>
    );
}
