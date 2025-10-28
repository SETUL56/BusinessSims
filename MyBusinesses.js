import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';

export default function MyBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    type: 'product'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('/api/my-businesses');
      setBusinesses(response.data);
      if (response.data.length > 0) {
        loadBusinessProducts(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBusinessProducts = async (businessId) => {
    try {
      const response = await axios.get(`/api/businesses/${businessId}/products`);
      setProducts(response.data);
      setSelectedBusiness(businessId);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!selectedBusiness) {
      alert('Please select a business first');
      return;
    }

    try {
      await axios.post('/api/products', {
        business_id: selectedBusiness,
        ...productForm,
        price: parseFloat(productForm.price),
        stock: productForm.type === 'product' ? parseInt(productForm.stock) : 0
      });

      alert('Product added successfully! 🎉');
      setProductForm({ name: '', description: '', price: '', stock: '', type: 'product' });
      setShowProductModal(false);
      loadBusinessProducts(selectedBusiness);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add product');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-600">Loading your businesses...</div>
        </div>
      </div>
    );
  }

  const currentBusiness = businesses.find(b => b.id === selectedBusiness);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">My Businesses 🏢</h1>
          <p className="text-xl opacity-90">Manage your ventures and products</p>
        </div>

        {businesses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No businesses yet</h3>
            <p className="text-gray-600 mb-6">Create your first business to get started</p>
            <Link 
              to="/create-business"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Create Business
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Business List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Your Businesses</h2>
                  <Link 
                    to="/create-business"
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
                  >
                    + New
                  </Link>
                </div>
                <div className="space-y-3">
                  {businesses.map(business => (
                    <button
                      key={business.id}
                      onClick={() => loadBusinessProducts(business.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition ${
                        selectedBusiness === business.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mr-3"
                          style={{ backgroundColor: business.logo_color }}
                        >
                          {business.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{business.name}</h3>
                          <p className="text-xs text-gray-500">{business.industry}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-semibold text-green-600">
                          ${business.revenue.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Management */}
            <div className="lg:col-span-2">
              {currentBusiness && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div 
                    className="rounded-lg p-6 text-white mb-6"
                    style={{ backgroundColor: currentBusiness.logo_color }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-1">{currentBusiness.name}</h2>
                        <p className="text-lg opacity-90">{currentBusiness.industry}</p>
                      </div>
                      <Link 
                        to={`/business/${currentBusiness.id}`}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-semibold transition"
                      >
                        View Public Page →
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Products & Services</h3>
                    <button
                      onClick={() => setShowProductModal(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                      + Add Product
                    </button>
                  </div>

                  {products.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-6xl mb-4">📦</div>
                      <p className="text-gray-600 mb-4">No products yet</p>
                      <button
                        onClick={() => setShowProductModal(true)}
                        className="text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        Add your first product →
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {products.map(product => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-gray-800">{product.name}</h4>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${
                                product.type === 'product' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {product.type}
                              </span>
                            </div>
                            <span className="text-xl font-bold text-green-600">
                              ${product.price}
                            </span>
                          </div>
                          {product.description && (
                            <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                          )}
                          {product.type === 'product' && (
                            <div className="text-sm text-gray-500">
                              Stock: <span className="font-semibold">{product.stock}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product/Service</h2>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, type: 'product' }))}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition ${
                        productForm.type === 'product'
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      📦 Physical Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductForm(prev => ({ ...prev, type: 'service' }))}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition ${
                        productForm.type === 'service'
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      💼 Service
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  {productForm.type === 'product' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                      <input
                        type="number"
                        min="0"
                        value={productForm.stock}
                        onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required={productForm.type === 'product'}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductModal(false);
                      setProductForm({ name: '', description: '', price: '', stock: '', type: 'product' });
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
