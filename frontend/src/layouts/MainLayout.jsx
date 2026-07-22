import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { path: '/career/match', label: 'Company Match', icon: '🏢' },
  { path: '/career/skill-gap', label: 'Skill Gap', icon: '📊' },
  { path: '/career/roadmap', label: 'Learning', icon: '🗺️' },
  { path: '/career/projects', label: 'Projects', icon: '🚀' },
  { path: '/career/interview', label: 'Interview Prep', icon: '🧠' },
  { path: '/career/jobs', label: 'Live Jobs', icon: '💼' },
  { path: '/career/tracker', label: 'App Tracker', icon: '📈' },
  { path: '/career/recruiter', label: 'AI Recruiter', icon: '🤖' },
];

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-background text-white overflow-hidden">
      {/* Sidebar Mock */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-surface hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="text-xl font-bold text-primary">ResumeForge</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <div className="space-y-1">
            {/* Nav items will go here */}
            <NavLink to="/dashboard" className={({isActive}) => `h-10 rounded-md flex items-center px-3 text-sm font-medium transition-colors ${isActive ? 'bg-surface-hover text-white' : 'text-muted hover:text-white hover:bg-surface-hover'}`}>Dashboard</NavLink>
            <NavLink to="/resume" className={({isActive}) => `h-10 rounded-md flex items-center px-3 text-sm font-medium transition-colors ${isActive ? 'bg-surface-hover text-white' : 'text-muted hover:text-white hover:bg-surface-hover'}`}>Resume</NavLink>
            
            <div className="pt-4 pb-2 text-xs font-bold text-muted uppercase tracking-wider px-3">Career OS</div>
            {navItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path} 
                className={({isActive}) => `h-10 rounded-md flex items-center px-3 text-sm font-medium transition-colors gap-2 ${isActive ? 'bg-surface-hover text-white' : 'text-muted hover:text-white hover:bg-surface-hover'}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar Mock */}
        <header className="h-16 flex-shrink-0 border-b border-border bg-background flex items-center justify-between px-6">
          <div className="md:hidden text-lg font-bold">ResumeForge</div>
          <div className="hidden md:flex flex-1"></div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              U
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
