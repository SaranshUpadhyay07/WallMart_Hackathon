import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Recycle, Shield, Award, Package, Globe, Users,LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = ({ onNavigateToAnalysis }) => {
  const [recycleOpen, setRecycleOpen] = useState(false);
  const recycleRef = useRef(null);

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
              <span className="text-xl font-bold text-gray-800">EcoPackage</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors py-2">How It Works</a>
              <a href="#impact" className="text-gray-600 hover:text-green-600 transition-colors py-2">Impact</a>
              <div className="relative" ref={recycleRef}>
                <button
                  onClick={() => setRecycleOpen((v) => !v)}
                  className="group bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-2 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </button>
                {recycleOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white border border-green-200 rounded-xl shadow-lg z-50 flex flex-col">
                    <Link
                      to="/admin-login"
                      className="px-4 py-2 text-left hover:bg-green-50 rounded-t-xl"
                      onClick={() => setRecycleOpen(false)}
                    >Login as Admin</Link>
                    <Link
                      to="/user-login"
                      className="px-4 py-2 text-left hover:bg-green-50"
                      onClick={() => setRecycleOpen(false)}
                    >Login as User</Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 text-left hover:bg-green-50 rounded-b-xl"
                      onClick={() => setRecycleOpen(false)}
                    >Register as User</Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
              <Link
                to="/analysis"
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Package className="h-5 w-5" />
                <span>Get Packing Solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="scroll-mt-[6rem] py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From input to insight, our AI makes packaging sustainability easy and actionable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-lg inline-block mb-4">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Upload Product Info</h3>
              <p className="text-gray-600">
                Enter your product details or item code to begin the analysis process.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 p-3 rounded-lg inline-block mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">
                Our engine evaluates environmental impact, costs, and eco-ratings of various packaging options.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-lg inline-block mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Get Recommendations</h3>
              <p className="text-gray-600">
                Receive smart packaging suggestions, carbon footprint scores, and cost-effective alternatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="scroll-mt-[6rem] py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Packaging?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of companies already making a positive environmental impact
          </p>
          <button
            onClick={onNavigateToAnalysis}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Package className="h-5 w-5" />
            <span>Start Free Analysis</span>
          </button>
        </div>
      </section>
      <section id="impact" className="scroll-mt-[6rem] py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EcoPackage AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our cutting-edge platform combines AI intelligence with sustainability expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg inline-block mb-6">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced machine learning algorithms analyze your product specifications and recommend 
                the most sustainable packaging solutions tailored to your needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-100">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-lg inline-block mb-6">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                Get comprehensive eco-scores, carbon footprint analysis, and biodegradable alternatives 
                that align with your sustainability goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg inline-block mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Optimization</h3>
              <p className="text-gray-600 leading-relaxed">
                Balance sustainability with profitability through detailed cost analysis and 
                budget-friendly recommendations without compromising quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EcoPackage</span>
            </div>
           <div className="text-gray-400 flex gap-4 items-center text-2xl">
            <ion-icon name="logo-instagram" class="cursor-pointer"></ion-icon>
            <ion-icon name="logo-twitter" class="cursor-pointer"></ion-icon>
            <ion-icon name="logo-linkedin" class="cursor-pointer"></ion-icon>
            <ion-icon name="logo-instagram" class="cursor-pointer"></ion-icon>
            <ion-icon name="logo-facebook" class="cursor-pointer"></ion-icon>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
