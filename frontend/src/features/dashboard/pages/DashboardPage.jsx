import { useDashboardStats, useDashboardMatches, useDashboardSkills, useDashboardActivities } from '../hooks/useDashboard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card';
import { Badge } from '../../../components/Badge';
import { Progress } from '../../../components/Progress';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, Briefcase, FileText, CheckCircle, Target } from 'lucide-react';

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: matches, isLoading: matchesLoading } = useDashboardMatches();
  const { data: skills, isLoading: skillsLoading } = useDashboardSkills();
  const { data: activities, isLoading: activitiesLoading } = useDashboardActivities();

  if (statsLoading || matchesLoading || skillsLoading || activitiesLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Developer!</h1>
        <p className="text-muted">Here's what's happening with your career journey today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted">Profile Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats?.profileCompletion}%</div>
            <Progress value={stats?.profileCompletion} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted">Resume ATS Score</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.atsScore} / 100</div>
            <p className="text-xs text-muted mt-1">Excellent score! Version {stats?.resumeVersion}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted">Company Matches</CardTitle>
            <Target className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.matchesFound}</div>
            <p className="text-xs text-muted mt-1">New roles matching your profile</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted">Live Hiring</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.liveHiring}</div>
            <p className="text-xs text-muted mt-1">Companies hiring actively this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Section */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activities?.weeklyProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLearning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121214', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="learningHours" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLearning)" name="Learning (hrs)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Missing Skills Section */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Missing Skills</CardTitle>
            <p className="text-sm text-muted">Based on your recent job matches</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {skills?.missing.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
            
            <h4 className="text-sm font-medium text-muted mb-3">Learning Progress</h4>
            <div className="space-y-4">
              {skills?.learningProgress.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.topic}</span>
                    <span className="text-muted">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities?.recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{app.company}</p>
                    <p className="text-xs text-muted">{app.date}</p>
                  </div>
                  <Badge variant={
                    app.status === 'Applied' ? 'default' : 
                    app.status === 'Under Review' ? 'warning' : 'destructive'
                  }>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Hiring Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Top Company Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matches?.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-hover transition-colors">
                  <div>
                    <p className="font-medium flex items-center">
                      {match.company}
                      {match.isHiring && <span className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Actively Hiring" />}
                    </p>
                    <p className="text-xs text-muted">{match.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary">{match.matchScore}%</span>
                    <p className="text-[10px] text-muted uppercase">Match</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
