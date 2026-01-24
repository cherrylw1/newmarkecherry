"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Globe from "@/components/ui/Globe";
import TextHover from "@/components/ui/TextHover";

const TOOLBOX_ITEMS = [
    {
        name: "DaVinci Resolve",
        color: "#007CC3", // DaVinci Blue
        path: (
            <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-2v2h2v3h-1c-1.1 0-2 .9-2 2v1.93c3.94-.49 6.99-3.85 6.99-7.93 0-.17-.01-.34-.02-.51l.93 2.9.01.03c.09.28.14.58.14.88 0 1.85-.75 3.52-1.96 4.75l-.09.34z"
            />
        ) // Simplified placeholder path - in real implementation would use exact SVG
    },
    {
        name: "Google Ads",
        color: "#4285F4",
        path: (
            <>
                <path fill="#FBBC04" d="M16.5 4.5L12 2 7.5 4.5l-2 15L12 22l6.5-2.5 2-15z" />
                <path fill="#4285F4" d="M16.5 4.5L12 2v20l4.5-2.5z" />
                <path fill="#34A853" d="M12 2L7.5 4.5 5.5 19.5 12 22V2z" />
            </>
        ) // Simplified Google Ads structure
    },
    {
        name: "Final Cut Pro",
        color: "#A45CFF",
        path: (
            <path
                fill="currentColor"
                d="M21 12l-5-8H8l-5 8 5 8h8l5-8zM12 15l-3-3h6l-3 3z"
            />
        )
    },
    {
        name: "Meta Ads",
        color: "#0668E1",
        path: (
            <path
                fill="currentColor"
                d="M16.892 7.64C15.655 7.64 14.522 8.163 13.522 9.07C12.871 9.66 12.378 10.375 12 11.12C11.623 10.375 11.131 9.66 10.478 9.07C9.479 8.163 8.347 7.64 7.108 7.64C4.269 7.64 2 10.151 2 13.238C2 17.5 6.66 21.085 11.235 24.316L12 24.848L12.765 24.316C17.34 21.085 22 17.5 22 13.238C22 10.151 19.731 7.64 16.892 7.64Z"
            />
        )
    },
    {
        name: "Affinity",
        color: "#4CCCEE",
        path: (
            <path
                fill="currentColor"
                d="M12 2L2 22h20L12 2zm0 4.5L17.5 18h-11L12 6.5z"
            />
        )
    }
];

const StatCard = ({ value, label }: { value: string; label: string }) => (
    <div className="h-full w-full bg-neutral-900/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-neutral-800/50 transition-colors duration-500 group">
        <h3 className="text-4xl md:text-5xl font-bold font-dot text-white mb-2 group-hover:scale-110 transition-transform duration-300">
            {value}
        </h3>
        <p className="text-sm font-light text-neutral-400 uppercase tracking-wider group-hover:text-white transition-colors">
            {label}
        </p>
    </div>
);

const SpotlightCard = ({ title, image, className }: { title: string; image: string; className?: string }) => (
    <div className={`relative w-full h-full bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden group ${className}`}>
        <div className="absolute inset-0 z-0">
            <Image
                src={image}
                alt="Abstract 3D Shape"
                fill
                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
        <div className="relative z-20 h-full flex flex-col justify-end p-6">
            <h3 className="text-xl md:text-2xl font-bold text-white max-w-[80%] leading-tight group-hover:text-accent transition-colors">
                {title}
            </h3>
        </div>
    </div>
);

const LocationCard = () => (
    <div className="relative w-full h-full bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden group flex flex-col items-center justify-between p-6">
        <div className="text-center z-20 mt-4">
            <h3 className="text-xl font-bold text-white mb-1">Based in Bangalore, India</h3>
            <div className="flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs uppercase tracking-widest text-neutral-400">Available Worldwide</span>
            </div>
        </div>
        <div className="absolute inset-x-0 bottom-[-50%] h-[180%] w-full z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700 flex justify-center items-start pointer-events-none">
            <Globe className="translate-y-10" />
        </div>
    </div>
);

const FounderCard = () => (
    <div className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 group">
        <div className="relative h-[400px] md:h-auto w-full overflow-hidden">
            <Image
                src="/images/about/founder_original.jpg"
                alt="Sharath MB - Founder"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-3xl font-bold text-white">Sharath MB</h3>
                <p className="text-sm uppercase tracking-widest text-neutral-400">Founder & Creative Director</p>
            </div>
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center bg-black/40">
            <h4 className="text-2xl font-bold text-white mb-6">The Founder</h4>
            <p className="text-neutral-300 font-light leading-relaxed mb-8">
                Sharath blends creative vision with technical precision. With a focus on high-impact visuals and data-driven strategies, he leads teams to build brand experiences that don't just look good—they convert. He believes aesthetics only matter when they serve a clear purpose.
            </p>
            <div className="mt-auto">
                <button className="text-sm font-bold uppercase tracking-widest text-white hover:text-accent transition-colors flex items-center gap-2">
                    Work with Sharath
                    <span className="text-lg">→</span>
                </button>
            </div>
        </div>
    </div>
);

const Toolbox = () => (
    <div className="w-full border border-white/10 rounded-2xl p-6 bg-neutral-900/30 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left">
            <p className="text-sm font-bold text-white mb-1">Everyday's Toolbox</p>
            <p className="text-xs text-neutral-500 font-light">Mastered for every project.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
            {TOOLBOX_ITEMS.map((item, i) => (
                <div
                    key={i}
                    className="group relative p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                >
                    <div
                        className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 text-neutral-400 group-hover:text-white"
                        style={{ color: item.color }} // Inline style for brand color on hover
                    >
                        <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                            {item.path}
                        </svg>
                    </div>
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                        {item.name}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export default function AboutUs() {
    return (
        <section className="relative w-full bg-black py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-dot uppercase tracking-widest mb-8">
                        <TextHover text="[ About Us ]" className="text-white" charClassName="hover:text-[#FF2E2E]" />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
                    {/* Column 1: Stats */}
                    <div className="flex flex-col gap-4 md:col-span-1">
                        <div className="flex-1 min-h-[180px]">
                            <StatCard value="6+" label="Years of Experience" />
                        </div>
                        <div className="flex-1 min-h-[180px]">
                            <StatCard value="100+" label="Satisfied Clients" />
                        </div>
                    </div>

                    {/* Column 2: Spotlight A */}
                    <div className="md:col-span-1 min-h-[360px]">
                        <SpotlightCard
                            title="Ads creatives to optimization"
                            image="/images/about/abstract_shape_ads_1769243806503.png"
                        />
                    </div>

                    {/* Column 3: Spotlight B */}
                    <div className="md:col-span-1 min-h-[360px]">
                        <SpotlightCard
                            title="Web design for landing pages"
                            image="/images/about/abstract_shape_web_1769243824584.png"
                        />
                    </div>

                    {/* Column 4: Location */}
                    <div className="md:col-span-1 min-h-[360px]">
                        <LocationCard />
                    </div>

                    {/* Row 2: Founder */}
                    <div className="md:col-span-4 min-h-[400px]">
                        <FounderCard />
                    </div>

                    {/* Row 3: Toolbox - Adjusted Layout for Desktop Gap */}
                    <div className="md:col-span-4 md:-mt-2">
                        <Toolbox />
                    </div>
                </div>
            </div>
        </section>
    );
}

