import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { socket } from '../App';

export default function Marketplace() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();

    socket.on('new_business', (business) => {
      setBusinesses(prev => [business, ...prev]);
    });

    return () => {
      socket.off('new_business');
    };
  }, []);

  useEffect(() => {
    filterBusinesses();
  }, [businesses, searchTerm, selectedIndustry]);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('/api/businesses');
      setBusinesses(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBusinesses = () => {
    let filtered = businesses;

    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(b => b.industry === selectedIndustry);
    }

    setFilteredBusinesses(filtered);
  };

  const industries = [...new Set(businesses.map(b => b.industry))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-600">Loading marketplace...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Global Marketplace 🏪</h1>
          <p className="text-xl opacity-90">Discover and support student businesses</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Businesses
              </label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredBusinesses.length}</span> business{filteredBusinesses.length !== 1 && 'es'}
          </p>
        </div>

        {/* Businesses Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No businesses found</h3>
            <p className="text-gray-600">Try adjusting your filters or be the first to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map(business => (
              <Link
                key={business.id}
                to={`/business/${business.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group"
              >
                {/* Business Header */}
                <div 
                  className="h-32 p-6 flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${business.logo_color} 0%, ${business.logo_color}dd 100%)` 
                  }}
                >
                  <div className="text-white text-center">
                    <div className="text-4xl font-bold mb-1">
                      {business.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-green-600 transition">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-500">{business.industry}</p>
                  </div>

                  {business.tagline && (
                    <p className="text-sm text-gray-600 mb-3 italic">
                      "{business.tagline}"
                    </p>
                  )}

                  {business.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {business.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">👤</span>
                      {business.owner_username}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-green-600">
                      <span className="mr-1">💰</span>
                      ${business.revenue.toLocaleString()}
                    </div>
                  </div>

                  <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                    View Products →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
