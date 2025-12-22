export interface KPI {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  iconName: "Folder" | "Users" | "CheckCircle" | "Clock";
}

export const kpiData: KPI[] = [
  {
    title: "Total Projects",
    value: "24",
    change: "+3",
    changeType: "positive",
    iconName: "Folder",
  },
  {
    title: "Active Users",
    value: "1,847",
    change: "+12%",
    changeType: "positive",
    iconName: "Users",
  },
  {
    title: "Task Completion",
    value: "78%",
    change: "+5%",
    changeType: "positive",
    iconName: "CheckCircle",
  },
  {
    title: "Avg. Response Time",
    value: "32 min",
    change: "0%",
    changeType: "neutral",
    iconName: "Clock",
  },
];

export const performanceData = [
  { name: "Completed", value: 85, fill: "#3b82f6" }, // Blue
  { name: "In Progress", value: 10, fill: "#22c55e" }, // Green
  { name: "Delayed", value: 5, fill: "#ef4444" }, // Red
];

export const trendData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 280 },
  { name: "Fri", value: 590 },
  { name: "Sat", value: 320 },
  { name: "Sun", value: 450 },
];
