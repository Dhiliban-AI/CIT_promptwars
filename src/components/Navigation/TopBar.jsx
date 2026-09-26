import React from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { Flame, Sparkles, RotateCcw, User, Bell, Search } from 'lucide-react';

export const TopBar = () => {
  const { value1, resetAllProgress } = useSkillForge();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-4 md:px-8 py-3.5 flex justify-between items-center">
      
      {/* Search / Context Header */}
      <div className="flex items-center gap-3">
        <div className="md:hidden w-8 h-8 rounded-lg gradient-blue-bg flex items-center justify-center text-white">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            SkillForge AI <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Campus Placement Suite</span>
          </h2>
        </div>
      </div>

      {/* Action Widgets */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Streak Counter Widget */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold shadow-2xs">
          <Flame size={16} className="text-amber-500 fill-amber-500 animate-pulse" />
          <span>{value1.streakDays} Day Streak</span>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            if (window.confirm('Reset all learned topics, test history, and accuracy metrics?')) {
              resetAllProgress();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition"
          title="Reset database back to initial defaults"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">Reset Pipeline</span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            AR
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-800">Ananya Rao</p>
            <p className="text-[10px] text-slate-400">B.Tech CSE &bull; 2026 Batch</p>
          </div>
        </div>

      </div>

    </header>
  );
};
