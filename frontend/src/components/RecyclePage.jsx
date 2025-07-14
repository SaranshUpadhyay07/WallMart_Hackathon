import React, { useState } from 'react';

export default function RecyclePage({ mode, onClose }) {
  const [showCreate, setShowCreate] = useState(mode === 'create');
  const [showDashboard, setShowDashboard] = useState(mode === 'details');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <h1 className="text-3xl font-bold mb-8">Reuse</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {!mode && <>
          <button
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            onClick={() => setShowCreate(true)}
          >
            Add New User
          </button>
          <button
            className="bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
            onClick={() => setShowDashboard(true)}
          >
            Go to User Dashboard
          </button>
        </>}
        <button
          className="mt-8 text-gray-600 underline"
          onClick={onClose}
        >
          Back to Home
        </button>
      </div>
      {showCreate && <CreateUserForm onClose={onClose} />}
      {showDashboard && <UserDashboard onClose={onClose} />}
    </div>
  );
}

function CreateUserForm({ onClose }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, number })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Add New User</h2>
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
        <button
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
        {result && <div className="text-green-700 text-sm">User created: {result.name} ({result.number})</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="button" className="text-gray-500 underline mt-2" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}

function UserDashboard({ onClose }) {
  const [number, setNumber] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('');
  const [boxes, setBoxes] = useState(0);
  const [actionResult, setActionResult] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    setUser(null);
    setActionResult(null);
    try {
      const res = await fetch(`http://localhost:3000/user?number=${number}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'User not found');
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type) => {
    setLoading(true);
    setError('');
    setActionResult(null);
    try {
      const res = await fetch(`http://localhost:3000/user/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, boxes: Number(boxes) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');
      setActionResult(data);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setBoxes(0);
      setAction('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-96">
        <h2 className="text-xl font-bold">User Dashboard</h2>
        <input
          className="border p-2 rounded"
          placeholder="Enter User Number"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
        <button
          className="bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
          onClick={fetchUser}
          disabled={loading || !number}
        >
          {loading ? 'Fetching...' : 'Get User'}
        </button>
        {user && (
          <div className="bg-emerald-50 p-4 rounded flex flex-col gap-2">
            <div><b>Name:</b> {user.name}</div>
            <div><b>Number:</b> {user.number}</div>
            <div><b>Total Boxes Recycled:</b> {user.totalBoxesRecycled}</div>
            <div><b>Available to Claim:</b> {user.boxesAvailableToClaim}</div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                onClick={() => setAction('add')}
              >Add Boxes</button>
              <button
                className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700"
                onClick={() => setAction('use')}
              >Claim Boxes</button>
            </div>
          </div>
        )}
        {action && (
          <div className="flex flex-col gap-2 mt-2">
            <input
              className="border p-2 rounded"
              type="number"
              min="1"
              placeholder={action === 'add' ? 'Boxes to Add' : 'Boxes to Claim'}
              value={boxes}
              onChange={e => setBoxes(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => handleAction(action)}
              disabled={loading || !boxes}
            >
              {loading ? 'Processing...' : (action === 'add' ? 'Add' : 'Claim')}
            </button>
            <button className="text-gray-500 underline" onClick={() => setAction('')}>Cancel</button>
          </div>
        )}
        {actionResult && (
          <div className="text-green-700 text-sm mt-2">Success! Updated user info.</div>
        )}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="button" className="text-gray-500 underline mt-2" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
