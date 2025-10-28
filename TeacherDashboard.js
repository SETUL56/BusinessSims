import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { useAuth } from '../context/AuthContext';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-600">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  const { stats, topBusinesses, topStudents, recentTransactions } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Teacher Dashboard 👩‍🏫</h1>
          <p className="text-xl opacity-90">Monitor and analyze student performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Students</span>
              <span className="text-2xl">👨‍🎓</span>
            </div>
            <div className="text-3xl font-bold text-indigo-600">{stats.totalStudents}</div>
            <p className="text-xs text-gray-500 mt-1">Active participants</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Businesses Created</span>
              <span className="text-2xl">🏢</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">{stats.totalBusinesses}</div>
            <p className="text-xs text-gray-500 mt-1">Student ventures</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Transactions</span>
              <span className="text-2xl">💳</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{stats.totalTransactions}</div>
            <p className="text-xs text-gray-500 mt-1">Marketplace activity</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Revenue</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-yellow-600">
              ${(stats.totalRevenue || 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Simulated earnings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['overview', 'businesses', 'students', 'transactions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Average Revenue per Business</p>
                      <p className="text-2xl font-bold text-indigo-600">
                        ${stats.totalBusinesses > 0 ? ((stats.totalRevenue || 0) / stats.totalBusinesses).toFixed(2) : '0.00'}
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Businesses per Student</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {stats.totalStudents > 0 ? (stats.totalBusinesses / stats.totalStudents).toFixed(1) : '0'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-2">
                    {recentTransactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm">💳</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {transaction.buyer_username} purchased {transaction.product_name}
                            </p>
                            <p className="text-xs text-gray-500">from {transaction.business_name}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-green-600">
                          ${transaction.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Businesses Tab */}
            {activeTab === 'businesses' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Top Performing Businesses</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topBusinesses.map((business, index) => (
                        <tr key={business.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-2xl">
                              {index === 0 && '🥇'}
                              {index === 1 && '🥈'}
                              {index === 2 && '🥉'}
                              {index > 2 && `#${index + 1}`}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mr-3"
                                style={{ backgroundColor: business.logo_color }}
                              >
                                {business.name.charAt(0)}
                              </div>
                              <div className="font-medium text-gray-900">{business.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {business.owner_username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {business.industry}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-green-600">
                              ${business.revenue.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Top Performing Students</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Businesses</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topStudents.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-2xl">
                              {index === 0 && '🥇'}
                              {index === 1 && '🥈'}
                              {index === 2 && '🥉'}
                              {index > 2 && `#${index + 1}`}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {student.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.business_count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-green-600">
                              ${student.total_revenue.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-indigo-600">
                              ${student.balance.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">All Transactions</h3>
                <div className="space-y-2">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-gray-800">{transaction.buyer_username}</span>
                          <span className="mx-2 text-gray-400">→</span>
                          <span className="text-gray-600">{transaction.seller_username}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {transaction.product_name} from {transaction.business_name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <span className="text-lg font-bold text-green-600">
                          ${transaction.amount.toLocaleString()}
                        </span>
                        <p className="text-xs text-gray-500">Qty: {transaction.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
