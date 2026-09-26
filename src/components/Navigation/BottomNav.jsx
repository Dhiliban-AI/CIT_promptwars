import React from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { LayoutDashboard, BookOpen, Target, Award, Mic } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useSkillForge();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'test', label: 'Test', icon: Award },
    { id: 'communication', label: 'Comm', icon: Mic }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-lg z-50 px-2 py-2">
      <div className="flex justify-around items-center">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-blue-100/80 text-blue-600' : 'bg-transparent'
              }`}>
                <Icon size={20} />
              </div>
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
