import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import io from 'socket.io-client';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateBusiness from './pages/CreateBusiness';
import BusinessDetails from './pages/BusinessDetails';
import Marketplace from './pages/Marketplace';
import Trading from './pages/Trading';
import MyBusinesses from './pages/MyBusinesses';

// Initialize Socket.IO
export const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling']
});

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'student' ? '/dashboard' : '/admin'} replace />;
  }

  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  useEffect(() => {
    // Socket.IO event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('new_business', (business) => {
      console.log('New business created:', business);
    });

    socket.on('transaction_completed', (data) => {
      console.log('Transaction completed:', data);
    });

    socket.on('market_update', (data) => {
      console.log('Market updated:', data);
    });

    return () => {
      socket.off('connect');
      socket.off('new_business');
      socket.off('transaction_completed');
      socket.off('market_update');
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={!user ? <Landing /> : 
        <Navigate to={user.role === 'student' ? '/dashboard' : '/admin'} />} 
      />
      <Route path="/login" element={!user ? <Login /> : 
        <Navigate to={user.role === 'student' ? '/dashboard' : '/admin'} />} 
      />
      <Route path="/register" element={!user ? <Register /> : 
        <Navigate to={user.role === 'student' ? '/dashboard' : '/admin'} />} 
      />
      
      {/* Student Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="student">
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/create-business" element={
        <ProtectedRoute requiredRole="student">
          <CreateBusiness />
        </ProtectedRoute>
      } />
      <Route path="/my-businesses" element={
        <ProtectedRoute requiredRole="student">
          <MyBusinesses />
        </ProtectedRoute>
      } />
      <Route path="/marketplace" element={
        <ProtectedRoute>
          <Marketplace />
        </ProtectedRoute>
      } />
      <Route path="/business/:id" element={
        <ProtectedRoute>
          <BusinessDetails />
        </ProtectedRoute>
      } />
      <Route path="/trading" element={
        <ProtectedRoute requiredRole="student">
          <Trading />
        </ProtectedRoute>
      } />
      
      {/* Teacher Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="teacher">
          <TeacherDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
