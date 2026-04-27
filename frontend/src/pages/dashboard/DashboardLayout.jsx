import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  OverviewIcon, 
  RewardsIcon, 
  CustomersIcon, 
  AnalyticsIcon, 
  SettingsIcon, 
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  BellIcon,
  CampaignsIcon,
  FinanceIcon,
  ShieldIcon,
  UserIcon
} from '../../components/dashboard/DashboardIcons';
import './dashboard.css';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved === 'true';
  });

  // Mock state for auto-pause notification
  const [isProgramPaused, setIsProgramPaused] = useState(false);

  // Simulation: Trigger pause via header button instead of timeout
  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', isCollapsed);
  }, [isCollapsed]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <OverviewIcon /> },
    { path: '/dashboard/program', label: 'Loyalty Program', icon: <RewardsIcon /> },
    { path: '/dashboard/campaigns', label: 'Campaign Builder', icon: <CampaignsIcon /> },
    { path: '/dashboard/customers', label: 'Customers', icon: <CustomersIcon /> },
    { path: '/dashboard/financials', label: 'Financial Controls', icon: <FinanceIcon /> },
    { path: '/dashboard/analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
    { path: '/dashboard/audits', label: 'Security & Audits', icon: <ShieldIcon /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <SettingsIcon /> },
  ];


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!isCollapsed && <span className="brand-text">ZAKAZPRO</span>}
          <button 
            className="collapse-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRightIcon size={18} /> : <ChevronLeftIcon size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            // Role-based visibility logic (mocked up for demonstration)
            if (item.path === '/dashboard/audits' && user?.role === 'Cashier') {
              return null; // hide for normal cashiers
            }
            return (
              <NavLink 
                key={item.path} 
                to={item.path} 
                end={item.path === '/dashboard'} 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-item" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}>
            <LogoutIcon />
            <span className="nav-label">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {isProgramPaused && (
          <div className="pause-banner animate-slideDown">
            <div className="pause-banner-content">
              <span>⚠️ <strong>Program Paused:</strong> Monthly discount budget limit exceeded. All redemptions are temporarily suspended.</span>
              <button 
                className="btn-link" 
                onClick={() => setIsProgramPaused(false)}
                style={{ color: '#000', fontWeight: 'bold', marginLeft: '12px', textDecoration: 'underline' }}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        <header className="top-bar">
          <div className="top-bar-left">
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Admin Console</h2>
          </div>
          
          <div className="top-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Dev helper to trigger UI alert dynamically */}
            <button className="btn btn-ghost" style={{ fontSize: '11px', padding: '4px 8px', border: '1px solid var(--color-border)' }} onClick={() => setIsProgramPaused(!isProgramPaused)}>
              {isProgramPaused ? 'Hide Alert' : 'Test Alert'}
            </button>
            <button className="btn-icon"><SearchIcon size={18} /></button>
            <button className="btn-icon"><BellIcon size={18} /></button>
            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px' }}>
              <div className="user-info" style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{user?.businessName || 'Business Admin'}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{user?.businessId || 'BIZ-8492-ZKP'}</div>
              </div>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                background: 'linear-gradient(135deg, var(--color-gold), #b38a1d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#000'
              }}>
                {user?.businessName ? user.businessName[0].toUpperCase() : <UserIcon size={20} />}
              </div>
            </div>
          </div>
        </header>

        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
