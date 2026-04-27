import React from 'react';
import { ShieldIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from '../../components/dashboard/DashboardIcons';
import './dashboard.css';

const Audits = () => {
  const alerts = [
    { id: 1, type: 'high', message: 'Cashier "Nigina K." refunded 3 transactions in the last hour.', time: '10 mins ago' },
    { id: 2, type: 'medium', message: 'Manual point adjustment of +5,000 pts by "Timur A."', time: '2 hours ago' },
  ];

  const recentReversals = [
    { id: 'REV-091', date: '2023-10-24 14:32', customer: 'Azizov Mansur', cashier: 'Nigina K.', points: '-450', reason: 'Item Returned', status: 'Completed' },
    { id: 'REV-090', date: '2023-10-24 14:15', customer: 'Karimova Lola', cashier: 'Nigina K.', points: '-120', reason: 'Customer Dispute', status: 'Completed' },
    { id: 'REV-089', date: '2023-10-24 13:50', customer: 'Tashpulatov Ali', cashier: 'Nigina K.', points: '-50', reason: 'Error at Checkout', status: 'Completed' },
    { id: 'ADJ-102', date: '2023-10-24 11:20', customer: 'Saidov Jasur', cashier: 'Timur A. (Admin)', points: '+5000', reason: 'Service Apology', status: 'Completed' },
    { id: 'REV-088', date: '2023-10-23 09:10', customer: 'Kim Vitaliy', cashier: 'Jasur B.', points: '-300', reason: 'Exchange', status: 'Completed' },
  ];

  return (
    <div className="animate-fadeUp">
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="section-title">Security & Audits</h2>
          <p className="section-subtitle">Monitor refunds, manual adjustments, and suspicious activities</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="label">Total Points Reversed (Month)</span>
          <span className="value">12,450 pts</span>
          <div className="trend trend-up">Attention Needed</div>
        </div>
        <div className="stat-card">
          <span className="label">Refunded Transactions</span>
          <span className="value">42</span>
          <div className="trend trend-up">+15% vs Last Mo</div>
        </div>
        <div className="stat-card">
          <span className="label">Manual Adjustments</span>
          <span className="value">8</span>
          <div className="trend">By 2 Admins</div>
        </div>
      </div>

      <div className="charts-secondary-grid" style={{ gridTemplateColumns: '1fr' }}>
        
        {/* Alerts Section */}
        <div className="admin-table-card" style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <h3 className="chart-title" style={{ marginBottom: '16px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangleIcon size={20} /> Security Alerts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {alerts.map(alert => (
              <div key={alert.id} style={{ 
                padding: '16px', 
                background: alert.type === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 200, 66, 0.1)',
                borderLeft: `4px solid ${alert.type === 'high' ? '#ef4444' : 'var(--color-gold)'}`,
                borderRadius: '0 8px 8px 0',
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '500' }}>{alert.message}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="admin-table-card">
          <div className="table-header">
            <h3 className="chart-title">Recent Reversals & Adjustments</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <select className="form-control" style={{ padding: '6px 12px', height: 'auto' }}>
                <option>All Types</option>
                <option>Reversals</option>
                <option>Manual Add</option>
              </select>
            </div>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date / Time</th>
                <th>Customer</th>
                <th>Action By</th>
                <th>Points Impact</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {recentReversals.map(rev => (
                <tr key={rev.id}>
                  <td style={{ color: 'var(--color-text-muted)' }}>{rev.id}</td>
                  <td>{rev.date}</td>
                  <td style={{ fontWeight: '600' }}>{rev.customer}</td>
                  <td>{rev.cashier}</td>
                  <td style={{ 
                    fontWeight: 'bold', 
                    color: rev.points.startsWith('+') ? '#10b981' : '#ef4444' 
                  }}>
                    {rev.points} pts
                  </td>
                  <td>{rev.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Audits;
