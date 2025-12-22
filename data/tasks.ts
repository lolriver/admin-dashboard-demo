export interface Task {
    id: string;
    title: string;
    status: "active" | "completed";
    priority: "high" | "medium" | "low";
    dueDate?: string;
}

export const tasks: Task[] = [
    {
        id: "1",
        title: "Review project proposal",
        status: "active",
        priority: "high",
        dueDate: "2025-12-21",
    },
    {
        id: "2",
        title: "Update user documentation",
        status: "active",
        priority: "medium",
        dueDate: "2025-12-22",
    },
    {
        id: "3",
        title: "Fix navigation bug",
        status: "active",
        priority: "high",
        dueDate: "2025-12-20",
    },
    {
        id: "4",
        title: "Deploy staging environment",
        status: "completed",
        priority: "high",
    },
    {
        id: "5",
        title: "Design review meeting",
        status: "completed",
        priority: "medium",
    },
    {
        id: "6",
        title: "Backend API integration",
        status: "completed",
        priority: "low",
    },
];

export const activeTasks = tasks.filter((t) => t.status === "active");
export const completedTasks = tasks.filter((t) => t.status === "completed");
