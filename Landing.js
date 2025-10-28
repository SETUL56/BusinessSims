import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            🚀 Entrepreneur Simulator
          </h1>
          <p className="text-2xl mb-4 opacity-90">
            Build. Launch. Compete. Learn.
          </p>
          <p className="text-xl mb-12 opacity-80 max-w-3xl mx-auto">
            A comprehensive business building and launch simulation platform designed for education. 
            Create your business, sell products, trade stocks, and compete with classmates in a 
            risk-free environment using play money.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition">
              <h2 className="text-3xl font-bold mb-4">👨‍🎓 For Students</h2>
              <ul className="text-left space-y-3 mb-6">
                <li>✅ Create and manage your business</li>
                <li>✅ Design your brand and products</li>
                <li>✅ Sell on the global marketplace</li>
                <li>✅ Trade stocks and cryptocurrency</li>
                <li>✅ Compete with classmates</li>
                <li>✅ Learn real-world business skills</li>
              </ul>
              <Link 
                to="/register" 
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Start as Student
              </Link>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition">
              <h2 className="text-3xl font-bold mb-4">👩‍🏫 For Teachers</h2>
              <ul className="text-left space-y-3 mb-6">
                <li>✅ Monitor all student activities</li>
                <li>✅ View comprehensive reports</li>
                <li>✅ Track business performance</li>
                <li>✅ See transaction history</li>
                <li>✅ Identify top performers</li>
                <li>✅ Export data for grading</li>
              </ul>
              <Link 
                to="/register" 
                className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Start as Teacher
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6">🎯 Platform Features</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl mb-3">💼</div>
                <h4 className="text-xl font-bold mb-2">Business Creation</h4>
                <p className="opacity-80">Build your brand with custom landing pages and product listings</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl mb-3">🏪</div>
                <h4 className="text-xl font-bold mb-2">Global Marketplace</h4>
                <p className="opacity-80">Browse and purchase from all student businesses</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl mb-3">📈</div>
                <h4 className="text-xl font-bold mb-2">Stock & Crypto Trading</h4>
                <p className="opacity-80">Invest in simulated markets with real-time price updates</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="text-xl font-bold mb-2">Play Money System</h4>
                <p className="opacity-80">Start with $10,000 in simulated currency</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="text-xl font-bold mb-2">Analytics Dashboard</h4>
                <p className="opacity-80">Track your performance and revenue in real-time</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="text-xl font-bold mb-2">Leaderboards</h4>
                <p className="opacity-80">Compete to become the top entrepreneur</p>
              </div>
            </div>
          </div>

          <div className="text-sm opacity-70">
            <p>Already have an account? <Link to="/login" className="underline hover:opacity-100">Login here</Link></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
