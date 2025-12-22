"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChevronRight } from "lucide-react";

const data = [
    { name: "Jan", value: 85 },
    { name: "Feb", value: 90 },
    { name: "Mar", value: 78 },
    { name: "Apr", value: 95 },
    { name: "May", value: 88 },
];

export function PerformanceBarChart() {
    return (
        <div className="rounded-xl border border-border/50 bg-card p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-lg">Performance Metrics</h3>
                    <p className="text-sm text-muted-foreground">Monthly completion rate tracking</p>
                </div>
                <button className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1">
                    Last 5 Months <ChevronRight className="h-4 w-4 rotate-90" />
                </button>
            </div>

            <div className="flex-1 min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border border-border/50 bg-popover p-2 shadow-md">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    {payload[0].payload.name}
                                                </span>
                                                <span className="font-bold text-muted-foreground">
                                                    {payload[0].value}%
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#94a3b8"
                            radius={[20, 20, 20, 20]}
                            barSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                <div className="text-center">
                    <p className="text-xl font-bold">88.0%</p>
                    <p className="text-xs text-muted-foreground">Avg Completion</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">4/5</p>
                    <p className="text-xs text-muted-foreground">Above Target</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">Apr</p>
                    <p className="text-xs text-muted-foreground">Best Month</p>
                </div>
            </div>
        </div>
    );
}
