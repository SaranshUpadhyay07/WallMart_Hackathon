import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Recycle, Shield, Award, Package, Globe, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [recycleOpen, setRecycleOpen] = useState(false);
  const recycleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (recycleRef.current && !recycleRef.current.contains(event.target)) {
        setRecycleOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">EcoPackage AI</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors py-2">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors py-2">How It Works</a>
              <a href="#impact" className="text-gray-600 hover:text-green-600 transition-colors py-2">Impact</a>

              {/* Reuse Dropdown */}
              <div className="relative" ref={recycleRef}>
                <button
                  onClick={() => setRecycleOpen((v) => !v)}
                  className="group bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-2 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <Recycle className="h-5 w-5" />
                  <span>Reuse</span>
                </button>
                {recycleOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-green-200 rounded-xl shadow-lg z-50 flex flex-col">
                    <button
                      className="px-4 py-2 text-left hover:bg-green-50 rounded-t-xl"
                      onClick={() => {
                        setRecycleOpen(false);
                        navigate('/user/create');
                      }}
                    >Add User</button>
                    <button
                      className="px-4 py-2 text-left hover:bg-green-50 rounded-b-xl"
                      onClick={() => {
                        setRecycleOpen(false);
                        navigate('/user/details');
                      }}
                    >User Details</button>
                  </div>
                )}
              </div>

              {/* Dashboard button */}
              <button
                onClick={() => navigate('/dashboard')}
                className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 py-2 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Package className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full animate-pulse">
                <Globe className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolutionize Your
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Sustainable Packaging
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Powered by advanced AI, our platform analyzes your products and recommends the most 
              eco-friendly, cost-effective packaging solutions. Join the green revolution today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/analysis')}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Package className="h-5 w-5" />
                <span>Analyze Your Product</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* other sections remain unchanged */}
    </div>
  );
};

export default LandingPage;
