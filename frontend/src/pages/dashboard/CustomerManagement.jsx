import React, { useState } from 'react';
import { CustomersIcon } from '../../components/dashboard/DashboardIcons';
import './dashboard.css';

const CustomerManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Mock customer state
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Aziz M.', phone: '+998 90 123 45 67', email: 'aziz@example.com', tier: 'Platinum', points: 4500, joined: '2023-01-15' },
    { id: 2, name: 'Lola K.', phone: '+998 91 987 65 43', email: 'lola@example.com', tier: 'Gold', points: 1200, joined: '2023-06-22' },
    { id: 3, name: 'Timur R.', phone: '+998 94 555 11 22', email: '-', tier: 'Silver', points: 350, joined: '2023-09-05' },
    { id: 4, name: 'Nigina S.', phone: '+998 93 444 33 11', email: 'nigina@mail.ru', tier: 'Bronze', points: 50, joined: '2023-10-12' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: ''
  });

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.dob) {
      alert('Please fill out all required fields.');
      return;
    }

    const newCust = {
      id: customers.length + 1,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || '-',
      tier: 'Bronze', 
      points: 0,
      joined: new Date().toISOString().split('T')[0]
    };
    
    setCustomers([newCust, ...customers]); // Add to top of list
    setShowAddModal(false);
    setFormData({ name: '', phone: '', email: '', dob: '' });
  };

  const renderTierBadge = (tier) => {
    switch(tier.toLowerCase()) {
      case 'platinum': return <span className="badge-platinum tier-badge">{tier}</span>;
      case 'gold': return <span className="badge-gold tier-badge">{tier}</span>;
      case 'silver': return <span className="badge-silver tier-badge">{tier}</span>;
      default: return <span className="badge-bronze tier-badge">{tier}</span>;
    }
  };

  return (
    <div className="animate-fadeUp">
      <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '8px', borderRadius: '8px', color: '#3b82f6', display: 'flex' }}>
               <CustomersIcon size={24} />
            </div>
            Customer Management
          </h2>
          <p className="section-subtitle">View your customer database and manually register new members.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New Customer
        </button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Current Tier</th>
              <th style={{ textAlign: 'right' }}>Points Balance</th>
              <th style={{ textAlign: 'right' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(cust => (
              <tr key={cust.id} className="animate-fadeUp">
                <td style={{ fontWeight: '600' }}>{cust.name}</td>
                <td>{cust.phone}</td>
                <td style={{ color: cust.email === '-' ? 'var(--color-text-muted)' : 'inherit' }}>{cust.email}</td>
                <td>{renderTierBadge(cust.tier)}</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{cust.points.toLocaleString()}</td>
                <td style={{ textAlign: 'right', color: 'var(--color-text-muted)' }}>{cust.joined}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--color-text-muted)' }}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Customer Panel */}
      {showAddModal && (
        <div className="side-panel-overlay" onClick={() => setShowAddModal(false)}>
          <div className="side-panel animate-slideLeft" onClick={e => e.stopPropagation()} style={{ width: '450px' }}>
            <div className="side-panel-header">
              <h3>Register New Member</h3>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="side-panel-body">
              <div className="config-form">
                
                <div className="form-group">
                  <label>Customer Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Alisher R."
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="+998 90 000 00 00"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                  <small style={{ color: 'var(--color-gold)', display: 'block', marginTop: '6px' }}>
                    ⚠️ Authentication via SMS will be required.
                  </small>
                </div>

                <div className="form-group">
                  <label>Date Of Birth <span style={{ color: '#ef4444' }}>*</span></label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={formData.dob}
                    onChange={e => setFormData({...formData, dob: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>E-Mail <span style={{ fontWeight: 'normal', color: 'var(--color-text-muted)' }}>(Optional)</span></label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="customer@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

              </div>
            </div>
            <div className="side-panel-footer">
              <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
