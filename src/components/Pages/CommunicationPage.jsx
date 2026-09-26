import React, { useState, useEffect, useRef } from 'react';
import { useSkillForge } from '../../context/SkillForgeContext';
import { 
  Mic, 
  Square, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  Award, 
  Database, 
  ArrowRight,
  User,
  Bot,
  Zap,
  VolumeX,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const CommunicationPage = () => {
  const { communicationScenarios, value2, submitCommunicationSession, setActiveTab } = useSkillForge();

  const sections = ['Spoken English', 'Grammar Practice', 'Vocabulary Builder', 'Group Discussion', 'Mock HR Interview'];
  const [activeSection, setActiveSection] = useState('Mock HR Interview');
  const [selectedScenario, setSelectedScenario] = useState(communicationScenarios[0]);

  // AI Chat Practice Window State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your SkillForge AI HR Interview Panelist. Are you ready to begin your mock interview?' },
    { sender: 'user', text: 'Yes, I am ready!' },
    { sender: 'ai', text: 'Great! Please introduce yourself in 60 seconds highlighting your technical skills and academic background.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Voice & Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [speechResult, setSpeechResult] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const startRecording = () => {
    setSpeechResult(null);
    setRecordingSeconds(0);
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Evaluate speech telemetry
    const fluency = Math.min(98, Math.max(65, 88 - Math.floor(Math.random() * 5)));
    const grammar = Math.min(96, Math.max(70, 84 + Math.floor(Math.random() * 6)));
    const vocabulary = Math.min(95, Math.max(68, 86 + Math.floor(Math.random() * 4)));
    const confidence = Math.min(99, Math.max(75, 87 + Math.floor(Math.random() * 5)));

    const result = {
      fluencyScore: fluency,
      grammarScore: grammar,
      vocabularyScore: vocabulary,
      confidenceScore: confidence,
      wpm: 142,
      feedback: 'Excellent pacing! Maintain crisp enunciation on technical terms like "Object-Oriented Programming".'
    };

    setSpeechResult(result);

    // Save into Value 2!
    submitCommunicationSession(activeSection, fluency, grammar, vocabulary, confidence);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const newChat = [...chatMessages, { sender: 'user', text: userText }];
    setChatMessages(newChat);
    setInputMessage('');

    // Simulate AI HR Response
    setTimeout(() => {
      let aiReply = "Thank you! Your response demonstrates good structure. Now tell me about a time you solved a complex technical challenge.";
      if (userText.toLowerCase().includes('python') || userText.toLowerCase().includes('sql')) {
        aiReply = "Impressive technical stack! How do you handle database index optimization under heavy query load?";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-blue-200 border border-white/20 flex items-center gap-1.5">
                <Mic size={13} /> Speech & HR AI Evaluator
              </span>
              <span className="text-xs font-medium text-slate-300">Stores Fluency & Grammar in Value 2</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Communication & HR Studio</h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-xl">
              Master Spoken English, Grammar, Vocabulary, Group Discussions, and Mock HR Interviews with AI feedback.
            </p>
          </div>

          <div className="text-right bg-white/10 p-3 rounded-xl border border-white/15">
            <span className="text-xs text-blue-200 block">Communication Log</span>
            <span className="text-xl font-extrabold text-white">{value2.communicationLogs.length} Sessions</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Sections */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {sections.map((sec, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(sec)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeSection === sec 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Main Grid: AI Chat Window & Mock HR Voice Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Chat Practice Window (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-card p-6 flex flex-col h-[520px] justify-between">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-200/70 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">AI Placement HR Interlayer</h3>
                  <p className="text-[10px] text-slate-400">Interactive Chat & Grammar Trainer</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Online & Evaluating
              </span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-1">
                      AI
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Field */}
            <div className="flex gap-2 pt-2 border-t border-slate-200/70">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your interview response here..."
                className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Voice Audio Recorder & Real-time Metrics (6 Columns) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="glass-card p-6 space-y-6">
            
            {/* Header info */}
            <div className="border-b border-slate-200/70 pb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {activeSection}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                {selectedScenario.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                "{selectedScenario.prompt}"
              </p>
            </div>

            {/* Voice Audio Practice Panel */}
            <div className={`p-6 rounded-2xl border text-center transition space-y-4 ${
              isRecording ? 'bg-rose-50/70 border-rose-300' : 'bg-slate-50/80 border-slate-200'
            }`}>
              
              {/* Soundwave Animation */}
              <div className="h-10 flex items-center justify-center gap-1.5">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: isRecording ? `${Math.sin(i + recordingSeconds) * 16 + 22}px` : '8px'
                    }}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isRecording ? 'bg-rose-500' : 'bg-blue-500'
                    }`}
                  />
                ))}
              </div>

              <h4 className="text-2xl font-extrabold text-slate-900 font-mono">
                00:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
              </h4>

              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <Mic size={18} /> Start Speaking Challenge
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <Square size={18} /> Stop & Evaluate Audio
                </button>
              )}
            </div>

            {/* METRICS EVALUATION DISPLAY */}
            {speechResult && (
              <div className="space-y-4 border-t border-slate-200/70 pt-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Evaluation Scores Saved to Value 2</h4>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={13} /> Saved
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Fluency Score</span>
                    <h5 className="text-2xl font-extrabold text-blue-600">{speechResult.fluencyScore}%</h5>
                  </div>
                  <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Grammar Score</span>
                    <h5 className="text-2xl font-extrabold text-indigo-600">{speechResult.grammarScore}%</h5>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Vocabulary Score</span>
                    <h5 className="text-2xl font-extrabold text-emerald-600">{speechResult.vocabularyScore}%</h5>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Confidence Score</span>
                    <h5 className="text-2xl font-extrabold text-amber-600">{speechResult.confidenceScore}%</h5>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong>AI Pronunciation Feedback:</strong> {speechResult.feedback}
                </div>
              </div>
            )}

            {/* Bottom Notice */}
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2">
              <Database size={15} className="text-blue-600 shrink-0" />
              <span>Fluency, Grammar & Confidence scores are saved into Value 2 to recalibrate placement readiness.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
