"use client";

import * as React from "react";
import { Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Plus, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { users as initialUsers, User } from "@/data/users";
import { Badge } from "@/components/badge";
import { Modal, ConfirmModal } from "@/components/modal";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

export default function UsersPage() {
    const { addToast } = useToast();
    const [users, setUsers] = React.useState<User[]>(initialUsers);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [roleFilter, setRoleFilter] = React.useState<string>("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortField, setSortField] = React.useState<"name" | "role" | "status" | null>(null);
    const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

    // Form state
    const [formData, setFormData] = React.useState({ name: "", email: "", role: "Viewer" as User["role"], status: "Active" as User["status"] });

    const itemsPerPage = 5;

    const filteredUsers = React.useMemo(() => {
        let result = users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === "all" || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });

        if (sortField) {
            result = [...result].sort((a, b) => {
                const aVal = a[sortField].toLowerCase();
                const bVal = b[sortField].toLowerCase();
                return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            });
        }

        return result;
    }, [users, searchQuery, roleFilter, sortField, sortDirection]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (field: "name" | "role" | "status") => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === paginatedUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(paginatedUsers.map((u) => u.id));
        }
    };

    const toggleSelectUser = (id: string) => {
        setSelectedUsers((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    };

    const handleAddUser = () => {
        const newUser: User = {
            id: String(Date.now()),
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            avatar: "",
        };
        setUsers([...users, newUser]);
        setFormData({ name: "", email: "", role: "Viewer", status: "Active" });
        setIsAddModalOpen(false);
        addToast(`User "${formData.name}" added successfully`, "success");
    };

    const handleEditUser = () => {
        if (!selectedUser) return;
        setUsers(users.map((u) => u.id === selectedUser.id ? { ...u, ...formData } : u));
        setIsEditModalOpen(false);
        setSelectedUser(null);
        addToast(`User "${formData.name}" updated successfully`, "success");
    };

    const handleDeleteUser = () => {
        if (!selectedUser) return;
        setUsers(users.filter((u) => u.id !== selectedUser.id));
        setSelectedUser(null);
        addToast("User deleted successfully", "success");
    };

    const handleBulkDelete = () => {
        setUsers(users.filter((u) => !selectedUsers.includes(u.id)));
        addToast(`${selectedUsers.length} users deleted`, "success");
        setSelectedUsers([]);
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const getStatusVariant = (status: User["status"]) => {
        switch (status) {
            case "Active": return "success";
            case "Inactive": return "secondary";
            case "Pending": return "warning";
            default: return "default";
        }
    };

    const getRoleColor = (role: User["role"]) => {
        switch (role) {
            case "Admin": return "text-blue-400";
            case "Editor": return "text-purple-400";
            case "Viewer": return "text-gray-400";
            default: return "text-muted-foreground";
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span>🏠</span><span>&gt;</span><span>Dashboard</span><span>&gt;</span>
                        <span className="text-foreground">Users</span>
                    </div>
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
                </div>
                <button
                    onClick={() => { setFormData({ name: "", email: "", role: "Viewer", status: "Active" }); setIsAddModalOpen(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="h-4 w-4" /> Add User
                </button>
            </div>

            {/* Filters & Bulk Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2 bg-card border border-border/50 px-4 py-2 rounded-xl flex-1 max-w-md">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <select
                            value={roleFilter}
                            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                            className="bg-card border border-border/50 px-4 py-2 rounded-xl text-sm outline-none cursor-pointer"
                        >
                            <option value="all">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                        </select>
                    </div>
                </div>
                {selectedUsers.length > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Trash2 className="h-4 w-4" /> Delete {selectedUsers.length} selected
                    </button>
                )}
            </div>

            {/* Users Table */}
            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/50">
                                <th className="text-left px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-border cursor-pointer"
                                    />
                                </th>
                                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                                    <button onClick={() => handleSort("name")} className="flex items-center gap-1 hover:text-foreground">
                                        User <ArrowUpDown className="h-3 w-3" />
                                    </button>
                                </th>
                                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Email</th>
                                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                                    <button onClick={() => handleSort("role")} className="flex items-center gap-1 hover:text-foreground">
                                        Role <ArrowUpDown className="h-3 w-3" />
                                    </button>
                                </th>
                                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                                    <button onClick={() => handleSort("status")} className="flex items-center gap-1 hover:text-foreground">
                                        Status <ArrowUpDown className="h-3 w-3" />
                                    </button>
                                </th>
                                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user) => (
                                <tr key={user.id} className="border-b border-border/30 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelectUser(user.id)}
                                            className="w-4 h-4 rounded border-border cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                                                {user.name.split(" ").map((n) => n[0]).join("")}
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn("text-sm font-medium", getRoleColor(user.role))}>{user.role}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(user)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                <Edit className="h-4 w-4 text-muted-foreground" />
                                            </button>
                                            <button onClick={() => openDeleteModal(user)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                                                <Trash2 className="h-4 w-4 text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                    </p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button key={page} onClick={() => setCurrentPage(page)} className={cn("px-3 py-1 rounded-lg text-sm transition-colors", currentPage === page ? "bg-blue-500 text-white" : "hover:bg-white/10 text-muted-foreground")}>
                                {page}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New User" description="Fill in the details to create a new user account.">
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
                            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as User["role"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as User["status"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Cancel</button>
                        <button onClick={handleAddUser} disabled={!formData.name || !formData.email} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">Add User</button>
                    </div>
                </div>
            </Modal>

            {/* Edit User Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User" description="Update user details.">
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
                            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as User["role"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as User["status"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Cancel</button>
                        <button onClick={handleEditUser} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">Save Changes</button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteUser}
                title="Delete User"
                description={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
