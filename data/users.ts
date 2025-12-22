export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Inactive" | "Pending";
  avatar: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/avatars/alice.jpg", // We'll handle avatars with initials if image fails
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    status: "Active",
    avatar: "/avatars/bob.jpg",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "/avatars/charlie.jpg",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Editor",
    status: "Pending",
    avatar: "/avatars/diana.jpg",
  },
  {
    id: "5",
    name: "Evan Wright",
    email: "evan@example.com",
    role: "Viewer",
    status: "Active",
    avatar: "/avatars/evan.jpg",
  },
  {
    id: "6",
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/avatars/fiona.jpg",
  },
  {
    id: "7",
    name: "George Martin",
    email: "george@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "/avatars/george.jpg",
  },
];
