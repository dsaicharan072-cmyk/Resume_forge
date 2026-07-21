import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

// Career Pages
import CompanyMatch from './features/career/pages/CompanyMatch';
import SkillGap from './features/career/pages/SkillGap';
import LearningRoadmap from './features/career/pages/LearningRoadmap';
import RecommendedProjects from './features/career/pages/RecommendedProjects';
import InterviewPreparation from './features/career/pages/InterviewPreparation';
import LiveJobs from './features/career/pages/LiveJobs';
import ApplicationTracker from './features/career/pages/ApplicationTracker';

const navItems = [
  { path: '/career/match', label: 'Company Match', icon: '🏢' },
  { path: '/career/skill-gap', label: 'Skill Gap Analysis', icon: '📊' },
  { path: '/career/roadmap', label: 'Learning Roadmap', icon: '🗺️' },
  { path: '/career/projects', label: 'Project Ideas', icon: '🚀' },
  { path: '/career/interview', label: 'Interview Prep', icon: '🧠' },
  { path: '/career/jobs', label: 'Live Hiring Feed', icon: '💼' },
  { path: '/career/tracker', label: 'App Tracker', icon: '📈' },
];

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>⚒️</span> Forge
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Career Intelligence AI</p>
        </div>
        
        <nav style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '12px' }}>
            Career OS
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isActive ? '#2563EB' : '#475569',
                backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                fontWeight: isActive ? '700' : '500',
                transition: 'all 0.2s ease',
              })}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid #E2E8F0', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#475569' }}>
              SC
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>Sai Charan</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Pro Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/career/match" replace />} />
          <Route path="/career/match" element={<CompanyMatch />} />
          <Route path="/career/skill-gap" element={<SkillGap />} />
          <Route path="/career/roadmap" element={<LearningRoadmap />} />
          <Route path="/career/projects" element={<RecommendedProjects />} />
          <Route path="/career/interview" element={<InterviewPreparation />} />
          <Route path="/career/jobs" element={<LiveJobs />} />
          <Route path="/career/tracker" element={<ApplicationTracker />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
