import React, { useState } from 'react';
import './dashboard.css';

/* ─── Inline SVG Icons ─── */
const PercentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const DollarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const TierIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.45.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
const VisitIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const PointsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <line x1="12" y1="6" x2="12" y2="8" /><line x1="12" y1="16" x2="12" y2="18" />
  </svg>
);
const CustomIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);
const CoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
    <line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/>
  </svg>
);
const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

/* ─── Reusable Sub-Components ─── */

// Toggle Switch
const Toggle = ({ checked, onChange }) => (
  <label style={{
    position: 'relative', display: 'inline-flex', alignItems: 'center',
    width: '52px', height: '28px', flexShrink: 0, cursor: 'pointer',
  }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
    />
    {/* Track */}
    <span style={{
      position: 'absolute', inset: 0,
      borderRadius: '100px',
      background: checked
        ? 'var(--color-gold)'
        : 'rgba(255,255,255,0.08)',
      border: `2px solid ${checked ? 'var(--color-gold)' : 'rgba(255,255,255,0.15)'}`,
      transition: 'background 0.25s, border-color 0.25s',
      boxShadow: checked ? '0 0 10px rgba(245,200,66,0.3)' : 'none',
    }} />
    {/* Thumb */}
    <span style={{
      position: 'absolute',
      top: '50%',
      left: '4px',
      transform: checked
        ? 'translateX(24px) translateY(-50%)'
        : 'translateX(0px) translateY(-50%)',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: checked ? '#1a1100' : 'rgba(255,255,255,0.55)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
      transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), background 0.25s',
    }} />
  </label>
);

// Toggle Row
const ToggleRow = ({ label, sublabel, checked, onChange }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)',
  }}>
    <div>
      <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--color-text)', marginBottom: sublabel ? '4px' : 0 }}>{label}</div>
      {sublabel && <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{sublabel}</div>}
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

// Section Header
const SectionHeader = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
    <span style={{ color: 'var(--color-gold)' }}>{icon}</span>
    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--color-text)' }}>{title}</h3>
  </div>
);

// Slider Field
const SliderField = ({ label, value, onChange, min = 0, max = 100, unit = '%' }) => (
  <div style={{ marginBottom: '24px' }}>
    <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '12px' }}>
      {label}: <strong style={{ color: 'var(--color-gold)' }}>{value}{unit}</strong>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        appearance: 'none',
        height: '4px',
        background: `linear-gradient(to right, var(--color-gold) ${(value - min) / (max - min) * 100}%, rgba(255,255,255,0.12) ${(value - min) / (max - min) * 100}%)`,
        borderRadius: '100px',
        outline: 'none',
        cursor: 'pointer',
      }}
    />
    <style>{`
      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px; height: 20px;
        border-radius: 50%;
        background: var(--color-gold);
        border: 3px solid var(--color-bg);
        box-shadow: 0 0 0 2px var(--color-gold);
        cursor: pointer;
      }
    `}</style>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{min}{unit}</span>
      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{max}{unit}</span>
    </div>
  </div>
);

// Text Input Field
const Field = ({ label, placeholder, value, onChange, type = 'text', hint }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', fontWeight: '500', fontSize: '14px', color: 'var(--color-text)', marginBottom: '8px' }}>{label}</label>
    <input
      type={type}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {hint && <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>{hint}</div>}
  </div>
);

// Two-column inputs
const TwoCol = ({ children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
    {children}
  </div>
);

// Card wrapper
const RulesCard = ({ children }) => (
  <div style={{
    background: 'var(--color-bg-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px',
    padding: '28px 32px',
    marginBottom: '24px',
  }}>
    {children}
  </div>
);

/* ──────────────────────────────────────────
   RULE CONFIGS PER PROGRAM TYPE
──────────────────────────────────────────── */

/* 1. FLAT DISCOUNT */
const FlatDiscountRules = () => {
  const [discountPct, setDiscountPct] = useState(5);
  const [minPurchase, setMinPurchase] = useState('');
  const [excludeSale, setExcludeSale] = useState(false);
  const [minRedemption, setMinRedemption] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [excludeRedemption, setExcludeRedemption] = useState(false);
  const [autoApply, setAutoApply] = useState(true);

  return (
    <div className="animate-fadeUp">
      {/* Section 1 */}
      <RulesCard>
        <SectionHeader icon={<SparkleIcon />} title="Flat Discount Configuration" />
        <SliderField
          label="Discount Percentage"
          value={discountPct}
          onChange={e => setDiscountPct(Number(e.target.value))}
          min={1} max={50} unit="%"
        />
        <Field
          label="Minimum Purchase Amount (UZS)"
          placeholder="0 = no minimum"
          value={minPurchase}
          onChange={e => setMinPurchase(e.target.value)}
          type="number"
        />
        <ToggleRow
          label="Exclude sale/discounted items"
          checked={excludeSale}
          onChange={e => setExcludeSale(e.target.checked)}
        />
      </RulesCard>

      {/* Section 2 */}
      <RulesCard>
        <SectionHeader icon={<CoinIcon />} title="Redemption Rules" />
        <TwoCol>
          <Field label="Minimum Purchase for Redemption (UZS)" placeholder="Optional" value={minRedemption} onChange={e => setMinRedemption(e.target.value)} type="number" />
          <Field label="Max Discount Per Transaction" placeholder="Optional" value={maxDiscount} onChange={e => setMaxDiscount(e.target.value)} type="number" />
        </TwoCol>
        <ToggleRow
          label="Exclude Sale/Discounted Items from Redemption"
          sublabel="Prevent using rewards on already discounted items"
          checked={excludeRedemption}
          onChange={e => setExcludeRedemption(e.target.checked)}
        />
        <ToggleRow
          label="Auto-Apply Discount at Checkout"
          sublabel="Automatically apply available discounts without customer action"
          checked={autoApply}
          onChange={e => setAutoApply(e.target.checked)}
        />
      </RulesCard>
    </div>
  );
};

/* 2. FIXED DISCOUNT */
const FixedDiscountRules = () => {
  const [amount, setAmount] = useState(2000);
  const [minPurchase, setMinPurchase] = useState('');
  const [excludeSale, setExcludeSale] = useState(false);
  const [minRedemption, setMinRedemption] = useState('');
  const [maxPerTxn, setMaxPerTxn] = useState('');
  const [excludeRedemption, setExcludeRedemption] = useState(false);
  const [autoApply, setAutoApply] = useState(false);

  return (
    <div className="animate-fadeUp">
      <RulesCard>
        <SectionHeader icon={<SparkleIcon />} title="Fixed Discount Configuration" />
        <SliderField
          label="Discount Amount (UZS)"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          min={500} max={50000} unit=" UZS"
        />
        <Field
          label="Minimum Purchase Amount (UZS)"
          placeholder="0 = no minimum"
          value={minPurchase}
          onChange={e => setMinPurchase(e.target.value)}
          type="number"
        />
        <ToggleRow
          label="Exclude sale/discounted items"
          checked={excludeSale}
          onChange={e => setExcludeSale(e.target.checked)}
        />
      </RulesCard>

      <RulesCard>
        <SectionHeader icon={<CoinIcon />} title="Redemption Rules" />
        <TwoCol>
          <Field label="Minimum Purchase for Redemption (UZS)" placeholder="Optional" value={minRedemption} onChange={e => setMinRedemption(e.target.value)} type="number" />
          <Field label="Max Discount Per Transaction" placeholder="Optional" value={maxPerTxn} onChange={e => setMaxPerTxn(e.target.value)} type="number" />
        </TwoCol>
        <ToggleRow
          label="Exclude Sale/Discounted Items from Redemption"
          sublabel="Prevent using rewards on already discounted items"
          checked={excludeRedemption}
          onChange={e => setExcludeRedemption(e.target.checked)}
        />
        <ToggleRow
          label="Auto-Apply Discount at Checkout"
          sublabel="Automatically apply available discounts without customer action"
          checked={autoApply}
          onChange={e => setAutoApply(e.target.checked)}
        />
      </RulesCard>
    </div>
  );
};

/* 3. TIER-BASED */
const TierBasedRules = () => {
  const [period, setPeriod] = useState('Annual');
  const [autoUpgrade, setAutoUpgrade] = useState(true);
  const [notifyUpgrade, setNotifyUpgrade] = useState(true);
  const [excludeRedemption, setExcludeRedemption] = useState(false);
  const [tiers, setTiers] = useState([
    { id: 1, name: 'Bronze',   minSpend: '0',        discount: 3,  color: '#CD7F32' },
    { id: 2, name: 'Silver',   minSpend: '5000000',  discount: 5,  color: '#C0C0C0' },
    { id: 3, name: 'Gold',     minSpend: '15000000', discount: 7,  color: '#F5C842' },
    { id: 4, name: 'Platinum', minSpend: '50000000', discount: 10, color: '#E5E4E2' },
  ]);

  const updateTier = (id, field, value) =>
    setTiers(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));

  return (
    <div className="animate-fadeUp">
      <RulesCard>
        <SectionHeader icon={<LayersIcon />} title="Tier Configuration" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {tiers.map(tier => (
            <div key={tier.id} style={{
              display: 'grid', gridTemplateColumns: '130px 1fr 160px',
              gap: '12px', alignItems: 'end',
              background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px',
              border: `1px solid ${tier.color}33`,
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tier Name</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: tier.color, flexShrink: 0 }} />
                  <input type="text" className="form-control" value={tier.name}
                    onChange={e => updateTier(tier.id, 'name', e.target.value)}
                    style={{ fontWeight: '700', fontSize: '13px', padding: '8px 10px' }}
                  />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Min Spend to Qualify (UZS)</div>
                <input type="number" className="form-control" value={tier.minSpend}
                  onChange={e => updateTier(tier.id, 'minSpend', e.target.value)}
                  style={{ padding: '8px 12px' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Discount Rate</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="number" className="form-control" value={tier.discount}
                    onChange={e => updateTier(tier.id, 'discount', Number(e.target.value))}
                    style={{ textAlign: 'center', fontWeight: '700', color: tier.color, border: `1px solid ${tier.color}66`, padding: '8px 10px' }}
                  />
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: '600', flexShrink: 0 }}>%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '12px' }}>Spend Calculation Period</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Annual', 'Quarterly', 'Monthly'].map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                padding: '8px 20px', borderRadius: '100px', border: '2px solid',
                borderColor: period === p ? 'var(--color-gold)' : 'var(--color-border)',
                background: period === p ? 'rgba(245,200,66,0.1)' : 'transparent',
                color: period === p ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                fontWeight: '600', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {p}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Customer spend resets at the end of each period to recalculate tier status.
          </div>
        </div>
      </RulesCard>

      <RulesCard>
        <SectionHeader icon={<CoinIcon />} title="Tier Rules & Automation" />
        <ToggleRow
          label="Auto-Upgrade Customer Tiers"
          sublabel="Automatically promote customers when they hit a spend threshold"
          checked={autoUpgrade}
          onChange={e => setAutoUpgrade(e.target.checked)}
        />
        <ToggleRow
          label="Notify Customer on Tier Upgrade"
          sublabel="Send an in-app notification when a tier upgrade happens"
          checked={notifyUpgrade}
          onChange={e => setNotifyUpgrade(e.target.checked)}
        />
        <ToggleRow
          label="Exclude Sale/Discounted Items from Redemption"
          sublabel="Tier discount won't stack with existing sale prices"
          checked={excludeRedemption}
          onChange={e => setExcludeRedemption(e.target.checked)}
        />
      </RulesCard>
    </div>
  );
};

/* 4. VISIT-BASED */
const VisitBasedRules = () => {
  const [milestones, setMilestones] = useState([
    { id: 1, visits: 5,  rewardType: 'Discount %', rewardValue: '10' },
    { id: 2, visits: 10, rewardType: 'Discount %', rewardValue: '20' },
  ]);
  const [resetAt, setResetAt] = useState(10);
  const [excludeSale, setExcludeSale] = useState(false);
  const [autoApply, setAutoApply] = useState(false);
  const [notifyVisit, setNotifyVisit] = useState(true);

  const updateMilestone = (id, field, value) =>
    setMilestones(milestones.map(m => m.id === id ? { ...m, [field]: value } : m));

  return (
    <div className="animate-fadeUp">
      <RulesCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--color-gold)' }}><CalendarIcon /></span>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>Visit Milestone Configuration</h3>
          </div>
          <button className="btn btn-ghost" style={{ fontSize: '13px', padding: '6px 14px' }}
            onClick={() => setMilestones([...milestones, { id: Date.now(), visits: milestones.length * 5 + 5, rewardType: 'Discount %', rewardValue: '' }])}>
            + Add Milestone
          </button>
        </div>

        {milestones.map((m, i) => (
          <div key={m.id} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr 160px auto',
            gap: '12px', alignItems: 'end', marginBottom: '12px',
            background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border)',
          }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>On Visit #</div>
              <input type="number" className="form-control" value={m.visits}
                onChange={e => updateMilestone(m.id, 'visits', Number(e.target.value))}
                style={{ textAlign: 'center', fontWeight: '800', fontSize: '18px', color: 'var(--color-gold)', border: '2px solid rgba(245,200,66,0.4)', padding: '8px' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reward Type</div>
              <select className="form-control" value={m.rewardType} onChange={e => updateMilestone(m.id, 'rewardType', e.target.value)}>
                <option>Discount %</option>
                <option>Fixed UZS Off</option>
                <option>Free Item</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Value</div>
              <input type="text" className="form-control" value={m.rewardValue}
                onChange={e => updateMilestone(m.id, 'rewardValue', e.target.value)}
                placeholder="e.g. 20"
              />
            </div>
            {milestones.length > 1 && (
              <button onClick={() => setMilestones(milestones.filter(x => x.id !== m.id))}
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', alignSelf: 'flex-end', fontSize: '16px', lineHeight: 1 }}>
                ×
              </button>
            )}
          </div>
        ))}

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginTop: '8px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '12px' }}>
            Reset Visit Counter At: <strong style={{ color: 'var(--color-gold)' }}>{resetAt} visits</strong>
          </div>
          <SliderField
            label="Reset Cycle"
            value={resetAt}
            onChange={e => setResetAt(Number(e.target.value))}
            min={5} max={50} unit=" visits"
          />
        </div>
      </RulesCard>

      <RulesCard>
        <SectionHeader icon={<CoinIcon />} title="Redemption Rules" />
        <ToggleRow
          label="Exclude Sale/Discounted Items"
          sublabel="Visit rewards won't apply to already discounted items"
          checked={excludeSale}
          onChange={e => setExcludeSale(e.target.checked)}
        />
        <ToggleRow
          label="Auto-Apply Reward at Checkout"
          sublabel="Automatically apply visit reward without customer action"
          checked={autoApply}
          onChange={e => setAutoApply(e.target.checked)}
        />
        <ToggleRow
          label="Notify Customer on Milestone Reached"
          sublabel="Send in-app notification when a milestone is hit"
          checked={notifyVisit}
          onChange={e => setNotifyVisit(e.target.checked)}
        />
      </RulesCard>
    </div>
  );
};

/* 5. POINT-BASED */
const PointBasedRules = () => {
  const [earnRate, setEarnRate] = useState(100);
  const [pointValue, setPointValue] = useState(50);
  const [minSpend, setMinSpend] = useState('');
  const [expiryDays, setExpiryDays] = useState(365);
  const [maxRedeemPct, setMaxRedeemPct] = useState(50);
  const [minRedemptionPts, setMinRedemptionPts] = useState('');
  const [excludeRedemption, setExcludeRedemption] = useState(false);
  const [autoApply, setAutoApply] = useState(false);
  const [notifyEarn, setNotifyEarn] = useState(true);

  return (
    <div className="animate-fadeUp">
      <RulesCard>
        <SectionHeader icon={<SparkleIcon />} title="Points Earning Configuration" />
        <SliderField
          label="Earn Rate — UZS per 1 Point"
          value={earnRate}
          onChange={e => setEarnRate(Number(e.target.value))}
          min={10} max={1000} unit=" UZS"
        />
        <Field
          label="Minimum Purchase to Earn Points (UZS)"
          placeholder="0 = no minimum"
          value={minSpend}
          onChange={e => setMinSpend(e.target.value)}
          type="number"
        />
        <SliderField
          label="Points Expiry"
          value={expiryDays}
          onChange={e => setExpiryDays(Number(e.target.value))}
          min={30} max={730} unit=" days"
        />

        {minSpend !== '' && (
          <div style={{ padding: '14px 18px', background: 'rgba(245,200,66,0.05)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: '10px', marginTop: '4px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px', textTransform: 'uppercase' }}>Earning Example</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              Spending <strong style={{ color: 'var(--color-text)' }}>{parseInt(minSpend || 0).toLocaleString()} UZS</strong> earns&nbsp;
              <strong style={{ color: 'var(--color-gold)' }}>{Math.floor((parseInt(minSpend || 0)) / earnRate).toLocaleString()} pts</strong>
            </div>
          </div>
        )}
      </RulesCard>

      <RulesCard>
        <SectionHeader icon={<CoinIcon />} title="Redemption Rules" />
        <SliderField
          label="1 Point Value (UZS)"
          value={pointValue}
          onChange={e => setPointValue(Number(e.target.value))}
          min={1} max={500} unit=" UZS"
        />
        <Field
          label="Minimum Points to Redeem"
          placeholder="Optional"
          value={minRedemptionPts}
          onChange={e => setMinRedemptionPts(e.target.value)}
          type="number"
        />
        <SliderField
          label="Max Redemption — % of order total"
          value={maxRedeemPct}
          onChange={e => setMaxRedeemPct(Number(e.target.value))}
          min={10} max={100} unit="%"
        />
        <ToggleRow
          label="Exclude Sale/Discounted Items from Redemption"
          sublabel="Points can't be used on already discounted products"
          checked={excludeRedemption}
          onChange={e => setExcludeRedemption(e.target.checked)}
        />
        <ToggleRow
          label="Auto-Apply Points at Checkout"
          sublabel="Automatically use available points without customer action"
          checked={autoApply}
          onChange={e => setAutoApply(e.target.checked)}
        />
        <ToggleRow
          label="Notify Customer When Points Are Earned"
          sublabel="Send in-app notification after every transaction"
          checked={notifyEarn}
          onChange={e => setNotifyEarn(e.target.checked)}
        />
      </RulesCard>
    </div>
  );
};

/* ─── Advanced Rule Engine (Customized) ─── */

const CONDITION_FIELDS = [
  'Customer Tier', 'Total Visits', 'Total Spend', 'Is Birthday',
  'Day of Week', 'Time Range', 'Date Range', 'First Purchase',
  'Purchase Amount', 'Customer Age',
];

const CONDITION_OPERATORS = ['Is', 'Is Not', 'Greater Than', 'Less Than', 'Between'];

const ACTION_TYPES = [
  'Add Bonus Points', 'Multiply Points', 'Percentage Discount',
  'Fixed Discount', 'Free Item', 'Upgrade Tier', 'Bonus Visit Count',
];

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const GearIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

/* 6. CUSTOMIZED */
const CustomizedRules = () => {
  const [programName, setProgramName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [rules, setRules] = useState([]);
  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, idx) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    setRules(prev => {
      const next = [...prev];
      const draggedItem = next[draggedIdx];
      next.splice(draggedIdx, 1);
      next.splice(targetIdx, 0, draggedItem);
      return next;
    });
    setDraggedIdx(null);
  };

  const makeRule = (n) => ({
    id: Date.now() + n,
    name: `New Rule ${n}`,
    priority: n,
    active: true,
    stacking: false,
    validFrom: '',
    validUntil: '',
    conditions: [],
    actions: [],
  });

  const addRule = () => setRules(prev => [...prev, makeRule(prev.length + 1)]);
  const deleteRule = (id) => setRules(prev => prev.filter(r => r.id !== id));
  const updateRule = (id, field, value) =>
    setRules(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  const moveRule = (idx, dir) => {
    setRules(prev => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const addCondition = (ruleId) =>
    setRules(prev => prev.map(r => r.id === ruleId
      ? { ...r, conditions: [...r.conditions, { id: Date.now(), field: 'Customer Tier', operator: 'Is', value: '' }] }
      : r));
  const deleteCondition = (ruleId, condId) =>
    setRules(prev => prev.map(r => r.id === ruleId
      ? { ...r, conditions: r.conditions.filter(c => c.id !== condId) }
      : r));
  const updateCondition = (ruleId, condId, field, value) =>
    setRules(prev => prev.map(r => r.id === ruleId
      ? { ...r, conditions: r.conditions.map(c => c.id === condId ? { ...c, [field]: value } : c) }
      : r));

  const addAction = (ruleId) =>
    setRules(prev => prev.map(r => r.id === ruleId
      ? { ...r, actions: [...r.actions, { id: Date.now(), type: 'Add Bonus Points', value: '0' }] }
      : r));
  const deleteAction = (ruleId, actId) =>
    setRules(prev => prev.map(r => r.id === ruleId
      ? { ...r, actions: r.actions.filter(a => a.id !== actId) }
      : r));
  const updateAction = (ruleId, actId, field, value) =>
    setRules(prev => prev.map(r => r.id === ruleId
      ? { ...r, actions: r.actions.map(a => a.id === actId ? { ...a, [field]: value } : a) }
      : r));

  /* shared button style */
  const ghostBtn = {
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'transparent', border: '1px solid var(--color-border)',
    color: 'var(--color-text)', borderRadius: '8px',
    padding: '7px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: '600',
    transition: 'all 0.2s',
  };
  const trashBtn = {
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
    color: '#ef4444', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <div className="animate-fadeUp">
      {/* Program Name + Tab Switcher inside one card */}
      <RulesCard>
        <Field
          label="Program Name"
          placeholder="My Loyalty Program"
          value={programName}
          onChange={e => setProgramName(e.target.value)}
        />

        {/* Tab row */}
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.04)',
          borderRadius: '10px', padding: '4px',
          marginBottom: activeTab === 'basic' ? '0' : '4px',
        }}>
          {['basic', 'advanced'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '10px 0', borderRadius: '8px', border: 'none',
              cursor: 'pointer', fontWeight: '600', fontSize: '14px',
              background: activeTab === tab ? 'var(--color-bg)' : 'transparent',
              color: activeTab === tab ? 'var(--color-text)' : 'var(--color-text-muted)',
              transition: 'all 0.2s',
              boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
            }}>
              {tab === 'basic' ? 'Basic Settings' : 'Advanced Rules'}
            </button>
          ))}
        </div>

        {/* Basic Settings */}
        {activeTab === 'basic' && (
          <div style={{ padding: '20px 0 8px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '8px' }}>
                Program Validity
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Expiry Date
              </div>
              <input 
                type="date" 
                className="form-control" 
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
                style={{ width: '100%', maxWidth: '240px' }}
              />
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                Leave empty if the program has no predefined end date.
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '32px 24px 16px', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', marginTop: '24px' }}>
              <div style={{ marginBottom: '16px', opacity: 0.35 }}><GearIcon /></div>
              <div style={{ fontSize: '14px' }}>Use the Advanced Rules tab to configure your customized program rules.</div>
            </div>
          </div>
        )}
      </RulesCard>

      {/* Advanced Rules panel */}
      {activeTab === 'advanced' && (
        <div>
          {/* Advanced header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700' }}>Advanced Rules</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-muted)' }}>Create conditional logic and time-based rules</p>
            </div>
            <button onClick={addRule} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'var(--color-text)', color: 'var(--color-bg)',
              border: 'none', borderRadius: '8px', padding: '10px 18px',
              fontWeight: '700', fontSize: '14px', cursor: 'pointer',
            }}>
              + Add Rule
            </button>
          </div>

          {/* Empty state */}
          {rules.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)',
              background: 'var(--color-bg-2)', border: '1px dashed var(--color-border)',
              borderRadius: '12px', fontSize: '14px',
            }}>
              No rules yet — click <strong style={{ color: 'var(--color-text)' }}>+ Add Rule</strong> to begin.
            </div>
          )}

          {/* Rule cards */}
          {rules.map((rule, rIdx) => (
            <div key={rule.id} 
              draggable
              onDragStart={(e) => handleDragStart(e, rIdx)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, rIdx)}
              onDragEnd={() => setDraggedIdx(null)}
              style={{
                background: draggedIdx === rIdx ? 'rgba(255,255,255,0.05)' : 'var(--color-bg-2)',
                opacity: draggedIdx === rIdx ? 0.4 : 1,
                border: '1px solid var(--color-border)',
                borderLeft: `4px solid ${rule.active ? 'var(--color-gold)' : 'var(--color-border)'}`,
                borderRadius: '12px', marginBottom: '16px', overflow: 'hidden',
                transition: 'all 0.2s',
              }}>

              {/* Rule header row */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '14px 20px', borderBottom: '1px solid var(--color-border)',
              }}>
                {/* Up/Down reorder */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <button onClick={() => moveRule(rIdx, -1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '1px 4px', fontSize: '10px', lineHeight: 1 }}>▲</button>
                  <button onClick={() => moveRule(rIdx, 1)}  style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '1px 4px', fontSize: '10px', lineHeight: 1 }}>▼</button>
                </div>
                {/* Drag handle */}
                <span style={{ color: 'var(--color-text-muted)', fontSize: '16px', cursor: 'grab', letterSpacing: '-1px', userSelect: 'none' }}>⠿⠿</span>
                {/* Rule name */}
                <input
                  value={rule.name}
                  onChange={e => updateRule(rule.id, 'name', e.target.value)}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontWeight: '700', fontSize: '15px', color: 'var(--color-text)',
                    fontFamily: 'var(--font-main)',
                  }}
                />
                {/* Priority badge */}
                <div style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid var(--color-border)',
                  borderRadius: '8px', padding: '5px 12px', textAlign: 'center', minWidth: '56px',
                }}>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Priority</div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--color-text)' }}>{rIdx + 1}</div>
                </div>
                {/* Active toggle */}
                <Toggle checked={rule.active} onChange={e => updateRule(rule.id, 'active', e.target.checked)} />
                {/* Delete */}
                <button onClick={() => deleteRule(rule.id)} style={trashBtn}><TrashIcon /></button>
              </div>

              {/* Rule body */}
              <div style={{ padding: '20px 24px' }}>

                {/* Conditions */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--color-text)' }}>
                      Conditions{' '}
                      <span style={{ fontWeight: '400', color: 'var(--color-text-muted)' }}>(All must be true)</span>
                    </span>
                    <button onClick={() => addCondition(rule.id)} style={ghostBtn}>+ Add Condition</button>
                  </div>
                  {rule.conditions.length === 0 ? (
                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                      No conditions set — rule will always apply
                    </div>
                  ) : (
                    rule.conditions.map(cond => (
                      <div key={cond.id} style={{
                        display: 'grid', gridTemplateColumns: '1fr 0.7fr 1fr auto',
                        gap: '10px', marginBottom: '10px', alignItems: 'center',
                      }}>
                        <select className="form-control" value={cond.field}
                          onChange={e => updateCondition(rule.id, cond.id, 'field', e.target.value)}>
                          {CONDITION_FIELDS.map(f => <option key={f}>{f}</option>)}
                        </select>
                        <select className="form-control" value={cond.operator}
                          onChange={e => updateCondition(rule.id, cond.id, 'operator', e.target.value)}>
                          {CONDITION_OPERATORS.map(o => <option key={o}>{o}</option>)}
                        </select>
                        <input type="text" className="form-control"
                          placeholder="Enter value" value={cond.value}
                          onChange={e => updateCondition(rule.id, cond.id, 'value', e.target.value)}
                        />
                        <button onClick={() => deleteCondition(rule.id, cond.id)} style={trashBtn}><TrashIcon /></button>
                      </div>
                    ))
                  )}
                </div>

                {/* Actions */}
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--color-text)' }}>
                      Actions{' '}
                      <span style={{ fontWeight: '400', color: 'var(--color-text-muted)' }}>(Execute when conditions met)</span>
                    </span>
                    <button onClick={() => addAction(rule.id)} style={ghostBtn}>+ Add Action</button>
                  </div>
                  {rule.actions.length === 0 ? (
                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No actions configured</div>
                  ) : (
                    rule.actions.map(act => (
                      <div key={act.id} style={{
                        display: 'grid', gridTemplateColumns: '2fr 1fr auto',
                        gap: '10px', marginBottom: '10px', alignItems: 'center',
                      }}>
                        <select className="form-control" value={act.type}
                          onChange={e => updateAction(rule.id, act.id, 'type', e.target.value)}
                          style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.25)' }}>
                          {ACTION_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <input type="text" className="form-control"
                          placeholder="Value" value={act.value}
                          onChange={e => updateAction(rule.id, act.id, 'value', e.target.value)}
                          style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.25)' }}
                        />
                        <button onClick={() => deleteAction(rule.id, act.id)} style={trashBtn}><TrashIcon /></button>
                      </div>
                    ))
                  )}
                </div>

                {/* Stacking + Validity dates */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1 }}>
                    <Toggle checked={rule.stacking} onChange={e => updateRule(rule.id, 'stacking', e.target.checked)} />
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>Allow stacking with other rules</span>
                  </label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Valid From</div>
                      <input type="date" className="form-control" value={rule.validFrom}
                        onChange={e => updateRule(rule.id, 'validFrom', e.target.value)}
                        style={{ width: '160px' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Valid Until</div>
                      <input type="date" className="form-control" value={rule.validUntil}
                        onChange={e => updateRule(rule.id, 'validUntil', e.target.value)}
                        style={{ width: '160px' }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Program Types Data ─── */
const programTypes = [
  { id: 'flat',   icon: <PercentIcon />, title: 'Flat Discount',   desc: 'Fixed percentage off on purchases',       example: 'e.g. 3%, 5%, 10%' },
  { id: 'fixed',  icon: <DollarIcon />,  title: 'Fixed Discount',  desc: 'Fixed amount off on purchases',           example: 'e.g. 2,000 UZS off' },
  { id: 'tier',   icon: <TierIcon />,    title: 'Tier-Based',      desc: 'Multiple tiers with increasing benefits', example: 'Silver 3%, Gold 5%, Platinum 10%' },
  { id: 'visit',  icon: <VisitIcon />,   title: 'Visit-Based',     desc: 'Rewards based on visit frequency',        example: 'Every 5th visit: 20% off' },
  { id: 'points', icon: <PointsIcon />,  title: 'Point-Based',     desc: 'Earn & redeem points on purchases',       example: '100 UZS = 1 point' },
  { id: 'custom', icon: <CustomIcon />,  title: 'Customized',      desc: 'Combine multiple programs',               example: 'Mix & match rules' },
];

/* ─── Step 1: Select Type ─── */
const SelectTypeStep = ({ selected, onSelect }) => (
  <div className="animate-fadeUp">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {programTypes.map(p => {
        const isSelected = selected === p.id;
        return (
          <button key={p.id} onClick={() => onSelect(p.id)} style={{
            background: isSelected ? 'rgba(245, 200, 66, 0.06)' : 'var(--color-bg-2)',
            border: `2px solid ${isSelected ? 'var(--color-gold)' : 'var(--color-border)'}`,
            borderRadius: '16px', padding: '28px 24px', cursor: 'pointer',
            textAlign: 'left', transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative', outline: 'none',
            boxShadow: isSelected ? '0 0 0 4px rgba(245,200,66,0.1)' : 'none',
          }}>
            {isSelected && (
              <div style={{
                position: 'absolute', top: '14px', right: '14px',
                width: '22px', height: '22px', borderRadius: '50%',
                background: 'var(--color-gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
              }}>
                <CheckIcon />
              </div>
            )}
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: isSelected ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isSelected ? 'rgba(245,200,66,0.4)' : 'var(--color-border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isSelected ? 'var(--color-gold)' : 'var(--color-text-muted)',
              marginBottom: '20px', transition: 'all 0.25s',
            }}>
              {p.icon}
            </div>
            <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--color-text)', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{p.title}</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>{p.desc}</div>
            <div style={{
              display: 'inline-block',
              background: isSelected ? 'rgba(245,200,66,0.12)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isSelected ? 'rgba(245,200,66,0.3)' : 'var(--color-border)'}`,
              borderRadius: '100px', padding: '4px 12px', fontSize: '12px',
              color: isSelected ? 'var(--color-gold)' : 'var(--color-text-muted)',
              fontWeight: '500', transition: 'all 0.25s',
            }}>
              {p.example}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

/* ─── Step 2: Configure Rules (dispatch to type-specific component) ─── */
const ConfigureRulesStep = ({ selectedType }) => {
  const map = {
    flat:   <FlatDiscountRules />,
    fixed:  <FixedDiscountRules />,
    tier:   <TierBasedRules />,
    visit:  <VisitBasedRules />,
    points: <PointBasedRules />,
    custom: <CustomizedRules />,
  };
  return map[selectedType] || null;
};

/* ─── Step Indicator ─── */
const StepIndicator = ({ step }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '36px' }}>
    {[{ num: 1, label: 'Select Type' }, { num: 2, label: 'Configure Rules' }].map((s, i, arr) => {
      const isActive = step === s.num;
      const isDone = step > s.num;
      return (
        <React.Fragment key={s.num}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: isActive || isDone ? 'var(--color-gold)' : 'var(--color-surface)',
              border: `2px solid ${isActive || isDone ? 'var(--color-gold)' : 'var(--color-border)'}`,
              color: isActive || isDone ? '#000' : 'var(--color-text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '800', fontSize: '14px', transition: 'all 0.3s',
            }}>
              {isDone ? <CheckIcon /> : s.num}
            </div>
            <span style={{
              fontWeight: isActive ? '700' : '500', fontSize: '14px',
              color: isActive || isDone ? 'var(--color-text)' : 'var(--color-text-muted)',
            }}>{s.label}</span>
          </div>
          {i < arr.length - 1 && (
            <div style={{ width: '48px', height: '2px', background: step > 1 ? 'var(--color-gold)' : 'var(--color-border)', margin: '0 16px', transition: 'background 0.3s' }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* ─── Main Component ─── */
const ProgramConfig = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('flat');
  const selectedProgram = programTypes.find(p => p.id === selectedType);

  return (
    <div className="animate-fadeUp" style={{ paddingBottom: '60px', maxWidth: '960px' }}>

      {/* Page Header — changes on step 2 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)', margin: '0 0 6px' }}>
            {step === 1 ? 'Configure Loyalty Program' : `Configure ${selectedProgram?.title}`}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>
            {step === 1 ? 'Choose your loyalty program type' : 'Set up your loyalty program rules and rewards'}
          </p>
        </div>
        {step === 2 && (
          <button onClick={() => setStep(1)} style={{
            padding: '10px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '14px',
            background: 'transparent', border: '1px solid var(--color-border)',
            color: 'var(--color-text)', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            Change Type
          </button>
        )}
      </div>

      {/* Step Indicator */}
      <StepIndicator step={step} />

      {/* Step Content */}
      {step === 1 && <SelectTypeStep selected={selectedType} onSelect={setSelectedType} />}
      {step === 2 && <ConfigureRulesStep selectedType={selectedType} />}

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--color-border)',
      }}>
        {/* Left button */}
        {step === 2 ? (
          <button onClick={() => setStep(1)} style={{
            padding: '11px 24px', borderRadius: '10px', fontWeight: '600', fontSize: '14px',
            background: 'transparent', border: '1px solid var(--color-border)',
            color: 'var(--color-text)', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            ← Back
          </button>
        ) : <div />}

        {/* Right button */}
        {step === 1 ? (
          <button onClick={() => setStep(2)} disabled={!selectedType} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, var(--color-gold), #d4a017)',
            color: '#000', fontWeight: '700', fontSize: '15px',
            padding: '13px 28px', borderRadius: '100px',
            border: 'none', cursor: selectedType ? 'pointer' : 'not-allowed',
            boxShadow: '0 4px 20px rgba(245,200,66,0.35)',
            opacity: !selectedType ? 0.5 : 1, transition: 'all 0.2s',
          }}>
            Next: Configure Rules <ArrowRightIcon />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(1)} style={{
              padding: '11px 24px', borderRadius: '10px', fontWeight: '600', fontSize: '14px',
              background: 'transparent', border: '1px solid var(--color-border)',
              color: 'var(--color-text)', cursor: 'pointer',
            }}>
              Cancel
            </button>
            <button onClick={() => alert(`✅ ${selectedProgram?.title} program created & activated!`)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, var(--color-gold), #d4a017)',
              color: '#000', fontWeight: '700', fontSize: '15px',
              padding: '11px 28px', borderRadius: '10px',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(245,200,66,0.3)',
              transition: 'all 0.2s',
            }}>
              Create Program <CheckIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramConfig;
