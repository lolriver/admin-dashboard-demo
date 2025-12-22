"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
  UserCog,
  Shield,
  Component,
  LogOut,
  Menu,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navSections: NavSection[] = [
    {
      heading: "MAIN",
      items: [
        { title: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
        { title: "AI Assistant", href: "/dashboard/ai", icon: Bot },
        { title: "Users", href: "/dashboard/users", icon: Users },
        { title: "Projects", href: "/dashboard/projects", icon: FolderOpen },
      ],
    },
    {
      heading: "ADMIN",
      items: [
        { title: "Admin Management", href: "/dashboard/admin", icon: UserCog },
        { title: "Admin Roles", href: "/dashboard/roles", icon: Shield },
        { title: "Settings", href: "/dashboard/settings", icon: Settings },
      ],
    },
    {
      heading: "DEMOS",
      items: [
        { title: "UI Component", href: "/dashboard/components", icon: Component },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r border-border/40 bg-[#0f0f12] transition-all duration-300 ease-in-out z-40",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header / Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-white/5 text-white/60 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2 font-semibold text-lg text-white italic">
            <span className="text-primary">E</span>LEVATE
          </div>
        )}
        {!collapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-white/5 text-white/40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 flex flex-col gap-6 px-3 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.heading}>
            {!collapsed && (
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2 px-3">
                {section.heading}
              </p>
            )}
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:bg-white/5 hover:text-white/80",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-500 rounded-r-full" />
                    )}
                    <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-white/50 group-hover:text-white/80")} />
                    {!collapsed && <span className="text-sm">{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/40">
        <button
          className={cn(
            "flex items-center w-full gap-3 px-3 py-2 rounded-lg text-white/50 hover:bg-white/5 hover:text-white/80 transition-colors",
            collapsed && "justify-center px-2"
          )}
          onClick={() => console.log("Logout")}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
        {collapsed && (
          <button
            onClick={toggleSidebar}
            className="mt-2 flex w-full items-center justify-center p-2 text-white/40 hover:text-white/80"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
