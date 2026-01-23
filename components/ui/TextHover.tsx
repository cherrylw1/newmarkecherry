"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Inline utility if lib/utils doesn't exist yet, or to be safe. 
// If project has utils, usually it's better to reuse, but I'll define local helper to be robust.
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TextHoverProps {
    text: string;
    className?: string; // Container styles (e.g., font size, weight)
    charClassName?: string; // Individual character styles
    as?: React.ElementType; // Element type (h1, h2, etc.)
}

export default function TextHover({
    text,
    className,
    charClassName,
    as: Component = "div"
}: TextHoverProps) {
    return (
        <Component className={cn("inline-block", className)}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className={cn(
                        "inline-block transition-colors duration-200 cursor-default hover:text-accent select-none",
                        char === " " ? "w-[0.2em]" : "", // Handle spaces by giving them width
                        charClassName
                    )}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </Component>
    );
}
