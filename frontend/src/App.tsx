import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AnalysisPage from './components/AnalysisPage';
import Dashboard from './components/Dashboard';
import RecyclePage from './components/RecyclePage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  let pageToRender;
  if (currentPage === 'landing') {
    pageToRender = (
      <LandingPage
        onNavigateToAnalysis={() => setCurrentPage('analysis')}
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onAddUser={() => setShowCreateUser(true)}
        onUserDetails={() => setShowUserDetails(true)}
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
      {showCreateUser && <RecyclePage mode="create" onClose={() => setShowCreateUser(false)} />}
      {showUserDetails && <RecyclePage mode="details" onClose={() => setShowUserDetails(false)} />}
    </div>
  );
}

export default App;
