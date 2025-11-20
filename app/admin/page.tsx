'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleLogin = () => {
    // Simple password protection (change this password!)
    if (password === 'akintunde2025') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gray-700 text-yellow-500 font-bold rounded-lg hover:bg-gray-600"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Memorial Site Admin</h1>
          <p className="text-gray-600">View RSVPs and messages from the Vercel logs</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to View Submissions</h2>
          <div className="space-y-4 text-gray-700">
            <p>1. Go to your Vercel dashboard: <a href="https://vercel.com/dashboard" target="_blank" className="text-blue-600 underline">vercel.com/dashboard</a></p>
            <p>2. Click on your <strong>memorial-site</strong> project</p>
            <p>3. Go to the <strong>Logs</strong> tab</p>
            <p>4. You'll see all RSVP and message submissions logged there</p>
            <p className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <strong>Note:</strong> All form submissions are logged to Vercel with full details including name, email, phone, and messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
