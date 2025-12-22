"use client";

import * as React from "react";
import { format } from "date-fns";
import {
    Cloud,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    TrendingUp,
    CircleDot,
    CheckCircle,
    Plus,
    Trash2,
    Search,
    Filter,
    Download,
    Code,
    Smartphone,
    Layout,
    Server,
    Users,
    Clock,
} from "lucide-react";
import { kpiData } from "@/data/stats";
import { tasks as initialTasks, Task } from "@/data/tasks";
import { Modal } from "@/components/modal";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";
import { RevenueAreaChart } from "@/components/charts/area-chart";
import { PerformanceBarChart } from "@/components/charts/bar-chart";
import { PerformanceRadarChart } from "@/components/charts/radar-chart";
import { WorldMap } from "@/components/maps/world-map";
import { Insights } from "@/components/insights";
import { Badge } from "@/components/badge";

export default function OverviewPage() {
    const { addToast } = useToast();
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [mounted, setMounted] = React.useState(false);
    const [taskTab, setTaskTab] = React.useState<"active" | "completed">("active");

    // Tasks state
    const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false);
    const [newTaskTitle, setNewTaskTitle] = React.useState("");

    // Calendar state
    const [selectedDate, setSelectedDate] = React.useState<number | null>(20);
    const [calendarMonth, setCalendarMonth] = React.useState(11); // December
    const [calendarYear, setCalendarYear] = React.useState(2025);

    React.useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const activeTasks = tasks.filter((t) => t.status === "active");
    const completedTasks = tasks.filter((t) => t.status === "completed");

    const calendarDays = React.useMemo(() => {
        const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
        const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
        const days: (number | null)[] = [];
        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(i);
        return days;
    }, [calendarMonth, calendarYear]);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask: Task = {
            id: String(Date.now()),
            title: newTaskTitle,
            status: "active",
            priority: "medium",
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
        setIsAddTaskModalOpen(false);
        addToast("Task added successfully", "success");
    };

    const handleCompleteTask = (taskId: string) => {
        setTasks(tasks.map((t) => t.id === taskId ? { ...t, status: "completed" as const } : t));
        addToast("Task completed!", "success");
    };

    const projects = [
        { id: 1, name: "E-Commerce Platform", desc: "Complete online store with payment integration", status: "Ready", date: "12/18/2025", icon: Code },
        { id: 2, name: "Mobile App (iOS & Android)", desc: "Cross-platform mobile application with push notifications", status: "Ready", date: "12/18/2025", icon: Smartphone },
        { id: 3, name: "Dashboard Analytics", desc: "Real-time business intelligence dashboard", status: "In Progress", date: "12/18/2025", icon: Layout },
        { id: 4, name: "API Gateway Service", desc: "Microservices architecture with GraphQL", status: "Ready", date: "12/18/2025", icon: Server },
    ];

    return (
        <div className="space-y-6 pb-10">
            {/* Welcome Banner */}
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Wrapping up the day, Demo</h1>
                    <p className="text-blue-100 mb-6">Ready to make today productive! 🚀</p>
                    <div className="text-4xl font-bold">
                        {mounted ? format(currentTime, "hh:mm") : "00:00"}
                        <span className="text-lg font-normal ml-2">{mounted ? format(currentTime, "a") : "AM"}</span>
                    </div>
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right hidden md:block">
                    <Cloud className="h-12 w-12 mb-2 inline-block" />
                    <p className="text-3xl font-bold">25°C</p>
                    <p className="text-blue-100">Mist</p>
                    <p className="text-sm text-blue-200">Chennai</p>
                    <p className="text-xs text-blue-200 mt-1">{mounted ? format(currentTime, "EEEE, MMMM d, yyyy") : "Loading..."}</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-white/5">
                            <Layout className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-muted-foreground">Total Projects</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-sm text-green-500 font-medium">+3</p>
                    </div>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-white/5">
                            <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-muted-foreground">Active Users</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold">1,847</p>
                        <p className="text-sm text-green-500 font-medium">+12%</p>
                    </div>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-white/5">
                            <TrendingUp className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-muted-foreground">Task Completion</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold">78%</p>
                        <p className="text-sm text-green-500 font-medium">+5%</p>
                    </div>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-white/5">
                            <Clock className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-muted-foreground">Avg. Response Time</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold">32 min</p>
                        <p className="text-sm text-muted-foreground font-medium">→ 0%</p>
                    </div>
                </div>
            </div>

            {/* Row 3: Quick Tasks | Calendar | Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Tasks */}
                <div className="rounded-xl border border-border/50 bg-card p-6 flex flex-col">
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg">Quick Tasks</h3>
                        <p className="text-sm text-muted-foreground">Manage your daily tasks</p>
                    </div>

                    <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-lg w-fit">
                        <button
                            onClick={() => setTaskTab("active")}
                            className={cn(
                                "px-4 py-1.5 rounded-md text-sm transition-all",
                                taskTab === "active" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Active ({activeTasks.length})
                        </button>
                        <button
                            onClick={() => setTaskTab("completed")}
                            className={cn(
                                "px-4 py-1.5 rounded-md text-sm transition-all",
                                taskTab === "completed" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Completed ({completedTasks.length})
                        </button>
                    </div>

                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                            placeholder="Add a quick task..."
                            className="flex-1 bg-white/5 border border-border/50 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 transition-colors"
                        />
                        <button
                            onClick={handleAddTask}
                            disabled={!newTaskTitle.trim()}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
                        {(taskTab === "active" ? activeTasks : completedTasks).length === 0 ? (
                            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                                No {taskTab} tasks
                            </div>
                        ) : (
                            (taskTab === "active" ? activeTasks : completedTasks).map((task) => (
                                <div key={task.id} className="flex items-center gap-3 group">
                                    <button
                                        onClick={() => taskTab === "active" && handleCompleteTask(task.id)}
                                        className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                                            taskTab === "completed" ? "border-green-500 bg-green-500" : "border-muted-foreground hover:border-blue-500"
                                        )}
                                    >
                                        {taskTab === "completed" && <CheckCircle className="h-3 w-3 text-white" />}
                                    </button>
                                    <span className={cn("text-sm flex-1 truncate", taskTab === "completed" && "line-through text-muted-foreground")}>
                                        {task.title}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Calendar */}
                <div className="rounded-xl border border-border/50 bg-card p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg">Calendar</h3>
                        <p className="text-sm text-muted-foreground">{mounted ? format(currentTime, "EEEE, MMMM d, yyyy") : "Loading..."}</p>
                    </div>

                    <div className="flex items-center justify-between mb-6 px-4">
                        <button onClick={() => setCalendarMonth(m => m === 0 ? 11 : m - 1)} className="p-1 hover:bg-white/10 rounded">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="font-medium">{monthNames[calendarMonth]} {calendarYear}</span>
                        <button onClick={() => setCalendarMonth(m => m === 11 ? 0 : m + 1)} className="p-1 hover:bg-white/10 rounded">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                            <div key={d} className="text-muted-foreground text-xs">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {calendarDays.map((day, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "aspect-square flex items-center justify-center rounded-lg transition-colors",
                                    day === null ? "invisible" : "hover:bg-white/5 cursor-pointer",
                                    day === selectedDate ? "bg-white text-black font-medium hover:bg-white" : ""
                                )}
                                onClick={() => day && setSelectedDate(day)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insights / Radial Chart */}
                <Insights />
            </div>

            {/* Row 4: Revenue Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3 rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-lg">Revenue Analytics</h3>
                            <p className="text-sm text-muted-foreground">Revenue breakdown by category</p>
                        </div>
                        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                            This Quarter <ChevronRight className="h-4 w-4 rotate-90" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3">
                            <RevenueAreaChart />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-2xl font-bold">$193,390</p>
                                <p className="text-sm text-muted-foreground">Total Revenue</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-500">+13.9%</p>
                                <p className="text-sm text-muted-foreground">Avg Growth</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">6/6</p>
                                <p className="text-sm text-muted-foreground">Positive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 5: Project List | Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-lg">Overview of active development projects</h3>
                        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                            <Download className="h-4 w-4" /> Export
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm text-muted-foreground border-b border-border/50">
                                    <th className="pb-4 font-medium">Name</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium">Last Updated</th>
                                    <th className="pb-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-border/50 last:border-0 hover:bg-white/5 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white/5">
                                                    <project.icon className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{project.name}</p>
                                                    <p className="text-xs text-muted-foreground">{project.desc}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <Badge variant={project.status === "Ready" ? "success" : "warning"}>
                                                {project.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 text-muted-foreground">{project.date}</td>
                                        <td className="py-4 text-right">
                                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <PerformanceBarChart />
            </div>

            {/* Row 6: Map | Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-lg">User Activity Map</h3>
                            <p className="text-sm text-muted-foreground">Real-time user engagement</p>
                        </div>
                    </div>
                    <WorldMap />
                </div>

                <PerformanceRadarChart />
            </div>
        </div>
    );
}

