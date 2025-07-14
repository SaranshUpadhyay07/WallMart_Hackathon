import React, { useState } from 'react';
import RecyclePage from './RecyclePage';

export default function AdminPanel({ onClose }) {
  const [number, setNumber] = useState('');
  const [proceed, setProceed] = useState(false);

  if (proceed) {
    return <RecyclePage mode="admin" adminNumber={number} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-96" onSubmit={e => { e.preventDefault(); setProceed(true); }}>
        <h2 className="text-2xl font-bold mb-2 text-green-800">Admin Panel</h2>
        <div className="text-gray-600 mb-4">Enter user number to manage boxes</div>
        <input
          className="border p-2 rounded"
          placeholder="User Number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700" type="submit">
          Proceed
        </button>
        <button type="button" className="text-gray-500 underline mt-2" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}
