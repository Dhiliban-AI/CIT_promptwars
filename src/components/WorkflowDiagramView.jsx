import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Database, 
  LayoutDashboard, 
  BookOpenCheck, 
  Target, 
  Mic, 
  ArrowRight, 
  ArrowDown, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  RefreshCw,
  GitCommit,
  Cpu
} from 'lucide-react';

export const WorkflowDiagramView = () => {
  const { value1DashboardMetrics, value2Data, setActiveTab } = useData();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: 'Phase 1: Interactive Learning & Speech Practice',
      node: 'Learn & Practice + Communication Studio',
      description: 'The user engages with course modules, answers practice quizzes, flips concept flashcards, and records speech prompts.',
      target: 'Generates raw performance telemetry & accuracy metrics.'
    },
    {
      step: 2,
      title: 'Phase 2: Ingestion into Value 2 Data Store',
      node: 'Value 2 (Collected Data Repository)',
      description: 'System stores concept mastery percentages, practice question logs, weak concept list, and speech WPM/fluency metrics into local/cloud state.',
      target: 'Maintains granular user skill matrix & diagnostic logs.'
    },
    {
      step: 3,
      title: 'Phase 3: Dynamic Adaptive Test Generation',
      node: 'Adaptive Test Engine (Value 2 Driven)',
      description: 'Test Engine inspects Value 2 to construct personalized quizzes focusing on weak topics (mastery < 70%). Test completion writes updated scores back to Value 2.',
      target: 'Targeted remediation & dynamic difficulty scaling.'
    },
    {
      step: 4,
      title: 'Phase 4: Synthesis of Value 1 Dashboard Metrics',
      node: 'Dashboard (Value 1 Analytics Engine)',
      description: 'Dashboard computes weighted overall mastery %, test score averages, communication index, and renders real-time visual charts and weak spot alerts.',
      target: 'Executive overview & progress tracking.'
    }
  ];

  return (
    <div style={{ padding: '0 20px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-indigo"><GitCommit size={12} /> System Architecture Flowchart</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>
              Data Pipeline & Workflow (<span className="gradient-text">Value 1 & Value 2 Interconnection</span>)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Architectural diagram illustrating how user interactions in <strong>Learn/Practice</strong> and <strong>Communication Studio</strong> feed into <strong>Value 2</strong> data store, powering the <strong>Adaptive Test Generator</strong> and synthesizing <strong>Value 1</strong> on the Dashboard.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {steps.map(s => (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: activeStep === s.step ? '1px solid #6366f1' : '1px solid var(--border-subtle)',
                  background: activeStep === s.step ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeStep === s.step ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Step {s.step}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Architectural Flowchart Diagram Canvas */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={20} color="#818cf8" /> Interactive Workflow Diagram
        </h3>

        {/* Diagram Flow Nodes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'center' }}>
          
          {/* NODE 1: Learn & Practice + Communication */}
          <div
            onClick={() => setActiveStep(1)}
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: activeStep === 1 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: activeStep === 1 ? '2px solid #10b981' : '1px solid var(--border-subtle)',
              boxShadow: activeStep === 1 ? '0 0 25px rgba(16, 185, 129, 0.3)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-emerald">Data Generator</span>
              <BookOpenCheck size={20} color="#34d399" />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>
              1. Learn, Practice & Communication
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Quizzes, Flashcards & Voice Drills collect topic accuracy, speech pacing, & weak spots.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', color: '#818cf8' }}>
            <ArrowRight size={28} style={{ transform: 'rotate(0deg)' }} />
          </div>

          {/* NODE 2: Value 2 Data Store */}
          <div
            onClick={() => setActiveStep(2)}
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: activeStep === 2 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: activeStep === 2 ? '2px solid #06b6d4' : '1px solid var(--border-subtle)',
              boxShadow: activeStep === 2 ? '0 0 25px rgba(6, 182, 212, 0.3)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-cyan">Central Repository</span>
              <Database size={20} color="#38bdf8" />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px', color: '#38bdf8' }}>
              2. Value 2 Data Store
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Stores mastery ratings, diagnostic error logs, speech WPM, & practice history.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', color: '#818cf8' }}>
            <ArrowRight size={28} />
          </div>

          {/* NODE 3: Adaptive Test Engine */}
          <div
            onClick={() => setActiveStep(3)}
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: activeStep === 3 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: activeStep === 3 ? '2px solid #ef4444' : '1px solid var(--border-subtle)',
              boxShadow: activeStep === 3 ? '0 0 25px rgba(239, 68, 68, 0.3)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-rose">Value 2 Driven</span>
              <Target size={20} color="#f87171" />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>
              3. Adaptive Test Engine
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Queries Value 2 for weak concepts & builds targeted dynamic quizzes. Updates Value 2.
            </p>
          </div>

        </div>

        {/* Downward Connector to Node 4 (Dashboard Value 1) */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0', color: '#818cf8' }}>
          <ArrowDown size={32} />
        </div>

        {/* NODE 4: Dashboard (Value 1) */}
        <div
          onClick={() => setActiveStep(4)}
          style={{
            padding: '24px',
            borderRadius: '16px',
            background: activeStep === 4 ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
            border: activeStep === 4 ? '2px solid #6366f1' : '1px solid var(--border-subtle)',
            boxShadow: activeStep === 4 ? '0 0 30px rgba(99, 102, 241, 0.35)' : 'none',
            maxWidth: '650px',
            margin: '0 auto',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo"><LayoutDashboard size={12} /> Value 1 Synthesis</span>
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '6px' }} className="gradient-text">
            4. Dashboard Analytics & Mastery Score (Value 1)
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Real-time aggregate computing overall mastery ({value1DashboardMetrics.overallMastery}%), total questions ({value1DashboardMetrics.grandTotalQuestions}), dynamic charts, & weak area alerts directly from Value 2.
          </p>
        </div>

      </div>

      {/* Active Step Details Panel */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1rem',
            color: '#ffffff'
          }}>
            {steps[activeStep - 1].step}
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>
            {steps[activeStep - 1].title}
          </h3>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '14px', lineHeight: '1.5' }}>
          {steps[activeStep - 1].description}
        </p>

        <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} color="#34d399" />
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <strong>Pipeline Goal:</strong> {steps[activeStep - 1].target}
          </span>
        </div>
      </div>

    </div>
  );
};
