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
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const PracticePage = () => {
  const { practiceQuestions, value2, submitPracticeAnswer, setActiveTab } = useSkillForge();

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedQuestion, setSelectedQuestion] = useState(practiceQuestions[0]);

  // Quiz Attempt State
  const [selectedOption, setSelectedOption] = useState(null);
  const [codeInputValue, setCodeInputValue] = useState(selectedQuestion.initialCode || '');
  const [attemptSubmitted, setAttemptSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const categories = ['All', 'DBMS', 'Programming', 'Aptitude', 'Interview Questions'];

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
    if (selectedQuestion.type === 'MCQ' || selectedQuestion.type === 'Aptitude Questions' || selectedQuestion.type === 'Interview Questions') {
      correct = selectedOption === selectedQuestion.correctIndex;
    } else {
      // Coding problem simulator (simplified evaluation check)
      correct = codeInputValue.includes('return') && codeInputValue.length > 30;
    }

    setIsCorrect(correct);
    setAttemptSubmitted(true);

    // Save result into Value 2!
    submitPracticeAnswer(selectedQuestion, correct, 45);

    if (correct) {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-blue-200 border border-white/20 flex items-center gap-1.5">
                <Target size={13} /> Performance Data Collector
              </span>
              <span className="text-xs font-medium text-slate-300">Updates Value 2 Metrics</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Placement Practice Lab</h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-xl">
              Solve Coding Problems, MCQs, Aptitude Questions & Interview Questions. Every drill feeds your accuracy metrics and weak topic list in <strong>Value 2</strong>.
            </p>
          </div>

          <div className="text-right bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-xs text-blue-200 block">Overall Accuracy</span>
            <span className="text-xl font-extrabold text-white">{value2.accuracyPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Question List vs Active Drill Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Question List (4 columns) */}
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

        {/* Right Active Question Workspace (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="glass-card p-6 space-y-6">
            
            {/* Header info */}
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

            {/* Question Text */}
            <div className="text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {selectedQuestion.question}
            </div>

            {/* MCQ OPTIONS WORKSPACE */}
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

            {/* CODING PROBLEM WORKSPACE */}
            {selectedQuestion.initialCode && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Code size={14} className="text-blue-600" /> Interactive Code Editor Simulator
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

            {/* EXPLANATION ON SUBMIT */}
            {attemptSubmitted && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  {isCorrect ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-rose-600" />}
                  {isCorrect ? 'Correct! Value 2 updated with strong topic data.' : 'Incorrect! Added to weak areas in Value 2 profile.'}
                </p>
                <p className="mt-1"><strong>Explanation:</strong> {selectedQuestion.explanation}</p>
              </div>
            )}

            {/* SUBMIT BUTTON & PIPELINE NOTICE */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/70 pt-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Database size={15} className="text-blue-600" /> Auto-saves attempt accuracy & time to Value 2
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
                  <Zap size={15} /> Submit Answer & Update Value 2
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAttemptSubmitted(false);
                      setSelectedOption(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
                  >
                    Retry Question
                  </button>
                  <button
                    onClick={() => setActiveTab('test')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    Take Dynamic Test <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
