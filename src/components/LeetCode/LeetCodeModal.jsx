import React, { useState } from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { X, Code, CheckCircle2, AlertTriangle, ExternalLink, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LeetCodeModal = ({ isOpen, onClose }) => {
  const { user, value2, leetCodeStudyCases, syncLeetCodeProfile, setActiveTab } = useSkillForge();
  const [handleInput, setHandleInput] = useState(user.leetCodeHandle || 'kumaran_dev');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedSuccess, setSyncedSuccess] = useState(false);

  const solvedSet = value2.leetCodeSolvedCases && value2.leetCodeSolvedCases.length > 0
    ? value2.leetCodeSolvedCases
    : ['lc_1', 'lc_206', 'lc_175'];

  const completedCases = leetCodeStudyCases.filter(lc => solvedSet.includes(lc.id));
  const pendingCases = leetCodeStudyCases.filter(lc => !solvedSet.includes(lc.id));

  const handleSync = () => {
    setIsSyncing(true);
    setSyncedSuccess(false);
    
    setTimeout(() => {
      syncLeetCodeProfile(handleInput);
      setIsSyncing(false);
      setSyncedSuccess(true);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl space-y-5 border border-slate-200"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 font-bold">
                <Code size={22} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">LeetCode Profile & Case Sync</h3>
                <p className="text-xs text-slate-500">Access completed & pending LeetCode study cases</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer">
              <X size={18} />
            </button>
          </div>

          {/* Connected Handle Sync Field */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">LeetCode Handle:</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={10} /> Active Connection
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-mono bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter LeetCode handle..."
              />
              <button
                onClick={handleSync}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                {isSyncing ? 'Syncing...' : 'Sync Handle'}
              </button>
            </div>

            {syncedSuccess && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-600" />
                <span>Synced handle '{handleInput}'! Total Solved: {user.leetCodeStats?.totalSolved || 89}. {completedCases.length} Cases unlocked for AI Placement Tests.</span>
              </motion.div>
            )}
          </div>

          {/* LeetCode Solved Stats Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Easy Solved</span>
              <h4 className="text-lg font-extrabold text-emerald-700">{user.leetCodeStats?.easy || 45}</h4>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase">Medium Solved</span>
              <h4 className="text-lg font-extrabold text-amber-700">{user.leetCodeStats?.medium || 32}</h4>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-[10px] font-bold text-rose-800 uppercase">Hard Solved</span>
              <h4 className="text-lg font-extrabold text-rose-700">{user.leetCodeStats?.hard || 12}</h4>
            </div>
          </div>

          {/* Pipeline Information */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-600" /> Completed Cases (Used in Tests):
              </span>
              <span className="font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{completedCases.length} Cases</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <AlertTriangle size={13} className="text-amber-600" /> Pending Cases (Help to Learn Queue):
              </span>
              <span className="font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">{pendingCases.length} Cases</span>
            </div>
          </div>

          {/* Navigation Action */}
          <button
            onClick={() => {
              onClose();
              setActiveTab('practice');
            }}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
          >
            Go to LeetCode Practice Workspace <ArrowRight size={14} />
          </button>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
