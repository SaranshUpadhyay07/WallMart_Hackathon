import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AnalysisPage from './components/AnalysisPage';
import Dashboard from './components/Dashboard';
import RecyclePage from './components/RecyclePage';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  React.useEffect(() => {
    const openAdminLogin = () => setShowAdminLogin(true);
    const openUserLogin = () => setShowUserDetails(true);
    const openUserRegister = () => setShowCreateUser(true);
    window.addEventListener('openAdminLogin', openAdminLogin);
    window.addEventListener('openUserLogin', openUserLogin);
    window.addEventListener('openUserRegister', openUserRegister);
    return () => {
      window.removeEventListener('openAdminLogin', openAdminLogin);
      window.removeEventListener('openUserLogin', openUserLogin);
      window.removeEventListener('openUserRegister', openUserRegister);
    };
  }, []);

  let pageToRender;
  if (currentPage === 'landing') {
    pageToRender = (
      <LandingPage
        onNavigateToAnalysis={() => setCurrentPage('analysis')}
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
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
      {showAdminLogin && <AdminLogin onSuccess={() => { setShowAdminLogin(false); setShowAdminPanel(true); }} onClose={() => setShowAdminLogin(false)} />}
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
}

export default App;
