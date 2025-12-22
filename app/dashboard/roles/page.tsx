"use client";

import * as React from "react";
import { Shield, Plus, Users, Eye, Edit, Trash2, MoreHorizontal, Check, X } from "lucide-react";
import { Badge } from "@/components/badge";
import { Modal, ConfirmModal } from "@/components/modal";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

interface Role {
    id: string;
    name: string;
    description: string;
    users: number;
    permissions: string[];
    color: string;
}

const allPermissions = [
    "All Permissions",
    "Manage Users",
    "Manage Projects",
    "View Reports",
    "Edit Settings",
    "Moderate Content",
    "View Dashboard",
    "Export Data",
    "Manage Billing",
];

const initialRoles: Role[] = [
    { id: "1", name: "Super Admin", description: "Full system access with all permissions", users: 2, permissions: ["All Permissions"], color: "from-red-500 to-orange-500" },
    { id: "2", name: "Admin", description: "Manage users, projects, and settings", users: 5, permissions: ["Manage Users", "Manage Projects", "View Reports", "Edit Settings"], color: "from-blue-500 to-purple-500" },
    { id: "3", name: "Moderator", description: "Moderate content and manage basic tasks", users: 8, permissions: ["Manage Projects", "View Reports", "Moderate Content"], color: "from-green-500 to-teal-500" },
    { id: "4", name: "Viewer", description: "Read-only access to dashboard data", users: 24, permissions: ["View Dashboard", "View Reports"], color: "from-gray-500 to-slate-500" },
];

const colorOptions = [
    "from-red-500 to-orange-500",
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
    "from-gray-500 to-slate-500",
    "from-pink-500 to-rose-500",
    "from-yellow-500 to-amber-500",
];

export default function AdminRolesPage() {
    const { addToast } = useToast();
    const [roles, setRoles] = React.useState<Role[]>(initialRoles);

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
    const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);

    // Form state
    const [formData, setFormData] = React.useState({
        name: "",
        description: "",
        permissions: [] as string[],
        color: colorOptions[0],
    });

    const handleAddRole = () => {
        const newRole: Role = {
            id: String(Date.now()),
            name: formData.name,
            description: formData.description,
            permissions: formData.permissions,
            color: formData.color,
            users: 0,
        };
        setRoles([...roles, newRole]);
        setFormData({ name: "", description: "", permissions: [], color: colorOptions[0] });
        setIsAddModalOpen(false);
        addToast(`Role "${formData.name}" created successfully`, "success");
    };

    const handleEditRole = () => {
        if (!selectedRole) return;
        setRoles(roles.map((r) => r.id === selectedRole.id ? { ...r, name: formData.name, description: formData.description, permissions: formData.permissions, color: formData.color } : r));
        setIsEditModalOpen(false);
        setSelectedRole(null);
        addToast(`Role "${formData.name}" updated successfully`, "success");
    };

    const handleDeleteRole = () => {
        if (!selectedRole) return;
        setRoles(roles.filter((r) => r.id !== selectedRole.id));
        setSelectedRole(null);
        addToast("Role deleted successfully", "success");
    };

    const togglePermission = (perm: string) => {
        if (perm === "All Permissions") {
            setFormData({ ...formData, permissions: formData.permissions.includes(perm) ? [] : ["All Permissions"] });
        } else {
            const newPerms = formData.permissions.filter((p) => p !== "All Permissions");
            if (newPerms.includes(perm)) {
                setFormData({ ...formData, permissions: newPerms.filter((p) => p !== perm) });
            } else {
                setFormData({ ...formData, permissions: [...newPerms, perm] });
            }
        }
    };

    const openEditModal = (role: Role) => {
        setSelectedRole(role);
        setFormData({ name: role.name, description: role.description, permissions: role.permissions, color: role.color });
        setIsEditModalOpen(true);
    };

    const openViewModal = (role: Role) => {
        setSelectedRole(role);
        setIsViewModalOpen(true);
    };

    const openDeleteModal = (role: Role) => {
        setSelectedRole(role);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span>🏠</span><span>&gt;</span><span>Dashboard</span><span>&gt;</span>
                        <span className="text-foreground">Admin Roles</span>
                    </div>
                    <h1 className="text-2xl font-semibold flex items-center gap-2">
                        <Shield className="h-6 w-6 text-blue-500" />
                        Admin Roles
                    </h1>
                    <p className="text-sm text-muted-foreground">Manage roles and permissions for your team</p>
                </div>
                <button
                    onClick={() => { setFormData({ name: "", description: "", permissions: [], color: colorOptions[0] }); setIsAddModalOpen(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="h-4 w-4" /> Create Role
                </button>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role) => (
                    <div key={role.id} className="rounded-xl border border-border/50 bg-card p-6 hover:border-border transition-colors group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{role.name}</h3>
                                    <p className="text-sm text-muted-foreground">{role.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{role.users} users assigned</span>
                        </div>

                        <div className="mb-4">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Permissions</p>
                            <div className="flex flex-wrap gap-2">
                                {role.permissions.slice(0, 3).map((perm) => (
                                    <Badge key={perm} variant="secondary" className="text-xs">{perm}</Badge>
                                ))}
                                {role.permissions.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">+{role.permissions.length - 3} more</Badge>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                            <button onClick={() => openViewModal(role)} className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors">
                                <Eye className="h-4 w-4" /> View
                            </button>
                            <button onClick={() => openEditModal(role)} className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors">
                                <Edit className="h-4 w-4" /> Edit
                            </button>
                            <button onClick={() => openDeleteModal(role)} className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-auto">
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Role Modal */}
            <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title={selectedRole?.name || ""} size="md">
                {selectedRole && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${selectedRole.color} flex items-center justify-center`}>
                                <Shield className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-muted-foreground">{selectedRole.description}</p>
                                <p className="text-sm text-muted-foreground mt-1">{selectedRole.users} users assigned</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium mb-3">Permissions</p>
                            <div className="space-y-2">
                                {selectedRole.permissions.map((perm) => (
                                    <div key={perm} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                                        <Check className="h-4 w-4 text-green-400" />
                                        <span className="text-sm">{perm}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setIsViewModalOpen(false)} className="w-full px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Close</button>
                    </div>
                )}
            </Modal>

            {/* Add/Edit Role Modal */}
            <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} title={isAddModalOpen ? "Create New Role" : "Edit Role"} size="lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Role Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="e.g. Content Manager" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="Brief description of this role" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Color</label>
                        <div className="flex gap-2">
                            {colorOptions.map((color) => (
                                <button key={color} onClick={() => setFormData({ ...formData, color })} className={cn("w-8 h-8 rounded-lg bg-gradient-to-br", color, formData.color === color && "ring-2 ring-white ring-offset-2 ring-offset-background")} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Permissions</label>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                            {allPermissions.map((perm) => (
                                <button
                                    key={perm}
                                    onClick={() => togglePermission(perm)}
                                    className={cn(
                                        "flex items-center gap-2 p-2 rounded-lg border text-sm text-left transition-colors",
                                        formData.permissions.includes(perm) ? "border-blue-500 bg-blue-500/10" : "border-border/50 hover:border-border"
                                    )}
                                >
                                    <div className={cn(
                                        "w-4 h-4 rounded border flex items-center justify-center",
                                        formData.permissions.includes(perm) ? "bg-blue-500 border-blue-500" : "border-muted-foreground"
                                    )}>
                                        {formData.permissions.includes(perm) && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    {perm}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Cancel</button>
                        <button onClick={isAddModalOpen ? handleAddRole : handleEditRole} disabled={!formData.name || formData.permissions.length === 0} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">
                            {isAddModalOpen ? "Create Role" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteRole}
                title="Delete Role"
                description={`Are you sure you want to delete the "${selectedRole?.name}" role? ${selectedRole?.users || 0} users will lose their permissions.`}
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
