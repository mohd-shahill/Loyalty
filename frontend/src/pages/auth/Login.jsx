import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--color-bg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Orbs */}
      <div style={{ 
        position: 'absolute', width: '400px', height: '400px', 
        background: 'radial-gradient(circle, var(--color-gold-glow) 0%, transparent 70%)', 
        top: '-100px', right: '-100px', borderRadius: '50%', filter: 'blur(60px)' 
      }} />
      <div style={{ 
        position: 'absolute', width: '300px', height: '300px', 
        background: 'radial-gradient(circle, rgba(123,94,167,0.1) 0%, transparent 70%)', 
        bottom: '-50px', left: '-50px', borderRadius: '50%', filter: 'blur(50px)' 
      }} />

      <form className="glass-card animate-fadeUp" onSubmit={handleSubmit} style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '48px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '48px', height: '48px', borderRadius: '12px', 
            background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))',
            color: '#000', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'
          }}>Z</div>
          <h1 className="section-title" style={{ fontSize: '1.8rem' }}>Admin Login</h1>
          <p className="section-subtitle" style={{ margin: '8px auto 0' }}>Access your loyalty dashboard</p>
        </div>

        {error && (
          <div style={{ 
            padding: '12px', background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444',
            borderRadius: 'var(--radius-md)', fontSize: '14px', marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-input" 
            placeholder="admin@zakazpro.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
          Sign In
        </button>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            Mock Demo: Any email/password will work.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
