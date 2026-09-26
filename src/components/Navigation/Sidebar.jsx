import React from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Target, 
  Award, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Database,
  Layers,
  Brain,
  RotateCcw
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, value1 } = useSkillForge();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: `${value1.readinessPercentage}% Ready` },
    { id: 'learn', label: 'Learn', icon: BookOpen, badge: `${value1.totalLessonsCompleted} Lessons` },
    { id: 'practice', label: 'Practice', icon: Target, badge: `${value1.totalPracticeQuestionsSolved} Solved` },
    { id: 'test', label: 'Test Engine', icon: Award, badge: 'AI Generated' }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white/90 backdrop-blur-md border-r border-slate-200/80 p-5 sticky top-0 h-screen z-30 justify-between shadow-xs">
      <div>
        {/* Logo Header */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl gradient-blue-bg flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight gradient-blue-text">
              SkillForge AI
            </h1>
            <p className="text-xs font-semibold text-slate-400">
              Placement Preparation
            </p>
          </div>
        </div>

        {/* Readiness Pill */}
        <div className="mb-6 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/60">
          <div className="flex justify-between items-center text-xs font-bold text-blue-900 mb-1.5">
            <span>Placement Readiness</span>
            <span className="text-blue-600 font-extrabold">{value1.readinessPercentage}%</span>
          </div>
          <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${value1.readinessPercentage}%` }}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' 
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={19} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-200/60 px-2">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Value 1 & Value 2 Synced
        </div>
        <p className="text-[11px] text-slate-400">
          AI Placement Engine v2.4
        </p>
      </div>
    </aside>
  );
};
