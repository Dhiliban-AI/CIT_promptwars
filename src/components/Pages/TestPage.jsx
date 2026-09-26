import React, { useState, useEffect } from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Database, 
  RotateCcw, 
  ArrowRight, 
  Target, 
  ShieldAlert,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Layers,
  BookOpen,
  Lock,
  Code
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import confetti from 'canvas-confetti';

export const TestPage = () => {
  const { value2, getLearnedTestQuestions, submitTestResult, setActiveTab } = useSkillForge();

  const [testState, setTestState] = useState('idle');
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(180);
  const [testReport, setTestReport] = useState(null);

  useEffect(() => {
    let timer = null;
    if (testState === 'exam' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && testState === 'exam') {
      handleCompleteExam();
    }
    return () => clearInterval(timer);
  }, [testState, timeLeft]);

  // AI Dynamic Test Generator STRICTLY FROM LEARNED THINGS
  const generateAITestFromLearned = () => {
    // Retrieve strictly learned test questions using getLearnedTestQuestions()
    const learnedPool = getLearnedTestQuestions();

    // Sort by weak area priority if available
    let pool = [...learnedPool];
    pool.sort((a, b) => {
      const aIsWeak = value2.weakAreas.some(w => w.includes(a.category) || w.includes(a.title));
      const bIsWeak = value2.weakAreas.some(w => w.includes(b.category) || w.includes(b.title));
      if (aIsWeak && !bIsWeak) return -1;
      if (!aIsWeak && bIsWeak) return 1;
      return 0.5 - Math.random();
    });

    const testSet = pool.slice(0, 4);
    setExamQuestions(testSet);
    setUserAnswers({});
    setCurrentQIndex(0);
    setTimeLeft(testSet.length * 60);
    setTestState('exam');
  };

  const handleSelectAnswer = (optIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIndex
    }));
  };

  const handleCompleteExam = () => {
    let correctCount = 0;
    const missedTopics = [];

    examQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      } else {
        missedTopics.push(q.category + ': ' + q.title);
      }
    });

    const totalQuestions = examQuestions.length;
    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    const accuracyPct = scorePct;
    const timeSpentSec = (totalQuestions * 60) - timeLeft;

    const mins = Math.floor(Math.max(10, timeSpentSec) / 60);
    const secs = Math.max(10, timeSpentSec) % 60;
    const timeTakenStr = `${mins}m ${secs}s`;

    const report = {
      scorePct,
      accuracyPct,
      totalQuestions,
      correctCount,
      timeTaken: timeTakenStr,
      missedTopics,
      pieData: [
        { name: 'Correct', value: correctCount, fill: '#10b981' },
        { name: 'Incorrect', value: totalQuestions - correctCount, fill: '#ef4444' }
      ]
    };

    setTestReport(report);
    setTestState('results');

    submitTestResult(scorePct, accuracyPct, totalQuestions, correctCount, timeTakenStr, missedTopics);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-blue-200 border border-white/20 flex items-center gap-1.5">
                <ShieldAlert size={13} className="text-yellow-300" /> Strict Learned Topics Constraint
              </span>
              <span className="text-xs font-medium text-slate-300">Generated from Value 2 Knowledge Profile</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">AI Assessment Center</h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-xl">
              Constraint Active: Tests are dynamically constructed <strong>ONLY from topics & LeetCode study cases you have learned</strong> in Value 2 profile.
            </p>
          </div>

          <div className="text-right bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-xs text-blue-200 block">Learned Topics Pool</span>
            <span className="text-xl font-extrabold text-white">{value2.topicsStudied.length} Domains</span>
          </div>
        </div>
      </div>

      {/* STATE 1: IDLE / LAUNCHPAD */}
      {testState === 'idle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* AI Generator Card with Strict Learned Filter */}
          <div className="glass-card p-6 flex flex-col justify-between space-y-6 border-l-4 border-l-blue-600">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Learned Topics Only Filter
                </span>
                <Sparkles size={20} className="text-blue-600" />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">
                Personalized Learned-Things Placement Test
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As requested, questions are pulled <strong>strictly from your learned topics & solved LeetCode study cases</strong> recorded in your Value 2 profile! Unlearned topics are locked.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <BookOpen size={14} className="text-blue-600" /> Active Learned Topics Included in Test:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {value2.topicsStudied.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={generateAITestFromLearned}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 cursor-pointer"
            >
              <Target size={18} /> Launch Test (Learned Topics Only)
            </button>
          </div>

          {/* Test History & Analytics */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award size={18} className="text-blue-600" /> Past Test Sessions (Value 2)
            </h3>

            {value2.testHistory.length > 0 ? (
              <div className="space-y-3">
                {value2.testHistory.map(test => (
                  <div key={test.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-900">{test.title}</h4>
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {test.scorePct}% Score
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>Predicted Rank: <strong>{test.rankPrediction}</strong></span>
                      <span>Time: {test.timeTaken}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No test history recorded yet in Value 2.</p>
            )}
          </div>

        </div>
      )}

      {/* STATE 2: EXAM WORKSPACE */}
      {testState === 'exam' && (
        <div className="glass-card p-6 space-y-6">
          
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Question {currentQIndex + 1} of {examQuestions.length}
              </span>
              <span className="text-xs font-semibold text-slate-500 ml-2">
                Learned Domain: {examQuestions[currentQIndex].category}
              </span>
            </div>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs ${
              timeLeft < 30 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-700'
            }`}>
              <Clock size={16} /> Time Remaining: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="text-base font-bold text-slate-900 bg-slate-50 p-5 rounded-xl border border-slate-200">
            {examQuestions[currentQIndex].question}
          </div>

          {examQuestions[currentQIndex].options && (
            <div className="space-y-3">
              {examQuestions[currentQIndex].options.map((opt, oIdx) => {
                const isSelected = userAnswers[currentQIndex] === oIdx;

                return (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectAnswer(oIdx)}
                    className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-between ${
                      isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' 
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] ${
                      isSelected ? 'border-white bg-white text-blue-600 font-extrabold' : 'border-slate-300'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-between items-center border-t border-slate-200 pt-4">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(currentQIndex - 1)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition disabled:opacity-40 cursor-pointer"
            >
              Previous Question
            </button>

            <div className="flex gap-1.5">
              {examQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold ${
                    currentQIndex === idx ? 'bg-blue-600 text-white' : 
                    userAnswers[idx] !== undefined ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {currentQIndex + 1 < examQuestions.length ? (
              <button
                onClick={() => setCurrentQIndex(currentQIndex + 1)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleCompleteExam}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                Submit Exam & Generate Report
              </button>
            )}
          </div>

        </div>
      )}

      {/* STATE 3: RESULTS PAGE */}
      {testState === 'results' && testReport && (
        <div className="glass-card p-6 space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-md">
            <Award size={36} />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Learned Topics Test Complete!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Results & performance breakdown saved into <strong>Value 2</strong> profile.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Test Score</span>
              <h4 className="text-2xl font-extrabold text-blue-600">{testReport.scorePct}%</h4>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Accuracy</span>
              <h4 className="text-2xl font-extrabold text-emerald-600">{testReport.accuracyPct}%</h4>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Rank Prediction</span>
              <h4 className="text-base font-extrabold text-indigo-900 mt-1">#38 / 1,450</h4>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Time Spent</span>
              <h4 className="text-xl font-extrabold text-amber-700">{testReport.timeTaken}</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left pt-4 border-t border-slate-200">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Performance Breakdown</h4>
              <div className="h-44 w-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={testReport.pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                      {testReport.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                <h5 className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" /> Strengths Identified:
                </h5>
                <p className="text-emerald-800 font-medium">&bull; Mastery of Learned Algorithms</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                <h5 className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-blue-600" /> AI Recommendation:
                </h5>
                <p className="text-blue-800 leading-relaxed">
                  Continue solving LeetCode Study Cases in Practice section to expand your learned topics pool!
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => setTestState('idle')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              Back to Test Engine
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md shadow-blue-600/20 cursor-pointer"
            >
              View Updated Dashboard Analytics <ArrowRight size={14} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
