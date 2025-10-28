import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';

const INDUSTRIES = [
  'Technology', 'Food & Beverage', 'Fashion', 'Healthcare', 
  'Education', 'Entertainment', 'Real Estate', 'Finance',
  'Retail', 'Manufacturing', 'Services', 'Other'
];

const PRESET_COLORS = [
  '#4F46E5', '#7C3AED', '#EC4899', '#EF4444',
  '#F59E0B', '#10B981', '#3B82F6', '#6366F1',
  '#8B5CF6', '#14B8A6', '#06B6D4', '#84CC16'
];

export default function CreateBusiness() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: 'Technology',
    logoColor: '#4F46E5',
    tagline: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/businesses', formData);
      alert('Business created successfully! 🎉');
      navigate(`/business/${response.data.id}`);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create business');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Your Business 🚀</h1>
          <p className="text-xl opacity-90">Build your brand and start selling</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your business name"
                required
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="A catchy phrase that describes your business"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">Optional - Make it memorable!</p>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Tell customers what makes your business special..."
              />
            </div>

            {/* Brand Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Color
              </label>
              <div className="grid grid-cols-6 gap-3 mb-3">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, logoColor: color }))}
                    className={`w-full aspect-square rounded-lg transition ${
                      formData.logoColor === color 
                        ? 'ring-4 ring-offset-2 ring-indigo-500' 
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                name="logoColor"
                value={formData.logoColor}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-300"
              />
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div 
                className="rounded-lg p-8 text-white"
                style={{ backgroundColor: formData.logoColor }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-3xl font-bold mr-4">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">
                      {formData.name || 'Your Business Name'}
                    </h3>
                    <p className="text-lg opacity-90">{formData.industry}</p>
                  </div>
                </div>
                {formData.tagline && (
                  <p className="text-xl italic opacity-90">"{formData.tagline}"</p>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Business'}
              </button>
            </div>
          </form>
        </div>

        {/* Next Steps Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-900 mb-3">📝 Next Steps</h3>
          <ul className="space-y-2 text-blue-800">
            <li>✓ After creating your business, you can add products and services</li>
            <li>✓ Set prices and manage inventory</li>
            <li>✓ Your business will appear on the global marketplace</li>
            <li>✓ Watch your revenue grow as customers purchase from you!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
