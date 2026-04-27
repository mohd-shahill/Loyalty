import React, { useState } from 'react';
import { 
  StoreIcon, UsersIcon, LinkIcon, BellIcon,
  UserIcon, LockIcon, CreditCardIcon
} from '../../components/dashboard/DashboardIcons';
import './dashboard.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsPurchaseStatus, setSmsPurchaseStatus] = useState('idle');

  const handleSmsPurchase = () => {
    setSmsPurchaseStatus('processing');
    setTimeout(() => {
        setSmsPurchaseStatus('success');
        setTimeout(() => {
            setShowSmsModal(false);
            setSmsPurchaseStatus('idle');
        }, 2000);
    }, 1500);
  };

  // --- Sub-components for each tab ---

  const ProfileTab = () => {
    const [bizName, setBizName] = useState('ZakazPro MegaStore');

    const handleSaveProfile = () => {
      if (!bizName.trim()) {
        alert('⚠️ Business Name is a required field.');
        return;
      }
      alert('✅ Profile details saved securely!');
    };

    return (
    <div className="animate-fadeUp">
      <h3 className="chart-title" style={{ marginBottom: '24px' }}>Business Profile</h3>
      <div className="config-form" style={{ maxWidth: '600px' }}>
        <div className="form-group">
          <label>Unique Business ID (Not Editable)</label>
          <input type="text" value="BIZ-8492-ZKP" className="form-control" style={{ opacity: 0.7 }} readOnly disabled />
        </div>
        <div className="form-group">
          <label>Business Name <span style={{ color: '#ef4444' }}>*</span></label>
          <input type="text" value={bizName} onChange={e => setBizName(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Business E-Mail</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="email" defaultValue="admin@zakaz.pro" className="form-control" style={{ flex: 1 }} />
            <button className="btn btn-secondary">Verify</button>
          </div>
          <small style={{ color: 'var(--color-text-muted)' }}>Editable after verification, once in 6 months only.</small>
        </div>
        <div className="form-group">
          <label>Phone No.</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="text" defaultValue="+998 90 123 45 67" className="form-control" style={{ flex: 1 }} />
            <button className="btn btn-secondary">Verify</button>
          </div>
          <small style={{ color: 'var(--color-text-muted)' }}>Editable after verification, once in 6 months only.</small>
        </div>
        <div className="form-group">
          <label>Website</label>
          <input type="url" defaultValue="https://megastore.zakaz.pro" className="form-control" />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <div className="form-group">
            <label>Profile Picture</label>
            <div style={{ border: '1px dashed var(--color-border)', padding: '32px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', background: 'var(--color-surface)' }}>
               📷 Upload Logo
            </div>
          </div>
          <div className="form-group">
            <label>Banner</label>
            <div style={{ border: '1px dashed var(--color-border)', padding: '32px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', background: 'var(--color-surface)' }}>
               🖼️ Upload Banner
            </div>
          </div>
        </div>
        
        <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={handleSaveProfile}>Save Profile</button>
      </div>
    </div>
  );
  };

  const SecurityTab = () => (
    <div className="animate-fadeUp">
      <h3 className="chart-title" style={{ marginBottom: '24px' }}>Security Settings</h3>
      
      <div className="admin-table-card" style={{ padding: '24px', maxWidth: '600px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Two-Factor Authentication (2FA)</h4>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Secure your account using an authenticator app.</span>
          </div>
          <button className="btn btn-primary">Enable</button>
        </div>
      </div>

      <div className="config-form" style={{ maxWidth: '600px' }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Change Password</h4>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="••••••••" className="form-control" />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" placeholder="••••••••" className="form-control" />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" placeholder="••••••••" className="form-control" />
        </div>
        <button className="btn btn-secondary" style={{ marginTop: '8px' }}>Update Password</button>
      </div>
    </div>
  );

  const BillingTab = () => (
    <div className="animate-fadeUp">
      <div className="chart-header" style={{ marginBottom: '24px' }}>
        <h3 className="chart-title">Billing & Subscriptions</h3>
      </div>
      
      <div className="stat-card" style={{ maxWidth: '600px', border: '1px solid var(--color-gold)', background: 'rgba(245, 200, 66, 0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h4 style={{ margin: 0, color: 'var(--color-gold)' }}>Growth Plan</h4>
          <span className="status-pill active">Active</span>
        </div>
        <div style={{ display: 'table', width: '100%', marginBottom: '16px' }}>
          <div style={{ display: 'table-row' }}>
            <div style={{ display: 'table-cell', paddingBottom: '8px', color: 'var(--color-text-muted)' }}>Billing Cycle:</div>
            <div style={{ display: 'table-cell', paddingBottom: '8px', textAlign: 'right', fontWeight: 'bold' }}>Monthly ($79.00)</div>
          </div>
          <div style={{ display: 'table-row' }}>
            <div style={{ display: 'table-cell', paddingBottom: '8px', color: 'var(--color-text-muted)' }}>Next Invoice:</div>
            <div style={{ display: 'table-cell', paddingBottom: '8px', textAlign: 'right', fontWeight: 'bold' }}>Nov 24, 2023</div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary">Upgrade Plan</button>
          <button className="btn btn-secondary">View Invoice History</button>
        </div>
      </div>
    </div>
  );

  const BranchesTab = () => (
    <div className="animate-fadeUp">
      <div className="chart-header" style={{ marginBottom: '24px' }}>
        <h3 className="chart-title">Multi-Branch Control</h3>
        <button className="btn btn-primary">Add Branch</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Manger</th>
            <th>Performance (This Mo)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: '600' }}>Downtown HQ</td>
            <td>Main St, Tashkent</td>
            <td><span className="status-pill active">Active</span></td>
            <td>Aziz T.</td>
            <td style={{ color: '#10b981' }}>+12% Revenue</td>
          </tr>
          <tr>
            <td style={{ fontWeight: '600' }}>Airport Kiosk</td>
            <td>Terminal 2</td>
            <td><span className="status-pill active">Active</span></td>
            <td>Lola K.</td>
            <td style={{ color: '#ef4444' }}>-4% Revenue</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
        <h4 style={{ marginBottom: '12px' }}>Branch-Specific Override Rules</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label>Select Branch</label>
            <select className="form-control"><option>Airport Kiosk</option></select>
          </div>
          <div className="form-group">
            <label>Reward Multiplier</label>
            <input type="number" className="form-control" defaultValue="0.5" />
            <small style={{ color: 'var(--color-text-muted)' }}>Currently points are earned at 50% rate here.</small>
          </div>
        </div>
      </div>
    </div>
  );

  const RolesTab = () => (
    <div className="animate-fadeUp">
      <div className="chart-header" style={{ marginBottom: '24px' }}>
        <h3 className="chart-title">Role & Permission Management</h3>
        <button className="btn btn-primary">Invite User</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Access Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: '600' }}>Timur A.</td>
            <td>timur@biz.uz</td>
            <td><span className="badge-platinum tier-badge">Business Admin</span></td>
            <td>Full Access</td>
          </tr>
          <tr>
            <td style={{ fontWeight: '600' }}>Elena M.</td>
            <td>elena@biz.uz</td>
            <td><span className="badge-gold tier-badge">Marketing Manager</span></td>
            <td>Campaign Setup, Analytics</td>
          </tr>
          <tr>
            <td style={{ fontWeight: '600' }}>Jasur B.</td>
            <td>jasur@biz.uz</td>
            <td><span className="badge-silver tier-badge">Cashier Admin</span></td>
            <td>Refunds, Reports</td>
          </tr>
          <tr>
            <td style={{ fontWeight: '600' }}>Nigina K.</td>
            <td>nigina@biz.uz</td>
            <td><span className="badge-bronze tier-badge">Cashier</span></td>
            <td>Checkout Only</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const IntegrationsTab = () => (
    <div className="animate-fadeUp">
      <h3 className="chart-title" style={{ marginBottom: '24px' }}>Integration Settings</h3>
      
      <div className="config-form" style={{ maxWidth: '600px' }}>
        <div className="form-group">
          <label>API Key (For POS)</label>
          <div style={{ position: 'relative' }}>
            <input type="password" value="sk_test_1234567890abcdef" className="form-control" readOnly />
            <button className="btn-link" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>Reveal</button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Webhook URL (Transaction Sync)</label>
          <input type="text" defaultValue="https://pos.mybiz.uz/webhooks/loyalty" className="form-control" />
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', padding: '16px', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.05)' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '14px', color: '#10b981' }}>Transaction Sync Active</h4>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Last synced 2 mins ago. Offline monitor is healthy.</span>
          </div>
          <button className="btn btn-ghost">Test Ping</button>
        </div>
        
        <button className="btn btn-primary" style={{ marginTop: '24px' }}>Save Integration</button>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="animate-fadeUp">
      <div className="chart-header" style={{ marginBottom: '24px' }}>
        <h3 className="chart-title">Notification Configuration</h3>
        <button className="btn btn-secondary" onClick={() => setShowSmsModal(true)}>🛒 Buy SMS Credits</button>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="admin-table-card" style={{ padding: '24px' }}>
            <h4 style={{ marginBottom: '16px' }}>Trigger Events</h4>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <input type="checkbox" id="n1" defaultChecked />
              <div>
                <label htmlFor="n1" style={{ margin: 0, fontWeight: 600 }}>Points Earned</label>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Send SMS when customer earns points</div>
              </div>
            </div>
            {/* Omitted other checkboxes for brevity but kept essential structure */}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="form-group">
            <label>Language Options</label>
            <select className="form-control">
              <option>Uzbek / Russian</option>
              <option>English</option>
            </select>
          </div>
          <div className="form-group">
            <label>SMS Body Template (Points Earned)</label>
            <textarea className="form-control" rows={4} defaultValue={`Hello {Name}! You just earned {Points} points at {BusinessName}. Your total balance is {TotalBalance}.`}></textarea>
            <small style={{ color: 'var(--color-text-muted)' }}>Variables: {'{Name}'}, {'{Points}'}, {'{BusinessName}'}, {'{TotalBalance}'}</small>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>Save Preferences</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeUp">
      <div className="page-header" style={{ marginBottom: '8px' }}>
        <h2 className="section-title">Program Settings</h2>
        <p className="section-subtitle">Manage advanced configurations and profile details</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <strong style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginLeft: '16px', marginBottom: '8px', display: 'block' }}>Account</strong>
          <button 
            className={`settings-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <UserIcon size={18} /> Business Profile
          </button>
          <button 
            className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <LockIcon size={18} /> Security
          </button>
          <button 
            className={`settings-tab-btn ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <CreditCardIcon size={18} /> Billing
          </button>

          <strong style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginLeft: '16px', marginTop: '24px', marginBottom: '8px', display: 'block' }}>Platform</strong>
          <button 
            className={`settings-tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            <UsersIcon size={18} /> Roles & Permissions
          </button>
          <button 
            className={`settings-tab-btn ${activeTab === 'branches' ? 'active' : ''}`}
            onClick={() => setActiveTab('branches')}
          >
            <StoreIcon size={18} /> Multi-Branch
          </button>
          <button 
            className={`settings-tab-btn ${activeTab === 'integrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('integrations')}
          >
            <LinkIcon size={18} /> Integrations
          </button>
          <button 
            className={`settings-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <BellIcon size={18} /> Notifications
          </button>

          <div style={{ marginTop: 'auto', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px' }}>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', textDecoration: 'none' }}>Terms and Conditions</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'billing' && <BillingTab />}
          {activeTab === 'branches' && <BranchesTab />}
          {activeTab === 'roles' && <RolesTab />}
          {activeTab === 'integrations' && <IntegrationsTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
        </div>
      </div>

      {/* Placeholder SMS Modal */}
      {showSmsModal && (
        <div className="side-panel-overlay" onClick={() => setShowSmsModal(false)}>
          <div className="side-panel animate-slideLeft" onClick={e => e.stopPropagation()} style={{ width: '400px' }}>
            <div className="side-panel-header">
              <h3>Buy SMS Credits</h3>
              <button className="btn-close" onClick={() => setShowSmsModal(false)}>×</button>
            </div>
            <div className="side-panel-body">
              <p style={{ color: 'var(--color-text-muted)' }}>Top up your balance for SMS triggers.</p>
              
              {smsPurchaseStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#10b981' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                  <h3>Payment Successful!</h3>
                  <p>5,000 SMS credits have been added to your account.</p>
                </div>
              ) : (
                <div style={{ border: '1px solid var(--color-gold)', background: 'rgba(245, 200, 66, 0.05)', borderRadius: '8px', padding: '16px', marginTop: '16px', cursor: 'pointer' }} className="stat-card">
                    <h4 style={{ margin: '0 0 8px 0', color: 'var(--color-gold)' }}>Growth Pack</h4>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>5,000 SMS</p>
                    <p style={{ margin: '8px 0 0 0', color: 'var(--color-text-muted)' }}>650,000 UZS</p>
                </div>
              )}

            </div>
            <div className="side-panel-footer">
              <button className="btn btn-ghost" onClick={() => setShowSmsModal(false)} disabled={smsPurchaseStatus !== 'idle'}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSmsPurchase} disabled={smsPurchaseStatus !== 'idle'}>
                {smsPurchaseStatus === 'processing' ? 'Processing Transaction...' : smsPurchaseStatus === 'success' ? 'Completed' : 'Proceed to Pay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
