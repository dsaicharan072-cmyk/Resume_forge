import React, { useState } from 'react';
import { useRecruiter } from '../careerService';
import { getCareerProfile } from '../careerProfile';

const AIRecruiter = () => {
  const { mutate: evaluateResume, data, isPending, isError } = useRecruiter();
  const [companyName, setCompanyName] = useState('Google');
  const profile = getCareerProfile();
  
  const handleEvaluate = (e) => {
    e.preventDefault();
    evaluateResume({ 
      companyName,
      resumeAnalysis: {
        skills: profile.skills,
        experienceYears: profile.experienceYears
      }
    });
  };

  const evalData = data?.data;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: '0 0 8px 0' }}>🤖 AI Recruiter Simulator</h1>
        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
          Test your resume against the harsh reality of ATS filters and technical hiring managers.
        </p>
      </header>

      <form onSubmit={handleEvaluate} style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Target Company</label>
          <select 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '15px', backgroundColor: '#F9FAFB' }}
          >
            <option value="Google">Google (Big Tech)</option>
            <option value="Amazon">Amazon (Big Tech)</option>
            <option value="Microsoft">Microsoft (Big Tech)</option>
            <option value="Stripe">Stripe (Fintech Unicorn)</option>
            <option value="Acme Corp">Acme Corp (Mid-size Startup)</option>
          </select>
        </div>
        <button 
          type="submit" 
          disabled={isPending}
          style={{ padding: '12px 24px', backgroundColor: '#111827', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '15px', cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1 }}
        >
          {isPending ? 'Analyzing...' : 'Run Simulation'}
        </button>
      </form>

      {isError && (
        <div style={{ padding: '16px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', color: '#991B1B', marginBottom: '32px' }}>
          Failed to run AI Recruiter simulation. Please try again later.
        </div>
      )}

      {evalData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.5s ease-in-out' }}>
          
          {/* ATS Decision */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>ATS Parser Decision</h2>
              <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>Deterministic keyword & experience scoring</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: evalData.atsDecision === 'PASS' ? '#059669' : '#DC2626' }}>
                {evalData.atsDecision}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>Score: {evalData.atsScore}/100</div>
            </div>
          </div>

          {/* Hiring Manager Perspective */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', borderLeft: '4px solid #2563EB' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '800', color: '#2563EB', margin: '0 0 12px 0' }}>Hiring Manager's Notes</h3>
            <p style={{ fontSize: '16px', color: '#334155', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>
              "{evalData.recruiterPerspective}"
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Strengths */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#059669' }}>✓</span> Perceived Strengths
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', lineHeight: '1.8', fontSize: '14px' }}>
                {evalData.topStrengths?.map((str, i) => <li key={i}>{str}</li>)}
              </ul>
            </div>
            
            {/* Weaknesses */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#DC2626' }}>⚠</span> Red Flags / Weaknesses
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', lineHeight: '1.8', fontSize: '14px' }}>
                {evalData.topWeaknesses?.map((wk, i) => <li key={i}>{wk}</li>)}
              </ul>
            </div>
          </div>

          {/* Actionable Advice */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Recommended Action Plan</h3>
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ display: 'block', fontSize: '14px', color: '#374151', marginBottom: '4px' }}>Interview Focus:</strong>
              <div style={{ fontSize: '14px', color: '#4B5563', backgroundColor: '#F3F4F6', padding: '12px', borderRadius: '8px' }}>{evalData.interviewAdvice}</div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>Resume Changes to Make:</strong>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', lineHeight: '1.8', fontSize: '14px' }}>
                {evalData.recommendedChanges?.map((ch, i) => <li key={i}>{ch}</li>)}
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default AIRecruiter;
