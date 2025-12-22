"use client";

import * as React from "react";
import { UserCog, Search, Plus, MoreHorizontal, Mail, Shield, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/badge";
import { Modal, ConfirmModal } from "@/components/modal";
import { useToast } from "@/components/toast";

interface Admin {
    id: string;
    name: string;
    email: string;
    role: "Super Admin" | "Admin" | "Moderator";
    lastActive: string;
    status: "Active" | "Inactive";
}

const initialAdmins: Admin[] = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Super Admin", lastActive: "2 hours ago", status: "Active" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Admin", lastActive: "1 day ago", status: "Active" },
    { id: "3", name: "Diana Prince", email: "diana@example.com", role: "Moderator", lastActive: "3 hours ago", status: "Active" },
    { id: "4", name: "Evan Wright", email: "evan@example.com", role: "Admin", lastActive: "1 week ago", status: "Inactive" },
];

export default function AdminManagementPage() {
    const { addToast } = useToast();
    const [admins, setAdmins] = React.useState<Admin[]>(initialAdmins);
    const [searchQuery, setSearchQuery] = React.useState("");

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [selectedAdmin, setSelectedAdmin] = React.useState<Admin | null>(null);

    // Form state
    const [formData, setFormData] = React.useState({ name: "", email: "", role: "Admin" as Admin["role"], status: "Active" as Admin["status"] });

    const filteredAdmins = admins.filter(
        (admin) =>
            admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddAdmin = () => {
        const newAdmin: Admin = {
            id: String(Date.now()),
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            lastActive: "Just now",
        };
        setAdmins([...admins, newAdmin]);
        setFormData({ name: "", email: "", role: "Admin", status: "Active" });
        setIsAddModalOpen(false);
        addToast(`Admin "${formData.name}" added successfully`, "success");
    };

    const handleEditAdmin = () => {
        if (!selectedAdmin) return;
        setAdmins(admins.map((a) => a.id === selectedAdmin.id ? { ...a, ...formData } : a));
        setIsEditModalOpen(false);
        setSelectedAdmin(null);
        addToast(`Admin "${formData.name}" updated successfully`, "success");
    };

    const handleDeleteAdmin = () => {
        if (!selectedAdmin) return;
        setAdmins(admins.filter((a) => a.id !== selectedAdmin.id));
        setSelectedAdmin(null);
        addToast("Admin removed successfully", "success");
    };

    const openEditModal = (admin: Admin) => {
        setSelectedAdmin(admin);
        setFormData({ name: admin.name, email: admin.email, role: admin.role, status: admin.status });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (admin: Admin) => {
        setSelectedAdmin(admin);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span>🏠</span><span>&gt;</span><span>Dashboard</span><span>&gt;</span>
                        <span className="text-foreground">Admin Management</span>
                    </div>
                    <h1 className="text-2xl font-semibold flex items-center gap-2">
                        <UserCog className="h-6 w-6 text-blue-500" />
                        Admin Management
                    </h1>
                    <p className="text-sm text-muted-foreground">Manage administrator accounts and permissions</p>
                </div>
                <button
                    onClick={() => { setFormData({ name: "", email: "", role: "Admin", status: "Active" }); setIsAddModalOpen(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="h-4 w-4" /> Add Admin
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-card border border-border/50 px-4 py-2 rounded-xl max-w-md">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search admins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
                />
            </div>

            {/* Admin Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAdmins.map((admin) => (
                    <div key={admin.id} className="rounded-xl border border-border/50 bg-card p-5 hover:border-border transition-colors group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                                    {admin.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{admin.name}</h3>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-3 w-3" />{admin.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditModal(admin)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                </button>
                                <button onClick={() => openDeleteModal(admin)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Role</span>
                                <div className="flex items-center gap-1">
                                    <Shield className="h-4 w-4 text-blue-400" />
                                    <span className="text-sm font-medium">{admin.role}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant={admin.status === "Active" ? "success" : "secondary"}>{admin.status}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Last Active</span>
                                <span className="text-sm">{admin.lastActive}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Admin Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Admin" description="Create a new administrator account.">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="john@example.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as Admin["role"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                                <option value="Moderator">Moderator</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as Admin["status"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Cancel</button>
                        <button onClick={handleAddAdmin} disabled={!formData.name || !formData.email} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">Add Admin</button>
                    </div>
                </div>
            </Modal>

            {/* Edit Admin Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Admin" description="Update administrator details.">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as Admin["role"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                                <option value="Moderator">Moderator</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as Admin["status"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Cancel</button>
                        <button onClick={handleEditAdmin} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">Save Changes</button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAdmin}
                title="Remove Admin"
                description={`Are you sure you want to remove "${selectedAdmin?.name}" from administrators? They will lose all admin privileges.`}
                confirmText="Remove"
                variant="danger"
            />
        </div>
    );
}
