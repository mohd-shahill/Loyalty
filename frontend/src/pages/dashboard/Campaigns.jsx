import React, { useState } from 'react';
import { SearchIcon, FilterIcon, ChevronRightIcon } from '../../components/dashboard/DashboardIcons';
import './dashboard.css';

const Campaigns = () => {
  const [view, setView] = useState('list'); // 'list' or 'create'

  // --- Mock Data for List View ---
  const mockCampaigns = [
    { id: 1, name: 'Double Points Weekend', type: 'Multiplier', status: 'Active', reach: 'All Customers', conversions: 450, budget: '5,000,000 UZS' },
    { id: 2, name: 'Birthday Special', type: 'Fixed Reward', status: 'Active', reach: 'Birthday Tier', conversions: 120, budget: '2,000,000 UZS' },
    { id: 3, name: 'Gold Tier Happy Hour', type: 'Multiplier', status: 'Scheduled', reach: 'Gold Tier', conversions: 0, budget: '3,500,000 UZS' },
    { id: 4, name: 'Festival Discount', type: 'Discount %', status: 'Expired', reach: 'All Customers', conversions: 890, budget: '10,000,000 UZS' },
  ];

  // --- States for Create View ---
  const [autoApply, setAutoApply] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [stackingRules, setStackingRules] = useState(false);
  const [redemptionLimit, setRedemptionLimit] = useState(false);
  const [exclusion, setExclusion] = useState(false);

  const [commChannels, setCommChannels] = useState({
    inApp: false, email: false, push: false, sms: false, whatsapp: false, telegram: false, social: false
  });

  const handleChannelToggle = (channel) => {
    setCommChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PROMO-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponCode(code);
  };

  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    minSpend: ''
  });

  const handleSave = () => {
    if (!formData.name || !formData.startDate || !formData.endDate || !formData.startTime || !formData.endTime || !formData.minSpend) {
      alert('⚠️ Please fill out all required fields marked with *');
      return;
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert('⚠️ Start Date cannot be after End Date.');
      return;
    }
    
    // In a real app we would validate and save to backend here
    setView('list');
  };

  // --- Views ---

  const renderListView = () => (
    <div className="animate-fadeUp">
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="section-title">Campaign Builder</h2>
          <p className="section-subtitle">Create and manage targeted loyalty promotions</p>
        </div>
        <button className="btn btn-primary" onClick={() => setView('create')}>
          + Create Marketing Campaign
        </button>
      </div>

      <div className="admin-table-card">
        <div className="table-header">
          <div style={{ position: 'relative', width: '300px' }}>
            <SearchIcon style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} size={16} />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="form-control" 
              style={{ paddingLeft: '40px', fontSize: '14px' }}
            />
          </div>
          <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FilterIcon size={16} /> Filter
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Type</th>
              <th>Target Audience</th>
              <th>Status</th>
              <th>Budget Cap</th>
              <th>Results</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockCampaigns.map(campaign => (
              <tr key={campaign.id}>
                <td style={{ fontWeight: '600' }}>{campaign.name}</td>
                <td>{campaign.type}</td>
                <td>{campaign.reach}</td>
                <td>
                  <span className={`status-pill ${campaign.status.toLowerCase()}`}>
                    {campaign.status}
                  </span>
                </td>
                <td>{campaign.budget}</td>
                <td>{campaign.conversions > 0 ? `${campaign.conversions} Redemptions` : '-'}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-icon"><ChevronRightIcon size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCreateView = () => (
    <div className="animate-fadeUp" style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button className="btn btn-ghost" onClick={() => setView('list')} style={{ paddingLeft: 0, marginBottom: '8px', color: 'var(--color-gold)' }}>
            ← Back to Campaigns
          </button>
          <h2 className="section-title">Store Management & Campaign Setup</h2>
          <p className="section-subtitle">Configure advanced targeting, rewards, and constraints</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => setView('list')}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Campaign</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Section 1: Campaign Details */}
          <div className="admin-table-card" style={{ padding: '24px' }}>
             <h3 style={{ margin: '0 0 24px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>1. Campaign Details</h3>
             
             <div className="form-group">
                <label>Campaign Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Any specific name for your campaign..." 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
             </div>
             
             <div className="form-group">
                <label>Campaign Description</label>
                <textarea className="form-control" rows={3} placeholder="Internal notes or description..."></textarea>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
               <div className="form-group">
                 <label>Start Date <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="date" className="form-control" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
               </div>
               <div className="form-group">
                 <label>End Date <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="date" className="form-control" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
               </div>
               <div className="form-group">
                 <label>Start Time <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="time" className="form-control" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} />
               </div>
               <div className="form-group">
                 <label>End Time <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="time" className="form-control" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} />
               </div>
             </div>
          </div>

          {/* Section 2: Targets & Rewards */}
          <div className="admin-table-card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 24px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>2. Targets & Rewards</h3>
            
            <div className="form-group">
              <label>Minimum Spend Required (UZS) <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="number" className="form-control" placeholder="e.g. 2000" value={formData.minSpend} onChange={e => setFormData({...formData, minSpend: e.target.value})} />
              <small style={{ color: 'var(--color-text-muted)' }}>Amount required to avail the offer.</small>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Select Customers <span style={{ color: '#ef4444' }}>*</span></label>
                <select className="form-control">
                  <option>All Customers</option>
                  <option>Specific Customers (High Spenders)</option>
                  <option>Specific Loyalty Program Tiers</option>
                </select>
              </div>
              <div className="form-group">
                <label>Select Items <span style={{ color: '#ef4444' }}>*</span></label>
                <select className="form-control">
                  <option>Apply on All Items</option>
                  <option>Apply on Specific Items/Categories</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Reward Type <span style={{ color: '#ef4444' }}>*</span></label>
              <select className="form-control">
                <option>Points Multiplier (e.g. 2x points)</option>
                <option>Discount (Amount or %)</option>
                <option>Tier Milestone</option>
                <option>Free Item</option>
              </select>
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
               <div>
                  <strong style={{ display: 'block' }}>Auto-Apply at Checkout</strong>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>If on (POS INTEGRATION REQUIRED) the discount applies automatically at the POS. Best for frictionless experience.</span>
               </div>
               <label className="switch">
                  <input type="checkbox" checked={autoApply} onChange={e => setAutoApply(e.target.checked)} />
                  <span className="slider round"></span>
                </label>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              <label>Generate Campaign Coupon Code (Optional)</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="text" className="form-control" style={{ flex: 1, letterSpacing: '2px', fontWeight: 'bold' }} placeholder="e.g. SUMMER10" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
                <button className="btn btn-secondary" onClick={generateCode}>Generate</button>
              </div>
              <small style={{ color: 'var(--color-text-muted)' }}>Backend generates code for customer to enter.</small>
            </div>
          </div>

          {/* Section 4: The Rule Engine */}
           <div className="admin-table-card" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 24px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>4. The Rule Engine (Logic & Constraints)</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Stacking */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: stackingRules ? '4px solid var(--color-gold)' : '4px solid transparent', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ display: 'block' }}>Stacking Rules</strong>
                  <label className="switch">
                    <input type="checkbox" checked={stackingRules} onChange={e => setStackingRules(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                {stackingRules && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked />
                      Cannot be combined with other offers
                    </label>
                  </div>
                )}
              </div>

              {/* Redemption Limit */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: redemptionLimit ? '4px solid var(--color-gold)' : '4px solid transparent', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ display: 'block' }}>Redemption Limit</strong>
                  <label className="switch">
                    <input type="checkbox" checked={redemptionLimit} onChange={e => setRedemptionLimit(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                {redemptionLimit && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked />
                      Limit One Per Customer
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                      <input type="checkbox" />
                      Limit One Per Transaction
                    </label>
                  </div>
                )}
              </div>

               {/* Exclusion */}
               <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: exclusion ? '4px solid var(--color-gold)' : '4px solid transparent', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ display: 'block' }}>Exclusion Rules</strong>
                  <label className="switch">
                    <input type="checkbox" checked={exclusion} onChange={e => setExclusion(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                {exclusion && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked />
                      Exclude Already Sale Items
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                      <input type="checkbox" />
                      Exclude Specific Product or Category
                    </label>
                  </div>
                )}
              </div>

            </div>
           </div>

        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           
           {/* Section 3: Communication */}
           <div className="admin-table-card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>3. Communication</h3>
              
              <div className="form-group">
                <label>Communication Channels (How do we tell them?)</label>
                <div className="channel-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     <input type="checkbox" checked={commChannels.inApp} onChange={() => handleChannelToggle('inApp')} />
                     In-App Notification <span style={{ color: '#10b981', fontSize: '12px', marginLeft: 'auto' }}>(Free)</span>
                   </label>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     <input type="checkbox" checked={commChannels.email} onChange={() => handleChannelToggle('email')} />
                     E-Mail Blast <span style={{ color: '#10b981', fontSize: '12px', marginLeft: 'auto' }}>(Free)</span>
                   </label>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     <input type="checkbox" checked={commChannels.push} onChange={() => handleChannelToggle('push')} />
                     Push Notifications <span style={{ color: 'var(--color-gold)', fontSize: '12px', marginLeft: 'auto' }}>(Buy credits)</span>
                   </label>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     <input type="checkbox" checked={commChannels.sms} onChange={() => handleChannelToggle('sms')} />
                     SMS Text <span style={{ color: 'var(--color-gold)', fontSize: '12px', marginLeft: 'auto' }}>(Buy credits)</span>
                   </label>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     <input type="checkbox" checked={commChannels.whatsapp} onChange={() => handleChannelToggle('whatsapp')} />
                     WhatsApp Messages <span style={{ color: 'var(--color-gold)', fontSize: '12px', marginLeft: 'auto' }}>(Buy credits)</span>
                   </label>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     <input type="checkbox" checked={commChannels.telegram} onChange={() => handleChannelToggle('telegram')} />
                     Telegram Messages <span style={{ color: 'var(--color-gold)', fontSize: '12px', marginLeft: 'auto' }}>(Buy credits)</span>
                   </label>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                     <input type="checkbox" checked={commChannels.social} onChange={() => handleChannelToggle('social')} />
                     Other Social Media <span style={{ color: 'var(--color-gold)', fontSize: '12px', marginLeft: 'auto' }}>(Buy credits)</span>
                   </label>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '24px' }}>
                <label>Write Campaign Message</label>
                <textarea className="form-control" rows={5} placeholder="Write the message business wants to send to their customer..."></textarea>
              </div>

              <div className="form-group">
                <label>Upload Campaign Banner</label>
                <div style={{ border: '1px dashed var(--color-border)', borderRadius: '8px', padding: '32px', textAlign: 'center', cursor: 'pointer', background: 'var(--color-surface)', transition: 'background 0.2s', marginTop: '8px' }}>
                   📸 Upload File
                   <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: 'var(--color-text-muted)' }}>Drag & drop or click to select image</p>
                </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );

  return view === 'list' ? renderListView() : renderCreateView();
};

export default Campaigns;
