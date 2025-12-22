import * as React from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function ChartCard({ title, description, action, children, className, ...props }: ChartCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props}>
      <div className="flex flex-row items-center justify-between space-y-0 p-6">
        <div className="grid gap-1">
          <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6 pt-0">
        {children}
      </div>
    </div>
  );
}
