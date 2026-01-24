"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Placeholder for toolbox items
const TOOLBOX_ITEMS = [
    "Figma",
    "Framer",
    "React",
    "Next.js",
    "TypeScript",
    "GSAP",
    "Tailwind",
    "Node.js",
    "After Effects",
    "Blender"
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
        <div className="absolute inset-x-0 bottom-[-20%] h-[120%] z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-700">
            <Image
                src="/images/about/wireframe_globe_dark_1769243838697.png"
                alt="Global Reach"
                fill
                className="object-contain object-bottom group-hover:rotate-12 transition-transform duration-[2s] ease-in-out"
            />
        </div>
    </div>
);

const FounderCard = () => (
    <div className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 group">
        <div className="relative h-[400px] md:h-auto w-full overflow-hidden">
            <Image
                src="/images/about/founder_filtered_v2.png"
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
    <div className="w-full border border-white/10 rounded-2xl p-6 bg-neutral-900/30 overflow-hidden">
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Everyday's Toolbox</p>
        <div className="flex flex-wrap gap-3">
            {TOOLBOX_ITEMS.map((item, i) => (
                <span key={i} className="px-4 py-2 border border-white/5 bg-white/5 rounded-lg text-xs md:text-sm text-neutral-300 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                    {item}
                </span>
            ))}
        </div>
    </div>
);

export default function AboutUs() {
    return (
        <section className="relative w-full bg-black py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-dot text-white uppercase tracking-widest mb-8">[ About Us ]</h2>
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

                    {/* Row 3: Toolbox */}
                    <div className="md:col-span-4">
                        <Toolbox />
                    </div>
                </div>
            </div>
        </section>
    );
}
