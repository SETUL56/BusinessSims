import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navigation from '../components/Navigation';

export default function BusinessDetails() {
  const { id } = useParams();
  const { user, updateBalance } = useAuth();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);

  useEffect(() => {
    fetchBusinessDetails();
  }, [id]);

  const fetchBusinessDetails = async () => {
    try {
      const response = await axios.get(`/api/businesses/${id}`);
      setBusiness(response.data);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching business details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (product) => {
    if (purchasing) return;
    
    const quantity = prompt(`How many ${product.name} would you like to buy?`, '1');
    if (!quantity || isNaN(quantity) || parseInt(quantity) < 1) return;

    const qty = parseInt(quantity);
    const totalCost = product.price * qty;

    if (totalCost > user.balance) {
      alert(`Insufficient funds! You need $${totalCost.toLocaleString()} but only have $${user.balance.toLocaleString()}.`);
      return;
    }

    if (product.type === 'product' && product.stock < qty) {
      alert(`Not enough stock! Only ${product.stock} available.`);
      return;
    }

    if (!window.confirm(`Purchase ${qty} ${product.name}(s) for $${totalCost.toLocaleString()}?`)) {
      return;
    }

    setPurchasing(product.id);

    try {
      const response = await axios.post('/api/transactions', {
        product_id: product.id,
        quantity: qty
      });

      alert('Purchase successful! 🎉');
      updateBalance(response.data.newBalance);
      fetchBusinessDetails(); // Refresh to update stock
    } catch (error) {
      alert(error.response?.data?.error || 'Purchase failed');
    } finally {
      setPurchasing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-600">Loading business...</div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Business not found</h2>
            <button 
              onClick={() => navigate('/marketplace')}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              ← Back to Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/marketplace')}
          className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
        >
          <span className="mr-2">←</span> Back to Marketplace
        </button>

        {/* Business Hero */}
        <div 
          className="rounded-2xl p-12 text-white mb-8 relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${business.logo_color} 0%, ${business.logo_color}dd 100%)` 
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-4xl font-bold mr-6">
                {business.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">{business.name}</h1>
                <p className="text-xl opacity-90">{business.industry}</p>
              </div>
            </div>

            {business.tagline && (
              <p className="text-2xl italic mb-4 opacity-90">"{business.tagline}"</p>
            )}

            {business.description && (
              <p className="text-lg opacity-90 max-w-3xl">{business.description}</p>
            )}

            <div className="mt-6 flex items-center space-x-8">
              <div>
                <span className="text-sm opacity-75">Owner</span>
                <p className="text-lg font-semibold">{business.owner_username}</p>
              </div>
              <div>
                <span className="text-sm opacity-75">Revenue</span>
                <p className="text-lg font-semibold">${business.revenue.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm opacity-75">Products</span>
                <p className="text-lg font-semibold">{products.length}</p>
              </div>
            </div>
          </div>

          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {products.length > 0 ? 'Products & Services' : 'Coming Soon'}
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-xl text-gray-600">No products available yet</p>
              <p className="text-gray-500 mt-2">This business is still setting up their catalog</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div 
                  key={product.id} 
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        product.type === 'product' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {product.type === 'product' ? '📦 Product' : '💼 Service'}
                      </span>
                    </div>
                  </div>

                  {product.description && (
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  )}

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600 text-sm">Price</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>

                    {product.type === 'product' && (
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-600 text-sm">Stock</span>
                        <span className={`font-semibold ${product.stock > 0 ? 'text-gray-800' : 'text-red-600'}`}>
                          {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => handlePurchase(product)}
                      disabled={
                        purchasing === product.id || 
                        (product.type === 'product' && product.stock === 0) ||
                        product.price > user.balance
                      }
                      className={`w-full py-3 rounded-lg font-semibold transition ${
                        purchasing === product.id || 
                        (product.type === 'product' && product.stock === 0) ||
                        product.price > user.balance
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {purchasing === product.id ? 'Processing...' : 
                       (product.type === 'product' && product.stock === 0) ? 'Out of Stock' :
                       product.price > user.balance ? 'Insufficient Funds' :
                       'Purchase Now'}
                    </button>
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
