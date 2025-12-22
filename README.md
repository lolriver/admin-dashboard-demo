# 🚀 Enterprise Admin Dashboard

A modern, professional admin dashboard built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Features authentication, interactive components, and a beautiful dark theme.

![Dashboard Preview](./screenshots/overview.png)

## ✨ Features

### 🔐 Authentication
- NextAuth.js with credentials provider
- Protected routes with middleware
- Demo login for easy testing
- Session management

### ⚡ Demo Mode Architecture
- **Zero-Config Deployment**: Runs entirely on client-side mock data for instant reliability.
- **Optimistic UI**: Simulates database operations (CRUD) with immediate visual feedback.
- **State Persistence**: Data persists during the session (resets on refresh) for a clean demo experience every time.

### 📊 Dashboard Pages
- **Overview** - KPI cards, interactive calendar, task management
- **Users** - CRUD operations, sorting, bulk actions
- **Projects** - Progress tracking, status management
- **Settings** - Profile, theme, notifications
- **AI Assistant** - Chat interface demo
- **Admin Management** - User role management

### 🎨 UI/UX
- Dark/Light theme toggle
- Toast notifications
- Modal dialogs
- Dropdown menus
- Responsive design

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| NextAuth.js | Authentication (Credentials + JWT) |
| Recharts | Data visualization |
| Lucide React | Icons |
| Mock Data | Zero-latency demo data |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn


### Demo Credentials
- **Email:** demo@example.com
- **Password:** demo123

## 📁 Project Structure

```
├── app/
│   ├── api/auth/          # NextAuth API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/
│   ├── modal.tsx          # Reusable modal
│   ├── toast.tsx          # Toast notifications
│   ├── dropdown.tsx       # Dropdown menus
│   ├── navbar.tsx         # Navigation bar
│   └── sidebar.tsx        # Side navigation
├── data/                  # Mock data
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript definitions
```

## 🎯 Key Features Demo

### User Management
- Add, edit, delete users
- Role-based filtering
- Column sorting
- Bulk selection & delete

### Project Tracking
- Create/edit projects
- Progress slider
- Status dropdown
- Team management

### Settings
- Profile editing
- Password change
- Notification toggles
- Theme preference





## 📝 Environment Variables

Create a `.env.local` file:

```env
AUTH_SECRET=your-secret-key-here
```

Generate a secret:
```bash
openssl rand -base64 32
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Your Name]
