import React from 'react';
import { useData } from '../context/DataContext';
import { LayoutDashboard, BookOpenCheck, Target, Mic, GitFork, RotateCcw, Sparkles, Database } from 'lucide-react';

export const Header = () => {
  const { activeTab, setActiveTab, value1DashboardMetrics, resetAllData } = useData();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard (Value 1)', icon: LayoutDashboard, badge: `${value1DashboardMetrics.overallMastery}% Mastery` },
    { id: 'learn_practice', label: 'Learn & Practice', icon: BookOpenCheck, badge: 'Feeds Value 2' },
    { id: 'test', label: 'Adaptive Test', icon: Target, badge: 'Value 2 Powered' },
    { id: 'communication', label: 'Communication Skill', icon: Mic, badge: `${value1DashboardMetrics.avgCommScore} Score` },
    { id: 'workflow', label: 'Workflow Flowchart', icon: GitFork, badge: 'System Architecture' }
  ];

  return (
    <header className="glass-panel" style={{ margin: '16px 20px 24px', padding: '16px 24px', borderRadius: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Logo & Platform Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }} className="gradient-text">
                Adaptive Mastery Suite
              </h1>
              <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Database size={12} /> Value 1 & Value 2 Sync
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Dynamic Learning Data Pipeline & Adaptive Testing Architecture
            </p>
          </div>
        </div>

        {/* Global Quick Action & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '6px 14px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            Data Store: Active
          </div>

          <button 
            onClick={() => {
              if (window.confirm('Reset all learned data (Value 2) and dashboard metrics (Value 1)?')) {
                resetAllData();
              }
            }}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            title="Reset data store back to initial defaults"
          >
            <RotateCcw size={14} /> Reset Pipeline
          </button>
        </div>

      </div>

      {/* Navigation Tabs */}
      <nav style={{ marginTop: '20px', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 18px',
                borderRadius: '12px',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? '700' : '500',
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 15px rgba(99, 102, 241, 0.2)' : 'none'
              }}
            >
              <Icon size={18} color={isActive ? '#818cf8' : 'var(--text-subtle)'} />
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.07)',
                  color: isActive ? '#ffffff' : 'var(--text-subtle)',
                  marginLeft: '4px'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
