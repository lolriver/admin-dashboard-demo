"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { subject: "Engagement", A: 94, fullMark: 100 },
    { subject: "Conversion Rate", A: 82, fullMark: 100 },
    { subject: "User Satisfaction", A: 88, fullMark: 100 },
    { subject: "Content Quality", A: 90, fullMark: 100 },
    { subject: "Performance", A: 85, fullMark: 100 },
];

export function PerformanceRadarChart() {
    return (
        <div className="rounded-xl border border-border/50 bg-card p-6 h-full flex flex-col">
            <div className="mb-6">
                <h3 className="font-semibold text-lg">Performance Analytics</h3>
                <p className="text-sm text-muted-foreground">Key performance indicators and metrics overview</p>
            </div>

            <div className="flex-1 min-h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Performance"
                            dataKey="A"
                            stroke="#94a3b8"
                            strokeWidth={2}
                            fill="#94a3b8"
                            fillOpacity={0.1}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border border-border/50 bg-popover px-3 py-2 shadow-md">
                                            <p className="text-sm font-medium text-white mb-1">{payload[0].payload.subject}</p>
                                            <p className="text-xs text-muted-foreground">{payload[0].value}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-border/50">
                <p className="text-sm text-muted-foreground">
                    Tip: Improve performance by optimizing content delivery, enhancing user experience, and gathering regular feedback.
                </p>
            </div>
        </div>
    );
}
