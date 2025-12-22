"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: "left" | "right";
}

export function Dropdown({ trigger, children, align = "left" }: DropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center"
            >
                {trigger}
            </button>
            {isOpen && (
                <div
                    className={cn(
                        "absolute top-full mt-2 min-w-[200px] rounded-xl border border-border/50 bg-card shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150",
                        align === "right" ? "right-0" : "left-0"
                    )}
                >
                    {React.Children.map(children, (child) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child as React.ReactElement<{ onClick?: () => void }>, {
                                onClick: () => {
                                    (child.props as { onClick?: () => void }).onClick?.();
                                    setIsOpen(false);
                                },
                            })
                            : child
                    )}
                </div>
            )}
        </div>
    );
}

interface DropdownItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    icon?: React.ReactNode;
    variant?: "default" | "danger";
}

export function DropdownItem({ children, onClick, icon, variant = "default" }: DropdownItemProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors",
                variant === "default" && "hover:bg-white/5",
                variant === "danger" && "text-red-400 hover:bg-red-500/10"
            )}
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            {children}
        </button>
    );
}

export function DropdownSeparator() {
    return <div className="my-2 border-t border-border/50" />;
}
