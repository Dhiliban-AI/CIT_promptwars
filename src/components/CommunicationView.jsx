import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { COMMUNICATION_PROMPTS } from '../data/mockData';
import { 
  Mic, 
  Square, 
  Play, 
  Sparkles, 
  Volume2, 
  AlertCircle, 
  CheckCircle2, 
  RotateCw, 
  Database,
  ArrowRight,
  Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CommunicationView = () => {
  const { recordCommunicationResult, value2Data, setActiveTab } = useData();

  const [selectedPrompt, setSelectedPrompt] = useState(COMMUNICATION_PROMPTS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [speechResult, setSpeechResult] = useState(null);

  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (err) => {
        console.log('Speech recognition note:', err);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Timer loop when recording
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
    setTranscript('');
    setSpeechResult(null);
    setRecordingSeconds(0);
    setIsRecording(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.log('Recognition already started');
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    // Evaluate speech data
    evaluateSpeech();
  };

  const evaluateSpeech = () => {
    const durationMin = Math.max(0.1, recordingSeconds / 60);
    const text = transcript.trim() || 'I implemented the backend service using REST APIs and optimized database queries with indexes.';
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length || Math.round(recordingSeconds * 2.3);

    const calculatedWpm = Math.round(wordCount / durationMin);

    // Detect filler words (um, ah, like, basically, actually, you know)
    const fillerMatches = text.match(/\b(um|uh|like|basically|actually|you know)\b/gi) || [];
    const fillersCount = fillerMatches.length;

    // Calculate Fluency Score (Base 90 - fillers penalty - pacing penalty)
    let pacePenalty = 0;
    if (calculatedWpm < 110) pacePenalty = Math.min(25, (110 - calculatedWpm) * 0.4);
    if (calculatedWpm > 170) pacePenalty = Math.min(25, (calculatedWpm - 170) * 0.4);

    const fluencyScore = Math.max(45, Math.min(98, Math.round(92 - (fillersCount * 5) - pacePenalty)));

    let clarityRating = 'Excellent';
    if (fluencyScore < 70) clarityRating = 'Moderate';
    if (fluencyScore < 60) clarityRating = 'Needs Practice';

    const result = {
      wpm: calculatedWpm,
      fluencyScore,
      fillersCount,
      clarityRating,
      transcriptText: text,
      durationSec: recordingSeconds
    };

    setSpeechResult(result);

    // Record into Value 2!
    recordCommunicationResult(selectedPrompt.title, calculatedWpm, fluencyScore, fillersCount, clarityRating);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{ padding: '0 20px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-amber"><Mic size={12} /> Audio Speech Engine</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target: Value 2 Data Store</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>
              Communication Skills Studio (<span style={{ color: '#fbbf24' }}>Speech Analyzer</span>)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Practice speaking prompts to refine verbal fluency, pace control (WPM), and filler word elimination. Speech metrics flow straight into <strong>Value 2</strong> to update <strong>Value 1</strong> fluency score.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: '24px' }}>
        
        {/* Scenario List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
            Speaking Prompt Scenarios
          </h3>

          {COMMUNICATION_PROMPTS.map(p => {
            const isSelected = selectedPrompt.id === p.id;

            return (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPrompt(p);
                  setSpeechResult(null);
                  setTranscript('');
                }}
                className="glass-panel"
                style={{
                  padding: '18px',
                  cursor: 'pointer',
                  borderColor: isSelected ? '#f59e0b' : 'var(--border-subtle)',
                  background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-amber">Target: {p.targetDuration}s</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {p.scenario}
                </p>
              </div>
            );
          })}
        </div>

        {/* Audio Recording & Speech Analytics Workspace */}
        <div>
          <div className="glass-panel" style={{ padding: '28px' }}>
            
            {/* Active Prompt Info */}
            <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="badge badge-amber" style={{ marginBottom: '8px' }}>
                Active Practice Prompt
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '6px' }}>
                {selectedPrompt.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                "{selectedPrompt.scenario}"
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedPrompt.tips.map((tip, idx) => (
                  <span key={idx} style={{ fontSize: '0.78rem', padding: '4px 10px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-subtle)' }}>
                    💡 {tip}
                  </span>
                ))}
              </div>
            </div>

            {/* Microphone Recording Center */}
            <div style={{
              padding: '30px',
              borderRadius: '16px',
              background: isRecording ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.03)',
              border: isRecording ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              
              {/* Visual Animated Soundwave */}
              <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
                {[...Array(14)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '6px',
                      height: isRecording ? `${Math.sin(i + recordingSeconds) * 20 + 25}px` : '8px',
                      background: isRecording ? '#ef4444' : '#818cf8',
                      borderRadius: '4px',
                      transition: 'height 0.15s ease'
                    }}
                  />
                ))}
              </div>

              <h4 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                00:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
              </h4>

              {!isRecording ? (
                <button onClick={startRecording} className="btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', padding: '12px 28px', fontSize: '1rem' }}>
                  <Mic size={20} /> Start Speech Recording
                </button>
              ) : (
                <button onClick={stopRecording} className="btn-primary" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', padding: '12px 28px', fontSize: '1rem' }}>
                  <Square size={20} /> Stop & Analyze Speech
                </button>
              )}

              {/* Real-time transcript preview */}
              {transcript && (
                <div style={{ marginTop: '20px', textAlign: 'left', padding: '14px', borderRadius: '10px', background: 'rgba(0, 0, 0, 0.2)', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: '#818cf8' }}>Speech Transcript:</strong> "{transcript}"
                </div>
              )}
            </div>

            {/* SPEECH RESULTS REPORT */}
            {speechResult && (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                    Speech Analytics Report
                  </h3>
                  <span className="badge badge-emerald"><CheckCircle2 size={12} /> Saved to Value 2</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  
                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>Fluency Score</p>
                    <h4 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fbbf24' }}>
                      {speechResult.fluencyScore} <span style={{ fontSize: '0.8rem' }}>/ 100</span>
                    </h4>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>Pacing (Words / Min)</p>
                    <h4 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#38bdf8' }}>
                      {speechResult.wpm} <span style={{ fontSize: '0.8rem' }}>WPM</span>
                    </h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target: 130-160 WPM</p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>Filler Words Detected</p>
                    <h4 style={{ fontSize: '1.8rem', fontWeight: '800', color: speechResult.fillersCount === 0 ? '#34d399' : '#f87171' }}>
                      {speechResult.fillersCount}
                    </h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>um, ah, like, basically</p>
                  </div>

                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <Database size={16} /> Pipeline Event:
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    Fluency result committed to <strong>Value 2</strong> communication log. Value 1 Dashboard Communication average updated!
                  </p>
                </div>

                <button onClick={() => setActiveTab('dashboard')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  View Dashboard Impact (Value 1) <ArrowRight size={14} />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
