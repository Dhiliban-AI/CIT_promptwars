import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TOPICS, INITIAL_VALUE2_DATA } from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const [value2Data, setValue2Data] = useState(() => {
    const saved = localStorage.getItem('cit_platform_value2');
    return saved ? JSON.parse(saved) : INITIAL_VALUE2_DATA;
  });

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'learn_practice', 'test', 'communication', 'workflow'

  // Persist Value 2 data when changed
  useEffect(() => {
    localStorage.setItem('cit_platform_value2', JSON.stringify(value2Data));
  }, [value2Data]);

  // Derived VALUE 1 (Dashboard aggregated metrics)
  const masteries = Object.values(value2Data.conceptMastery);
  const overallMastery = masteries.length 
    ? Math.round(masteries.reduce((a, b) => a + b, 0) / masteries.length) 
    : 0;

  const totalPracticeQuestions = value2Data.practiceHistory.reduce((acc, item) => acc + item.total, 0);
  const totalTestQuestions = value2Data.testHistory.reduce((acc, item) => acc + item.totalQuestions, 0);
  const grandTotalQuestions = totalPracticeQuestions + totalTestQuestions;

  const avgTestScore = value2Data.testHistory.length
    ? Math.round(value2Data.testHistory.reduce((acc, item) => acc + item.scorePercentage, 0) / value2Data.testHistory.length)
    : 0;

  const commScores = value2Data.communicationLogs.map(l => l.fluencyScore);
  const avgCommScore = commScores.length 
    ? Math.round(commScores.reduce((a, b) => a + b, 0) / commScores.length)
    : 75;

  const value1DashboardMetrics = {
    overallMastery,
    grandTotalQuestions,
    testsTaken: value2Data.testHistory.length,
    avgTestScore,
    avgCommScore,
    learnedTopicsCount: value2Data.learnedTopics.length,
    weakAreas: value2Data.weakAreas,
    topRecommendedTopic: topics.find(t => (value2Data.conceptMastery[t.id] || 0) < 60) || topics[0],
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  // Actions to mutate VALUE 2 and propagate to VALUE 1
  const recordPracticeResult = (topicId, correctCount, totalQuestions, weakConceptsFound = []) => {
    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    const newSession = {
      id: 'p_' + Date.now(),
      topicId,
      score: scorePct,
      total: totalQuestions,
      date: new Date().toISOString()
    };

    setValue2Data(prev => {
      // Calculate updated topic mastery (weighted 60% previous, 40% new score)
      const currentMastery = prev.conceptMastery[topicId] ?? 50;
      const updatedMastery = Math.min(100, Math.round(currentMastery * 0.5 + scorePct * 0.5));

      // Update weak areas array
      const existingWeak = new Set(prev.weakAreas);
      if (scorePct < 70) {
        const topicObj = topics.find(t => t.id === topicId);
        if (topicObj) existingWeak.add(topicObj.title);
        weakConceptsFound.forEach(c => existingWeak.add(c));
      } else {
        // If score is high, remove if present
        const topicObj = topics.find(t => t.id === topicId);
        if (topicObj) existingWeak.delete(topicObj.title);
      }

      // Add to learned topics list if not present
      const learned = new Set(prev.learnedTopics);
      learned.add(topicId);

      return {
        ...prev,
        learnedTopics: Array.from(learned),
        conceptMastery: {
          ...prev.conceptMastery,
          [topicId]: updatedMastery
        },
        weakAreas: Array.from(existingWeak),
        practiceHistory: [newSession, ...prev.practiceHistory]
      };
    });
  };

  const submitTestResult = (testTitle, scorePct, totalQuestions, correctAnswers, timeSpentSec, missedTopicIds = []) => {
    const newTestLog = {
      id: 't_' + Date.now(),
      title: testTitle,
      scorePercentage: scorePct,
      totalQuestions,
      correctAnswers,
      timeSpentSec,
      date: new Date().toISOString()
    };

    setValue2Data(prev => {
      const updatedMastery = { ...prev.conceptMastery };
      
      // Slightly boost or adjust topic masteries based on test performance
      Object.keys(updatedMastery).forEach(tid => {
        if (missedTopicIds.includes(tid)) {
          updatedMastery[tid] = Math.max(20, updatedMastery[tid] - 8);
        } else {
          updatedMastery[tid] = Math.min(100, updatedMastery[tid] + 5);
        }
      });

      return {
        ...prev,
        conceptMastery: updatedMastery,
        testHistory: [newTestLog, ...prev.testHistory]
      };
    });
  };

  const recordCommunicationResult = (promptTitle, wpm, fluencyScore, fillersCount, clarityRating) => {
    const newLog = {
      id: 'c_' + Date.now(),
      prompt: promptTitle,
      wpm,
      fluencyScore,
      fillersDetected: fillersCount,
      clarityRating,
      date: new Date().toISOString()
    };

    setValue2Data(prev => {
      const updatedMastery = { ...prev.conceptMastery };
      if (updatedMastery['comm_verbal'] !== undefined) {
        updatedMastery['comm_verbal'] = Math.round(updatedMastery['comm_verbal'] * 0.6 + fluencyScore * 0.4);
      }

      return {
        ...prev,
        conceptMastery: updatedMastery,
        communicationLogs: [newLog, ...prev.communicationLogs]
      };
    });
  };

  const resetAllData = () => {
    localStorage.removeItem('cit_platform_value2');
    setValue2Data(INITIAL_VALUE2_DATA);
  };

  return (
    <DataContext.Provider value={{
      topics,
      value2Data,
      value1DashboardMetrics,
      activeTab,
      setActiveTab,
      recordPracticeResult,
      submitTestResult,
      recordCommunicationResult,
      resetAllData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
