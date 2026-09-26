import React from 'react';
import { useData } from '../context/DataContext';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Brain, 
  ArrowRight, 
  BarChart3, 
  Zap, 
  Layers,
  Sparkles,
  BookOpen,
  Target,
  Mic,
  Award
} from 'lucide-react';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DashboardView = () => {
  const { value1DashboardMetrics, value2Data, topics, setActiveTab } = useData();

  // Prepare Chart Data from Value 2 concept masteries
  const chartLabels = topics.map(t => t.title);
  const chartValues = topics.map(t => value2Data.conceptMastery[t.id] || 0);

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Topic Mastery Level (%)',
        data: chartValues,
        backgroundColor: [
          'rgba(99, 102, 241, 0.75)',
          'rgba(6, 182, 212, 0.75)',
          'rgba(16, 185, 129, 0.75)',
          'rgba(245, 158, 11, 0.75)'
        ],
        borderColor: [
          '#6366f1',
          '#06b6d4',
          '#10b981',
          '#f59e0b'
        ],
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(99, 102, 241, 0.4)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      y: {
        min: 0,
        max: 100,
        ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 }, stepSize: 20 },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      }
    }
  };

  return (
    <div style={{ padding: '0 20px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Top Banner / Explanation */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-indigo">Value 1 Engine</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated: {value1DashboardMetrics.lastUpdated}</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>
              Dashboard Metrics (<span className="gradient-text">Value 1</span>)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '780px' }}>
              This dashboard synthesizes <strong>Value 1</strong> by aggregating real-time learner interactions, quiz accuracy, and voice analytics collected from <strong>Value 2</strong> (Learn, Practice & Communication modules).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setActiveTab('learn_practice')} className="btn-primary">
              <BookOpen size={16} /> Practice More (Feed Value 2)
            </button>
            <button onClick={() => setActiveTab('test')} className="btn-secondary">
              <Target size={16} /> Take Value 2 Test
            </button>
          </div>
        </div>
      </div>

      {/* Value 1 Key Performance Indicators Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Metric 1: Overall Mastery Rate */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: '600', textTransform: 'uppercase' }}>Overall Mastery (Value 1)</p>
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '8px 0 4px', color: '#818cf8' }}>
                {value1DashboardMetrics.overallMastery}%
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--accent-success)' }}>
                <TrendingUp size={14} /> Aggregated from Value 2 Data Store
              </div>
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Brain size={26} />
            </div>
          </div>
          <div style={{ marginTop: '16px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', height: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${value1DashboardMetrics.overallMastery}%`, background: 'linear-gradient(90deg, #6366f1, #38bdf8)', height: '100%', borderRadius: '10px' }}></div>
          </div>
        </div>

        {/* Metric 2: Total Questions Answered */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: '600', textTransform: 'uppercase' }}>Questions Attempted</p>
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '8px 0 4px', color: '#38bdf8' }}>
                {value1DashboardMetrics.grandTotalQuestions}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Across Practice & Dynamic Tests</p>
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
              <Zap size={26} />
            </div>
          </div>
        </div>

        {/* Metric 3: Dynamic Tests Completed & Average */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: '600', textTransform: 'uppercase' }}>Tests Taken & Avg Score</p>
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '8px 0 4px', color: '#34d399' }}>
                {value1DashboardMetrics.avgTestScore}%
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {value1DashboardMetrics.testsTaken} Test Sessions Completed
              </p>
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Award size={26} />
            </div>
          </div>
        </div>

        {/* Metric 4: Communication Score */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: '600', textTransform: 'uppercase' }}>Communication Fluency</p>
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '8px 0 4px', color: '#fbbf24' }}>
                {value1DashboardMetrics.avgCommScore} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Voice & Speech Evaluation</p>
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Mic size={26} />
            </div>
          </div>
        </div>

      </div>

      {/* Main Section: Chart & Weak Areas Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        
        {/* Topic Mastery Chart */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Value 2 Mastery Breakdown</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time proficiency percentages per learning domain</p>
            </div>
            <span className="badge badge-indigo"><BarChart3 size={12} /> Live Sync</span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        {/* Weak Areas & Adaptive Focus Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Identified Weak Concepts (Value 2)</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automated diagnostic derived from practice errors</p>
              </div>
            </div>

            {value1DashboardMetrics.weakAreas.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '16px 0' }}>
                {value1DashboardMetrics.weakAreas.map((area, idx) => (
                  <div key={idx} style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#fca5a5' }}>
                      ⚠️ {area}
                    </span>
                    <span className="badge badge-rose">Needs Review</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', textTransform: 'center', color: 'var(--accent-success)', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', margin: '16px 0' }}>
                <CheckCircle2 size={24} style={{ marginBottom: '6px' }} />
                <p style={{ fontWeight: '700' }}>Great Job!</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No critical weak areas detected in Value 2 data store.</p>
              </div>
            )}
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recommended Next Action:</p>
              <p style={{ fontSize: '0.9rem', fontWeight: '700', color: '#818cf8' }}>
                Generate Adaptive Test based on Value 2
              </p>
            </div>
            <button onClick={() => setActiveTab('test')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Launch Test <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Value 2 Activity Feed */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="#818cf8" /> Value 2 Audit Log (Recent Learning & Practice Data Collected)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          
          {/* Practice Log item */}
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span className="badge badge-indigo">Practice Session</span>
              <span>Recent</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>
              Data Structures & Algorithms Drill
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Result: <strong>80% Score</strong> (4/5 questions correct). Fed into concept mastery state in Value 2.
            </p>
          </div>

          {/* Test Log item */}
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span className="badge badge-emerald">Adaptive Test</span>
              <span>Recent</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>
              Diagnostic Assessment
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Result: <strong>68% Score</strong>. Weak spot identified: HTTP Caching & ETags.
            </p>
          </div>

          {/* Communication Log item */}
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span className="badge badge-amber">Speech Evaluation</span>
              <span>Recent</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>
              Elevator Pitch Drill
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Result: <strong>84 Fluency</strong>, 142 WPM. 2 filler words detected.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
