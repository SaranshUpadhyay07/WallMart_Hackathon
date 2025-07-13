import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AnalysisPage from './components/AnalysisPage';
import Dashboard from './components/Dashboard'; // ✅ Import Dashboard

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  let pageToRender;
  if (currentPage === 'landing') {
    pageToRender = (
      <LandingPage
        onNavigateToAnalysis={() => setCurrentPage('analysis')}
        onNavigateToDashboard={() => setCurrentPage('dashboard')} // ✅ Pass this prop
      />
    );
  } else if (currentPage === 'analysis') {
    pageToRender = (
      <AnalysisPage onNavigateToLanding={() => setCurrentPage('landing')} />
    );
  } else if (currentPage === 'dashboard') {
    pageToRender = (
      <Dashboard onNavigateToLanding={() => setCurrentPage('landing')} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {pageToRender}
    </div>
  );
}

export default App;
