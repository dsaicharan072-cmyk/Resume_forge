import React, { useState } from 'react';
import { useApplications, useCreateApplication } from '../careerService';
import { useQueryClient } from '@tanstack/react-query';

const ApplicationTracker = () => {
  const queryClient = useQueryClient();
  const { data: appData, isLoading, isError } = useApplications();
  const createMutation = useCreateApplication();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    status: 'Saved',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsFormOpen(false);
        setFormData({ company: '', role: '', location: '', status: 'Saved', notes: '' });
        queryClient.invalidateQueries({ queryKey: ['applications'] });
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'saved': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'applied': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'oa': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'interview': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'offer': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-primary font-bold animate-pulse">Loading applications...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to load application data. Please try again.
      </div>
    );
  }

  const analytics = appData?.data?.analytics || appData?.analytics || {};
  const applications = appData?.data?.applications || appData?.applications || [];

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Application Tracker</h1>
          <p className="text-base text-slate-500 m-0">Manage your job search pipeline and track your success.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-blue-600/20 transition-all active:scale-95 whitespace-nowrap"
        >
          + Add Application
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Applications', value: analytics.totalApplications || 0, color: 'text-slate-900' },
          { label: 'Interviews & OAs', value: analytics.totalInterviews || 0, color: 'text-purple-600' },
          { label: 'Total Offers', value: analytics.totalOffers || 0, color: 'text-emerald-600' },
          { label: 'Success Rate', value: analytics.successRate || '0%', color: 'text-blue-600' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">{stat.label}</p>
            <h2 className={`text-4xl font-extrabold m-0 ${stat.color}`}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Application List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 px-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800 m-0">Recent Activity</h3>
        </div>
        
        {applications.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-slate-500 mb-4 font-medium text-lg">No applications tracked yet.</p>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-transparent border-none text-blue-600 font-bold cursor-pointer text-base hover:underline"
            >
              Start tracking your first application &rarr;
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="p-5 px-6 text-xs uppercase text-slate-400 font-extrabold tracking-wider">Company & Role</th>
                  <th className="p-5 px-6 text-xs uppercase text-slate-400 font-extrabold tracking-wider">Location</th>
                  <th className="p-5 px-6 text-xs uppercase text-slate-400 font-extrabold tracking-wider">Status</th>
                  <th className="p-5 px-6 text-xs uppercase text-slate-400 font-extrabold tracking-wider">Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-5 px-6">
                      <div className="font-extrabold text-slate-900 text-base">{app.company}</div>
                      <div className="text-sm text-slate-500 mt-1 font-medium">{app.role}</div>
                    </td>
                    <td className="p-5 px-6 text-sm text-slate-600 font-medium">
                      {app.location}
                    </td>
                    <td className="p-5 px-6">
                      <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-5 px-6 text-sm text-slate-500 font-medium">
                      {new Date(app.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Application Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-extrabold text-slate-900 m-0">Add Application</h3>
              <button 
                onClick={() => setIsFormOpen(false)} 
                className="bg-transparent border-none text-2xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Company</label>
                <input required type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Google" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                <input required type="text" name="role" value={formData.role} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Frontend Engineer" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Remote" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-xl text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer">
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="OA">Online Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="3" className="w-full p-3 border border-slate-300 rounded-xl text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Any specific details?"></textarea>
              </div>

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 p-3.5 bg-white border border-slate-300 rounded-xl text-base font-bold text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={createMutation.isPending} className={`flex-1 p-3.5 bg-blue-600 border-none rounded-xl text-base font-bold text-white cursor-pointer transition-all hover:bg-blue-700 shadow-md shadow-blue-600/20 ${createMutation.isPending ? 'opacity-70' : ''}`}>
                  {createMutation.isPending ? 'Saving...' : 'Save Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApplicationTracker;
