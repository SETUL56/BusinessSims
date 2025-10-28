import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navigation from '../components/Navigation';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [myBusinesses, setMyBusinesses] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [businessesRes, transactionsRes, investmentsRes] = await Promise.all([
        axios.get('/api/my-businesses'),
        axios.get('/api/my-transactions'),
        axios.get('/api/my-investments')
      ]);

      setMyBusinesses(businessesRes.data);
      setRecentTransactions(transactionsRes.data.slice(0, 5));
      setInvestments(investmentsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = myBusinesses.reduce((sum, b) => sum + b.revenue, 0);
  const totalInvested = investments.reduce((sum, i) => sum + (i.quantity * i.purchase_price), 0);
  const currentInvestmentValue = investments.reduce((sum, i) => sum + (i.quantity * i.current_price), 0);
  const investmentGainLoss = currentInvestmentValue - totalInvested;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.username}! 👋</h1>
          <p className="text-xl opacity-90">Your entrepreneurial dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Account Balance</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              ${user.balance.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Play Money</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">My Businesses</span>
              <span className="text-2xl">🏢</span>
            </div>
            <div className="text-3xl font-bold text-indigo-600">
              {myBusinesses.length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Active businesses</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Revenue</span>
              <span className="text-2xl">📈</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">From all businesses</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Investment P/L</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className={`text-3xl font-bold ${investmentGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(investmentGainLoss).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">{investmentGainLoss >= 0 ? 'Profit' : 'Loss'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            to="/create-business"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">🚀</span>
              <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition">→</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Create Business</h3>
            <p className="text-gray-600 text-sm">Launch a new business venture</p>
          </Link>

          <Link 
            to="/marketplace"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">🏪</span>
              <span className="text-purple-600 opacity-0 group-hover:opacity-100 transition">→</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Marketplace</h3>
            <p className="text-gray-600 text-sm">Browse and shop from other businesses</p>
          </Link>

          <Link 
            to="/trading"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">📈</span>
              <span className="text-green-600 opacity-0 group-hover:opacity-100 transition">→</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Trade Markets</h3>
            <p className="text-gray-600 text-sm">Invest in stocks and cryptocurrency</p>
          </Link>
        </div>

        {/* My Businesses */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Businesses</h2>
            <Link to="/my-businesses" className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">
              View All →
            </Link>
          </div>
          {myBusinesses.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🏢</div>
              <p className="text-lg mb-2">No businesses yet</p>
              <Link to="/create-business" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Create your first business →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myBusinesses.slice(0, 4).map(business => (
                <Link
                  key={business.id}
                  to={`/business/${business.id}`}
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3"
                        style={{ backgroundColor: business.logo_color }}
                      >
                        {business.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{business.name}</h3>
                        <p className="text-sm text-gray-500">{business.industry}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-semibold text-green-600">${business.revenue.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Purchases</h2>
          {recentTransactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🛍️</div>
              <p className="text-lg">No transactions yet</p>
              <Link to="/marketplace" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Start shopping →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">🛍️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{transaction.product_name}</p>
                      <p className="text-sm text-gray-500">from {transaction.business_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">-${transaction.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
