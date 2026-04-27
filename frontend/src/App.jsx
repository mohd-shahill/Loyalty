import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingFlow from './pages/onboarding/OnboardingFlow';
import Login from './pages/auth/Login';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import ProgramConfig from './pages/dashboard/ProgramConfig';
import CustomerManagement from './pages/dashboard/CustomerManagement';
import Campaigns from './pages/dashboard/Campaigns';
import Financials from './pages/dashboard/Financials';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';
import Audits from './pages/dashboard/Audits';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout transition:name="dash-layout" />}>
              <Route index element={<Overview />} />
              <Route path="program" element={<ProgramConfig />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="financials" element={<Financials />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="audits" element={<Audits />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          {/* Catch all redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
