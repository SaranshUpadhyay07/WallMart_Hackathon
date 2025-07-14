import React, { useState } from 'react';
import { User, Lock, LogIn, Package, ArrowDownCircle, Home } from 'lucide-react';
import {useNavigate} from "react-router-dom";

const SignIn = ({ onNavigateToLanding }) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [claimBoxes, setClaimBoxes] = useState(5);
  const [claimError, setClaimError] = useState('');
  const [claimSuccess, setClaimSuccess] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (e) => {
    e.preventDefault();
    setLoading(true);
    setClaimError('');
    setClaimSuccess('');
    try {
      const response = await fetch('http://localhost:3000/user/use', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: user.number, boxes: claimBoxes }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Claim failed');
      }
      setUser(data);
      setClaimSuccess(`Successfully claimed ${claimBoxes} boxes!`);
    } catch (err) {
      setClaimError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Welcome, {user.name}!</h1>
            <button
                onClick={() => navigate('/')}
              className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
          </div>

          {/* User Details Dashboard */}
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Box Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-4">
                  <Package className="h-12 w-12 text-green-600" />
                  <div>
                    <div className="text-lg text-gray-600">Total Recycled</div>
                    <div className="text-3xl font-bold text-gray-800">{user.totalBoxesRecycled}</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-4">
                  <ArrowDownCircle className="h-12 w-12 text-emerald-600" />
                  <div>
                    <div className="text-lg text-gray-600">Available to Claim</div>
                    <div className="text-3xl font-bold text-gray-800">{user.boxesAvailableToClaim}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Claim Boxes Section */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Claim Boxes</h3>
            <form onSubmit={handleClaim} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Number of boxes to claim: {claimBoxes}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={claimBoxes}
                  onChange={(e) => setClaimBoxes(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${(claimBoxes / 100) * 100}%, #e5e7eb ${(claimBoxes / 100) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
              <button
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                type="submit"
                disabled={loading || claimBoxes === 0}
              >
                {loading ? 'Claiming...' : `Claim ${claimBoxes} Boxes`}
              </button>
              {claimSuccess && <div className="text-green-600 text-center font-semibold">{claimSuccess}</div>}
              {claimError && <div className="text-red-600 text-center font-semibold">{claimError}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
          onSubmit={handleSignIn}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">User Sign In</h2>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            type="submit"
            disabled={loading}
          >
            <LogIn />
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button

            type="button"
            className="text-gray-500 hover:text-gray-800 underline mt-2"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
