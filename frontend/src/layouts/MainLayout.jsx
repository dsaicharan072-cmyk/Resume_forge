import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Briefcase, GraduationCap, Settings, LogOut, 
  Menu, X, Bell, Search, Building2, Target, BookOpen, Code2, MessageSquare, Sparkles 
} from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { cn } from '../utils/cn';
import CommandPalette from '../components/CommandPalette';
import { useCommandPaletteStore } from '../hooks/useCommandPalette';

const navGroups = [
  {
    title: "Core",
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/resume', label: 'Resume AI', icon: FileText },
    ]
  },
  {
    title: "Career Intelligence",
    items: [
      { path: '/career', label: 'Company Match', icon: Building2 },
      { path: '/career/skills', label: 'Skill Gap', icon: Target },
      { path: '/career/roadmap', label: 'Roadmap', icon: BookOpen },
      { path: '/career/projects', label: 'Projects', icon: Code2 },
      { path: '/career/interviews', label: 'Interviews', icon: MessageSquare },
      { path: '/career/recruiter', label: 'AI Recruiter', icon: Sparkles },
    ]
  },
  {
    title: "Opportunities",
    items: [
      { path: '/jobs', label: 'Live Jobs', icon: Briefcase },
      { path: '/applications', label: 'Applications', icon: GraduationCap },
    ]
  }
];

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { open: openCommandPalette } = useCommandPaletteStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      
      {/* Sidebar (Desktop) / Drawer (Mobile) */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-border transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border shrink-0">
          <div className="flex items-center gap-2 font-bold text-xl text-foreground">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm">RF</div>
            ResumeForge
          </div>
          <button className="md:hidden text-muted-foreground" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              <div className="px-6 mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {group.title}
              </div>
              <nav className="space-y-0.5 px-3">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/career'} // Exact match for parent routes to prevent active state bleeding
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border shrink-0">
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium transition-colors mb-1",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings size={16} /> Settings
          </NavLink>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-white dark:bg-zinc-900 z-10 shrink-0">
          <button className="md:hidden text-muted-foreground mr-4" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="flex-1 flex items-center justify-end md:justify-between">
            <div 
              onClick={openCommandPalette}
              className="hidden md:flex items-center justify-between w-full max-w-md bg-muted/50 rounded-full px-4 py-2 border border-transparent hover:border-border hover:bg-background transition-colors cursor-pointer group"
            >
              <div className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
                <Search size={16} className="mr-2" />
                <span className="text-sm">Search or jump to...</span>
              </div>
              <div className="flex gap-1">
                <kbd className="inline-flex items-center rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>
                </kbd>
                <kbd className="inline-flex items-center rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  K
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-foreground relative">
                <Bell size={18} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Command Palette Overlay */}
      <CommandPalette />
    </div>
  );
};

export default MainLayout;
