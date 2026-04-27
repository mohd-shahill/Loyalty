import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { FinanceIcon, TrendUpIcon, TrendDownIcon } from '../../components/dashboard/DashboardIcons';
import './dashboard.css';

const Financials = () => {
  const forecastData = [
    { month: 'Apr', cost: 4200000, liability: 15000000 },
    { month: 'May', cost: 4800000, liability: 16200000 },
    { month: 'Jun', cost: 5500000, liability: 17800000 },
    { month: 'Jul', cost: 6200000, liability: 19500000 },
    { month: 'Aug', cost: 7100000, liability: 22000000 },
    { month: 'Sep', cost: 8500000, liability: 25400000 },
  ];

  const financialStats = [
    { label: 'Total Discounts Given', value: '12,450,000 UZS', trend: '+8%', isUp: true },
    { label: 'Monthly Budget Used', value: '62%', trend: '4,200k / 7,000k', isUp: false, sublabel: 'UZS' },
    { label: 'Outstanding Liability', value: '15,800,000 UZS', trend: 'Financial Risk', isUp: false },
    { label: 'Avg Redemption Cost', value: '14,200 UZS', trend: '-2%', isUp: false },
  ];

  return (
    <div className="animate-fadeUp">
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <h2 className="section-title">Financial Controls</h2>
        <p className="section-subtitle">Monitor loyalty costs and configure budget safety limits</p>
      </div>

      <div className="stats-grid">
        {financialStats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <span className="label">{stat.label}</span>
            <span className="value">{stat.value}</span>
            <div className={`trend ${stat.isUp ? 'trend-up' : ''}`} style={{ color: stat.isUp ? '#10b981' : 'var(--color-text-muted)' }}>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="charts-secondary-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Reward Liability Forecast</h3>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0d1121', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="liability" stroke="var(--color-gold)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-gold)' }} />
                <Line type="monotone" dataKey="cost" stroke="#4f46e5" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
            * Estimated future redemption costs based on current point accumulation rates.
          </p>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Limit Configurations</h3>
          </div>
          <div className="config-form">
            <div className="form-group">
              <label>Monthly Max Discount Limit (UZS)</label>
              <input type="text" className="form-control" defaultValue="10,000,000" />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
              <input type="checkbox" id="autoPause" defaultChecked />
              <label htmlFor="autoPause" style={{ margin: 0 }}>Auto-pause program if budget exceeded</label>
            </div>
            <div className="form-group">
              <label>Alert Threshold (%)</label>
              <input type="number" className="form-control" defaultValue="80" />
              <small style={{ color: 'var(--color-text-muted)' }}>Send notification when budget reach 80%</small>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>Update Controls</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;
