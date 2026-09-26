import React, { useState } from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { 
  Target, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Zap, 
  HelpCircle, 
  Code, 
  Database, 
  RotateCcw, 
  ArrowRight,
  Brain,
  Sparkles,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const PracticePage = () => {
  const { practiceQuestions, leetCodeStudyCases, value2, user, submitPracticeAnswer, solveLeetCodeCase, setActiveTab } = useSkillForge();

  const [activeTabMode, setActiveTabMode] = useState('leetcode');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedQuestion, setSelectedQuestion] = useState(practiceQuestions[0]);
  const [selectedLCCase, setSelectedLCCase] = useState(leetCodeStudyCases[0]);

  // Quiz Attempt State
  const [selectedOption, setSelectedOption] = useState(null);
  const [codeInputValue, setCodeInputValue] = useState(selectedQuestion.initialCode || '');
  const [attemptSubmitted, setAttemptSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const categories = ['All', 'DBMS', 'Programming', 'Data Structures', 'Aptitude'];

  const filteredQuestions = activeCategory === 'All'
    ? practiceQuestions
    : practiceQuestions.filter(q => q.category === activeCategory || q.type === activeCategory);

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setSelectedOption(null);
    setCodeInputValue(q.initialCode || '');
    setAttemptSubmitted(false);
    setIsCorrect(false);
  };

  const handleAnswerSubmit = () => {
    let correct = false;
    if (selectedQuestion.type === 'MCQ' || selectedQuestion.type === 'Aptitude Questions') {
      correct = selectedOption === selectedQuestion.correctIndex;
    } else {
      correct = codeInputValue.includes('return') && codeInputValue.length > 20;
    }

    setIsCorrect(correct);
    setAttemptSubmitted(true);

    submitPracticeAnswer(selectedQuestion, correct, 45);

    if (correct) {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSolveLeetCode = (lcCase) => {
    solveLeetCodeCase(lcCase);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-blue-200 border border-white/20 flex items-center gap-1.5">
                <Code size={13} className="text-yellow-300" /> LeetCode Study Cases & Practice Hub
              </span>
              <span className="text-xs font-medium text-slate-300">Connected to {user.leetCodeHandle}</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Learn & Practice Core Lab</h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-xl">
              Solve LeetCode Study Cases & Placement Drills in Aptitude, Programming, Data Structures, and DBMS. Solved cases populate <strong>Value 2</strong> profile.
            </p>
          </div>

          {/* LeetCode Sync Badge */}
          <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 text-right space-y-1">
            <div className="flex items-center justify-end gap-1 text-xs font-bold text-amber-300">
              <Code size={14} /> LeetCode Synced
            </div>
            <span className="text-xl font-extrabold text-white">89 Solved</span>
            <span className="block text-[10px] text-slate-300">Global Rank: #142,500</span>
          </div>
        </div>
      </div>

      {/* Workspace Sub-Tabs: LeetCode Study Cases vs Placement Drills */}
      <div className="flex gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTabMode('leetcode')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTabMode === 'leetcode'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Code size={16} /> LeetCode Study Cases ({leetCodeStudyCases.length})
        </button>

        <button
          onClick={() => setActiveTabMode('drills')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTabMode === 'drills'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Target size={16} /> Placement MCQ & Coding Drills
        </button>
      </div>

      {/* MODE 1: LEETCODE STUDY CASES INTEGRATION */}
      {activeTabMode === 'leetcode' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: LeetCode Case Selector (4 columns) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Curated LeetCode Cases
            </h3>

            <div className="space-y-2.5">
              {leetCodeStudyCases.map(lc => {
                const isSolved = (value2.leetCodeSolvedCases || []).includes(lc.id);
                const isSelected = selectedLCCase.id === lc.id;

                return (
                  <motion.div
                    key={lc.id}
                    whileHover={{ x: 3 }}
                    onClick={() => setSelectedLCCase(lc)}
                    className={`glass-card p-4 cursor-pointer transition border ${
                      isSelected ? 'glass-card-active' : 'hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        lc.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                        lc.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {lc.difficulty}
                      </span>

                      {isSolved ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 size={10} /> Solved & Learned
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          Acceptance: {lc.acceptance}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {lc.title}
                    </h4>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {lc.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active LeetCode Case Workspace (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="glass-card p-6 space-y-6">
              
              {/* LeetCode Header */}
              <div className="flex justify-between items-start border-b border-slate-200/70 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                      <Code size={12} /> LeetCode Case
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Maps to Learned Topic: <strong className="text-blue-600">{selectedLCCase.learnedTopicRef}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">
                    {selectedLCCase.title}
                  </h3>
                </div>

                <a 
                  href={`https://leetcode.com/problems/${selectedLCCase.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
                >
                  LeetCode <ExternalLink size={12} />
                </a>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-bold mb-1 text-slate-900">Problem Description:</p>
                {selectedLCCase.description}
              </div>

              {/* Solution Code Snippet */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Code size={14} className="text-blue-600" /> Optimal Solution Code
                </h4>
                <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs border border-slate-800 overflow-x-auto shadow-inner">
                  <pre>{selectedLCCase.solutionSnippet}</pre>
                </div>
              </div>

              {/* Actions & Value 2 Sync */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-blue-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Database size={15} className="text-blue-600" /> Value 2 Profile Sync Constraint:
                  </p>
                  <p className="text-slate-600">
                    Solving this case adds <strong>"{selectedLCCase.learnedTopicRef}"</strong> into Value 2 Learned Topics for dynamic test generation!
                  </p>
                </div>

                {!(value2.leetCodeSolvedCases || []).includes(selectedLCCase.id) ? (
                  <button
                    onClick={() => handleSolveLeetCode(selectedLCCase)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-600/20 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={16} /> Mark Solved & Add to Value 2
                  </button>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5 border border-emerald-300">
                    <CheckCircle2 size={16} /> Case Solved & Added to Learned Topics!
                  </span>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* MODE 2: PLACEMENT DRILLS WORKSPACE */}
      {activeTabMode === 'drills' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Practice Drill Items ({filteredQuestions.length})
            </h3>

            <div className="space-y-2.5">
              {filteredQuestions.map(q => {
                const isSelected = selectedQuestion.id === q.id;

                return (
                  <motion.div
                    key={q.id}
                    whileHover={{ x: 3 }}
                    onClick={() => handleSelectQuestion(q)}
                    className={`glass-card p-4 cursor-pointer transition border ${
                      isSelected ? 'glass-card-active' : 'hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {q.category}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                        q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                      {q.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {q.question}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="glass-card p-6 space-y-6">
              
              <div className="flex justify-between items-center border-b border-slate-200/70 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {selectedQuestion.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Category: {selectedQuestion.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {selectedQuestion.title}
                  </h3>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  Difficulty: {selectedQuestion.difficulty}
                </span>
              </div>

              <div className="text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedQuestion.question}
              </div>

              {selectedQuestion.options && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Select Correct Answer:</h4>
                  {selectedQuestion.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;

                    let cardStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-blue-50/50';
                    if (attemptSubmitted) {
                      if (oIdx === selectedQuestion.correctIndex) {
                        cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        cardStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                      }
                    } else if (isSelected) {
                      cardStyle = 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs';
                    }

                    return (
                      <div
                        key={oIdx}
                        onClick={() => !attemptSubmitted && setSelectedOption(oIdx)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer text-xs sm:text-sm flex items-center justify-between ${cardStyle}`}
                      >
                        <span>{opt}</span>
                        {attemptSubmitted && oIdx === selectedQuestion.correctIndex && <CheckCircle2 size={16} className="text-emerald-600" />}
                        {attemptSubmitted && isSelected && oIdx !== selectedQuestion.correctIndex && <XCircle size={16} className="text-rose-600" />}
                      </div>
                    );
                  })}
                </div>
              )}

              {selectedQuestion.initialCode && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Code size={14} className="text-blue-600" /> Code Editor Simulator
                  </h4>
                  <textarea
                    value={codeInputValue}
                    onChange={(e) => setCodeInputValue(e.target.value)}
                    disabled={attemptSubmitted}
                    rows={6}
                    className="w-full p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {attemptSubmitted && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}>
                  <p className="font-bold mb-1 flex items-center gap-1.5">
                    {isCorrect ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-rose-600" />}
                    {isCorrect ? 'Correct! Value 2 updated.' : 'Incorrect! Added to weak areas.'}
                  </p>
                  <p className="mt-1"><strong>Explanation:</strong> {selectedQuestion.explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-slate-200/70 pt-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Database size={15} className="text-blue-600" /> Auto-saves attempt accuracy to Value 2
                </div>

                {!attemptSubmitted ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={selectedOption === null && !selectedQuestion.initialCode}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
                      selectedOption !== null || selectedQuestion.initialCode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Zap size={15} /> Submit & Update Value 2
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('test')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    Take Dynamic Test <ArrowRight size={14} />
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
