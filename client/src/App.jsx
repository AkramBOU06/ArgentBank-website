// client/src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import TransactionsPage from './pages/TransactionsPage';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/transactions/:accountId" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
