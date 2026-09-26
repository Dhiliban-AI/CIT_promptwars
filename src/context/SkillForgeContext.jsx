import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_VALUE1, INITIAL_VALUE2, LEARN_MODULES, PRACTICE_QUESTIONS, COMMUNICATION_SCENARIOS } from '../data/mockSkillForgeData';

const SkillForgeContext = createContext();

export const SkillForgeProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'learn', 'practice', 'test', 'communication'

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
    localStorage.setItem('skillforge_value1', JSON.stringify(value1));
  }, [value1]);

  useEffect(() => {
    localStorage.setItem('skillforge_value2', JSON.stringify(value2));
  }, [value2]);

  // Action 1: Mark Lesson as Completed
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

  // Action 2: Submit Practice Drill Question
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

  // Action 3: Submit Dynamic Test Result
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
      strengths: ['Data Structures', 'Aptitude Logic'],
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

  // Action 4: Submit Communication Studio Session
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

  // Action 5: Reset Data back to initial defaults
  const resetAllProgress = () => {
    localStorage.removeItem('skillforge_value1');
    localStorage.removeItem('skillforge_value2');
    setValue1(INITIAL_VALUE1);
    setValue2(INITIAL_VALUE2);
  };

  return (
    <SkillForgeContext.Provider value={{
      activeTab,
      setActiveTab,
      value1,
      value2,
      learnModules: LEARN_MODULES,
      practiceQuestions: PRACTICE_QUESTIONS,
      communicationScenarios: COMMUNICATION_SCENARIOS,
      completeLesson,
      submitPracticeAnswer,
      submitTestResult,
      submitCommunicationSession,
      resetAllProgress
    }}>
      {children}
    </SkillForgeContext.Provider>
  );
};

export const useSkillForge = () => useContext(SkillForgeContext);
