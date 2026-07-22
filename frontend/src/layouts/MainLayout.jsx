import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, BriefcaseBusiness, Building2, FileText, GraduationCap, LayoutDashboard, Lightbulb, LogOut, Map, Sparkles, Target, UserRound } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const navItems = [
  { path: '/career/match', label: 'Company Match', icon: Building2 },
  { path: '/career/skill-gap', label: 'Skill Gap', icon: BarChart3 },
  { path: '/career/roadmap', label: 'Learning', icon: Map },
  { path: '/career/projects', label: 'Projects', icon: Lightbulb },
  { path: '/career/interview', label: 'Interview Prep', icon: GraduationCap },
  { path: '/career/jobs', label: 'Live Jobs', icon: BriefcaseBusiness },
  { path: '/career/tracker', label: 'App Tracker', icon: Target },
  { path: '/career/recruiter', label: 'AI Recruiter', icon: Sparkles },
];

export default function MainLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <aside className="w-64 flex-shrink-0 border-r border-border bg-surface hidden md:flex flex-col">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-border">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-glow"><FileText size={19} /></span>
          <span className="text-lg font-bold tracking-tight text-foreground">ResumeForge</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <div className="space-y-1">
            <NavLink to="/dashboard" className={({isActive}) => `h-10 rounded-lg flex items-center gap-3 px-3 text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:text-foreground hover:bg-surface-hover'}`}><LayoutDashboard size={17} />Dashboard</NavLink>
            <NavLink to="/resume" className={({isActive}) => `h-10 rounded-lg flex items-center gap-3 px-3 text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:text-foreground hover:bg-surface-hover'}`}><FileText size={17} />Resume</NavLink>
            
            <div className="pt-4 pb-2 text-xs font-bold text-muted uppercase tracking-wider px-3">Career OS</div>
            {navItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path} 
                className={({isActive}) => `h-10 rounded-lg flex items-center px-3 text-sm font-medium transition-colors gap-3 ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:text-foreground hover:bg-surface-hover'}`}
              >
                <item.icon size={17} />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex-shrink-0 border-b border-border bg-surface/90 backdrop-blur flex items-center justify-between px-6 md:px-8">
          <div className="md:hidden flex items-center gap-2 text-lg font-bold"><FileText size={18} className="text-primary" />ResumeForge</div>
          <div className="hidden md:flex flex-1 text-sm text-muted">Career workspace</div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-foreground leading-none">{user?.name || 'Account'}</p>
              <p className="mt-1 text-xs text-muted">Career workspace</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary" title={user?.name || 'Account'}>
              <UserRound size={18} />
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.06),_transparent_28rem)]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
