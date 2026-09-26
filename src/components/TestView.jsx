import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Sparkles, 
  ShieldAlert, 
  Database,
  ArrowRight,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TestView = () => {
  const { topics, value2Data, submitTestResult, setActiveTab } = useData();

  // Test session state
  const [testState, setTestState] = useState('idle'); // 'idle', 'running', 'submitted'
  const [testMode, setTestMode] = useState('weak_focus'); // 'weak_focus' or 'comprehensive'
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { qIndex: optionIndex }
  const [timeLeft, setTimeLeft] = useState(180); // 3 minute timer
  const [scoreReport, setScoreReport] = useState(null);

  // Timer effect when test is running
  useEffect(() => {
    let interval = null;
    if (testState === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && testState === 'running') {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [testState, timeLeft]);

  // Generate Test Questions from Value 2
  const startTest = (mode) => {
    setTestMode(mode);
    
    // Flatten all practice questions from topics
    let pool = [];
    topics.forEach(topic => {
      topic.practiceQuestions.forEach(q => {
        pool.push({
          ...q,
          topicId: topic.id,
          topicTitle: topic.title
        });
      });
    });

    if (mode === 'weak_focus' && value2Data.weakAreas.length > 0) {
      // Prioritize topics associated with low mastery in Value 2
      pool.sort((a, b) => {
        const masteryA = value2Data.conceptMastery[a.topicId] || 50;
        const masteryB = value2Data.conceptMastery[b.topicId] || 50;
        return masteryA - masteryB; // lower mastery first
      });
    } else {
      // Shuffle pool
      pool = pool.sort(() => Math.random() - 0.5);
    }

    const testSet = pool.slice(0, 5); // Pick top 5 target questions
    setGeneratedQuestions(testSet);
    setUserAnswers({});
    setCurrentQIndex(0);
    setTimeLeft(testSet.length * 45); // 45 sec per question
    setTestState('running');
  };

  const handleSelectOption = (optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: optionIndex
    }));
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    const missedTopicIds = [];

    generatedQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      } else {
        missedTopicIds.push(q.topicId);
      }
    });

    const totalQuestions = generatedQuestions.length;
    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    const timeSpent = (generatedQuestions.length * 45) - timeLeft;

    const report = {
      scorePct,
      correctCount,
      totalQuestions,
      timeSpentSec: Math.max(10, timeSpent),
      missedTopicIds,
      testTitle: testMode === 'weak_focus' ? 'Value 2 Weak-Point Remedial Test' : 'Value 2 Comprehensive Evaluation'
    };

    setScoreReport(report);
    setTestState('submitted');

    // Trigger Value 2 storage & Value 1 dashboard recalculation!
    submitTestResult(report.testTitle, scorePct, totalQuestions, correctCount, report.timeSpentSec, missedTopicIds);

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
    <div style={{ padding: '0 20px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-rose"><Database size={12} /> Powered by Value 2 Data</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Adaptive Test Generator</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>
              Dynamic Adaptive Test (<span style={{ color: '#f87171' }}>Value 2 Driven</span>)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              This module inspects your accumulated <strong>Value 2</strong> data store (performance history & weak concepts) to construct a custom diagnostic test. Submitting updates both <strong>Value 2</strong> and <strong>Value 1</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* STATE 1: TEST GENERATOR SETUP */}
      {testState === 'idle' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          
          {/* Option A: Weak Concept Focus */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span className="badge badge-rose">Recommended</span>
                <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                  <ShieldAlert size={24} />
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
                Weak-Point Remedial Test
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                Generates a targeted quiz explicitly pulling from topics where your <strong>Value 2</strong> accuracy is low or flagged in weak areas.
              </p>

              {value2Data.weakAreas.length > 0 ? (
                <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '20px' }}>
                  Targeting: <strong style={{ color: '#fca5a5' }}>{value2Data.weakAreas.join(', ')}</strong>
                </div>
              ) : (
                <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.08)', fontSize: '0.82rem', color: '#34d399', marginBottom: '20px' }}>
                  No severe weak areas detected! Test will focus on lowest-mastery topics.
                </div>
              )}
            </div>

            <button onClick={() => startTest('weak_focus')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #9f1239 100%)' }}>
              <Target size={16} /> Start Weak-Point Test
            </button>
          </div>

          {/* Option B: Comprehensive Adaptive Assessment */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span className="badge badge-indigo">Full Evaluation</span>
                <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                  <Award size={24} />
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
                Comprehensive Adaptive Test
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                Evaluates overall readiness across all domains (DSA, Web Architecture, Communication, Aptitude) to update <strong>Value 1</strong> overall mastery score.
              </p>

              <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '20px' }}>
                Coverage: <strong>All {topics.length} Active Learning Topics in Value 2</strong>
              </div>
            </div>

            <button onClick={() => startTest('comprehensive')} className="btn-primary">
              <Sparkles size={16} /> Start Comprehensive Test
            </button>
          </div>

        </div>
      )}

      {/* STATE 2: ACTIVE TEST RUNNING */}
      {testState === 'running' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          
          {/* Top Bar: Progress & Timer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <span className="badge badge-indigo">
                Question {currentQIndex + 1} of {generatedQuestions.length}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
                Topic: <strong>{generatedQuestions[currentQIndex].topicTitle}</strong>
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '20px',
              background: timeLeft < 30 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: timeLeft < 30 ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
              color: timeLeft < 30 ? '#f87171' : 'var(--text-main)',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}>
              <Clock size={16} /> {formatTime(timeLeft)}
            </div>
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', lineHeight: '1.4' }}>
            {generatedQuestions[currentQIndex].question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            {generatedQuestions[currentQIndex].options.map((opt, oIdx) => {
              const isSelected = userAnswers[currentQIndex] === oIdx;

              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? '1px solid #6366f1' : '1px solid var(--border-subtle)',
                    color: isSelected ? '#ffffff' : 'var(--text-main)',
                    fontWeight: isSelected ? '700' : '500',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{opt}</span>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: isSelected ? '6px solid #6366f1' : '2px solid var(--text-subtle)',
                    background: 'transparent'
                  }}></span>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(currentQIndex - 1)}
              className="btn-secondary"
              style={{ opacity: currentQIndex === 0 ? 0.5 : 1 }}
            >
              Previous
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {generatedQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQIndex(idx)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: currentQIndex === idx ? '1px solid #6366f1' : 'none',
                    background: userAnswers[idx] !== undefined ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {currentQIndex + 1 < generatedQuestions.length ? (
              <button
                onClick={() => setCurrentQIndex(currentQIndex + 1)}
                className="btn-primary"
              >
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}
              >
                Submit Test & Sync Data
              </button>
            )}
          </div>

        </div>
      )}

      {/* STATE 3: TEST SUBMITTED & SCORE REPORT */}
      {testState === 'submitted' && scoreReport && (
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
          
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: scoreReport.scorePct >= 70 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: scoreReport.scorePct >= 70 ? '#34d399' : '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Award size={40} />
          </div>

          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '6px' }}>
            {scoreReport.testTitle} Complete!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            Data successfully processed and committed into Value 2.
          </p>

          {/* Stats Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <div style={{ padding: '16px 24px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', uppercase: 'true' }}>Test Score</p>
              <h4 style={{ fontSize: '2rem', fontWeight: '800', color: scoreReport.scorePct >= 70 ? '#34d399' : '#f87171' }}>
                {scoreReport.scorePct}%
              </h4>
            </div>

            <div style={{ padding: '16px 24px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>Correct Answers</p>
              <h4 style={{ fontSize: '2rem', fontWeight: '800', color: '#38bdf8' }}>
                {scoreReport.correctCount} / {scoreReport.totalQuestions}
              </h4>
            </div>

            <div style={{ padding: '16px 24px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>Time Spent</p>
              <h4 style={{ fontSize: '2rem', fontWeight: '800', color: '#818cf8' }}>
                {formatTime(scoreReport.timeSpentSec)}
              </h4>
            </div>
          </div>

          {/* Pipeline Effect Box */}
          <div style={{
            padding: '20px',
            borderRadius: '14px',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            maxWidth: '540px',
            margin: '0 auto 30px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontWeight: '700', marginBottom: '8px' }}>
              <Database size={18} /> System Workflow Update Triggered:
            </div>
            <ul style={{ fontSize: '0.88rem', color: 'var(--text-main)', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>Value 2 Data Store:</strong> Appended test attempt score log.</li>
              <li><strong>Concept Mastery:</strong> Updated proficiency ratings across tested domains.</li>
              <li><strong>Value 1 Dashboard:</strong> Recalculated overall mastery rate and overall average score!</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={() => setTestState('idle')} className="btn-secondary">
              <RotateCcw size={14} /> Back to Test Options
            </button>
            <button onClick={() => setActiveTab('dashboard')} className="btn-primary">
              View Updated Dashboard (Value 1) <ArrowRight size={14} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
