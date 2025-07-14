import React, { useEffect, useState } from 'react';
import { Package, Users, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const Dashboard = ({ onNavigateToLanding }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addNumber, setAddNumber] = useState('');
  const [addBoxes, setAddBoxes] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

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

  const chartData = users.map(user => ({
    name: user.name || 'N/A',
    recycled: user.totalBoxesRecycled || 0,
    available: user.boxesAvailableToClaim || 0,
  }));

  const handleAddBoxes = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    setAddSuccess('');
    try {
      const response = await fetch('http://localhost:3000/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: addNumber, boxes: Number(addBoxes) }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add boxes');
      }
      setAddSuccess(`Successfully added ${addBoxes} boxes to user ${data.name}!`);
      setAddNumber('');
      setAddBoxes('');
      // Refresh users list
      fetch('http://localhost:3000/user/all')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error('Failed to refresh users:', err));
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAddLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-8 w-8 text-green-600" /> Dashboard
          </h1>
          <div className="flex gap-4">
            <button
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-emerald-700 transition flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Boxes
            </button>
            <button
                onClick={() => navigate('/')}
                className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition"
            >
              Home
            </button>
          </div>
        </div>

        {/* KPI Cards */}
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

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Recycling Overview</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="recycled" fill="#1ca44eff" name="Recycled Boxes" />
              <Bar dataKey="available" fill="#034c34ff" name="Available to Claim" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Grid */}
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
                    <div className="text-gray-700">
                      Total Recycled: <span className="font-semibold">{user.totalBoxesRecycled}</span>
                    </div>
                    <div className="text-gray-700">
                      Available to Claim: <span className="font-semibold">{user.boxesAvailableToClaim}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Created: {new Date(user.createdAt).toLocaleString()}
                    </div>
                  </div>
              ))}
            </div>
        )}

        {/* Add Boxes Modal */}
        {showAddModal && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <form
                  className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6 w-96"
                  onSubmit={handleAddBoxes}
              >
                <h2 className="text-2xl font-bold text-center text-gray-800">Add Boxes to User</h2>
                <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="User Number"
                    value={addNumber}
                    onChange={(e) => setAddNumber(e.target.value)}
                    required
                />
                <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Number of Boxes"
                    type="number"
                    min="1"
                    value={addBoxes}
                    onChange={(e) => setAddBoxes(e.target.value)}
                    required
                />
                <button
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
                    type="submit"
                    disabled={addLoading}
                >
                  {addLoading ? 'Adding...' : 'Add Boxes'}
                </button>
                {addSuccess && <div className="text-green-600 text-sm text-center">{addSuccess}</div>}
                {addError && <div className="text-red-600 text-sm text-center">{addError}</div>}
                <button
                    type="button"
                    className="text-gray-500 hover:text-gray-800 underline"
                    onClick={() => {
                      setShowAddModal(false);
                      setAddNumber('');
                      setAddBoxes('');
                      setAddError('');
                      setAddSuccess('');
                    }}
                >
                  Cancel
                </button>
              </form>
            </div>
        )}
      </div>
  );
};

export default Dashboard;

