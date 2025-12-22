"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const ActiveDot = ({ top, left, label }: { top: string; left: string; label: string }) => (
    <div className="absolute group cursor-pointer" style={{ top, left }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-75" />

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                <div className="bg-background/90 border border-border px-2 py-1 rounded text-[10px] font-medium shadow-lg backdrop-blur-sm">
                    {label}
                </div>
            </div>
        </div>
    </div>
);

export function WorldMap() {
    return (
        <div className="w-full h-[300px] relative bg-card/50 rounded-xl overflow-hidden flex items-center justify-center border border-border/50 group">
            {/* Dotted Map Layer */}
            <div
                className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                style={{
                    maskImage: "url(/world-map.svg)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: "url(/world-map.svg)",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    backgroundImage: "radial-gradient(circle, #64748b 1.5px, transparent 2px)",
                    backgroundSize: "8px 8px"
                }}
            />

            {/* Active Users Dots - Positioned with percentages for responsiveness */}
            <div className="absolute inset-0 p-8">
                <div className="relative w-full h-full">
                    <ActiveDot top="35%" left="22%" label="New York" />   {/* North America */}
                    <ActiveDot top="28%" left="48%" label="London" />     {/* Europe */}
                    {/* <ActiveDot top="38%" left="82%" label="Tokyo" /> */}    {/* Asia */}
                    <ActiveDot top="75%" left="32%" label="São Paulo" /> {/* South America */}
                    {/* <ActiveDot top="80%" left="88%" label="Sydney" /> */}   {/* Australia */}
                    <ActiveDot top="55%" left="55%" label="Dubai" />      {/* Middle East */}
                </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors border border-white/10">
                    <span className="text-lg leading-none">+</span>
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors border border-white/10">
                    <span className="text-lg leading-none">-</span>
                </button>
            </div>
        </div>
    );
}
