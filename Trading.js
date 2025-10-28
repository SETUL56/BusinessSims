import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { socket } from '../App';

export default function Trading() {
  const { user, updateBalance } = useAuth();
  const [activeMarket, setActiveMarket] = useState('stocks');
  const [stocks, setStocks] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [myInvestments, setMyInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();

    socket.on('market_update', (data) => {
      setStocks(data.stocks);
      setCrypto(data.crypto);
    });

    return () => {
      socket.off('market_update');
    };
  }, []);

  const fetchMarketData = async () => {
    try {
      const [stocksRes, cryptoRes, investmentsRes] = await Promise.all([
        axios.get('/api/market/stocks'),
        axios.get('/api/market/crypto'),
        axios.get('/api/my-investments')
      ]);

      setStocks(stocksRes.data);
      setCrypto(cryptoRes.data);
      setMyInvestments(investmentsRes.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async (asset, assetType) => {
    const quantity = prompt(`How many ${asset.symbol} would you like to buy?`, '1');
    if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) return;

    const qty = parseFloat(quantity);
    const totalCost = asset.price * qty;

    if (totalCost > user.balance) {
      alert(`Insufficient funds! You need $${totalCost.toLocaleString()} but only have $${user.balance.toLocaleString()}.`);
      return;
    }

    if (!window.confirm(`Buy ${qty} ${asset.symbol} for $${totalCost.toLocaleString()}?`)) {
      return;
    }

    try {
      const response = await axios.post('/api/investments', {
        asset_type: assetType,
        asset_id: asset.id,
        quantity: qty
      });

      alert('Investment successful! 📈');
      updateBalance(response.data.newBalance);
      fetchMarketData();
    } catch (error) {
      alert(error.response?.data?.error || 'Investment failed');
    }
  };

  const currentAssets = activeMarket === 'stocks' ? stocks : crypto;
  const portfolioValue = myInvestments.reduce((sum, inv) => sum + (inv.quantity * inv.current_price), 0);
  const totalInvested = myInvestments.reduce((sum, inv) => sum + (inv.quantity * inv.purchase_price), 0);
  const profitLoss = portfolioValue - totalInvested;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl text-gray-600">Loading markets...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Trading Platform 📈</h1>
          <p className="text-xl opacity-90">Invest in simulated stocks and cryptocurrency</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Portfolio Value</span>
              <span className="text-2xl">💼</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              ${portfolioValue.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Invested</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              ${totalInvested.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Profit/Loss</span>
              <span className="text-2xl">{profitLoss >= 0 ? '📈' : '📉'}</span>
            </div>
            <div className={`text-3xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(profitLoss).toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Holdings</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-indigo-600">
              {myInvestments.length}
            </div>
          </div>
        </div>

        {/* Market Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveMarket('stocks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeMarket === 'stocks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 Stock Market
              </button>
              <button
                onClick={() => setActiveMarket('crypto')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeMarket === 'crypto'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ₿ Cryptocurrency
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAssets.map(asset => (
                <div key={asset.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{asset.symbol}</h3>
                      <p className="text-sm text-gray-600">{asset.name}</p>
                    </div>
                    <span className={`text-2xl ${Math.abs(asset.change_percent) < 0.01 ? '➡️' : asset.change_percent > 0 ? '📈' : '📉'}`}></span>
                  </div>

                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ${asset.price.toLocaleString()}
                    </div>
                    <div className={`text-sm font-semibold ${asset.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.change_percent >= 0 ? '+' : ''}{asset.change_percent.toFixed(2)}%
                    </div>
                  </div>

                  <button
                    onClick={() => handleInvest(asset, activeMarket === 'stocks' ? 'stock' : 'crypto')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Buy {asset.symbol}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Investments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Investments</h2>
          
          {myInvestments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">💼</div>
              <p className="text-lg mb-2">No investments yet</p>
              <p className="text-sm">Start building your portfolio by investing in stocks or crypto above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myInvestments.map(investment => {
                const currentValue = investment.quantity * investment.current_price;
                const investedValue = investment.quantity * investment.purchase_price;
                const gainLoss = currentValue - investedValue;
                const gainLossPercent = ((currentValue - investedValue) / investedValue) * 100;

                return (
                  <div key={investment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-xl">{investment.asset_type === 'stock' ? '📊' : '₿'}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{investment.asset_symbol}</h3>
                        <p className="text-sm text-gray-500">{investment.asset_name}</p>
                        <p className="text-xs text-gray-400">Quantity: {investment.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        ${currentValue.toLocaleString()}
                      </div>
                      <div className={`text-sm font-semibold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gainLoss >= 0 ? '+' : ''}{gainLoss.toFixed(2)} ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                      </div>
                      <div className="text-xs text-gray-500">
                        Avg: ${investment.purchase_price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
