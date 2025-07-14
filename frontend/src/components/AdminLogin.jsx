import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate("/dashboard"); // Navigate to dashboard
    } else {
      setError("Please enter username and password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold">Admin Login</h2>
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          type="submit"
        >
          Login
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="button"
          className="text-gray-500 underline mt-2"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </form>
    </div>
  );
}
