import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(user?.balance || 0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Fetch latest balance periodically
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('/api/user/balance');
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={user?.role === 'student' ? '/dashboard' : '/admin'} className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">🚀 Entrepreneur Sim</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {user?.role === 'student' && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition">Dashboard</Link>
                <Link to="/my-businesses" className="text-gray-700 hover:text-indigo-600 font-medium transition">My Businesses</Link>
                <Link to="/marketplace" className="text-gray-700 hover:text-indigo-600 font-medium transition">Marketplace</Link>
                <Link to="/trading" className="text-gray-700 hover:text-indigo-600 font-medium transition">Trading</Link>
              </>
            )}

            {user?.role === 'teacher' && (
              <Link to="/admin" className="text-gray-700 hover:text-indigo-600 font-medium transition">Admin Dashboard</Link>
            )}

            {user?.role === 'student' && (
              <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <span className="text-sm text-gray-600 mr-2">Balance:</span>
                <span className="text-lg font-bold text-green-600">${balance.toLocaleString()}</span>
              </div>
            )}

            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
                <span>{user?.username}</span>
                <span className="text-xs">▼</span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="font-semibold text-gray-800">{user?.username}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setShowMenu(!showMenu)} className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {showMenu && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {user?.role === 'student' && (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded" onClick={() => setShowMenu(false)}>Dashboard</Link>
                  <Link to="/my-businesses" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded" onClick={() => setShowMenu(false)}>My Businesses</Link>
                  <Link to="/marketplace" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded" onClick={() => setShowMenu(false)}>Marketplace</Link>
                  <Link to="/trading" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded" onClick={() => setShowMenu(false)}>Trading</Link>
                  <div className="px-4 py-2 bg-green-50 rounded">
                    <span className="text-sm text-gray-600">Balance: </span>
                    <span className="font-bold text-green-600">${balance.toLocaleString()}</span>
                  </div>
                </>
              )}
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
