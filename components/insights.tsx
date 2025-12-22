"use client";

import * as React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, Users, Clock, Target, Activity, MousePointerClick, ArrowUpRight } from "lucide-react";

const performanceData = [
    { name: "Task Completion", value: 85, fill: "#3b82f6", icon: Target, desc: "Overall completion rate" },
    { name: "User Engagement", value: 84, fill: "#22c55e", icon: Users, desc: "Active user participation" },
    { name: "Response Time", value: 78, fill: "#64748b", icon: Clock, desc: "Average response efficiency" },
];

const trendsData = [
    { name: "User Growth", value: 92, fill: "#22c55e", icon: TrendingUp, desc: "Month-over-month increase" },
    { name: "Engagement Rate", value: 88, fill: "#3b82f6", icon: Users, desc: "Daily active users" },
    { name: "Retention", value: 75, fill: "#64748b", icon: Target, desc: "User retention rate" },
];

export function Insights() {
    const [activeTab, setActiveTab] = React.useState<"performance" | "trends">("performance");
    const data = activeTab === "performance" ? performanceData : trendsData;
    // Calculate average for the center text
    const totalValue = Math.round(data.reduce((acc, curr) => acc + curr.value, 0) / data.length);

    return (
        <div className="rounded-xl border border-border/50 bg-card p-6 flex flex-col h-full">
            <div className="mb-6">
                <h3 className="font-semibold text-lg">Insights</h3>
                <p className="text-sm text-muted-foreground">Performance analytics</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-white/5 p-1 rounded-lg mb-8">
                <button
                    onClick={() => setActiveTab("performance")}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-md transition-all",
                        activeTab === "performance" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"
                    )}
                >
                    <Target className="w-4 h-4" />
                    Performance
                </button>
                <button
                    onClick={() => setActiveTab("trends")}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-md transition-all",
                        activeTab === "trends" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"
                    )}
                >
                    <TrendingUp className="w-4 h-4" />
                    Trends
                </button>
            </div>

            {/* Chart */}
            <div className="relative h-[200px] w-full mb-8 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        innerRadius="50%"
                        outerRadius="100%"
                        barSize={10}
                        data={data}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar
                            background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                            dataKey="value"
                            cornerRadius={10}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{totalValue}%</span>
                </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-5 mt-auto">
                {data.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-colors group-hover:bg-white/10"
                                style={{ color: item.fill }}
                            >
                                <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium group-hover:text-white transition-colors">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                        <span className="font-bold text-sm" style={{ color: item.fill }}>{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
