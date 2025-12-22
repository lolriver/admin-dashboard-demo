export interface Project {
  id: string;
  name: string;
  status: "In Progress" | "Completed" | "On Hold";
  progress: number;
  team: string[]; // List of avatar URLs or initials
  dueDate: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    status: "In Progress",
    progress: 65,
    team: ["AJ", "BS"],
    dueDate: "2025-12-30",
  },
  {
    id: "2",
    name: "Mobile App Launch",
    status: "Completed",
    progress: 100,
    team: ["DP", "EW", "FG"],
    dueDate: "2025-11-15",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    status: "On Hold",
    progress: 30,
    team: ["CB"],
    dueDate: "2026-01-20",
  },
  {
    id: "4",
    name: "Database Migration",
    status: "In Progress",
    progress: 80,
    team: ["GM", "AJ"],
    dueDate: "2025-12-25",
  },
  {
    id: "5",
    name: "Q4 Financial Report",
    status: "In Progress",
    progress: 45,
    team: ["BS", "DP"],
    dueDate: "2026-01-10",
  },
];
