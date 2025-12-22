"use client";

import * as React from "react";
import { format } from "date-fns";
import { Search, Filter, Calendar, MoreHorizontal, Plus, Edit, Trash2, ChevronDown } from "lucide-react";
import { projects as initialProjects, Project } from "@/data/projects";
import { Badge } from "@/components/badge";
import { Modal, ConfirmModal } from "@/components/modal";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
    const { addToast } = useToast();
    const [projects, setProjects] = React.useState<Project[]>(initialProjects);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<string>("all");

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

    // Form state
    const [formData, setFormData] = React.useState({
        name: "",
        status: "In Progress" as Project["status"],
        progress: 0,
        dueDate: format(new Date(), "yyyy-MM-dd"),
        team: [""] as string[],
    });

    const filteredProjects = React.useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || project.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [projects, searchQuery, statusFilter]);

    const handleAddProject = () => {
        const newProject: Project = {
            id: String(Date.now()),
            name: formData.name,
            status: formData.status,
            progress: formData.progress,
            dueDate: formData.dueDate,
            team: formData.team.filter(Boolean),
        };
        setProjects([...projects, newProject]);
        resetForm();
        setIsAddModalOpen(false);
        addToast(`Project "${formData.name}" created successfully`, "success");
    };

    const handleEditProject = () => {
        if (!selectedProject) return;
        setProjects(projects.map((p) =>
            p.id === selectedProject.id
                ? { ...p, name: formData.name, status: formData.status, progress: formData.progress, dueDate: formData.dueDate, team: formData.team.filter(Boolean) }
                : p
        ));
        setIsEditModalOpen(false);
        setSelectedProject(null);
        addToast(`Project "${formData.name}" updated successfully`, "success");
    };

    const handleDeleteProject = () => {
        if (!selectedProject) return;
        setProjects(projects.filter((p) => p.id !== selectedProject.id));
        setSelectedProject(null);
        addToast("Project deleted successfully", "success");
    };

    const handleStatusChange = (projectId: string, newStatus: Project["status"]) => {
        setProjects(projects.map((p) => p.id === projectId ? { ...p, status: newStatus } : p));
        addToast("Project status updated", "success");
    };

    const handleProgressChange = (projectId: string, newProgress: number) => {
        setProjects(projects.map((p) => p.id === projectId ? { ...p, progress: newProgress } : p));
    };

    const resetForm = () => {
        setFormData({ name: "", status: "In Progress", progress: 0, dueDate: format(new Date(), "yyyy-MM-dd"), team: [""] });
    };

    const openEditModal = (project: Project) => {
        setSelectedProject(project);
        setFormData({ name: project.name, status: project.status, progress: project.progress, dueDate: project.dueDate, team: project.team.length > 0 ? project.team : [""] });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (project: Project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
    };

    const getStatusVariant = (status: Project["status"]) => {
        switch (status) {
            case "In Progress": return "default";
            case "Completed": return "success";
            case "On Hold": return "warning";
            default: return "secondary";
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return "bg-green-500";
        if (progress >= 50) return "bg-blue-500";
        if (progress >= 25) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span>🏠</span><span>&gt;</span><span>Dashboard</span><span>&gt;</span>
                        <span className="text-foreground">Projects</span>
                    </div>
                    <h1 className="text-2xl font-semibold">Projects</h1>
                    <p className="text-sm text-muted-foreground">Track and manage all your projects</p>
                </div>
                <button
                    onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="h-4 w-4" /> New Project
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 bg-card border border-border/50 px-4 py-2 rounded-xl flex-1 max-w-md">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-card border border-border/50 px-4 py-2 rounded-xl text-sm outline-none cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="rounded-xl border border-border/50 bg-card p-5 hover:border-border transition-colors group">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="font-semibold mb-2">{project.name}</h3>
                                <div className="relative inline-block">
                                    <select
                                        value={project.status}
                                        onChange={(e) => handleStatusChange(project.id, e.target.value as Project["status"])}
                                        className={cn(
                                            "appearance-none px-2.5 py-0.5 pr-8 rounded-full text-xs font-semibold cursor-pointer outline-none border-0",
                                            project.status === "Completed" && "bg-green-500/15 text-green-600 dark:text-green-400",
                                            project.status === "In Progress" && "bg-blue-500/15 text-blue-600 dark:text-blue-400",
                                            project.status === "On Hold" && "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
                                        )}
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="On Hold">On Hold</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditModal(project)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                </button>
                                <button onClick={() => openDeleteModal(project)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                </button>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{project.progress}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={project.progress}
                                onChange={(e) => handleProgressChange(project.id, parseInt(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div className="flex -space-x-2">
                                {project.team.slice(0, 3).map((initials, i) => (
                                    <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium border-2 border-card">
                                        {initials}
                                    </div>
                                ))}
                                {project.team.length > 3 && (
                                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium border-2 border-card">
                                        +{project.team.length - 3}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{format(new Date(project.dueDate), "MMM d, yyyy")}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No projects found matching your criteria.</p>
                </div>
            )}

            {/* Add Project Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Project" description="Add a new project to your dashboard." size="lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Project Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="Website Redesign" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as Project["status"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Due Date</label>
                            <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Initial Progress: {formData.progress}%</label>
                        <input type="range" min="0" max="100" value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })} className="w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Members (initials, comma-separated)</label>
                        <input type="text" value={formData.team.join(", ")} onChange={(e) => setFormData({ ...formData, team: e.target.value.split(",").map((s) => s.trim()) })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" placeholder="JD, SM, AK" />
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Cancel</button>
                        <button onClick={handleAddProject} disabled={!formData.name} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">Create Project</button>
                    </div>
                </div>
            </Modal>

            {/* Edit Project Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Project" description="Update project details." size="lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Project Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as Project["status"] })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Due Date</label>
                            <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none cursor-pointer" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Progress: {formData.progress}%</label>
                        <input type="range" min="0" max="100" value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })} className="w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Members</label>
                        <input type="text" value={formData.team.join(", ")} onChange={(e) => setFormData({ ...formData, team: e.target.value.split(",").map((s) => s.trim()) })} className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Cancel</button>
                        <button onClick={handleEditProject} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">Save Changes</button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteProject}
                title="Delete Project"
                description={`Are you sure you want to delete "${selectedProject?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
