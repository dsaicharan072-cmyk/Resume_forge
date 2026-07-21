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
      case 'saved': return { bg: '#F3F4F6', color: '#1F2937', border: '#E5E7EB' };
      case 'applied': return { bg: '#DBEAFE', color: '#1E40AF', border: '#BFDBFE' };
      case 'oa': return { bg: '#F3E8FF', color: '#6B21A8', border: '#E9D5FF' };
      case 'interview': return { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' };
      case 'offer': return { bg: '#D1FAE5', color: '#065F46', border: '#A7F3D0' };
      case 'rejected': return { bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' };
      default: return { bg: '#F3F4F6', color: '#1F2937', border: '#E5E7EB' };
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <p style={{ color: '#2563EB', fontWeight: 'bold' }}>Loading applications...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', color: '#EF4444', padding: '32px' }}>
        Failed to load application data. Please try again.
      </div>
    );
  }

  const analytics = appData?.data?.analytics || {};
  const applications = appData?.data?.applications || [];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', margin: '0 0 8px 0' }}>Application Tracker</h1>
          <p style={{ fontSize: '18px', color: '#6B7280', margin: 0 }}>Manage your job search pipeline and track your success.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          style={{
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
            transition: 'all 0.2s'
          }}
        >
          + Add Application
        </button>
      </div>

      {/* Analytics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {[
          { label: 'Total Applications', value: analytics.totalApplications || 0, color: '#111827' },
          { label: 'Interviews & OAs', value: analytics.totalInterviews || 0, color: '#7E22CE' },
          { label: 'Total Offers', value: analytics.totalOffers || 0, color: '#059669' },
          { label: 'Success Rate', value: analytics.successRate || '0%', color: '#2563EB' }
        ].map((stat, idx) => (
          <div key={idx} style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #F3F4F6'
          }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', margin: '0 0 8px 0' }}>{stat.label}</p>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: stat.color, margin: 0 }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Application List */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', margin: 0 }}>Recent Activity</h3>
        </div>
        
        {applications.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <p style={{ color: '#6B7280', marginBottom: '16px' }}>No applications tracked yet.</p>
            <button 
              onClick={() => setIsFormOpen(true)}
              style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: '600', cursor: 'pointer', fontSize: '16px' }}
            >
              Start tracking your first application &rarr;
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '16px 24px', fontSize: '12px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: '600' }}>Company & Role</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: '600' }}>Location</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: '600' }}>Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const sColor = getStatusColor(app.status);
                  return (
                    <tr key={app.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px' }}>{app.company}</div>
                        <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>{app.role}</div>
                      </td>
                      <td style={{ padding: '20px 24px', fontSize: '14px', color: '#4B5563' }}>
                        {app.location}
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <span style={{ 
                          padding: '6px 12px', 
                          fontSize: '13px', 
                          fontWeight: '600', 
                          borderRadius: '9999px',
                          backgroundColor: sColor.bg,
                          color: sColor.color,
                          border: `1px solid ${sColor.border}`
                        }}>
                          {app.status}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px', fontSize: '14px', color: '#6B7280' }}>
                        {new Date(app.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Application Modal Overlay */}
      {isFormOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', width: '100%', maxWidth: '480px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>Add Application</h3>
              <button onClick={() => setIsFormOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#9CA3AF', cursor: 'pointer' }}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Company</label>
                <input required type="text" name="company" value={formData.company} onChange={handleInputChange} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '15px' }} placeholder="e.g. Google" />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Role</label>
                <input required type="text" name="role" value={formData.role} onChange={handleInputChange} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '15px' }} placeholder="e.g. Frontend Engineer" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '15px' }} placeholder="e.g. Remote" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '15px', backgroundColor: '#FFFFFF' }}>
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
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="3" style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '15px', resize: 'none' }} placeholder="Any specific details?"></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setIsFormOpen(false)} style={{ flex: 1, padding: '14px', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '15px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={createMutation.isPending} style={{ flex: 1, padding: '14px', backgroundColor: '#2563EB', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', color: '#FFFFFF', cursor: 'pointer', opacity: createMutation.isPending ? 0.7 : 1 }}>
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
