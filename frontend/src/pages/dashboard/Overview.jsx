import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { TrendUpIcon, TrendDownIcon } from '../../components/dashboard/DashboardIcons';
import './dashboard.css';

const Overview = () => {
  // Mock Data for Charts
  const salesData = [
    { name: 'Mon', loyalty: 4000, organic: 2400 },
    { name: 'Tue', loyalty: 3000, organic: 1398 },
    { name: 'Wed', loyalty: 2000, organic: 9800 },
    { name: 'Thu', loyalty: 2780, organic: 3908 },
    { name: 'Fri', loyalty: 1890, organic: 4800 },
    { name: 'Sat', loyalty: 2390, organic: 3800 },
    { name: 'Sun', loyalty: 3490, organic: 4300 },
  ];

  const tierData = [
    { name: 'Bronze', value: 400, color: '#CD7F32' },
    { name: 'Silver', value: 300, color: '#C0C0C0' },
    { name: 'Gold', value: 300, color: '#F5C842' },
    { name: 'Platinum', value: 200, color: '#E5E4E2' },
  ];

  const stats = [
    { label: 'Total Loyalty Sales', value: '45,231,000 UZS', trend: '+12.5%', isUp: true },
    { label: 'Discounts Given', value: '3,120,000 UZS', trend: '+5.2%', isUp: true },
    { label: 'Points Issued', value: '128.4k', trend: '+18.1%', isUp: true },
    { label: 'Active Customers', value: '1,240', trend: '+2.4%', isUp: true },
  ];

  const recentCustomers = [
    { id: 1, name: 'Anvar Toshov', phone: '+998 90 123 45 67', tier: 'Gold', points: 2450, visits: 12 },
    { id: 2, name: 'Elena Kim', phone: '+998 93 456 78 90', tier: 'Silver', points: 1200, visits: 8 },
    { id: 3, name: 'Shakhrukh Mirzo', phone: '+998 94 888 77 66', tier: 'Bronze', points: 450, visits: 3 },
    { id: 4, name: 'Malika Karimova', phone: '+998 97 111 22 33', tier: 'Platinum', points: 8900, visits: 45 },
    { id: 5, name: 'Dmitry Lee', phone: '+998 90 555 44 33', tier: 'Gold', points: 3100, visits: 15 },
  ];

  return (
    <div className="animate-fadeUp">
      {/* KPI Stats */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <span className="label">{stat.label}</span>
            <span className="value">{stat.value}</span>
            <div className={`trend ${stat.isUp ? 'trend-up' : 'trend-down'}`}>
              {stat.isUp ? <TrendUpIcon size={12} /> : <TrendDownIcon size={12} />}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="charts-secondary-grid">
        {/* Main Sales Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Performance: Loyalty vs Organic</h3>
            <select className="form-select" style={{ width: 'auto', maxHeight: '32px', padding: '0 32px 0 12px', fontSize: '12px' }}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorLoyalty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-gold)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--color-gold)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d1121', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="loyalty" stroke="var(--color-gold)" fillOpacity={1} fill="url(#colorLoyalty)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="organic" stroke="#4f46e5" fillOpacity={1} fill="url(#colorOrganic)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tier Distribution Pie Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Tier Distribution</h3>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={tierData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {tierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d1121', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Customers Table */}
      <div className="admin-table-card" style={{ marginTop: '32px' }}>
        <div className="table-header">
          <h3 className="chart-title">Recent High-Value Customers</h3>
          <button className="btn btn-ghost" style={{ fontSize: '12px' }}>View Report</button>
        </div>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Tier</th>
                <th>Points Balance</th>
                <th>Visits</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCustomers.map(customer => (
                <tr key={customer.id}>
                  <td style={{ fontWeight: '600', color: 'var(--color-text)' }}>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <span className={`tier-badge badge-${customer.tier.toLowerCase()}`}>
                      {customer.tier}
                    </span>
                  </td>
                  <td>{customer.points.toLocaleString()} pts</td>
                  <td>{customer.visits}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '12px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
