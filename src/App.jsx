import React from 'react';
import { SkillForgeProvider, useSkillForge } from './context/SkillForgeContext';
import { Sidebar } from './components/Navigation/Sidebar';
import { BottomNav } from './components/Navigation/BottomNav';
import { TopBar } from './components/Navigation/TopBar';
import { DashboardPage } from './components/Pages/DashboardPage';
import { LearnPage } from './components/Pages/LearnPage';
import { PracticePage } from './components/Pages/PracticePage';
import { TestPage } from './components/Pages/TestPage';
import { CommunicationPage } from './components/Pages/CommunicationPage';

const MainViewRouter = () => {
  const { activeTab } = useSkillForge();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {activeTab === 'dashboard' && <DashboardPage />}
      {activeTab === 'learn' && <LearnPage />}
      {activeTab === 'practice' && <PracticePage />}
      {activeTab === 'test' && <TestPage />}
      {activeTab === 'communication' && <CommunicationPage />}
    </div>
  );
};

export function App() {
  return (
    <SkillForgeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row antialiased">
        
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 pb-16 md:pb-6">
            <MainViewRouter />
          </main>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <BottomNav />

      </div>
    </SkillForgeProvider>
  );
}

export default App;
