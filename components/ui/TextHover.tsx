"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TextHoverProps {
    text: string;
    className?: string;
    charClassName?: string;
    as?: React.ElementType;
}

export default function TextHover({
    text,
    className,
    charClassName,
    as: Component = "div"
}: TextHoverProps) {
    return (
        <Component className={cn("inline-block", className)}>
            {/* Split by words first to control wrapping */}
            {text.split(" ").map((word, wordIndex, array) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                        <span
                            key={charIndex}
                            data-text-hover="true"
                            className={cn(
                                "inline-block transition-colors duration-200 cursor-default hover:text-accent select-none",
                                charClassName
                            )}
                        >
                            {char}
                        </span>
                    ))}
                    {/* Add space manually after word, unless it's the last word */}
                    {wordIndex < array.length - 1 && (
                        <span className="inline-block whitespace-pre"> </span>
                    )}
                </span>
            ))}
        </Component>
    );
}
