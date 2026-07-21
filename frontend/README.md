# ResumeForge Frontend

The V1 frontend architecture for ResumeForge: An AI Resume & Career Assistant.

## Tech Stack
- **Framework**: React 18 (Vite)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 + Vanilla CSS Variables (Dark Mode supported)
- **State Management (UI)**: Zustand
- **State Management (Server/Data)**: @tanstack/react-query
- **Icons**: Lucide React
- **Notifications**: react-hot-toast

## Architecture Highlights
This application is built using a strict **Feature-Based Architecture**. Each feature encapsulates its own pages, components, hooks, and mock services.

### Directory Structure
```
src/
├── components/       # Shared, dumb UI components (Card, Button, Badge)
├── features/         # Feature modules
│   ├── auth/         # Login, Register, Auth store
│   ├── dashboard/    # Main user overview
│   ├── resume/       # Upload, Analysis, Rewrites
│   ├── career/       # Market Intelligence, Skill Gaps, AI Recruiter
│   ├── applications/ # Kanban Application Tracker
│   ├── marketing/    # Public Landing Page
│   └── settings/     # User preferences and Billing mockup
├── layouts/          # MainLayout (Sidebar/Nav), AuthLayout
├── hooks/            # Global hooks (e.g., Command Palette)
├── store/            # Global stores (e.g., Auth state)
├── utils/            # Helpers (e.g., `cn` utility)
└── App.jsx           # Root routing
```

## V1 Mock API Strategy
Because the backend is currently under development by the engineering team, this V1 frontend relies entirely on mock services. 

Each feature folder contains a `services/` directory (e.g., `resumeService.js`, `careerService.js`). These services export asynchronous functions returning realistic JSON payloads wrapped in `setTimeout` to simulate network latency. 

**Backend Engineers**: Review the returned objects in these service files. These represent the strict JSON contracts the UI expects your APIs to return in V2.

## "Explainable AI" UX Pattern
Across the `resume` and `career` modules, you will notice extensive use of the `<Sparkles />` component rendering an "AI Rationale" block. This is a core product tenet: *The user must always know why the AI generated a specific score, recommendation, or interview question.*

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the Vite dev server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Command Palette
Press `Cmd+K` (Mac) or `Ctrl+K` (Windows) from any protected route to open the global Command Palette for rapid navigation and theme toggling.
