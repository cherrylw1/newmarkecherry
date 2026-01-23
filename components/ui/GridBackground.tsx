"use client";

export default function GridBackground() {
    return (
        <div className="fixed inset-0 z-[-2] pointer-events-none w-full h-full">
            {/* Radial Gradient Dot Pattern */}
            <div
                className="absolute inset-0 w-full h-full opacity-30"
                style={{
                    backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            {/* Vignette Mask */}
            <div
                className="absolute inset-0 w-full h-full bg-background"
                style={{
                    maskImage: "radial-gradient(circle at center, transparent, black 120%)",
                    WebkitMaskImage: "radial-gradient(circle at center, transparent, black 120%)",
                }}
            />
        </div>
    );
}
