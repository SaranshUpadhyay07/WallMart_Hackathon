// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import AnalysisPage from "./components/AnalysisPage";
import Dashboard from "./components/Dashboard";
import RecyclePage from "./components/RecyclePage";
import AdminLogin from "./components/AdminLogin";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/user/create"
            element={
              <RecyclePage
                mode="create"
                onClose={() => window.history.back()}
              />
            }
          />
          <Route
            path="/user/details"
            element={
              <RecyclePage
                mode="details"
                onClose={() => window.history.back()}
              />
            }
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
