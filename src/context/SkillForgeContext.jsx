import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_VALUE1, INITIAL_VALUE2, LEARN_MODULES, PRACTICE_QUESTIONS, COMMUNICATION_SCENARIOS, LEETCODE_STUDY_CASES } from '../data/mockSkillForgeData';

const SkillForgeContext = createContext();

export const SkillForgeProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Google User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillforge_user');
    return saved ? JSON.parse(saved) : {
      isLoggedIn: true,
      name: 'Kumaran',
      email: 'kumaran.dee@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      batch: 'B.Tech CSE • 2026 Batch',
      leetCodeConnected: true,
      leetCodeHandle: 'kumaran_dev'
    };
  });

  // Persistent VALUE 1 state
  const [value1, setValue1] = useState(() => {
    const saved = localStorage.getItem('skillforge_value1');
    return saved ? JSON.parse(saved) : INITIAL_VALUE1;
  });

  // Persistent VALUE 2 state
  const [value2, setValue2] = useState(() => {
    const saved = localStorage.getItem('skillforge_value2');
    return saved ? JSON.parse(saved) : INITIAL_VALUE2;
  });

  useEffect(() => {
    localStorage.setItem('skillforge_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('skillforge_value1', JSON.stringify(value1));
  }, [value1]);

  useEffect(() => {
    localStorage.setItem('skillforge_value2', JSON.stringify(value2));
  }, [value2]);

  // Auth Functions
  const loginWithGoogle = (account) => {
    setUser({
      isLoggedIn: true,
      name: account.name,
      email: account.email,
      avatar: account.avatar,
      batch: account.batch,
      leetCodeConnected: true,
      leetCodeHandle: account.name.toLowerCase().replace(/\s+/g, '_') + '_lc'
    });
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
  };

  // Action 1: Mark Lesson as Completed in Learn Module
  const completeLesson = (lesson) => {
    setValue1(prev => ({
      ...prev,
      totalLessonsCompleted: prev.totalLessonsCompleted + 1,
      learningHours: parseFloat((prev.learningHours + 0.75).toFixed(1)),
      readinessPercentage: Math.min(98, prev.readinessPercentage + 2)
    }));

    setValue2(prev => {
      const updatedTopics = Array.from(new Set([...prev.topicsStudied, lesson.title]));
      return {
        ...prev,
        topicsStudied: updatedTopics
      };
    });
  };

  // Action 2: Solve LeetCode Study Case (Syncs to Value 2 Learned Profile!)
  const solveLeetCodeCase = (lcCase) => {
    setValue1(prev => ({
      ...prev,
      totalPracticeQuestionsSolved: prev.totalPracticeQuestionsSolved + 1,
      readinessPercentage: Math.min(99, prev.readinessPercentage + 1)
    }));

    setValue2(prev => {
      const updatedSolved = Array.from(new Set([...(prev.leetCodeSolvedCases || []), lcCase.id]));
      // Automatically add the corresponding topic to topicsStudied so it can be tested!
      const updatedTopics = Array.from(new Set([...prev.topicsStudied, lcCase.learnedTopicRef]));

      return {
        ...prev,
        leetCodeSolvedCases: updatedSolved,
        topicsStudied: updatedTopics
      };
    });
  };

  // Action 3: Submit Practice Drill Question
  const submitPracticeAnswer = (question, isCorrect, timeTakenSec = 45) => {
    setValue1(prev => ({
      ...prev,
      totalPracticeQuestionsSolved: prev.totalPracticeQuestionsSolved + 1
    }));

    setValue2(prev => {
      const totalPracticed = prev.practiceHistory.length + 1;
      const prevCorrectCount = prev.practiceHistory.filter(p => p.correct > 0).length;
      const newCorrectCount = prevCorrectCount + (isCorrect ? 1 : 0);
      const newAccuracy = Math.round((newCorrectCount / totalPracticed) * 100);

      const weakSet = new Set(prev.weakAreas);
      const strongSet = new Set(prev.strongAreas);

      if (!isCorrect) {
        weakSet.add(question.category + ': ' + question.title);
      } else {
        strongSet.add(question.category + ': ' + question.title);
      }

      const newLog = {
        id: 'ph_' + Date.now(),
        topic: question.title,
        category: question.category,
        difficulty: question.difficulty,
        correct: isCorrect ? 1 : 0,
        total: 1,
        timeTaken: `${timeTakenSec}s`,
        date: new Date().toISOString()
      };

      return {
        ...prev,
        accuracyPercentage: Math.max(50, Math.min(99, newAccuracy)),
        weakAreas: Array.from(weakSet),
        strongAreas: Array.from(strongSet),
        practiceHistory: [newLog, ...prev.practiceHistory]
      };
    });
  };

  // Action 4: Submit Dynamic Test Result
  const submitTestResult = (scorePct, accuracyPct, totalQuestions, correctAnswers, timeSpentStr, missedTopics = []) => {
    const totalCandidates = 1450;
    const predictedRankNum = Math.max(12, Math.round(totalCandidates * (1 - scorePct / 100)));
    const rankPrediction = `#${predictedRankNum} / ${totalCandidates.toLocaleString()} Candidates`;

    const newTestLog = {
      id: 'th_' + Date.now(),
      title: 'AI Dynamic Placement Assessment',
      scorePct,
      accuracyPct,
      timeTaken: timeSpentStr,
      rankPrediction,
      strengths: ['Learned Topics Mastery', 'Algorithm Design'],
      weaknesses: missedTopics.length ? missedTopics : ['Advanced SQL Indexing'],
      date: new Date().toISOString()
    };

    setValue1(prev => ({
      ...prev,
      readinessPercentage: Math.min(99, Math.round(prev.readinessPercentage * 0.7 + scorePct * 0.3))
    }));

    setValue2(prev => ({
      ...prev,
      testHistory: [newTestLog, ...prev.testHistory],
      weakAreas: Array.from(new Set([...prev.weakAreas, ...missedTopics]))
    }));
  };

  // Action 5: Submit Communication Studio Session
  const submitCommunicationSession = (type, fluency, grammar, vocabulary, confidence) => {
    const newLog = {
      id: 'cl_' + Date.now(),
      type,
      fluencyScore: fluency,
      grammarScore: grammar,
      vocabularyScore: vocabulary,
      confidenceScore: confidence,
      date: new Date().toISOString()
    };

    setValue2(prev => ({
      ...prev,
      communicationLogs: [newLog, ...prev.communicationLogs]
    }));
  };

  // STRICT TEST FILTER: Ensures questions in test MUST match topics studied in Value 2!
  const getLearnedTestQuestions = () => {
    const studied = value2.topicsStudied || [];
    
    // Filter practice questions where category or title matches any studied topic in Value 2
    const filtered = PRACTICE_QUESTIONS.filter(q => {
      return studied.some(topic => 
        topic.toLowerCase().includes(q.category.toLowerCase()) || 
        q.title.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(q.title.toLowerCase())
      );
    });

    // If filtered list is small, fallback to questions whose categories are studied
    return filtered.length > 0 ? filtered : PRACTICE_QUESTIONS;
  };

  // Action 6: Reset Data back to initial defaults
  const resetAllProgress = () => {
    localStorage.removeItem('skillforge_user');
    localStorage.removeItem('skillforge_value1');
    localStorage.removeItem('skillforge_value2');
    setValue1(INITIAL_VALUE1);
    setValue2(INITIAL_VALUE2);
    setUser({
      isLoggedIn: true,
      name: 'Kumaran',
      email: 'kumaran.dee@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      batch: 'B.Tech CSE • 2026 Batch',
      leetCodeConnected: true,
      leetCodeHandle: 'kumaran_dev'
    });
  };

  return (
    <SkillForgeContext.Provider value={{
      activeTab,
      setActiveTab,
      user,
      loginWithGoogle,
      logout,
      value1,
      value2,
      learnModules: LEARN_MODULES,
      practiceQuestions: PRACTICE_QUESTIONS,
      leetCodeStudyCases: LEETCODE_STUDY_CASES,
      communicationScenarios: COMMUNICATION_SCENARIOS,
      completeLesson,
      solveLeetCodeCase,
      submitPracticeAnswer,
      submitTestResult,
      submitCommunicationSession,
      getLearnedTestQuestions,
      resetAllProgress
    }}>
      {children}
    </SkillForgeContext.Provider>
  );
};

export const useSkillForge = () => useContext(SkillForgeContext);
