import React, { useState, useEffect, useRef } from 'react';
import { Country } from 'country-state-city';

/* ── Icons (Inline SVGs) ── */
const Icons = {
  Crown: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" /></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
  PhoneCall: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  CheckCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  Layers: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  BarChart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  ScanLine: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 7 3 3 7 3" /><polyline points="17 3 21 3 21 7" /><polyline points="21 17 21 21 17 21" /><polyline points="7 21 3 21 3 17" /><line x1="3" y1="12" x2="21" y2="12" /></svg>,
  Target: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  Store: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>,
  Smartphone: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  Mail: () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
};

/* ── Sub-components ── */

const Nav = ({ onCallbackOpen, onRegisterOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon"><Icons.Crown /></div>
          <span>ZakazPro<span className="gradient-text"> Loyalty</span></span>
        </a>
        <ul className="nav-links">
          {['Features', 'How it Works', 'Programs', 'Pricing', 'About'].map(item => (
            <li key={item}><a href={`#${item.toLowerCase().replace(/ /g, '-')}`}>{item}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={onCallbackOpen}>Enterprise</button>
          <button className="btn btn-secondary" style={{ padding: '10px 22px', fontSize: '14px' }}>Login</button>
          <button className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '14px' }} onClick={onRegisterOpen}>
            Get Started Free
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onCallbackOpen, onRegisterOpen }) => (
  <section className="hero">
    <div className="hero-bg">
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
    </div>
    <div className="hero-content">
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Built for Growing Businesses
      </div>
      <h1 className="hero-title">
        Turn Every Purchase Into
        <br />
        <span className="gradient-text">Lasting Loyalty</span>
      </h1>
      <p className="hero-subtitle">
        The all-in-one loyalty management platform that helps businesses retain customers,
        increase repeat purchases, and grow revenue — without the complexity.
      </p>
      <div className="hero-actions">
        <button className="btn btn-primary" onClick={onRegisterOpen} style={{ padding: '16px 36px', fontSize: '16px' }}>
          Register Your Business
          <Icons.ArrowRight />
        </button>
        <button className="btn btn-enterprise" onClick={onCallbackOpen}>
          <Icons.PhoneCall />
          Enterprise – Call Me
        </button>
      </div>
      <div className="hero-stats">
        {[
          { value: '500+', label: 'Businesses Onboarded' },
          { value: '1.2M+', label: 'Loyalty Transactions' },
          { value: '37%', label: 'Avg. Retention Boost' },
          { value: '14-Day', label: 'Free Trial' },
        ].map(stat => (
          <div className="hero-stat" key={stat.label}>
            <div className="hero-stat-value">{stat.value}</div>
            <div className="hero-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const logoItems = [
  { name: 'Coffee Palace' },
  { name: 'Silk Market' },
  { name: 'Tashkent Grill' },
  { name: 'Beauty Hub' },
  { name: 'SportZona' },
  { name: 'Floristika' },
  { name: 'EduMart' },
  { name: 'Sweet Corner' },
];

const LogosStrip = () => (
  <div className="logos-strip">
    <div className="container">
      <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)', marginBottom: '28px' }}>
        Trusted by businesses across Uzbekistan
      </p>
    </div>
    <div className="logos-track">
      {[...logoItems, ...logoItems].map((item, i) => (
        <div className="logo-item" key={i}>
          <span className="logo-item-icon" style={{ opacity: 0.5 }}><Icons.Layers /></span>
          {item.name}
        </div>
      ))}
    </div>
  </div>
);

const features = [
  {
    icon: <Icons.Layers />, iconBg: 'rgba(245,200,66,0.1)', iconBorder: 'rgba(245,200,66,0.2)',
    title: '6 Loyalty Program Types',
    desc: 'From simple flat discounts to complex tiered point systems — choose the model that fits perfectly.'
  },
  {
    icon: <Icons.BarChart />, iconBg: 'rgba(123,94,167,0.1)', iconBorder: 'rgba(123,94,167,0.2)',
    title: 'Real-Time Dashboard',
    desc: 'Track loyalty sales, points issued, customer tiers, and ROI with live charts and reports.'
  },
  {
    icon: <Icons.ScanLine />, iconBg: 'rgba(59,130,246,0.1)', iconBorder: 'rgba(59,130,246,0.2)',
    title: 'Seamless Cashier Flow',
    desc: 'Works with or without POS integration. Cashiers identify customers by QR, phone, or ID in seconds.'
  },
  {
    icon: <Icons.Target />, iconBg: 'rgba(239,68,68,0.1)', iconBorder: 'rgba(239,68,68,0.2)',
    title: 'Campaign Builder',
    desc: 'Create double-points days, birthday rewards, and limited-time campaigns with full scheduling.'
  },
  {
    icon: <Icons.Store />, iconBg: 'rgba(16,185,129,0.1)', iconBorder: 'rgba(16,185,129,0.2)',
    title: 'Multi-Branch Support',
    desc: 'Manage chains, franchises, and multi-store businesses from one master dashboard.'
  },
  {
    icon: <Icons.Smartphone />, iconBg: 'rgba(245,158,11,0.1)', iconBorder: 'rgba(245,158,11,0.2)',
    title: 'Customer App & QR Cards',
    desc: 'Customers carry their digital loyalty card, view points, and redeem rewards easily.'
  },
];

const FeaturesSection = () => (
  <section className="section" id="features">
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <span className="section-label">Core Features</span>
        <h2 className="section-title">Everything You Need to Run<br /><span className="gradient-text">Powerful Loyalty Programs</span></h2>
        <p className="section-subtitle" style={{ margin: '16px auto 0' }}>All the tools in one platform — no third-party plugins, no complicated setup.</p>
      </div>
      <div className="features-grid">
        {features.map(f => (
          <div className="glass-card feature-card" key={f.title}>
            <div className="feature-icon" style={{ '--icon-bg': f.iconBg, '--icon-border': f.iconBorder, color: 'var(--color-text)' }}>
              {f.icon}
            </div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const loyaltyTabs = [
  {
    name: 'Points-Based',
    title: 'Points-Based Program',
    desc: 'Customers earn points on every purchase and redeem them for discounts, gifts, or free items. The more they spend, the more they save.',
    features: ['Configurable earning ratio (1 pt = X UZS)', 'Minimum spend to earn control', 'Points expiry rules', 'Max redemption % per order'],
    visual: {
      items: [
        { label: 'Points Earned', value: '1,200 pts', color: '#F5C842' },
        { label: 'Point Value', value: '1 pt = 50 UZS', color: '#A47FD2' },
        { label: 'Redeemable', value: '60,000 UZS', color: '#60A5FA' },
      ]
    }
  },
  {
    name: 'Tier-Based',
    title: 'Tier-Based Discounts',
    desc: 'Reward your most loyal customers with escalating benefits. Bronze, Silver, Gold, and Platinum tiers unlock bigger discounts and multipliers.',
    features: ['Up to 4 custom tier levels', 'Annual / Quarterly / Monthly spend reset', 'Tier-specific point multipliers', 'Bonus rewards on tier upgrades'],
    visual: {
      items: [
        { label: 'Bronze', value: '5% discount', color: '#CD7F32' },
        { label: 'Silver', value: '7% discount', color: '#A8A9AD' },
        { label: 'Gold', value: '10% discount', color: '#F5C842' },
        { label: 'Platinum', value: '15% discount', color: '#E5E4E2' },
      ]
    }
  },
  {
    name: 'Visit-Based',
    title: 'Visit-Based Milestones',
    desc: '"Come back 5 times and your 5th coffee is free." Reward customers for frequency of visits rather than spend amounts.',
    features: ['Custom visit milestone triggers', 'Multiple reward types per milestone', 'Auto-reset visit cycle', 'Free gift or discount rewards'],
    visual: {
      items: [
        { label: 'Visit 1–4', value: 'Building loyalty', color: '#6B7280' },
        { label: 'Visit 5', value: '10% Discount', color: '#F5C842' },
        { label: 'Visit 10', value: '25% Discount', color: '#60A5FA' },
        { label: 'Visit 15', value: 'Free Item!', color: '#10B981' },
      ]
    }
  },
  {
    name: 'Flat Discount',
    title: 'Flat % or Fixed Discount',
    desc: 'Simple and effective — every customer gets a fixed percentage off or a set amount off every qualifying purchase. No complexity.',
    features: ['Flat % or fixed UZS amount', 'Minimum spend threshold', 'Max discount cap', 'Welcome bonus for new signups'],
    visual: {
      items: [
        { label: 'Every Purchase', value: '10% OFF', color: '#F5C842' },
        { label: 'Min Spend', value: '50,000 UZS', color: '#A47FD2' },
        { label: 'Welcome Bonus', value: 'Free Gift', color: '#60A5FA' },
      ]
    }
  },
  {
    name: 'Hybrid',
    title: 'Combined Hybrid Programs',
    desc: 'For maximum retention. Combine multiple loyalty types — Tier + Points + Visit-Based — into a single powerful program.',
    features: ['5 hybrid combination options', 'Multi-discount at single checkout', 'Tier-specific point multipliers', 'Visit rewards + point stacking'],
    visual: {
      items: [
        { label: 'Tier Discount', value: '25,000 UZS', color: '#A47FD2' },
        { label: 'Points Redemption', value: '500 UZS', color: '#F5C842' },
        { label: 'Final Payable', value: '474,500 UZS', color: '#10B981' },
      ]
    }
  },
];

const LoyaltyPrograms = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tab = loyaltyTabs[activeTab];

  return (
    <section className="section" id="programs">
      <div className="container">
        <div>
          <span className="section-label">Loyalty Program Types</span>
          <h2 className="section-title">Pick the Perfect Program<br /><span className="gradient-text">For Your Business</span></h2>
          <p className="section-subtitle">From coffee shops to franchise chains — we have the right model for every business size and type.</p>
        </div>
        <div className="loyalty-tabs">
          <div className="tabs-header">
            {loyaltyTabs.map((t, i) => (
              <button key={i} className={`tab-btn ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>
                {t.name}
              </button>
            ))}
          </div>
          <div className="tab-content">
            <div className="tab-info">
              <h3 className="gradient-text">{tab.title}</h3>
              <p>{tab.desc}</p>
              <ul className="tab-feature-list">
                {tab.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className="tab-visual">
              <div className="tab-visual-title">Live Preview</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tab.visual.items.map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '14px 18px',
                    border: `1px solid ${item.color}22`
                  }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{item.label}</span>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const steps = [
  { num: 'I', title: 'Register Business', desc: 'Fill in basic business details and verify your email. Get your unique Business ID instantly.' },
  { num: 'II', title: 'Configure Program', desc: 'Choose your loyalty type, set discount rules, and customize tier levels in minutes.' },
  { num: 'III', title: 'Start Cashier Flow', desc: 'Your cashiers start identifying customers and applying loyalty rewards at checkout.' },
  { num: 'IV', title: 'Watch Growth', desc: 'Monitor KPIs, run campaigns, and see repeat customers increase month-over-month.' },
];

const HowItWorks = () => (
  <section className="section" id="how-it-works" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(123,94,167,0.04) 50%, transparent 100%)' }}>
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <span className="section-label">How It Works</span>
        <h2 className="section-title">Up & Running in <span className="gradient-text">Under 15 Minutes</span></h2>
        <p className="section-subtitle" style={{ margin: '16px auto 0' }}>No technical expertise needed. Our guided onboarding takes you from sign-up to live loyalty in minutes.</p>
      </div>
      <div className="steps-grid">
        {steps.map((s, i) => (
          <div key={s.num} className="glass-card step-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="step-num">{s.num}</div>
            <div className="step-title">{s.title}</div>
            <div className="step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const plans = [
  {
    name: 'Basic', price: 'Free', period: '14-day trial, then from 150,000 UZS/mo',
    featured: false,
    features: ['Points-Based Program', 'Basic Reporting & Analytics', 'Store Visibility on App', 'In-App Notifications', '1 Active Program Only', 'Up to 5,000 Customers'],
    cta: 'Start Free Trial', ctaClass: 'btn btn-secondary',
  },
  {
    name: 'Growth', price: '450,000', period: 'UZS / month',
    featured: true,
    features: ['Points, Visit & Tier Programs', 'Fixed Discount Rewards', 'Auto Expiry Rules', 'Advanced Reports', '3 Active Programs', 'Up to 25,000 Customers', 'Multi-Branch Support'],
    cta: 'Get Growth Plan', ctaClass: 'btn btn-primary',
  },
  {
    name: 'Premium', price: 'Custom', period: 'Contact for pricing',
    featured: false,
    features: ['All Loyalty Program Types', 'Hybrid Combined Programs', 'Tier Point Multipliers', 'Campaign Builder', 'White-label Branding', 'Unlimited Customers', 'Full Multi-Branch & Franchise'],
    cta: 'Talk to Sales', ctaClass: 'btn btn-secondary',
  },
];

const Pricing = ({ onRegisterOpen, onCallbackOpen }) => (
  <section className="section" id="pricing">
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <span className="section-label">Pricing</span>
        <h2 className="section-title">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
        <p className="section-subtitle" style={{ margin: '16px auto 0' }}>Start free, scale as you grow. No hidden fees, no lock-in contracts.</p>
      </div>
      <div className="pricing-grid">
        {plans.map(p => (
          <div key={p.name} className={`glass-card pricing-card ${p.featured ? 'featured' : ''}`}>
            {p.featured && <div className="pricing-badge">Most Popular</div>}
            <div className="pricing-plan-name">{p.name}</div>
            <div className="pricing-price">
              {p.price === 'Free' || p.price === 'Custom' ? (
                <span className="gradient-text">{p.price}</span>
              ) : (
                <><span className="gradient-text">{p.price}</span><span style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}> UZS</span></>
              )}
            </div>
            <div className="pricing-period">{p.period}</div>
            <ul className="pricing-features">
              {p.features.map(f => (
                <li key={f}>
                  <span className="pricing-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className={p.ctaClass} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              onClick={p.name === 'Premium' ? onCallbackOpen : onRegisterOpen}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const testimonials = [
  {
    stars: 5, initials: 'JT',
    text: '"ZakazPro transformed our café chain. Customer return rate jumped 40% within 3 months of implementing the tier-based program."',
    name: 'Jasur Tashmatov', role: 'Owner, Samarkand Coffee Chain'
  },
  {
    stars: 5, initials: 'DY',
    text: '"The onboarding was incredibly smooth. We were live in 20 minutes. Our customers love the QR card and the visit-based stamp system!"',
    name: 'Dilnoza Yusupova', role: 'Director, Gulsanam Boutique'
  },
  {
    stars: 5, initials: 'BK',
    text: '"Best investment for customer retention. The analytics dashboard shows exactly which campaigns work. ROI paid back in the first month."',
    name: 'Bobur Karimov', role: 'Manager, ElektroMax'
  },
];

const Testimonials = () => (
  <section className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(245,200,66,0.03) 50%, transparent 100%)' }}>
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <span className="section-label">Customer Stories</span>
        <h2 className="section-title">Businesses Love <span className="gradient-text">ZakazPro</span></h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map(t => (
          <div key={t.name} className="glass-card testimonial-card">
            <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar" style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{t.initials}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection = ({ onRegisterOpen, onCallbackOpen }) => (
  <section className="section cta-section">
    <div className="container">
      <div className="enterprise-banner">
        <div className="enterprise-content">
          <h3>Enterprise & Chain Businesses</h3>
          <p>Get a dedicated account manager, custom integrations, and white-label solutions. Let's talk.</p>
        </div>
        <button className="btn btn-enterprise" onClick={onCallbackOpen}>
          Request a Callback
        </button>
      </div>
      <div className="cta-inner">
        <div className="cta-orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(123,94,167,0.2) 0%, transparent 70%)', top: -100, left: -100 }} />
        <div className="cta-orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(245,200,66,0.15) 0%, transparent 70%)', bottom: -80, right: -80 }} />
        <span className="section-label" style={{ position: 'relative' }}>Get Started Today</span>
        <h2 className="section-title" style={{ position: 'relative', marginBottom: 20 }}>
          Ready to Build<br /><span className="gradient-text">Unbreakable Customer Loyalty?</span>
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto 40px', position: 'relative' }}>
          Join 500+ businesses across Uzbekistan. 14-day free trial. No credit card required.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <button className="btn btn-primary" onClick={onRegisterOpen} style={{ padding: '16px 40px', fontSize: '16px' }}>
            Register Your Business
          </button>
          <button className="btn btn-secondary" onClick={onCallbackOpen} style={{ padding: '16px 36px', fontSize: '16px' }}>
            Talk to Our Team
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="nav-logo" style={{ marginBottom: 0 }}>
            <div className="nav-logo-icon"><Icons.Crown /></div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20 }}>ZakazPro<span className="gradient-text"> Loyalty</span></span>
          </div>
          <p className="footer-brand-desc">The all-in-one loyalty management platform built for businesses in Uzbekistan and Central Asia.</p>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Loyalty Programs', 'Pricing', 'Integrations', 'API Docs'] },
          { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'] },
          { title: 'Support', links: ['Help Center', 'Onboarding Guide', 'System Status', 'Privacy Policy', 'Terms of Service'] },
        ].map(col => (
          <div key={col.title}>
            <div className="footer-col-title">{col.title}</div>
            <ul className="footer-links">
              {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">© 2026 ZakazPro. All rights reserved. Made for Uzbekistan.</div>
        <div className="footer-socials">
          {['in', 'fb', 'ig', 'tw'].map((network, i) => (
            <a key={i} href="#" className="social-link" style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>{network}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ── Modals ── */

const CallbackModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', otherPosition: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="success-state">
            <div className="success-icon" style={{ color: 'var(--color-text)' }}><Icons.CheckCircle /></div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 12 }}>Request Submitted!</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>Our team will call you within 1 business day. Thank you for your interest in ZakazPro Enterprise!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ marginBottom: 28 }}>
          <span className="section-label" style={{ fontSize: 12 }}>Enterprise</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginTop: 12 }}>Request a Callback</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginTop: 8 }}>Fill in your details and our enterprise team will get in touch within 1 business day.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-input" required placeholder="Your full name" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <div className="phone-row">
              <select className="form-select phone-code">
                {Country.getAllCountries().map(c => (
                  <option key={c.isoCode} value={`+${c.phonecode}`}>{c.isoCode} +{c.phonecode}</option>
                ))}
              </select>
              <input className="form-input" type="tel" required placeholder="90 123 45 67" value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Business Email</label>
            <input className="form-input" type="email" placeholder="you@company.com" value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Your Position *</label>
            <select className="form-select" required value={position} onChange={e => setPosition(e.target.value)}>
              <option value="">Select your position</option>
              <option value="Owner">Owner</option>
              <option value="Director">Director</option>
              <option value="Manager">Manager</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {position === 'Other' && (
            <div className="form-group">
              <label className="form-label">Specify Position</label>
              <input className="form-input" placeholder="Your position" value={form.otherPosition}
                onChange={e => setForm(p => ({ ...p, otherPosition: e.target.value }))} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <label className="checkbox-group">
              <input type="checkbox" required />
              <label>I accept the <span className="link">Privacy Policy</span> *</label>
            </label>
            <label className="checkbox-group">
              <input type="checkbox" />
              <label>I accept receiving personalized <span className="link">marketing communications</span></label>
            </label>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 16, fontSize: 15 }}>
            Request a Call
          </button>
        </form>
      </div>
    </div>
  );
};

const RegisterModal = ({ onClose }) => {
  const [step, setStep] = useState('form'); // 'form' | 'otp' | 'success'
  const [form, setForm] = useState({ contactName: '', businessName: '', email: '', phone: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);

  const handleOtpChange = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {step === 'form' && (
          <>
            <div style={{ marginBottom: 28 }}>
              <span className="section-label" style={{ fontSize: 12 }}>Business Registration</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginTop: 12 }}>Register Your Business</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginTop: 8 }}>Create your loyalty platform account in 2 minutes.</p>
            </div>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label className="form-label">Contact Person Name *</label>
                <input className="form-input" required placeholder="Full name" value={form.contactName}
                  onChange={e => setForm(p => ({ ...p, contactName: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Business Legal Name *</label>
                <input className="form-input" required placeholder="Your business name" value={form.businessName}
                  onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Business Email *</label>
                <input className="form-input" type="email" required placeholder="business@email.com" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number (Optional)</label>
                <div className="phone-row">
                  <select className="form-select phone-code">
                    {Country.getAllCountries().map(c => (
                      <option key={c.isoCode} value={`+${c.phonecode}`}>{c.isoCode} +{c.phonecode}</option>
                    ))}
                  </select>
                  <input className="form-input" type="tel" placeholder="90 123 45 67" value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <label className="checkbox-group">
                  <input type="checkbox" required />
                  <label>I accept the <span className="link">Privacy Policy</span> *</label>
                </label>
                <label className="checkbox-group">
                  <input type="checkbox" required />
                  <label>I accept the <span className="link">Terms & Conditions</span> *</label>
                </label>
                <label className="checkbox-group">
                  <input type="checkbox" />
                  <label>I accept receiving <span className="link">personalized marketing</span></label>
                </label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 16, fontSize: 15 }}>
                Continue — Verify Email
              </button>
            </form>
          </>
        )}

        {step === 'otp' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', color: 'var(--color-text)' }}><Icons.Mail /></div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: 12 }}>Check Your Email</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
                We sent a 6-digit code to <strong style={{ color: 'var(--color-gold)' }}>{form.email}</strong>
              </p>
            </div>
            <form onSubmit={handleVerifyOtp}>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => otpRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKey(i, e)}
                    style={{
                      width: 52, height: 60, textAlign: 'center', fontSize: 24, fontWeight: 700,
                      background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)',
                      borderRadius: 12, color: 'white', outline: 'none',
                      fontFamily: 'var(--font-heading)',
                      borderColor: digit ? 'var(--color-gold)' : 'var(--color-border)',
                      boxShadow: digit ? '0 0 0 2px rgba(245,200,66,0.2)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 16, fontSize: 15 }}>
                Verify & Register
              </button>
              <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--color-text-muted)' }}>
                Didn't get an email? <span className="link" style={{ cursor: 'pointer' }}>Resend Code</span>
              </p>
            </form>
          </>
        )}

        {step === 'success' && (
          <div className="success-state">
            <div className="success-icon" style={{ color: 'var(--color-text)' }}><Icons.CheckCircle /></div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: 12 }}>Registration Complete!</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
              Your login credentials have been sent to <strong style={{ color: 'var(--color-gold)' }}>{form.email}</strong>.
              <br /><br />
              Please log in to complete your business onboarding process.
            </p>
            <button className="btn btn-primary" style={{ marginTop: 28, padding: '14px 36px' }} onClick={onClose}>
              Go to Dashboard <Icons.ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Main Landing Page ── */

export default function LandingPage() {
  const [showCallback, setShowCallback] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Nav onCallbackOpen={() => setShowCallback(true)} onRegisterOpen={() => setShowRegister(true)} />
      <main>
        <Hero onCallbackOpen={() => setShowCallback(true)} onRegisterOpen={() => setShowRegister(true)} />
        <LogosStrip />
        <FeaturesSection />
        <LoyaltyPrograms />
        <HowItWorks />
        <Pricing onRegisterOpen={() => setShowRegister(true)} onCallbackOpen={() => setShowCallback(true)} />
        <Testimonials />
        <CtaSection onRegisterOpen={() => setShowRegister(true)} onCallbackOpen={() => setShowCallback(true)} />
      </main>
      <Footer />
      {showCallback && <CallbackModal onClose={() => setShowCallback(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
