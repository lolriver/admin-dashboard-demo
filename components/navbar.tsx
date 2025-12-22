"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Keyboard,
  Check,
} from "lucide-react";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/dropdown";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "jp", name: "日本語", flag: "🇯🇵" },
];

const notifications = [
  { id: "1", title: "New user registered", time: "2 min ago", read: false },
  { id: "2", title: "Project completed", time: "1 hour ago", read: false },
  { id: "3", title: "Weekly report ready", time: "3 hours ago", read: true },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const { addToast } = useToast();
  const [mounted, setMounted] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState(languages[0]);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notificationList, setNotificationList] = React.useState(notifications);
  const [searchValue, setSearchValue] = React.useState("");
  const notificationRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setSelectedLang(lang);
    addToast(`Language changed to ${lang.name}`, "info");
  };

  const handleMarkAllRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, read: true })));
    addToast("All notifications marked as read", "success");
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      addToast(`Searching for "${searchValue}"...`, "info");
      setSearchValue("");
    }
  };

  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (!path || path === "dashboard") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  // Get user initials
  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase();
    }
    return "U";
  };

  return (
    <header className="h-16 border-b border-border/50 bg-[#0f0f17] px-6 flex items-center justify-between shrink-0">
      {/* Left side - Breadcrumbs */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard/overview" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{getPageTitle()}</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-64 h-9 pl-10 pr-16 bg-white/5 border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-white/5 px-1.5 font-mono text-[10px] text-muted-foreground">
            Ctrl+K
          </kbd>
        </form>

        {/* Language Selector */}
        <Dropdown
          trigger={
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
              <span className="text-lg">{selectedLang.flag}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          }
          align="right"
        >
          {languages.map((lang) => (
            <DropdownItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              icon={<span className="text-base">{lang.flag}</span>}
            >
              <span className="flex-1">{lang.name}</span>
              {selectedLang.code === lang.code && <Check className="h-4 w-4 text-blue-400" />}
            </DropdownItem>
          ))}
        </Dropdown>

        {/* Theme Toggle */}
        <button
          onClick={() => {
            const newTheme = theme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            addToast(`Theme changed to ${newTheme}`, "info");
          }}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Moon className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors relative"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 rounded-xl border border-border/50 bg-card shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h3 className="font-semibold">Notifications</h3>
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notificationList.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b border-border/30 last:border-0 hover:bg-white/5 cursor-pointer transition-colors",
                      !notification.read && "bg-blue-500/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                      )}
                      <div className={cn(!notification.read ? "" : "ml-5")}>
                        <p className="text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-border/50">
                <Link
                  href="/dashboard/settings"
                  className="block w-full text-center text-sm text-muted-foreground hover:text-foreground py-2"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <Dropdown
          trigger={
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                {getUserInitials()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{session?.user?.role || "Guest"}</p>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
            </div>
          }
          align="right"
        >
          <div className="px-4 py-3 border-b border-border/50">
            <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{session?.user?.email || ""}</p>
          </div>
          <DropdownItem icon={<User className="h-4 w-4" />} onClick={() => addToast("Profile clicked", "info")}>
            My Profile
          </DropdownItem>
          <DropdownItem icon={<Settings className="h-4 w-4" />} onClick={() => window.location.href = "/dashboard/settings"}>
            Settings
          </DropdownItem>
          <DropdownItem icon={<Keyboard className="h-4 w-4" />} onClick={() => addToast("Keyboard shortcuts: Ctrl+K for search", "info")}>
            Keyboard Shortcuts
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<LogOut className="h-4 w-4" />} variant="danger" onClick={handleLogout}>
            Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
