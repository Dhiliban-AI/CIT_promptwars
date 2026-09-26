import React, { useState } from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { X, Sparkles, ShieldCheck, CheckCircle2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GoogleAuthModal = ({ isOpen, onClose }) => {
  const { loginWithGoogle } = useSkillForge();
  const [selectedAccount, setSelectedAccount] = useState(null);

  const mockGoogleAccounts = [
    {
      name: 'Kumaran (Student)',
      email: 'kumaran.dee@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      batch: 'B.Tech CSE • 2026 Batch'
    },
    {
      name: 'Ananya Rao',
      email: 'ananya.rao@university.edu',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      batch: 'B.Tech IT • 2026 Batch'
    }
  ];

  const handleSelect = (account) => {
    loginWithGoogle(account);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl space-y-5 border border-slate-200"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Sign in with Google</h3>
                <p className="text-xs text-slate-500">Connect account to SkillForge AI & LeetCode</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer">
              <X size={18} />
            </button>
          </div>

          {/* Account Selection */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Choose an account:</p>
            {mockGoogleAccounts.map((acc, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(acc)}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{acc.name}</h4>
                    <p className="text-[11px] text-slate-500">{acc.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Select</span>
              </div>
            ))}
          </div>

          {/* Integration Security Note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <span>Enables automatic synchronization with LeetCode study cases & AI assessment tracking.</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
