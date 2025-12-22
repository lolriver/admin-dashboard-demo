import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function KPICard({ title, value, change, changeType, icon: Icon }: KPICardProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="p-2 bg-muted/50 rounded-lg text-muted-foreground">
            <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="pt-2">
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
            "text-xs font-medium mt-1 flex items-center",
            changeType === "positive" && "text-green-500",
            changeType === "negative" && "text-red-500",
            changeType === "neutral" && "text-muted-foreground"
        )}>
          {change}
          <span className="text-muted-foreground ml-1 font-normal">from last month</span>
        </p>
      </div>
    </div>
  );
}
