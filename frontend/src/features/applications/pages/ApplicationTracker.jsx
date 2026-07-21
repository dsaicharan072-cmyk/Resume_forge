import React, { useState } from 'react';
import { useApplications, useAddApplication } from '../hooks/useApplications';
import ApplicationCard from '../components/ApplicationCard';
import Button from '../../../components/Button';
import Skeleton from '../../../components/Skeleton';
import { Plus, Kanban } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card';

const columns = [
  { id: 'wishlist', title: 'Wishlist' },
  { id: 'applied', title: 'Applied' },
  { id: 'interviewing', title: 'Interviewing' },
  { id: 'offer', title: 'Offer' },
  { id: 'rejected', title: 'Rejected' },
];

const ApplicationTracker = () => {
  const { data: applications, isLoading, isError } = useApplications();
  const { mutate: addApp, isPending: isAdding } = useAddApplication();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Simple form state for the modal
  const [formData, setFormData] = useState({ company: '', role: '', status: 'wishlist' });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) return;
    
    addApp(
      { ...formData, dateApplied: formData.status !== 'wishlist' ? new Date().toISOString().split('T')[0] : null },
      { onSuccess: () => setShowAddModal(false) }
    );
  };

  if (isError) return <div className="p-4 text-destructive">Failed to load applications.</div>;

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Kanban className="text-primary" /> Application Tracker
          </h1>
          <p className="text-muted-foreground">Manage your job search pipeline in one place.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} className="mr-2" /> Add Application
        </Button>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 min-h-0 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max pb-4">
          
          {columns.map((col) => {
            const columnApps = applications?.filter(app => app.status === col.id) || [];
            
            return (
              <div key={col.id} className="w-80 flex flex-col shrink-0 bg-muted/30 rounded-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-card/50 flex justify-between items-center shrink-0">
                  <h3 className="font-semibold">{col.title}</h3>
                  <span className="bg-muted text-muted-foreground text-xs py-0.5 px-2 rounded-full font-medium">
                    {isLoading ? '-' : columnApps.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {isLoading ? (
                    Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
                  ) : columnApps.length > 0 ? (
                    columnApps.map(app => (
                      <ApplicationCard key={app.id} application={app} />
                    ))
                  ) : (
                    <div className="h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
                      No applications in this stage.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
        </div>
      </div>

      {/* Simple Add Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader>
              <CardTitle>Add New Application</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Initial Stage</label>
                  <select 
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    {columns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button type="submit" disabled={isAdding}>Save</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
};

export default ApplicationTracker;
