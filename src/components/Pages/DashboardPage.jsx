import React from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  Flame, 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Database,
  Target,
  Zap,
  Check,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const DashboardPage = () => {
  const { value1, value2, setActiveTab } = useSkillForge();

  // Progress Ring Data
  const ringData = [
    { name: 'Readiness', value: value1.readinessPercentage, fill: '#2563eb' },
    { name: 'Remaining', value: 100 - value1.readinessPercentage, fill: '#e2e8f0' }
  ];

  // Difficulty Mastery Data
  const diffData = [
    { name: 'Easy', pct: value2.difficultyLevelsMastered.Easy, color: '#10b981' },
    { name: 'Medium', pct: value2.difficultyLevelsMastered.Medium, color: '#f59e0b' },
    { name: 'Hard', pct: value2.difficultyLevelsMastered.Hard, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner / AI Learning Insights Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white border-none shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md text-blue-200 border border-white/20 flex items-center gap-1.5">
                <Sparkles size={13} className="text-yellow-300" /> AI Placement Analyzer
              </span>
              <span className="text-xs font-medium text-blue-200">Real-time Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Placement Readiness Index: <span className="text-blue-300">{value1.readinessPercentage}%</span>
            </h2>
            <p className="text-slate-200 text-sm max-w-2xl leading-relaxed">
              Based on your <strong>Value 2</strong> profile analytics, you rank in the top <strong>14%</strong> of CSE candidates! Resolving <strong>SQL Joins</strong> and <strong>Prepositions</strong> will push your target placement match to 90%+.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveTab('test')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Target size={16} /> Take AI Generated Test
            </button>
            <button 
              onClick={() => setActiveTab('learn')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <BookOpen size={16} /> Resume Learning
            </button>
          </div>
        </div>
      </motion.div>

      {/* VALUE 1 STATISTIC CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-600" /> Value 1: Learning Progress
          </h3>
          <span className="text-xs font-semibold text-slate-500">Live Aggregate Metrics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1: Total Lessons Completed */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="glass-card p-5 border-l-4 border-l-blue-600"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lessons Completed</p>
                <h4 className="text-3xl font-extrabold text-slate-900 mt-2">{value1.totalLessonsCompleted}</h4>
                <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 size={12} /> {value2.topicsStudied.length} Active Domains
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <BookOpen size={22} />
              </div>
            </div>
          </motion.div>

          {/* Stat 2: Practice Questions Solved */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="glass-card p-5 border-l-4 border-l-emerald-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Questions Solved</p>
                <h4 className="text-3xl font-extrabold text-slate-900 mt-2">{value1.totalPracticeQuestionsSolved}</h4>
                <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <Zap size={12} /> {value2.accuracyPercentage}% Accuracy
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </motion.div>

          {/* Stat 3: Learning Hours */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="glass-card p-5 border-l-4 border-l-amber-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Learning Hours</p>
                <h4 className="text-3xl font-extrabold text-slate-900 mt-2">{value1.learningHours} <span className="text-sm font-semibold text-slate-500">hrs</span></h4>
                <p className="text-xs text-amber-600 font-semibold mt-1 flex items-center gap-1">
                  <Flame size={12} /> {value1.streakDays} Day Active Streak
                </p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                <Clock size={22} />
              </div>
            </div>
          </motion.div>

          {/* Stat 4: Current Skill Level */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="glass-card p-5 border-l-4 border-l-indigo-600"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Skill Level</p>
                <h4 className="text-lg font-extrabold text-indigo-950 mt-2 leading-tight">{value1.currentSkillLevel}</h4>
                <p className="text-xs text-indigo-600 font-semibold mt-1 flex items-center gap-1">
                  <Award size={12} /> Placement Ready
                </p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                <Award size={22} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* CHARTS & WIDGETS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Progress Graph (Recharts Area Chart) */}
        <div className="glass-card p-6 lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weekly Learning Activity</h3>
              <p className="text-xs text-slate-500">Hours spent & practice questions solved per day</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              Value 1 Graph
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={value1.weeklyProgress}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorQns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="hours" name="Learning Hours" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                <Area type="monotone" dataKey="questions" name="Questions Solved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorQns)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Ring Widget & Difficulty Levels Mastered */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Overall Placement Ring</h3>
            <p className="text-xs text-slate-500">Readiness calculated from Value 2</p>

            <div className="relative h-44 flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ringData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {ringData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <span className="text-3xl font-extrabold text-slate-900">{value1.readinessPercentage}%</span>
                <span className="block text-[11px] font-bold text-slate-400 uppercase">Readiness</span>
              </div>
            </div>
          </div>

          {/* Difficulty Levels Mastered (Easy, Medium, Hard) */}
          <div className="space-y-2 pt-2 border-t border-slate-200/60">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Difficulty Mastery (Value 2)</p>
            {diffData.map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{d.name} Level</span>
                  <span style={{ color: d.color }}>{d.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* VALUE 2 KNOWLEDGE PROFILE & RECOMMENDATIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Value 2: Knowledge Profile (Topics, Strong & Weak Areas) */}
        <div className="glass-card p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Database size={18} className="text-blue-600" /> Value 2: Knowledge Database Profile
              </h3>
              <p className="text-xs text-slate-500">Auto-generated from Learn, Practice & Communication telemetry</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {value2.accuracyPercentage}% Overall Accuracy
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Weak Areas List */}
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <AlertTriangle size={15} className="text-rose-600" /> Identified Weak Areas
              </div>
              <div className="space-y-1.5">
                {value2.weakAreas.map((w, idx) => (
                  <div key={idx} className="text-xs font-medium text-rose-900 bg-white/80 px-2.5 py-1.5 rounded-lg border border-rose-200 flex items-center justify-between">
                    <span>⚠️ {w}</span>
                    <span className="text-[10px] font-bold text-rose-600 uppercase">Priority</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strong Areas List */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 size={15} className="text-emerald-600" /> Strong Skill Domains
              </div>
              <div className="space-y-1.5">
                {value2.strongAreas.map((s, idx) => (
                  <div key={idx} className="text-xs font-medium text-emerald-900 bg-white/80 px-2.5 py-1.5 rounded-lg border border-emerald-200 flex items-center justify-between">
                    <span>✅ {s}</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Mastered</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Frequently Incorrect Concepts */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Frequently Incorrect Concepts (Value 2)</p>
            <div className="flex flex-wrap gap-2">
              {value2.frequentlyIncorrectConcepts.map((c, i) => (
                <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200">
                  ⚡ {c}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Recommended Next Topic & Recent Activity Widget */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
              AI Recommendation
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Recommended Next Topic</h3>
            
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 mt-3 space-y-2">
              <h4 className="text-sm font-extrabold text-blue-950">
                SQL Joins, Indexing & Subqueries
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your Value 2 diagnostic logs indicate a 40% accuracy rate in relational SQL Joins. Mastering this module will boost DBMS proficiency by +15%.
              </p>
              <button 
                onClick={() => setActiveTab('learn')}
                className="w-full mt-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Start Learning Now <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Recent Activity Timeline Widget */}
          <div className="border-t border-slate-200/70 pt-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={14} className="text-blue-600" /> Recent Activity Timeline
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800">Binary Search Trees Quiz</p>
                  <p className="text-[10px] text-slate-400">Score: 80% &bull; Saved to Value 2</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Passed</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800">Mock HR Interview Simulation</p>
                  <p className="text-[10px] text-slate-400">Fluency: 86 &bull; Saved to Value 2</p>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Evaluated</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
