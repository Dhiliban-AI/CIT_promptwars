import React, { useState } from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Code, 
  Sparkles, 
  Database, 
  ArrowRight,
  Layers,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const LearnPage = () => {
  const { learnModules, value2, completeLesson, setActiveTab } = useSkillForge();

  const categories = ['All', 'Aptitude', 'Programming', 'Data Structures', 'DBMS'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedModule, setSelectedModule] = useState(learnModules[0]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const filteredModules = selectedCategory === 'All' 
    ? learnModules 
    : learnModules.filter(m => m.category === selectedCategory);

  const isCompleted = value2.topicsStudied.includes(selectedModule.title);

  const handleMarkCompleted = () => {
    if (!isCompleted) {
      completeLesson(selectedModule);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-blue-200 border border-white/20 flex items-center gap-1.5">
                <Database size={13} /> Data Collector Module
              </span>
              <span className="text-xs font-medium text-slate-300">Feeds Value 2 Knowledge Profile</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Placement Training & Learn Center</h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-xl">
              Study placement curriculum topics (Aptitude, Programming, Data Structures, DBMS). Mark complete to update your <strong>Value 2</strong> profile.
            </p>
          </div>

          <div className="text-right bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-xs text-blue-200 block">Topics Completed</span>
            <span className="text-xl font-extrabold text-white">{value2.topicsStudied.length} / {learnModules.length}</span>
          </div>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Workspace Layout: Module List vs Active Learning Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Module Sidebar List (4 Columns) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Available Course Modules ({filteredModules.length})
          </h3>

          <div className="space-y-2.5">
            {filteredModules.map(mod => {
              const completed = value2.topicsStudied.includes(mod.title);
              const isSelected = selectedModule.id === mod.id;

              return (
                <motion.div
                  key={mod.id}
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    setSelectedModule(mod);
                    setIsVideoPlaying(false);
                  }}
                  className={`glass-card p-4 cursor-pointer transition border ${
                    isSelected ? 'glass-card-active' : 'hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {mod.category}
                    </span>
                    {completed ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                        <CheckCircle2 size={10} /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400">
                        {mod.duration}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {mod.summary}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Learning Workspace (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="glass-card p-6 space-y-6">
            
            {/* Header info */}
            <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-200/70 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    {selectedModule.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={13} /> {selectedModule.duration}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {selectedModule.level} Level
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {selectedModule.title}
                </h3>
              </div>

              <button
                onClick={handleMarkCompleted}
                disabled={isCompleted}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
                  isCompleted 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                }`}
              >
                <CheckCircle2 size={16} />
                {isCompleted ? 'Topic Completed & Saved to Value 2' : 'Mark Topic as Completed'}
              </button>
            </div>

            {/* VIDEO SECTION */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Play size={14} className="text-blue-600" /> Interactive Video Lesson
              </h4>

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video shadow-md flex items-center justify-center">
                {!isVideoPlaying ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url(${selectedModule.videoThumbnail})` }}>
                    <div 
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center cursor-pointer shadow-xl transition transform hover:scale-110 mb-3"
                    >
                      <Play size={28} className="ml-1" />
                    </div>
                    <h5 className="text-white font-bold text-base max-w-md">{selectedModule.title}</h5>
                    <p className="text-slate-300 text-xs mt-1">Click to play video presentation</p>
                  </div>
                ) : (
                  <div className="w-full h-full p-8 flex flex-col items-center justify-center text-white bg-slate-950">
                    <Zap size={36} className="text-yellow-400 animate-bounce mb-3" />
                    <p className="text-sm font-bold text-center">Playing Video Presentation Mode</p>
                    <p className="text-xs text-slate-400 mt-1">Interactive playback active for {selectedModule.title}</p>
                    <button onClick={() => setIsVideoPlaying(false)} className="mt-4 text-xs text-blue-400 underline cursor-pointer">Close Video</button>
                  </div>
                )}
              </div>
            </div>

            {/* NOTES SECTION */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} className="text-blue-600" /> Placement Core Notes
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                {selectedModule.notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE EXAMPLES / CODE SNIPPET */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Code size={14} className="text-blue-600" /> Interactive Example Snippet
              </h4>
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 overflow-x-auto shadow-inner">
                <pre>{selectedModule.interactiveSnippet}</pre>
              </div>
            </div>

            {/* Bottom Pipeline Notification */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-3">
              <Database size={18} className="text-blue-600 shrink-0" />
              <div>
                <strong>Value 2 Profile Pipeline:</strong> Clicking "Mark Topic as Completed" appends topic name, time spent, and updates skill level in Value 2.
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
