import React from 'react';
import { useApplications } from '../../career/careerService';

export default function DashboardPage() {
  const { data, isLoading, isError } = useApplications();

  const analytics = data?.data?.analytics || {};
  const applications = data?.data?.applications || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted text-sm">Overview of your career progress.</p>
      </div>
      
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-6 flex flex-col justify-between space-y-4">
              <div className="h-4 w-1/2 bg-muted/20 rounded animate-pulse"></div>
              <div className="h-8 w-3/4 bg-muted/20 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="p-4 bg-red-900/20 text-red-400 border border-red-900/50 rounded-lg">
          Failed to load dashboard data.
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="card p-6 flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-muted">Total Applications</h3>
              <p className="text-3xl font-bold">{analytics.totalApplications || 0}</p>
            </div>
            <div className="card p-6 flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-muted">Active Interviews</h3>
              <p className="text-3xl font-bold text-primary">{analytics.activeInterviews || 0}</p>
            </div>
            <div className="card p-6 flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-muted">Offers Received</h3>
              <p className="text-3xl font-bold text-emerald-500">{analytics.offers || 0}</p>
            </div>
            <div className="card p-6 flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-muted">Response Rate</h3>
              <p className="text-3xl font-bold text-amber-500">{analytics.responseRate || '0%'}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold tracking-tight mb-4">Recent Applications</h2>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-surface-hover/50 text-muted">
                    <tr>
                      <th className="px-6 py-4 font-medium">Company</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Date Applied</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {applications.length > 0 ? applications.map((app) => (
                      <tr key={app.id} className="hover:bg-surface-hover/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{app.company}</td>
                        <td className="px-6 py-4 text-muted">{app.role}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            app.status === 'Offer' ? 'bg-emerald-500/10 text-emerald-500' :
                            app.status === 'Interview' ? 'bg-primary/10 text-primary' :
                            app.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                            'bg-muted/10 text-muted'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted">{app.appliedDate}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-muted">
                          No applications found. Start applying!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
