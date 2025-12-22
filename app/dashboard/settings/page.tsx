"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { User, Mail, Camera, Moon, Sun, Monitor, Bell, Lock, Eye, EyeOff, Check } from "lucide-react";
import { Modal } from "@/components/modal";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const { addToast } = useToast();
    const [mounted, setMounted] = React.useState(false);

    // Form state
    const [profile, setProfile] = React.useState({
        firstName: "Demo",
        lastName: "User",
        email: "demo@example.com",
        bio: "Dashboard enthusiast and productivity lover.",
    });

    // Notification toggles
    const [notifications, setNotifications] = React.useState({
        email: true,
        push: false,
        weekly: false,
    });

    // Password modal
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
    const [passwordForm, setPasswordForm] = React.useState({ current: "", new: "", confirm: "" });
    const [showPasswords, setShowPasswords] = React.useState({ current: false, new: false, confirm: false });

    // Track changes
    const [hasChanges, setHasChanges] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleProfileChange = (field: string, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleNotificationToggle = (field: keyof typeof notifications) => {
        setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        setSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSaving(false);
        setHasChanges(false);
        addToast("Settings saved successfully!", "success");
    };

    const handlePasswordChange = async () => {
        if (passwordForm.new !== passwordForm.confirm) {
            addToast("New passwords don't match", "error");
            return;
        }
        if (passwordForm.new.length < 8) {
            addToast("Password must be at least 8 characters", "error");
            return;
        }
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsPasswordModalOpen(false);
        setPasswordForm({ current: "", new: "", confirm: "" });
        addToast("Password updated successfully!", "success");
    };

    const themeOptions = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
    ];

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span>🏠</span><span>&gt;</span><span>Dashboard</span><span>&gt;</span>
                        <span className="text-foreground">Settings</span>
                    </div>
                    <h1 className="text-2xl font-semibold">Settings</h1>
                    <p className="text-sm text-muted-foreground">Manage your account preferences</p>
                </div>
                {hasChanges && (
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        {saving ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Profile Section */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                </h2>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                {profile.firstName[0]}{profile.lastName[0]}
                            </div>
                            <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="h-6 w-6 text-white" />
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground">Click to upload</p>
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={profile.firstName}
                                    onChange={(e) => handleProfileChange("firstName", e.target.value)}
                                    className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={profile.lastName}
                                    onChange={(e) => handleProfileChange("lastName", e.target.value)}
                                    className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => handleProfileChange("email", e.target.value)}
                                    className="w-full pl-12 pr-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Bio</label>
                            <textarea
                                rows={3}
                                value={profile.bio}
                                onChange={(e) => handleProfileChange("bio", e.target.value)}
                                className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security
                </h2>
                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm font-medium">Password</p>
                        <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {/* Theme Section */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    Appearance
                </h2>

                <div>
                    <label className="block text-sm font-medium mb-4">Theme Preference</label>
                    <div className="grid grid-cols-3 gap-4">
                        {themeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => { setTheme(option.value); addToast(`Theme changed to ${option.label}`, "info"); }}
                                className={cn(
                                    "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
                                    mounted && theme === option.value
                                        ? "border-blue-500 bg-blue-500/10"
                                        : "border-border/50 hover:border-border hover:bg-white/5"
                                )}
                            >
                                <option.icon className={cn("h-6 w-6", mounted && theme === option.value ? "text-blue-500" : "text-muted-foreground")} />
                                <span className="text-sm font-medium">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                </h2>

                <div className="space-y-4">
                    {[
                        { key: "email" as const, label: "Email Notifications", description: "Receive email updates about your account" },
                        { key: "push" as const, label: "Push Notifications", description: "Receive push notifications on your devices" },
                        { key: "weekly" as const, label: "Weekly Digest", description: "Get a weekly summary of your activity" },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
                            <div>
                                <p className="text-sm font-medium">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                            <button
                                onClick={() => handleNotificationToggle(item.key)}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                    notifications[item.key] ? "bg-blue-500" : "bg-secondary"
                                )}
                            >
                                <span className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    notifications[item.key] ? "translate-x-6" : "translate-x-1"
                                )} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Password Change Modal */}
            <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="Change Password" description="Enter your current password and choose a new one.">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                value={passwordForm.current}
                                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 pr-10"
                            />
                            <button onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                value={passwordForm.new}
                                onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 pr-10"
                            />
                            <button onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                value={passwordForm.confirm}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500 pr-10"
                            />
                            <button onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button onClick={() => setIsPasswordModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Cancel</button>
                        <button onClick={handlePasswordChange} disabled={!passwordForm.current || !passwordForm.new || !passwordForm.confirm} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">Update Password</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
