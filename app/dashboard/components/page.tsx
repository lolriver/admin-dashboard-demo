"use client";

import * as React from "react";
import { Component, Copy, Check } from "lucide-react";
import { Badge } from "@/components/badge";
import { ProgressBar } from "@/components/progress-bar";
import { cn } from "@/lib/utils";

export default function UIComponentsPage() {
    const [copiedButton, setCopiedButton] = React.useState<string | null>(null);

    const copyCode = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedButton(id);
        setTimeout(() => setCopiedButton(null), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <span>🏠</span>
                    <span>&gt;</span>
                    <span>Dashboard</span>
                    <span>&gt;</span>
                    <span className="text-foreground">UI Components</span>
                </div>
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    <Component className="h-6 w-6 text-blue-500" />
                    UI Components
                </h1>
                <p className="text-sm text-muted-foreground">Reusable component library for this dashboard</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Badges Section */}
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Badges</h3>
                        <button
                            onClick={() => copyCode('<Badge variant="success">Active</Badge>', "badge")}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {copiedButton === "badge" ? (
                                <Check className="h-4 w-4 text-green-400" />
                            ) : (
                                <Copy className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Buttons</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                            Primary
                        </button>
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-border rounded-lg text-sm font-medium transition-colors">
                            Secondary
                        </button>
                        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
                            Success
                        </button>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors">
                            Danger
                        </button>
                    </div>
                </div>

                {/* Progress Bars Section */}
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Progress Bars</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>25%</span>
                            </div>
                            <ProgressBar value={25} />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>50%</span>
                            </div>
                            <ProgressBar value={50} />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>75%</span>
                            </div>
                            <ProgressBar value={75} />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>100%</span>
                            </div>
                            <ProgressBar value={100} />
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Card Styles</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 rounded-lg border border-border/50 bg-white/5">
                            <p className="text-sm font-medium">Default Card</p>
                            <p className="text-xs text-muted-foreground">With subtle background</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                            <p className="text-sm font-medium">Gradient Card</p>
                            <p className="text-xs text-muted-foreground">With gradient background</p>
                        </div>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Input Fields</h3>
                    </div>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Default input..."
                            className="w-full px-4 py-2 bg-white/5 border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                        />
                        <input
                            type="text"
                            placeholder="Search input..."
                            className="w-full px-4 py-2 bg-card border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Avatars */}
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Avatars</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                            SM
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-sm font-medium">
                            MD
                        </div>
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-medium">
                            LG
                        </div>
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-lg font-medium">
                            XL
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
