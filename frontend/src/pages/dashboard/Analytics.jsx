import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ComposedChart, Area, Legend
} from 'recharts';
import { AnalyticsIcon, TrendUpIcon, SearchIcon, FilterIcon, DownloadIcon } from '../../components/dashboard/DashboardIcons';
import './dashboard.css';

const Analytics = () => {
  const revenueData = [
    { name: 'Mon', loyalty: 4500, nonLoyalty: 2800 },
    { name: 'Tue', loyalty: 3800, nonLoyalty: 3200 },
    { name: 'Wed', loyalty: 5200, nonLoyalty: 2100 },
    { name: 'Thu', loyalty: 4900, nonLoyalty: 2900 },
    { name: 'Fri', loyalty: 6100, nonLoyalty: 3500 },
    { name: 'Sat', loyalty: 7500, nonLoyalty: 4200 },
    { name: 'Sun', loyalty: 8200, nonLoyalty: 3800 },
  ];

  const metrics = [
    { label: 'Avg Basket Size', value: '145,000 UZS', detail: 'Loyalty Customers', trend: '+15.2%' },
    { label: 'Redemption Rate', value: '24.5%', detail: 'Points vs Sales', trend: '+2.1%' },
    { label: 'Repeat Visit Rate', value: '68%', detail: 'Within 30 Days', trend: '+5.4%' },
    { label: 'Tier Migration', value: '124', detail: 'Upgraded Tiers', trend: 'Monthly' },
  ];

  const topCustomers = [
    { id: 1, name: 'Azizov Mansur', spend: '12,450,000 UZS', visits: 45, tier: 'Platinum' },
    { id: 2, name: 'Karimova Lola', spend: '8,200,000 UZS', visits: 32, tier: 'Gold' },
    { id: 3, name: 'Tashpulatov Ali', spend: '7,100,000 UZS', visits: 28, tier: 'Gold' },
    { id: 4, name: 'Sadirov Bekhzod', spend: '5,900,000 UZS', visits: 20, tier: 'Silver' },
    { id: 5, name: 'Kim Vitaliy', spend: '5,100,000 UZS', visits: 18, tier: 'Silver' },
  ];

  return (
    <div className="animate-fadeUp">
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="section-title">Reports & Analytics</h2>
          <p className="section-subtitle">Deep insights into program performance and customer behavior</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={16} /> Export CSV
          </button>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={16} /> PDF Summary
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {metrics.map((m, idx) => (
          <div key={idx} className="stat-card">
            <span className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              {m.label}
              <span style={{ color: '#10b981', fontSize: '11px' }}>{m.trend}</span>
            </span>
            <span className="value">{m.value}</span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{m.detail}</span>
          </div>
        ))}
      </div>

      <div className="admin-table-card" style={{ marginBottom: '32px' }}>
        <div className="chart-header" style={{ padding: '24px' }}>
          <h3 className="chart-title">Revenue Comparison: Loyalty vs Non-Loyalty</h3>
          <div className="chart-legend">
            <span className="legend-item"><span className="dot" style={{ backgroundColor: 'var(--color-gold)' }}></span> Loyalty</span>
            <span className="legend-item"><span className="dot" style={{ backgroundColor: '#4f46e5' }}></span> Non-Loyalty</span>
          </div>
        </div>
        <div style={{ width: '100%', height: '350px', padding: '0 24px 24px' }}>
          <ResponsiveContainer>
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#0d1121', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="loyalty" fill="rgba(245, 200, 66, 0.1)" stroke="var(--color-gold)" strokeWidth={3} />
              <Bar dataKey="nonLoyalty" barSize={30} fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-secondary-grid">
        <div className="admin-table-card">
          <div className="table-header">
            <h3 className="chart-title">Top 10 High-Value Customers</h3>
            <button className="btn-link">View All</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Tier</th>
                <th>Total Spend</th>
                <th>Visits</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map(customer => (
                <tr key={customer.id}>
                  <td style={{ fontWeight: '600' }}>{customer.name}</td>
                  <td><span className={`tier-badge badge-${customer.tier.toLowerCase()}`}>{customer.tier}</span></td>
                  <td>{customer.spend}</td>
                  <td>{customer.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-table-card">
          <div className="table-header">
            <h3 className="chart-title">Dormant Customers (30+ Days)</h3>
            <button className="btn-link">Re-engage</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Last Visit</th>
                <th>Points Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '600' }}>Saidov Jasur</td>
                <td>42 Days ago</td>
                <td>1,240 pts</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>Lee Ekaterina</td>
                <td>38 Days ago</td>
                <td>450 pts</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>Nuriddinov Farrukh</td>
                <td>35 Days ago</td>
                <td>2,900 pts</td>
              </tr>
            </tbody>
          </table>
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              These customers haven't visited in over 30 days. Consider launching a "Limited-time multipier" campaign to bring them back.
            </p>
            <button className="btn btn-ghost" style={{ width: '100%' }}>Automate Re-engagement</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
