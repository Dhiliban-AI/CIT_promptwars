import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCw, 
  Sparkles, 
  Award, 
  Zap,
  Check,
  Brain,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LearnPracticeView = () => {
  const { topics, value2Data, recordPracticeResult, setActiveTab } = useData();

  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [activeSubTab, setActiveSubTab] = useState('quiz'); // 'quiz' or 'flashcards'

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    if (selectedOption !== null) return; // prevent changing after selection
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === selectedTopic.practiceQuestions[currentQIndex].correctIndex;
    const newAnswers = [...userAnswers, { questionId: selectedTopic.practiceQuestions[currentQIndex].id, isCorrect, selectedOption }];
    setUserAnswers(newAnswers);

    if (currentQIndex + 1 < selectedTopic.practiceQuestions.length) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
    } else {
      // Quiz completed! Calculate results and trigger Value 2 storage!
      setQuizFinished(true);
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      const total = selectedTopic.practiceQuestions.length;

      const weakConcepts = [];
      newAnswers.forEach((ans, idx) => {
        if (!ans.isCorrect) {
          weakConcepts.push(selectedTopic.practiceQuestions[idx].question.slice(0, 30) + '...');
        }
      });

      // Fire data update into VALUE 2!
      recordPracticeResult(selectedTopic.id, correctCount, total, weakConcepts);

      // Trigger celebration particle effect
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setQuizFinished(false);
  };

  return (
    <div style={{ padding: '0 20px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* View Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-emerald"><Database size={12} /> Data Collection Hub</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target: Value 2 Data Store</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>
              Learn & Practice (<span style={{ color: '#34d399' }}>Value 2 Collector</span>)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Study concept modules, test yourself with flashcards, and complete interactive practice quizzes. Every attempt automatically updates <strong>Value 2</strong>, which subsequently recalibrates <strong>Value 1</strong> on the Dashboard.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '24px' }}>
        
        {/* Topic Selector Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Select Domain Module
          </h3>

          {topics.map(topic => {
            const mastery = value2Data.conceptMastery[topic.id] || 0;
            const isSelected = selectedTopic.id === topic.id;

            return (
              <div
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  resetQuiz();
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className="glass-panel"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'rgba(99, 102, 241, 0.6)' : 'var(--border-subtle)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-card)',
                  transform: isSelected ? 'translateX(4px)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-indigo">{topic.category}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: mastery > 70 ? '#34d399' : '#fbbf24' }}>
                    {mastery}% Mastery
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>
                  {topic.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '12px' }}>
                  {topic.description}
                </p>

                {/* Progress bar */}
                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', height: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${mastery}%`, background: 'linear-gradient(90deg, #6366f1, #34d399)', height: '100%' }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Practice & Study Workspace Column */}
        <div>
          {/* Sub-tab Navigation: Quiz vs Flashcards */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={() => setActiveSubTab('quiz')}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: activeSubTab === 'quiz' ? '1px solid #6366f1' : '1px solid transparent',
                background: activeSubTab === 'quiz' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: activeSubTab === 'quiz' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Zap size={16} color={activeSubTab === 'quiz' ? '#818cf8' : 'var(--text-muted)'} />
              Interactive Practice Quiz
            </button>

            <button
              onClick={() => setActiveSubTab('flashcards')}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: activeSubTab === 'flashcards' ? '1px solid #06b6d4' : '1px solid transparent',
                background: activeSubTab === 'flashcards' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: activeSubTab === 'flashcards' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Brain size={16} color={activeSubTab === 'flashcards' ? '#38bdf8' : 'var(--text-muted)'} />
              Concept Flashcards ({selectedTopic.flashcards.length})
            </button>
          </div>

          {/* MODE 1: INTERACTIVE QUIZ */}
          {activeSubTab === 'quiz' && (
            <div className="glass-panel" style={{ padding: '28px' }}>
              
              {!quizFinished ? (
                <div>
                  {/* Question header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                      <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                        Question {currentQIndex + 1} of {selectedTopic.practiceQuestions.length}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '6px', lineHeight: '1.4' }}>
                        {selectedTopic.practiceQuestions[currentQIndex].question}
                      </h3>
                    </div>
                  </div>

                  {/* Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {selectedTopic.practiceQuestions[currentQIndex].options.map((opt, oIdx) => {
                      const isCorrect = oIdx === selectedTopic.practiceQuestions[currentQIndex].correctIndex;
                      const isSelected = selectedOption === oIdx;
                      
                      let bg = 'rgba(255, 255, 255, 0.03)';
                      let border = '1px solid var(--border-subtle)';
                      let textColor = 'var(--text-main)';

                      if (selectedOption !== null) {
                        if (isCorrect) {
                          bg = 'rgba(16, 185, 129, 0.15)';
                          border = '1px solid rgba(16, 185, 129, 0.5)';
                          textColor = '#34d399';
                        } else if (isSelected) {
                          bg = 'rgba(239, 68, 68, 0.15)';
                          border = '1px solid rgba(239, 68, 68, 0.5)';
                          textColor = '#f87171';
                        }
                      }

                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleOptionSelect(oIdx)}
                          style={{
                            padding: '16px 20px',
                            borderRadius: '12px',
                            background: bg,
                            border: border,
                            color: textColor,
                            fontWeight: isSelected ? '700' : '500',
                            fontSize: '0.95rem',
                            cursor: selectedOption === null ? 'pointer' : 'default',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span>{opt}</span>
                          {selectedOption !== null && isCorrect && <CheckCircle size={18} color="#34d399" />}
                          {selectedOption !== null && isSelected && !isCorrect && <XCircle size={18} color="#f87171" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Answer Explanation once selected */}
                  {selectedOption !== null && (
                    <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', marginBottom: '24px' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#818cf8', marginBottom: '4px' }}>
                        💡 Explanation:
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        {selectedTopic.practiceQuestions[currentQIndex].explanation}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedOption === null}
                      className="btn-primary"
                      style={{ opacity: selectedOption === null ? 0.5 : 1 }}
                    >
                      {currentQIndex + 1 === selectedTopic.practiceQuestions.length ? 'Submit & Save to Value 2' : 'Next Question'} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                /* QUIZ COMPLETED SUMMARY */
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Award size={36} />
                  </div>

                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px' }}>
                    Practice Completed & Saved!
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 20px' }}>
                    You scored <strong>{userAnswers.filter(a => a.isCorrect).length} / {selectedTopic.practiceQuestions.length}</strong> on {selectedTopic.title}.
                  </p>

                  <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    maxWidth: '460px',
                    margin: '0 auto 28px',
                    textAlign: 'left'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#818cf8', fontWeight: '700', fontSize: '0.85rem' }}>
                      <Database size={16} /> Value 2 Data Store Pipeline Event:
                    </div>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-main)', paddingLeft: '20px', lineHeight: '1.6' }}>
                      <li>Topic mastery updated in Value 2</li>
                      <li>Diagnostic weak spots recorded</li>
                      <li>Value 1 Dashboard metrics updated dynamically!</li>
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={resetQuiz} className="btn-secondary">
                      <RotateCw size={14} /> Retake Drill
                    </button>
                    <button onClick={() => setActiveTab('test')} className="btn-primary">
                      Take Dynamic Test based on Value 2 <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* MODE 2: CONCEPT FLASHCARDS */}
          {activeSubTab === 'flashcards' && (
            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '16px' }}>
                Card {cardIndex + 1} of {selectedTopic.flashcards.length}
              </span>

              {/* Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                  minHeight: '220px',
                  borderRadius: '16px',
                  background: isFlipped ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)' : 'rgba(255, 255, 255, 0.04)',
                  border: isFlipped ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid var(--border-subtle)',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  margin: '20px 0',
                  transition: 'all 0.3s ease',
                  boxShadow: isFlipped ? '0 10px 30px rgba(6, 182, 212, 0.15)' : 'none'
                }}
              >
                {!isFlipped ? (
                  <>
                    <HelpCircle size={32} color="#38bdf8" style={{ marginBottom: '14px' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc' }}>
                      {selectedTopic.flashcards[cardIndex].question}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '14px' }}>
                      Click card to reveal answer
                    </p>
                  </>
                ) : (
                  <>
                    <Sparkles size={32} color="#34d399" style={{ marginBottom: '14px' }} />
                    <p style={{ fontSize: '1.05rem', fontWeight: '600', color: '#f8fafc', lineHeight: '1.6' }}>
                      {selectedTopic.flashcards[cardIndex].answer}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#34d399', marginTop: '14px' }}>
                      Answer Revealed
                    </p>
                  </>
                )}
              </div>

              {/* Flashcard Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  disabled={cardIndex === 0}
                  onClick={() => {
                    setCardIndex(cardIndex - 1);
                    setIsFlipped(false);
                  }}
                  className="btn-secondary"
                  style={{ opacity: cardIndex === 0 ? 0.5 : 1 }}
                >
                  Previous Card
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="btn-secondary"
                >
                  <RotateCw size={14} /> Flip Card
                </button>

                <button
                  disabled={cardIndex + 1 === selectedTopic.flashcards.length}
                  onClick={() => {
                    setCardIndex(cardIndex + 1);
                    setIsFlipped(false);
                  }}
                  className="btn-primary"
                  style={{ opacity: cardIndex + 1 === selectedTopic.flashcards.length ? 0.5 : 1 }}
                >
                  Next Card
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
