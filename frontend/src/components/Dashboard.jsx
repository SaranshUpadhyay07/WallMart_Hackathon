import React, { useEffect, useState } from 'react';
import { Package, Users, TrendingUp } from 'lucide-react';

const Dashboard = ({ onNavigateToLanding }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/user/all')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  const totalBoxesRecycled = users.reduce((sum, u) => sum + (u.totalBoxesRecycled || 0), 0);
  const totalAvailable = users.reduce((sum, u) => sum + (u.boxesAvailableToClaim || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="h-8 w-8 text-green-600" /> Dashboard
        </h1>
        <button onClick={onNavigateToLanding} className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition">
          Home
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <Package className="h-8 w-8 text-emerald-600 mb-2" />
          <div className="text-lg font-semibold">Total Boxes Recycled</div>
          <div className="text-2xl font-bold text-green-700">{totalBoxesRecycled}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
          <div className="text-lg font-semibold">Total Available to Claim</div>
          <div className="text-2xl font-bold text-emerald-700">{totalAvailable}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <Users className="h-8 w-8 text-green-600 mb-2" />
          <div className="text-lg font-semibold">Total Users</div>
          <div className="text-2xl font-bold text-green-700">{users.length}</div>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user._id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="font-bold text-lg text-green-800">{user.name}</div>
              <div className="text-gray-600">Number: {user.number}</div>
              <div className="text-gray-700">Total Recycled: <span className="font-semibold">{user.totalBoxesRecycled}</span></div>
              <div className="text-gray-700">Available to Claim: <span className="font-semibold">{user.boxesAvailableToClaim}</span></div>
              <div className="text-xs text-gray-400 mt-2">Created: {new Date(user.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;