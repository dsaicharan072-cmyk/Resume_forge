import React from 'react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useDashboard } from '../hooks/useDashboard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../../components/Card';
import Badge from '../../../components/Badge';
import Progress from '../../../components/Progress';
import Skeleton from '../../../components/Skeleton';
import { Target, TrendingUp, Zap, FileText, CheckCircle2, Building, Calendar, Briefcase } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, subtitle, icon: Icon, loading, colorClass = "text-primary bg-primary/10" }) => (
  <Card className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", colorClass)}>
          {Icon && <Icon className="h-6 w-6" />}
        </div>
        <div className="flex flex-col gap-1">
          <p className="tracking-tight text-sm font-medium text-muted-foreground">
            {title}
          </p>
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-3xl font-bold">{value}</div>
          )}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border/40">
        {loading ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <p className="text-xs text-muted-foreground flex items-center gap-1">{subtitle}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useDashboard();

  if (isError) {
    return <div className="p-4 text-destructive">Failed to load dashboard data.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'User'}. Here is your career overview.
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Profile Completion"
          value={data?.profileCompletion ? `${data.profileCompletion}%` : '0%'}
          subtitle={<><span className="text-green-500 font-medium">+15%</span> left to unlock AI Match</>}
          icon={Target}
          loading={isLoading}
          colorClass="text-purple-600 bg-purple-100"
        />
        <StatCard
          title="Resume ATS Score"
          value={data?.atsScore || 0}
          subtitle={`Version: ${data?.resumeVersion || 'v1.0'}`}
          icon={FileText}
          loading={isLoading}
          colorClass="text-blue-600 bg-blue-100"
        />
        <StatCard
          title="Company Match Rate"
          value={data?.companyMatch ? `${data.companyMatch}%` : '0%'}
          subtitle={<><span className="text-red-500 font-medium">-4%</span> from last week</>}
          icon={Zap}
          loading={isLoading}
          colorClass="text-orange-600 bg-orange-100"
        />
        <StatCard
          title="Active Applications"
          value={data?.recentApplications?.length || 0}
          subtitle={<><span className="text-primary font-medium">2 interviews</span> scheduled</>}
          icon={Briefcase}
          loading={isLoading}
          colorClass="text-pink-600 bg-pink-100"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Main Chart Area */}
        <Card className="col-span-1 lg:col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Your application and interview trends over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-0 flex-1 min-h-[300px]">
            {isLoading ? (
              <div className="h-full w-full p-4 flex flex-col justify-end gap-2">
                 <Skeleton className="h-[40%] w-full" />
                 <Skeleton className="h-[60%] w-full" />
                 <Skeleton className="h-[80%] w-full" />
              </div>
            ) : (
              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data?.weeklyProgress} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="applications" stroke="#aa3bff" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                    <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Missing Skills & Recent Apps */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          
          <Card className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border-transparent shadow-lg shadow-purple-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9D4EDD] to-[#7B2CBF] flex items-center justify-center text-white shadow-sm">
                  <Sparkles size={16} />
                </div>
                Top Missing Skills
              </CardTitle>
              <CardDescription className="text-purple-900/60">
                Adding these to your profile boosts your match rate by 14%.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 relative z-10">
                {isLoading ? (
                  [1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full bg-purple-200/50" />)
                ) : (
                  data?.missingSkills?.map((skill, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-purple-200/50 pb-3 last:pb-0 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/60 flex items-center justify-center text-purple-700">
                          <CheckCircle2 size={12} />
                        </div>
                        <span className="font-medium text-sm text-purple-900">{skill.name}</span>
                      </div>
                      <Badge className="capitalize bg-white/50 text-purple-900 hover:bg-white/80 border-transparent shadow-sm">{skill.type}</Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  [1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)
                ) : (
                  data?.recentApplications?.map((app) => (
                    <div key={app.id} className="flex flex-col gap-1 border-b border-border pb-3 last:pb-0 last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm flex items-center gap-1"><Building size={14} className="text-muted-foreground"/> {app.company}</span>
                        <Badge 
                          variant={app.status === 'Interviewing' ? 'success' : app.status === 'Rejected' ? 'destructive' : 'default'}
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{app.role}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {app.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
