import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AnalysisPage from './components/AnalysisPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {currentPage === 'landing' ? (
        <LandingPage onNavigateToAnalysis={() => setCurrentPage('analysis')} />
      ) : (
        <AnalysisPage onNavigateToLanding={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}

export default App;