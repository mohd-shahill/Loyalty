import React, { useState, useEffect } from 'react';
import { Country, City } from 'country-state-city';
import './onboarding.css';
const Icons = {
  Check: (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12" /></svg>,
  ArrowRight: (props) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
  ArrowLeft: (props) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>,
  Upload: (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
  Crown: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" /></svg>,
};

const steps = [
  "General Info",
  "Legal Info",
  "Store Setup",
  "Contact Person",
  "Requirements",
  "Loyalty Config",
  "Subscription"
];

const ErrorMsg = ({ condition, showErrors }) => {
  if (!showErrors || !condition) return null;
  return <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>This field is required</div>;
};

const SpecialOccasionsConfig = ({ formData, handleInput, type = 'percent' }) => {
  const occasions = [
    ['Birthday', 'occBirthday'],
    ['Anniversary', 'occAnniversary'],
    ["Women's day", 'occWomensDay'],
    ["Men's Day", 'occMensDay'],
    ['New Year', 'occNewYear'],
    ['Other', 'occOther']
  ];
  
  const unit = type === 'percent' ? '%' : 'pts';
  const labelSuffix = type === 'percent' ? '(%)' : '(bonus pts)';

  return (
    <div className="grid grid-cols-2 gap-4 mt-4 p-4 rounded bg-black/40 border border-[var(--color-border)]">
      {occasions.map(([label, name]) => (
        <div key={name}>
          <label className="form-label text-xs">{label} {labelSuffix}</label>
          <input 
            className="form-input text-sm p-2" 
            type="number" 
            name={name} 
            placeholder={unit} 
            value={formData[name] || ''} 
            onChange={handleInput} 
          />
        </div>
      ))}
    </div>
  );
};

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    category: '', legalName: '', format: '', storeCount: 1, callbackPhone: '',
    // Step 2
    brandName: '', logo: null, tin: '', yearEstablished: '', legalAddress: '', 
    vatNumber: '', registrationNumber: '', directorName: '', website: '', 
    tinFile: null, requiresLicense: false, licenseType: '', licenseNumber: '', 
    licenseExpiry: '', additionalDocs: null, customersPerDay: '', customersMonthly: '',
    // Step 3
    stores: [{
      country: 'UZ', city: 'Tashkent', streetAddress: '', zipCode: '', 
      storeContactPrefix: '998', storeContact: '', storeEmail: '', workingHours: '', workingDays: '', 
      storeWebsite: '', storePhotos: null
    }],
    // Step 4
    contactName: '', contactPosition: '', contactPhonePrefix: '998', contactPhone: '', contactEmail: '', 
    contactMethod: '', contactTime: '', isDecisionMaker: 'yes', decisionMakerName: '', 
    decisionMakerContact: '',
    // Step 5
    loyaltyKnowledge: '', primaryGoal: '', secondaryGoal: '', tertiaryGoal: '',
    // Step 6 (Now integrating into Step 5 conditionally)
    loyaltyType: '', fixedDiscount: '', tierLevel: '', visitDiscount: '', customCombo: '',
    crashCourseCompleted: false,
    // Step 6: Flat Discount
    flatFixedPercent: '',
    flatMinSale: '',
    flatMaxDiscount: '',
    // Step 6: Fixed Amount Discount
    fixedDiscountAmount: '',
    fixedMinSpend: '',
    // Step 6: Common Settings
    showAdvancedConfig: false,
    welcomeBonusType: '',
    welcomeBonusValue: '',
    excludeDiscountedItems: false,
    // Step 6: Tiers
    loyaltyTiers: [
      { name: '', discount: '', minSpend: '', color: '#CD7F32' }
    ],
    tierCalculationPeriod: 'Annual',
    tierRewardType: 'Discount %',
    tierRewardValue: '',
    // Step 6: Visits
    visitMilestones: [
      { visits: '', rewardType: 'Discount %', rewardValue: '' }
    ],
    visitResetAt: '',
    visitMaxDiscountCap: '',
    visitRewardValidity: '',
    // Step 6: Points
    pointsEarningRatio: '',
    pointsMinSpend: '',
    pointsEarnOn: 'Sale Amount',
    pointsExpiryDays: '',
    pointsRedemptionValue: '',
    pointsMinRedeem: '',
    pointsMaxOrderPercent: '',
    // Step 6: Custom/Combined
    customSubType: 'flat_tier_points',
    comboFlatPercent: '',
    comboTierPeriod: 'Annual',
    comboTiers: [
      { name: 'Bronze',   spending: '', discount: '', multiplier: '' },
      { name: 'Silver',   spending: '', discount: '', multiplier: '' },
      { name: 'Gold',     spending: '', discount: '', multiplier: '' },
      { name: 'Platinum', spending: '', discount: '', multiplier: '' },
    ],
    comboEarningRatio: '',
    comboMinSpend: '',
    comboEarnOn: 'Sale Amount',
    comboExpiryDays: '',
    comboRedemptionValue: '',
    comboMinRedeem: '',
    comboMaxOrderPercent: '',
    // Step 6: Customized 2 (New)
    comboFixedAmount: '',
    comboFixedMinSpend: '',
    comboVisitMilestones: [{ visits: '', rewardType: 'Discount %', rewardValue: '' }],
    comboVisitResetAt: '',
    excludePreDiscounted: false,
    // Step 7
    subscriptionPlan: 'Growth',
    paymentPlan: '',
    isSubmitted: false
  });

  // Prevent scroll wheel from changing number input values
  useEffect(() => {
    const handleWheel = (e) => {
      if (document.activeElement.type === 'number') {
        document.activeElement.blur();
      }
    };
    document.addEventListener('wheel', handleWheel);
    return () => document.removeEventListener('wheel', handleWheel);
  }, []);

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.category || !formData.legalName || !formData.format) return false;
        if (formData.format === 'Multi-store' && !formData.storeCount) return false;
        if (['Chain', 'Franchise', 'Other'].includes(formData.format) && !formData.callbackPhone) return false;
        return true;
      case 2:
        return formData.tin && formData.legalName && formData.yearEstablished && formData.legalAddress;
      case 3:
        return formData.stores.every(s => s.streetAddress && s.storeContact && s.workingHours && s.workingDays);
      case 4:
        return formData.contactName && formData.contactPosition && formData.contactPhone && formData.contactEmail;
      case 5:
        if (!formData.loyaltyKnowledge) return false;
        if (['heard_not_using', 'basic'].includes(formData.loyaltyKnowledge)) {
          if (!formData.primaryGoal || !formData.secondaryGoal || !formData.tertiaryGoal) return false;
        }
        if (formData.loyaltyKnowledge !== 'need_course' || formData.crashCourseCompleted) {
          if (!formData.loyaltyType) return false;
          if (formData.loyaltyType === 'Custom' && !formData.customCombo) return false;
        }
        return true;
      case 6:
        if (formData.loyaltyType === 'Flat') {
          if (!formData.flatFixedPercent || !formData.flatMinSale || !formData.flatMaxDiscount || !formData.welcomeBonusType) return false;
          if (['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && !formData.welcomeBonusValue) return false;
        }
        if (formData.loyaltyType === 'FlatAmount') {
          if (!formData.fixedDiscountAmount || !formData.fixedMinSpend || !formData.welcomeBonusType) return false;
          if (['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && !formData.welcomeBonusValue) return false;
        }
        if (formData.loyaltyType === 'Tiers') {
          if (!formData.tierCalculationPeriod || !formData.welcomeBonusType) return false;
          if (formData.loyaltyTiers.length === 0) return false;
          const allTiersValid = formData.loyaltyTiers.every(t => t.name && t.discount && t.minSpend);
          if (!allTiersValid) return false;
          if (['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && !formData.welcomeBonusValue) return false;
          if (formData.tierRewardType && !formData.tierRewardValue) return false;
        }
        if (formData.loyaltyType === 'Visits') {
          if (formData.visitMilestones.length === 0) return false;
          const allMilestonesValid = formData.visitMilestones.every(m => m.visits && m.rewardValue);
          if (!allMilestonesValid) return false;
          if (!formData.visitResetAt || !formData.welcomeBonusType) return false;
          if (['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && !formData.welcomeBonusValue) return false;
        }
        if (formData.loyaltyType === 'Points') {
          if (!formData.pointsEarningRatio || !formData.pointsMinSpend || !formData.pointsExpiryDays) return false;
          if (!formData.welcomeBonusType) return false;
          if (['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && !formData.welcomeBonusValue) return false;
          if (!formData.pointsRedemptionValue || !formData.pointsMinRedeem || !formData.pointsMaxOrderPercent) return false;
        }
        if (formData.loyaltyType === 'Custom') {
          if (formData.customSubType === 'flat_tier_points') {
            if (!formData.comboFlatPercent) return false;
            const allTiersValid = formData.comboTiers.every(t => t.spending && t.discount && t.multiplier);
            if (!allTiersValid) return false;
            if (!formData.comboEarningRatio || !formData.comboMinSpend || !formData.comboExpiryDays) return false;
            if (!formData.welcomeBonusType) return false;
            if (['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && !formData.welcomeBonusValue) return false;
            if (!formData.comboRedemptionValue || !formData.comboMinRedeem || !formData.comboMaxOrderPercent) return false;
          }
          if (formData.customSubType === 'fixed_visit_points') {
            if (!formData.comboFixedAmount || !formData.comboFixedMinSpend) return false;
            if (!formData.comboVisitResetAt) return false;
            const allMilestonesValid = formData.comboVisitMilestones.every(m => m.visits && m.rewardValue);
            if (!allMilestonesValid) return false;
            if (!formData.comboEarningRatio || !formData.comboMinSpend || !formData.comboExpiryDays) return false;
            if (!formData.welcomeBonusType) return false;
            if (['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && !formData.welcomeBonusValue) return false;
            if (!formData.comboRedemptionValue || !formData.comboMinRedeem || !formData.comboMaxOrderPercent) return false;
          }
          if (formData.customSubType === 'tier_visit_points') {
            if (!formData.comboVisitResetAt) return false;
            const allMilestonesValid = formData.comboVisitMilestones.every(m => m.visits && m.rewardValue);
            if (!allMilestonesValid) return false;
            const allTiersValid = formData.comboTiers.every(t => t.spending && t.discount && t.multiplier);
            if (!allTiersValid) return false;
            if (!formData.comboEarningRatio || !formData.comboMinSpend || !formData.comboExpiryDays) return false;
            if (!formData.welcomeBonusType) return false;
            if (['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && !formData.welcomeBonusValue) return false;
            if (!formData.comboRedemptionValue || !formData.comboMinRedeem || !formData.comboMaxOrderPercent) return false;
          }
          if (formData.customSubType === 'visit_points') {
            if (!formData.comboVisitResetAt) return false;
            const allMilestonesValid = formData.comboVisitMilestones.every(m => m.visits && m.rewardValue);
            if (!allMilestonesValid) return false;
            if (!formData.comboEarningRatio || !formData.comboMinSpend || !formData.comboExpiryDays) return false;
            if (!formData.comboRedemptionValue || !formData.comboMinRedeem || !formData.comboMaxOrderPercent) return false;
          }
        }
        return true;
      case 7:
        if (!formData.subscriptionPlan || !formData.paymentPlan) return false;
        return true;
      default:
        return true;
    }
  };


  const nextStep = (e) => {
    e?.preventDefault();
    if (!validateStep()) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (currentStep < 7) {
      setCurrentStep(c => c + 1);
    } else {
      setFormData(prev => ({ ...prev, isSubmitted: true }));
    }
  };
  
  const prevStep = () => {
    setShowErrors(false);
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const handleInput = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: e.target.multiple ? Array.from(files) : files[0] }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        // Auto-calculate monthly customers if daily changes
        if (name === 'customersPerDay') {
          newData.customersMonthly = value ? parseInt(value, 10) * 30 : '';
        }
        // Sync custom loyalty subtypes
        if (name === 'customCombo') {
          newData.customSubType = value;
          // Reset advanced config when switching subtypes
          newData.showAdvancedConfig = false;
          newData.hasSpecialOccasions = false;
        }
        if (name === 'customSubType') {
          newData.customCombo = value;
        }
        // Reset advanced config when changing main loyalty type
        if (name === 'loyaltyType') {
          newData.showAdvancedConfig = false;
          newData.hasSpecialOccasions = false;
        }
        return newData;
      });
    }
  };


  const handleStoreInput = (index, e) => {
    const { name, value, type, files } = e.target;
    
    setFormData(prev => {
      const newStores = [...prev.stores];
      // Clone the individual store object so React detects the reference change properly
      const updatedStore = { ...newStores[index] };
      
      if (type === 'file') {
        updatedStore[name] = Array.from(files);
      } else {
        updatedStore[name] = value;
        // Reset city when country changes
        if (name === 'country') {
          updatedStore['city'] = '';
        }
      }
      
      newStores[index] = updatedStore;
      return { ...prev, stores: newStores };
    });
  };

  const addStore = () => {
    if (formData.stores.length < parseInt(formData.storeCount || 1)) {
      setFormData({
        ...formData,
        stores: [
          ...formData.stores,
          {
            country: 'UZ', city: '', streetAddress: '', zipCode: '',
            storeContactPrefix: '998', storeContact: '', storeEmail: '', workingHours: '', workingDays: '',
            storeWebsite: '', storePhotos: null
          }
        ]
      });
    }
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="onboarding-step animate-fadeUp">
            <h2 className="step-heading">General Business Information</h2>
            <p className="step-subheading">Help us tailor the ZakazPro experience to your industry.</p>
            
            <div className="form-group mt-6">
              <label className="form-label">Business category/industry *</label>
              <select className="form-select" name="category" value={formData.category} onChange={handleInput}>
                <option value="">Select a category</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothing and Footwear">Clothing and Footwear</option>
                <option value="Beauty">Beauty</option>
                <option value="Health">Health</option>
                <option value="Services">Services</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Household Goods">Household Goods</option>
                <option value="Electronics">Electronics</option>
                <option value="Pets">Pets</option>
                <option value="Children Products">Children Products</option>
                <option value="Education">Education</option>
                <option value="Auto">Auto</option>
                <option value="Travel & Hospitality">Travel & Hospitality</option>
                <option value="Sport">Sport</option>
                <option value="Hobby and Arts">Hobby and Arts</option>
                <option value="Flowers">Flowers</option>
                <option value="Events">Events</option>
                <option value="Jewellery">Jewellery</option>
                <option value="Perfumery">Perfumery</option>
                <option value="Finances">Finances</option>
                <option value="Business">Business</option>
                <option value="Religion & Culture">Religion & Culture</option>
                <option value="Other">Other</option>
              </select>
              <ErrorMsg showErrors={showErrors} condition={!formData.category} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Legal Business Name *</label>
              <input className="form-input" type="text" name="legalName" placeholder="e.g. LLC ZakazPro" value={formData.legalName} onChange={handleInput} />
              <ErrorMsg showErrors={showErrors} condition={!formData.legalName} />
            </div>

            <div className="form-group">
              <label className="form-label">Business format *</label>
              <select className="form-select" name="format" value={formData.format} onChange={handleInput}>
                <option value="">Select format</option>
                <option value="Single store">Single store</option>
                <option value="Multi-store">Multi-store (same owner)</option>
                <option value="Chain">Chain</option>
                <option value="Franchise">Franchise</option>
                <option value="Other">Other (text)</option>
              </select>
              <ErrorMsg showErrors={showErrors} condition={!formData.format} />
            </div>

            {formData.format === 'Multi-store' && (
              <div className="form-group animate-fadeUp">
                <label className="form-label">Number of Stores *</label>
                <input className="form-input" type="number" name="storeCount" min="2" value={formData.storeCount} onChange={handleInput} />
                <ErrorMsg showErrors={showErrors} condition={!formData.storeCount} />
              </div>
            )}

            {['Chain', 'Franchise', 'Other'].includes(formData.format) && (
              <div className="config-box animate-fadeUp">
                <h4 style={{ color: 'var(--color-gold)' }}>Request call from your Personal Manager</h4>
                <p className="helper-text mb-4" style={{ marginBottom: '16px' }}>You'll get a call from your personal manager.</p>
                <div className="form-group mt-2">
                  <label className="form-label">Enter Phone Number *</label>
                  <input className="form-input" type="tel" name="callbackPhone" placeholder="+998 90 123 45 67" value={formData.callbackPhone} onChange={handleInput} />
                  <ErrorMsg showErrors={showErrors} condition={!formData.callbackPhone} />
                </div>
                <button type="button" className="btn btn-secondary mt-2" onClick={() => alert("Call request submitted! A log will be created for the Sales Team. You can now proceed with onboarding.")}>Submit Request</button>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="onboarding-step animate-fadeUp">
            <h2 className="step-heading">Legal Business Information</h2>
            <p className="step-subheading">We need your Tax ID to verify your business and issue invoices.</p>
            
            <div className="form-group mt-6">
              <label className="form-label">Brand / Trading name</label>
              <input className="form-input" type="text" name="brandName" placeholder="e.g. ZakazPro Sweets" value={formData.brandName} onChange={handleInput} />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Business Logo</label>
              <label className="upload-box">
                <input type="file" name="logo" accept=".png, .jpg, .jpeg" onChange={handleInput} style={{display: 'none'}} />
                <Icons.Upload />
                <span>{formData.logo ? formData.logo.name : 'Click or drag logo here'}</span>
                {!formData.logo && <small>PNG, JPG up to 2MB (Single file upload)</small>}
              </label>
            </div>

            <div className="form-group mt-6">
              <label className="form-label">ИНН / TIN / Tax ID / STIR *</label>
              <input className="form-input" type="text" name="tin" placeholder="e.g. 123456789" value={formData.tin} onChange={handleInput} />
              <ErrorMsg showErrors={showErrors} condition={!formData.tin} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Legal Business Name *</label>
              <input className="form-input" type="text" name="legalName" placeholder="LLC ZakazPro" value={formData.legalName} onChange={handleInput} />
              <ErrorMsg showErrors={showErrors} condition={!formData.legalName} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Year of Establishment *</label>
              <input className="form-input" type="number" name="yearEstablished" placeholder="e.g. 2018" value={formData.yearEstablished} onChange={handleInput} />
              <ErrorMsg showErrors={showErrors} condition={!formData.yearEstablished} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Legal Address *</label>
              <input className="form-input" type="text" name="legalAddress" placeholder="e.g. 15 Amir Temur Ave, Tashkent" value={formData.legalAddress} onChange={handleInput} />
              <ErrorMsg showErrors={showErrors} condition={!formData.legalAddress} />
            </div>
            
            <div className="form-group">
              <label className="form-label">VAT number</label>
              <input className="form-input" type="text" name="vatNumber" value={formData.vatNumber} onChange={handleInput} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Business registration number</label>
              <input className="form-input" type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInput} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Director’s Name</label>
              <input className="form-input" type="text" name="directorName" value={formData.directorName} onChange={handleInput} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Website</label>
              <input className="form-input" type="text" name="website" placeholder="https://" value={formData.website} onChange={handleInput} />
            </div>

            <div className="form-group">
              <label className="form-label">Upload ИНН / TIN / Tax ID / STIR Document</label>
              <label className="upload-box" style={{ padding: '20px' }}>
                <input type="file" name="tinFile" onChange={handleInput} style={{display: 'none'}} />
                <Icons.Upload />
                <span>{formData.tinFile ? formData.tinFile.name : 'Upload Document'}</span>
              </label>
            </div>

            <div className="form-group mt-6">
              <div className="checkbox-group">
                <input type="checkbox" id="requiresLicense" name="requiresLicense" checked={formData.requiresLicense} onChange={handleInput} />
                <label htmlFor="requiresLicense" style={{ fontWeight: 600 }}>Licenses / permits required?</label>
              </div>
            </div>

            {formData.requiresLicense && (
              <div className="config-box animate-fadeUp">
                <div className="form-group">
                  <label className="form-label">License type</label>
                  <input className="form-input" type="text" name="licenseType" value={formData.licenseType} onChange={handleInput} />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">License number</label>
                  <input className="form-input" type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInput} />
                </div>
                <div className="form-group mt-2">
                  <label className="form-label">Expiry date (optional)</label>
                  <input className="form-input" type="date" name="licenseExpiry" value={formData.licenseExpiry} onChange={handleInput} />
                </div>
              </div>
            )}
            
            <div className="form-group mt-6">
              <label className="form-label">Upload additional documents (Certificate of registration, VAT certificate, licenses, etc.)</label>
              <label className="upload-box" style={{ padding: '20px' }}>
                <input type="file" name="additionalDocs" multiple onChange={handleInput} style={{display: 'none'}} />
                <Icons.Upload />
                <span>{formData.additionalDocs?.length ? `${formData.additionalDocs.length} files selected` : 'Upload Additional Docs'}</span>
              </label>
            </div>
            
            <div className="form-group mt-6" style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">Average customers Per Day</label>
                <input className="form-input" type="number" name="customersPerDay" value={formData.customersPerDay} onChange={handleInput} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Average customers (Monthly)</label>
                <input className="form-input" type="number" name="customersMonthly" value={formData.customersMonthly} readOnly style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-gold)' }} />
                <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '6px' }}>Auto-calculated</small>
              </div>
            </div>

          </div>
        );
      case 3:
        return (
          <div className="onboarding-step animate-fadeUp">
            <h2 className="step-heading">Add Store</h2>
            <p className="step-subheading">Where will customers earn and redeem their loyalty points?</p>
            
            {formData.stores.map((store, index) => (
              <div key={index} className="config-box animate-fadeUp" style={{ padding: '32px 24px', marginBottom: '24px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '16px', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.Check /> Store {index + 1}
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select className="form-select" name="country" value={store.country} onChange={(e) => handleStoreInput(index, e)}>
                      <option value="">Select country</option>
                      {Country.getAllCountries().map(c => (
                        <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <select className="form-select" name="city" value={store.city} onChange={(e) => handleStoreInput(index, e)}>
                      <option value="">Select city</option>
                      {City.getCitiesOfCountry(store.country).map((c, i) => (
                        <option key={`${c.countryCode}-${c.stateCode}-${c.name}-${i}`} value={c.name}>
                          {c.name} {c.stateCode ? `(${c.stateCode})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label className="form-label">Street Address *</label>
                  <input className="form-input" type="text" name="streetAddress" placeholder="e.g. 15 Amir Temur Ave" value={store.streetAddress} onChange={(e) => handleStoreInput(index, e)} />
                  <ErrorMsg showErrors={showErrors} condition={!store.streetAddress} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Zip/Postal Code</label>
                    <input className="form-input" type="text" name="zipCode" placeholder="100000" value={store.zipCode} onChange={(e) => handleStoreInput(index, e)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Store Contact *</label>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <select className="form-select" name="storeContactPrefix" value={store.storeContactPrefix || '998'} onChange={(e) => handleStoreInput(index, e)} style={{width: '120px'}}>
                        {Country.getAllCountries().map(c => (
                          <option key={`${c.isoCode}-${c.phonecode}`} value={c.phonecode}>
                            {c.isoCode} (+{c.phonecode})
                          </option>
                        ))}
                      </select>
                      <input className="form-input" type="tel" name="storeContact" placeholder="90 123 45 67" value={store.storeContact} onChange={(e) => handleStoreInput(index, e)} style={{flex: 1}} />
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!store.storeContact} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Store Email</label>
                    <input className="form-input" type="email" name="storeEmail" placeholder="store@example.com" value={store.storeEmail} onChange={(e) => handleStoreInput(index, e)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Store Website</label>
                    <input className="form-input" type="url" name="storeWebsite" placeholder="https://" value={store.storeWebsite} onChange={(e) => handleStoreInput(index, e)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Store Working Hours *</label>
                    <input className="form-input" type="time" name="workingHours" value={store.workingHours} onChange={(e) => handleStoreInput(index, e)} />
                    <ErrorMsg showErrors={showErrors} condition={!store.workingHours} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Store Working Days *</label>
                    <select className="form-select" name="workingDays" value={store.workingDays} onChange={(e) => handleStoreInput(index, e)}>
                      <option value="">Select days</option>
                      <option value="Mon-Sun">Mon-Sun (Everyday)</option>
                      <option value="Mon-Fri">Mon-Fri (Weekdays)</option>
                      <option value="Mon-Sat">Mon-Sat</option>
                    </select>
                    <ErrorMsg showErrors={showErrors} condition={!store.workingDays} />
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label className="form-label">Add store Photos</label>
                  <label className="upload-box" style={{ padding: '20px' }}>
                    <input type="file" name="storePhotos" multiple accept="image/*" onChange={(e) => handleStoreInput(index, e)} style={{ display: 'none' }} />
                    <Icons.Upload />
                    <span>{store.storePhotos?.length ? `${store.storePhotos.length} photos selected` : 'Upload up to 10 photos'}</span>
                    <small style={{ color: 'var(--color-text-muted)' }}>PNG, JPG</small>
                  </label>
                </div>
              </div>
            ))}
            
            {formData.format === 'Multi-store' && (
              <div className="mt-4">
                {formData.stores.length < parseInt(formData.storeCount || 1) ? (
                  <button type="button" className="btn btn-ghost" onClick={addStore} style={{padding: 0, marginTop: '8px', color: 'var(--color-gold)'}}>
                    + Add Another Store ({formData.stores.length} / {formData.storeCount})
                  </button>
                ) : (
                  <p className="text-xs italic text-[var(--color-gold)] opacity-80 animate-fadeUp">
                     Note: You added the maximum number of stores ({formData.storeCount}) selected in Step 1.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="onboarding-step animate-fadeUp">
            <h2 className="step-heading">Add Contact Person Information</h2>
            <p className="step-subheading">Who will manage the ZakazPro Loyalty dashboard?</p>

            <div className="form-group mt-6">
              <label className="form-label">Representative full name *</label>
              <input className="form-input" type="text" name="contactName" placeholder="E.g. Rustamov Anvar" value={formData.contactName} onChange={handleInput} />
              <ErrorMsg showErrors={showErrors} condition={!formData.contactName} />
            </div>

            <div className="form-group">
              <label className="form-label">Position / Role *</label>
              <select className="form-select" name="contactPosition" value={formData.contactPosition} onChange={handleInput}>
                <option value="">Select position</option>
                <option value="Owner">Owner</option>
                <option value="Director">Director</option>
                <option value="Manager">Manager</option>
                <option value="Other">Other</option>
              </select>
              <ErrorMsg showErrors={showErrors} condition={!formData.contactPosition} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
              <div className="form-group">
                <label className="form-label">Phone number *</label>
                <div style={{display: 'flex', gap: '8px'}}>
                  <select className="form-select" name="contactPhonePrefix" value={formData.contactPhonePrefix} onChange={handleInput} style={{width: '120px'}}>
                    {Country.getAllCountries().map(c => (
                      <option key={`${c.isoCode}-${c.phonecode}`} value={c.phonecode}>
                        {c.isoCode} (+{c.phonecode})
                      </option>
                    ))}
                  </select>
                  <input className="form-input" type="tel" name="contactPhone" placeholder="90 123 45 67" value={formData.contactPhone} onChange={handleInput} style={{flex: 1}} />
                </div>
                <ErrorMsg showErrors={showErrors} condition={!formData.contactPhone} />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" name="contactEmail" placeholder="contact@example.com" value={formData.contactEmail} onChange={handleInput} />
                <ErrorMsg showErrors={showErrors} condition={!formData.contactEmail} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
              <div className="form-group">
                <label className="form-label">Preferred contact method</label>
                <select className="form-select" name="contactMethod" value={formData.contactMethod} onChange={handleInput}>
                  <option value="">Select method</option>
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp/Telegram">WhatsApp/Telegram</option>
                  <option value="Email">Email</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Best time to contact</label>
                <select className="form-select" name="contactTime" value={formData.contactTime} onChange={handleInput}>
                  <option value="">Select time</option>
                  <option value="Morning">Morning (09:00 - 12:00)</option>
                  <option value="Afternoon">Afternoon (13:00 - 17:00)</option>
                  <option value="Evening">Evening (17:00 - 20:00)</option>
                </select>
              </div>
            </div>

            <div className="form-group mt-6">
              <label className="form-label">Is this person the decision-maker?</label>
              <div style={{display: 'flex', gap: '16px', marginTop: '12px'}}>
                <label className="radio-card" style={{padding: '12px 24px', flex: 1}}>
                  <input type="radio" name="isDecisionMaker" value="yes" onChange={handleInput} checked={formData.isDecisionMaker === 'yes'} />
                  <div className="rc-content" style={{textAlign: 'center', width: '100%'}}>Yes</div>
                </label>
                <label className="radio-card" style={{padding: '12px 24px', flex: 1}}>
                  <input type="radio" name="isDecisionMaker" value="no" onChange={handleInput} checked={formData.isDecisionMaker === 'no'} />
                  <div className="rc-content" style={{textAlign: 'center', width: '100%'}}>No</div>
                </label>
              </div>
            </div>

            {formData.isDecisionMaker === 'no' && (
              <div className="config-box animate-fadeUp">
                <div className="form-group">
                  <label className="form-label">Decision-maker name (optional)</label>
                  <input className="form-input" type="text" name="decisionMakerName" placeholder="E.g. Karimova Aziza" value={formData.decisionMakerName} onChange={handleInput} />
                </div>
                <div className="form-group mt-4">
                  <label className="form-label">Decision-maker contact (optional)</label>
                  <input className="form-input" type="text" name="decisionMakerContact" placeholder="Phone or Email" value={formData.decisionMakerContact} onChange={handleInput} />
                </div>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="onboarding-step animate-fadeUp">
            <h2 className="step-heading">Understanding Business Requirements</h2>
            <p className="step-subheading">Help us tailor your loyalty program layout.</p>

            <div className="config-box animate-fadeUp mt-6">
              <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Do you understand how loyalty program models work? *</h4>
              <p className="helper-text mb-4">Select your level of familiarity.</p>
              
              <div className="form-group">
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <label className="radio-card" style={{padding: '16px'}}>
                    <input type="radio" name="loyaltyKnowledge" value="already_using" onChange={handleInput} checked={formData.loyaltyKnowledge === 'already_using'} />
                    <div className="rc-content">Yes, we already use one</div>
                  </label>
                  <label className="radio-card" style={{padding: '16px'}}>
                    <input type="radio" name="loyaltyKnowledge" value="heard_not_using" onChange={handleInput} checked={formData.loyaltyKnowledge === 'heard_not_using'} />
                    <div className="rc-content">Yes, but we don't use any</div>
                  </label>
                  <label className="radio-card" style={{padding: '16px'}}>
                    <input type="radio" name="loyaltyKnowledge" value="basic" onChange={handleInput} checked={formData.loyaltyKnowledge === 'basic'} />
                    <div className="rc-content">Basic understanding</div>
                  </label>
                  <label className="radio-card" style={{padding: '16px'}}>
                    <input type="radio" name="loyaltyKnowledge" value="need_course" onChange={handleInput} checked={formData.loyaltyKnowledge === 'need_course'} />
                    <div className="rc-content">No, I need a crash course</div>
                  </label>
                </div>
              <ErrorMsg showErrors={showErrors} condition={!formData.loyaltyKnowledge} />
              </div>
            </div>

            {['heard_not_using', 'basic'].includes(formData.loyaltyKnowledge) && (
              <div className="config-box animate-fadeUp mt-6">
                <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Goals for implementing a Loyalty Program</h4>
                <p className="helper-text mb-4">Pick and prioritize your business objectives.</p>
                
                <div className="form-group mt-4">
                  <label className="form-label">Primary Goals (Priority #1) *</label>
                  <select className="form-select" name="primaryGoal" value={formData.primaryGoal} onChange={handleInput}>
                    <option value="">Select Primary Goal</option>
                    <option value="Increase Customer Retention Rate">Increase Customer Retention Rate</option>
                    <option value="Boost Customer Lifetime Value (CLV)">Boost Customer Lifetime Value (CLV)</option>
                    <option value="Strengthen Brand Loyalty & Emotional Connection">Strengthen Brand Loyalty & Emotional Connection</option>
                  </select>
                  <ErrorMsg showErrors={showErrors} condition={!formData.primaryGoal} />
                  {formData.primaryGoal === 'Increase Customer Retention Rate' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Encourage repeat purchases by rewarding loyal customers and reducing churn.</p>}
                  {formData.primaryGoal === 'Boost Customer Lifetime Value (CLV)' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Motivate members to spend more frequently and increase their average order value over time.</p>}
                  {formData.primaryGoal === 'Strengthen Brand Loyalty & Emotional Connection' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Create meaningful engagement through exclusive rewards, personalized offers, and recognition benefits.</p>}
                </div>

                <div className="form-group mt-4">
                  <label className="form-label">Secondary Goals (Priority #2) *</label>
                  <select className="form-select" name="secondaryGoal" value={formData.secondaryGoal} onChange={handleInput}>
                    <option value="">Select Secondary Goal</option>
                    <option value="Increase Purchase Frequency">Increase Purchase Frequency</option>
                    <option value="Enhance Customer Data Collection & Insights">Enhance Customer Data Collection & Insights</option>
                    <option value="Drive Referrals & Word-of-Mouth Marketing">Drive Referrals & Word-of-Mouth Marketing</option>
                  </select>
                  <ErrorMsg showErrors={showErrors} condition={!formData.secondaryGoal} />
                  {formData.secondaryGoal === 'Increase Purchase Frequency' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Use point systems, tier upgrades, and milestone rewards to encourage more frequent transactions.</p>}
                  {formData.secondaryGoal === 'Enhance Customer Data Collection & Insights' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Gather valuable customer behavior data to personalize marketing campaigns and improve product offerings.</p>}
                  {formData.secondaryGoal === 'Drive Referrals & Word-of-Mouth Marketing' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Incentivize members to refer friends and family through bonus rewards or referral bonuses.</p>}
                </div>

                <div className="form-group mt-4">
                  <label className="form-label">Tertiary Goals (Priority #3) *</label>
                  <select className="form-select" name="tertiaryGoal" value={formData.tertiaryGoal} onChange={handleInput}>
                    <option value="">Select Tertiary Goal</option>
                    <option value="Differentiate from Competitors">Differentiate from Competitors</option>
                    <option value="Improve Customer Engagement Across Channels">Improve Customer Engagement Across Channels</option>
                    <option value="Increase Cross-Selling & Upselling Opportunities">Increase Cross-Selling & Upselling Opportunities</option>
                  </select>
                  <ErrorMsg showErrors={showErrors} condition={!formData.tertiaryGoal} />
                  {formData.tertiaryGoal === 'Differentiate from Competitors' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Stand out in the market by offering unique rewards, VIP tiers, or experiential benefits.</p>}
                  {formData.tertiaryGoal === 'Improve Customer Engagement Across Channels' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Encourage interaction via app usage, social media participation, surveys, and feedback programs.</p>}
                  {formData.tertiaryGoal === 'Increase Cross-Selling & Upselling Opportunities' && <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>Promote complementary products or premium upgrades through targeted loyalty incentives.</p>}
                </div>
              </div>
            )}

            {formData.loyaltyKnowledge === 'need_course' && !formData.crashCourseCompleted && (
              <div className="config-box animate-fadeUp mt-6">
                <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>What is a Loyalty Program and what types are there?</h4>
                <div style={{background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', border: '1px solid var(--color-border)', marginBottom: '16px'}}>
                  <span style={{fontSize: '48px'}}>📺</span>
                  <p style={{marginTop: '12px', color: 'var(--color-gold)'}}>Educational Video Placeholder</p>
                </div>
                <p className="helper-text mb-4" style={{fontSize: '14px', lineHeight: '1.6'}}>A loyalty program is a structured marketing strategy designed to encourage customers to continue to shop with your business. Types include Points systems, Visit tracking, and VIP Tiers.</p>
                
                <button type="button" className="btn btn-secondary" style={{width: '100%', padding: '12px'}} onClick={() => setFormData({...formData, crashCourseCompleted: true})}>
                  Got it! I'm ready to choose
                </button>
              </div>
            )}

            {/* Preferred Program Type Logic */}
            {(formData.loyaltyKnowledge && (formData.loyaltyKnowledge !== 'need_course' || formData.crashCourseCompleted)) && (
              <div className="config-box animate-fadeUp mt-6">
                <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Preferred loyalty program type</h4>
                <p className="helper-text mb-4">Select the engine that best fits your business model.</p>

                <div className="form-group">
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <label className="radio-card" style={{padding: '16px'}}>
                      <input type="radio" name="loyaltyType" value="Flat" onChange={handleInput} checked={formData.loyaltyType === 'Flat'} />
                      <div className="rc-content">Flat % Discount</div>
                    </label>
                    <label className="radio-card" style={{padding: '16px'}}>
                      <input type="radio" name="loyaltyType" value="FlatAmount" onChange={handleInput} checked={formData.loyaltyType === 'FlatAmount'} />
                      <div className="rc-content">Fixed discount (amount off)</div>
                    </label>
                    <label className="radio-card" style={{padding: '16px'}}>
                      <input type="radio" name="loyaltyType" value="Tiers" onChange={handleInput} checked={formData.loyaltyType === 'Tiers'} />
                      <div className="rc-content">Tier-based discounts</div>
                    </label>
                    <label className="radio-card" style={{padding: '16px'}}>
                      <input type="radio" name="loyaltyType" value="Visits" onChange={handleInput} checked={formData.loyaltyType === 'Visits'} />
                      <div className="rc-content">Visit-based discounts</div>
                    </label>
                    <label className="radio-card" style={{padding: '16px'}}>
                      <input type="radio" name="loyaltyType" value="Points" onChange={handleInput} checked={formData.loyaltyType === 'Points'} />
                      <div className="rc-content">Points-based</div>
                    </label>
                    <label className="radio-card" style={{padding: '16px'}}>
                      <input type="radio" name="loyaltyType" value="Custom" onChange={handleInput} checked={formData.loyaltyType === 'Custom'} />
                      <div className="rc-content">Customized / Combined program</div>
                    </label>
                  </div>
                  <ErrorMsg showErrors={showErrors} condition={!formData.loyaltyType} />
                </div>

                {/* Conditional Sub-fields based on Program Type */}
                {formData.loyaltyType === 'Flat' && (
                  <div className="mt-4 p-4" style={{background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
                    <p className="helper-text" style={{color: 'var(--color-gold)'}}>Example - 5%, 10%, 15% off all purchases.</p>
                  </div>
                )}
                
                {formData.loyaltyType === 'FlatAmount' && (
                  <div className="mt-4 p-4" style={{background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
                    <p className="helper-text" style={{color: 'var(--color-gold)'}}>Example - 10,000 UZS or 50,000 UZS off the total bill.</p>
                  </div>
                )}
                
                {formData.loyaltyType === 'Tiers' && (
                  <div className="mt-4 p-4" style={{background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
                    <p className="helper-text mb-2">Levels based on customer spending:</p>
                    <ul className="tier-preview" style={{marginLeft: '16px'}}>
                      <li><span style={{color: '#CD7F32'}}>Bronze:</span> Entry level - 5%</li>
                      <li><span style={{color: '#A8A9AD'}}>Silver:</span> Spend 10 million UZS - 7%</li>
                      <li><span style={{color: '#F5C842'}}>Gold:</span> Spend 50 million UZS - 10%</li>
                      <li><span style={{color: '#e5e4e2'}}>Platinum:</span> Spend 90 million UZS - 12%</li>
                    </ul>
                  </div>
                )}
                
                {formData.loyaltyType === 'Visits' && (
                  <div className="mt-4 p-4" style={{background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
                    <p className="helper-text mb-2">Example:</p>
                    <ul className="tier-preview" style={{marginLeft: '16px'}}>
                      <li>Visit 1–4 → No discount</li>
                      <li>Visit 5 → 10% off</li>
                      <li>Visit 10 → 25% off</li>
                      <li>Visit 15 → Free item</li>
                    </ul>
                    <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>* After 25 Visits reset the counting.</p>
                  </div>
                )}
                
                {formData.loyaltyType === 'Points' && (
                  <div className="mt-4 p-4" style={{background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
                    <p className="helper-text mb-2">Example:</p>
                    <ul className="tier-preview" style={{marginLeft: '16px'}}>
                      <li>100 points = $5 discount</li>
                      <li>1 point = $0.05</li>
                    </ul>
                  </div>
                )}
                
                {formData.loyaltyType === 'Custom' && (
                  <div className="mt-4 p-4 animate-fadeUp" style={{background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
                    <label className="form-label">Select Combo *</label>
                    <select className="form-select" name="customCombo" value={formData.customCombo} onChange={handleInput}>
                      <option value="">Choose combo type</option>
                      <option value="flat_tier_points">1. Flat % + Tier-Based + Points-Based</option>
                      <option value="fixed_visit_points">2. Fixed Discount + Visit-Based + Points</option>
                      <option value="tier_visit">3. Tier-Based + Visit-Based</option>
                      <option value="flat_fixed_points">4. Flat % + Fixed Discount + Points</option>
                      <option value="visit_tier_points">5. Visit-Based + Tier-Based + Points</option>
                    </select>
                    <ErrorMsg showErrors={showErrors} condition={!formData.customCombo} />
                  </div>
                )}
              </div>
            )}
                      </div>
        );
      case 6:
        return (
          <div className="onboarding-step animate-fadeUp">
            <h2 className="step-heading">Configure Loyalty Program</h2>
            <p className="step-subheading">Choose the engine that rewards your customers. You can change this later.</p>
            
            <div className="form-group mt-6">
              <label className="form-label">Loyalty Program Type *</label>
              <select className="form-select" name="loyaltyType" value={formData.loyaltyType} onChange={handleInput}>
                <option value="Flat">Flat % Discount</option>
                <option value="FlatAmount">Flat Discount / OFF</option>
                <option value="Points">Points-Based (Most Popular)</option>
                <option value="Tiers">Tier-Based (Bronze, Silver, Gold)</option>
                <option value="Visits">Visit-Based (Buy 5 get 1 free)</option>
                <option value="Custom">Customized / Combined Program</option>
              </select>
            </div>

            {formData.loyaltyType === 'Points' && (
              <div className="config-box animate-fadeUp">
                <h4>Points-based Program Configuration</h4>
                <p className="helper-text mb-6">Currency spent is converted into points for future redemption.</p>

                <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>

                {/* ── Earning Rules ── */}
                <p className="form-label mb-4" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Earning Rule Configuration</p>

                <div className="form-group mb-6">
                  <label className="form-label">Earning Ratio *</label>
                  <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                    <input className="form-input" type="number" name="pointsEarningRatio" placeholder="e.g. 1000" value={formData.pointsEarningRatio || ''} onChange={handleInput} />
                    <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS spent</span>
                  </div>
                  <p className="helper-text mt-1 text-xs italic">Example: 1 Point = 1,000 UZS → Spend 50,000 UZS, earn 50 points.</p>
                  <ErrorMsg showErrors={showErrors} condition={!formData.pointsEarningRatio} />
                </div>

                <div className="form-group mb-6">
                  <label className="form-label">Minimum Spend to Earn (UZS) *</label>
                  <input className="form-input" type="number" name="pointsMinSpend" placeholder="e.g. 10,000 UZS" value={formData.pointsMinSpend || ''} onChange={handleInput} />
                  <ErrorMsg showErrors={showErrors} condition={!formData.pointsMinSpend} />
                </div>

                <div className="form-group mb-6">
                  <label className="form-label">Earn On *</label>
                  <select className="form-select" name="pointsEarnOn" value={formData.pointsEarnOn} onChange={handleInput}>
                    <option value="Sale Amount">Sale Amount (before discount)</option>
                    <option value="After discount Amount">After Discount Amount</option>
                  </select>
                </div>

                <div className="form-group mb-8">
                  <label className="form-label">Points Expiry (days from creation) *</label>
                  <input className="form-input" type="number" name="pointsExpiryDays" placeholder="e.g. 365" value={formData.pointsExpiryDays || ''} onChange={handleInput} />
                  <p className="helper-text mt-1 text-xs italic">Points will expire after this many days if not redeemed. Set 0 for no expiry.</p>
                  <ErrorMsg showErrors={showErrors} condition={!formData.pointsExpiryDays} />
                </div>

                <div className="form-group mb-10">
                  <label className="form-label">Welcome Bonus *</label>
                  <select className="form-select" name="welcomeBonusType" value={formData.welcomeBonusType || ''} onChange={handleInput}>
                    <option value="">Select an incentive strategy</option>
                    <option value="None">None</option>
                    <option value="Free Gift">Free Gift</option>
                    <option value="Discount %">Discount %</option>
                  </select>
                  <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusType} />
                  {formData.welcomeBonusType === 'Free Gift' && (
                    <input className="form-input mt-2" type="text" name="welcomeBonusValue" placeholder="Describe the gift (e.g. Free Starter)" value={formData.welcomeBonusValue || ''} onChange={handleInput} />
                  )}
                  {formData.welcomeBonusType === 'Discount %' && (
                    <input className="form-input mt-2" type="number" name="welcomeBonusValue" placeholder="Bonus Discount %" value={formData.welcomeBonusValue || ''} onChange={handleInput} />
                  )}
                  {['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusValue} />}
                  <p className="helper-text mt-2 text-sm italic">Note: Welcome bonus can only be redeemed on the very first purchase.</p>
                </div>

                {/* ── Redemption Rules ── */}
                <p className="form-label mb-4" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Redemption Rules Configuration</p>

                <div className="form-group mb-6">
                  <label className="form-label">Redemption Value *</label>
                  <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                    <input className="form-input" type="number" name="pointsRedemptionValue" placeholder="e.g. 50" value={formData.pointsRedemptionValue || ''} onChange={handleInput} />
                    <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS discount</span>
                  </div>
                  <p className="helper-text mt-1 text-xs italic">Example: 1 Point = 50 UZS → Redeem 100 points to save 5,000 UZS.</p>
                  <ErrorMsg showErrors={showErrors} condition={!formData.pointsRedemptionValue} />
                </div>

                <div className="form-group mb-6">
                  <label className="form-label">Minimum Points to Redeem *</label>
                  <input className="form-input" type="number" name="pointsMinRedeem" placeholder="e.g. 100 points" value={formData.pointsMinRedeem || ''} onChange={handleInput} />
                  <ErrorMsg showErrors={showErrors} condition={!formData.pointsMinRedeem} />
                </div>

                <div className="form-group mb-8">
                  <label className="form-label">Max % of Order Allowed for Redemption *</label>
                  <input className="form-input" type="number" name="pointsMaxOrderPercent" placeholder="e.g. 20 (%)" value={formData.pointsMaxOrderPercent || ''} onChange={handleInput} />
                  <p className="helper-text mt-1 text-xs italic">Cap how much of any single order total can be paid via points redemption.</p>
                  <ErrorMsg showErrors={showErrors} condition={!formData.pointsMaxOrderPercent} />
                </div>

                <hr className="my-6 border-[var(--color-border)]" />

                <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                  <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                    {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                  </button>
                </div>

                {formData.showAdvancedConfig && (
                  <div className="advanced-settings-container animate-fadeUp">
                    <div className="form-group flex justify-between items-center mb-4">
                      <div>
                        <label className="form-label mb-0">Special occasions discounts (optional)</label>
                        <p className="helper-text text-xs">Automatically award bonus points on specific holidays.</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    {formData.hasSpecialOccasions && (
                      <SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="pts" />
                    )}
                  </div>
                )}
              </div>
            )}
            
            {formData.loyaltyType === 'Tiers' && (
                <div className="config-box animate-fadeUp">
                  <h4>Tier-based Discounts Configuration</h4>
                  <p className="helper-text mb-6">Progressive rewards for your most loyal customers.</p>
                  
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>
                  
                  <div className="form-group mb-6">
                    <label className="form-label">Tier Allotment Calculation Period *</label>
                    <select className="form-select" name="tierCalculationPeriod" value={formData.tierCalculationPeriod} onChange={handleInput}>
                      <option value="Annual">Annual Spend</option>
                      <option value="Quarterly">Quarterly Spend</option>
                      <option value="Monthly">Monthly Spend</option>
                    </select>
                    <p className="helper-text mt-1 text-xs italic">Customers must maintain spending within this period to keep their tier.</p>
                  </div>

                  <div className="tiers-list mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="form-label mb-0">Platform Loyalty Levels</label>
                      <div className="flex gap-2">
                        <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-[var(--color-border)] rounded-md hover:border-[var(--color-gold)]" 
                          onClick={() => {
                            const newTiers = [...formData.loyaltyTiers, { name: `Level ${formData.loyaltyTiers.length + 1}`, discount: 0, minSpend: 0, color: '#FFFFFF' }];
                            setFormData({...formData, loyaltyTiers: newTiers});
                          }}>
                          + Add Level
                        </button>
                        {formData.loyaltyTiers.length > 1 && (
                          <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-red-500/30 text-red-400 rounded-md hover:bg-red-500/10" 
                            onClick={() => {
                              const newTiers = [...formData.loyaltyTiers];
                              newTiers.pop();
                              setFormData({...formData, loyaltyTiers: newTiers});
                            }}>
                            - Remove Level
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {formData.loyaltyTiers.map((tier, idx) => (
                        <div key={idx} className="p-6 rounded-lg bg-white/5 border border-[var(--color-border)] relative overflow-hidden mb-6">
                          <div className="absolute left-0 top-0 bottom-0 w-1" style={{background: tier.color}}></div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Level Name</label>
                              <input className="form-input text-sm py-2" type="text" placeholder="e.g. Bronze" value={tier.name} 
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    loyaltyTiers: formData.loyaltyTiers.map((t, i) => 
                                      i === idx ? { ...t, name: e.target.value } : t
                                    )
                                  });
                                }} 
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Discount (%)</label>
                              <input className="form-input text-sm py-2" type="number" placeholder="%" value={tier.discount} 
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    loyaltyTiers: formData.loyaltyTiers.map((t, i) => 
                                      i === idx ? { ...t, discount: e.target.value } : t
                                    )
                                  });
                                }} 
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Spending Req. (UZS)</label>
                              <input className="form-input text-sm py-2" type="number" placeholder="Min Spend" value={tier.minSpend} 
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    loyaltyTiers: formData.loyaltyTiers.map((t, i) => 
                                      i === idx ? { ...t, minSpend: e.target.value } : t
                                    )
                                  });
                                }} 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={formData.loyaltyTiers.some(t => !t.name || !t.discount || !t.minSpend)} />
                  </div>
                  
                  <div className="form-group mt-10 mb-10">
                    <label className="form-label">Welcome Bonus *</label>
                    <select className="form-select" name="welcomeBonusType" value={formData.welcomeBonusType || ''} onChange={handleInput}>
                      <option value="">Select an incentive strategy</option>
                      <option value="None">None</option>
                      <option value="Free Gift">Free Gift</option>
                      <option value="Discount %">Discount %</option>
                    </select>
                    
                    {formData.welcomeBonusType === 'Free Gift' && (
                      <input className="form-input mt-2" type="text" name="welcomeBonusValue" placeholder="Describe the gift (e.g. Free Starter)" value={formData.welcomeBonusValue || ''} onChange={handleInput} />
                    )}
                    {formData.welcomeBonusType === 'Discount %' && (
                      <input className="form-input mt-2" type="number" name="welcomeBonusValue" placeholder="Bonus Discount %" value={formData.welcomeBonusValue || ''} onChange={handleInput} />
                    )}
                    {['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusValue} />}
                  </div>

                  <div className="form-group mt-10 p-6 rounded-lg bg-[var(--color-gold-glow)] border border-[var(--color-gold-dark)]/30">
                    <label className="form-label" style={{color: 'var(--color-gold)'}}>Level-up Reward (One-time)</label>
                    <p className="helper-text text-xs mb-6 font-medium opacity-80">Reward issued instantly when a customer crosses a new tier threshold.</p>
                    <div className="flex gap-4">
                      <select className="form-select text-sm py-2" style={{flex: 1}} name="tierRewardType" value={formData.tierRewardType} onChange={handleInput}>
                        <option value="Discount %">Discount %</option>
                        <option value="Fixed Discount">Fixed Discount (UZS)</option>
                        <option value="Free Gift">Free Gift</option>
                      </select>
                      <input className="form-input text-sm py-2" style={{flex: 1.5}} type={formData.tierRewardType === 'Free Gift' ? 'text' : 'number'} name="tierRewardValue" 
                        placeholder={formData.tierRewardType === 'Free Gift' ? 'Gift Name' : 'Value'} 
                        value={formData.tierRewardValue} onChange={handleInput} 
                      />
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.tierRewardValue} />
                  </div>

                  <hr className="my-8 border-[var(--color-border)]" />
                  
                  <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                    <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                       {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                    </button>
                  </div>

                  {formData.showAdvancedConfig && (
                    <div className="advanced-settings-container animate-fadeUp">
                      <div className="form-group flex justify-between items-center mb-6">
                        <div>
                          <label className="form-label mb-0">Exclude discount for pre-discounted items</label>
                          <p className="helper-text text-xs">(ONLY IF POS IS INTEGRATED)</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="excludeDiscountedItems" checked={formData.excludeDiscountedItems || false} onChange={e => setFormData({...formData, excludeDiscountedItems: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <div className="form-group flex justify-between items-center mb-4">
                        <div>
                          <label className="form-label mb-0">Special occasions discounts (optional)</label>
                          <p className="helper-text text-xs">Automatically bump discounts for specific holidays.</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      {formData.hasSpecialOccasions && (<SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="percent" />)}
                    </div>
                  )}
                </div>
            )}
            

            
            {formData.loyaltyType === 'Flat' && (
                <div className="config-box animate-fadeUp">
                  <h4>Flat Discount Configuration</h4>
                  <p className="helper-text mb-6">Offer a standard percentage discount on all eligible purchases.</p>
                  
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>
                  
                  <div className="form-group">
                    <label className="form-label">Fixed percent (%) *</label>
                    <input className="form-input" type="number" name="flatFixedPercent" placeholder="e.g. 5" value={formData.flatFixedPercent || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.flatFixedPercent} />
                  </div>
                  
                  <div className="form-group mt-4">
                    <label className="form-label">Minimum sale amount *</label>
                    <input className="form-input" type="number" name="flatMinSale" placeholder="e.g. 100,000 UZS" value={formData.flatMinSale || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.flatMinSale} />
                  </div>
                  
                  <div className="form-group mt-4">
                    <label className="form-label">Maximum discount Value *</label>
                    <input className="form-input" type="number" name="flatMaxDiscount" placeholder="e.g. 100,000 UZS" value={formData.flatMaxDiscount || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.flatMaxDiscount} />
                    <p className="helper-text mt-2" style={{color: 'var(--color-gold)'}}>
                      If discount percent exceeds this limit, the deduction will be explicitly capped to this value.
                    </p>
                  </div>
                  
                  <div className="form-group mt-4 mb-8">
                    <label className="form-label">Welcome Bonus *</label>
                    <select className="form-select" name="welcomeBonusType" value={formData.welcomeBonusType || ''} onChange={handleInput}>
                      <option value="">Select an incentive strategy</option>
                      <option value="None">None</option>
                      <option value="Free Gift">Free Gift</option>
                      <option value="Discount %">Discount %</option>
                    </select>
                    <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusType} />
                    
                    {formData.welcomeBonusType === 'Free Gift' && (
                      <input className="form-input mt-2" type="text" name="welcomeBonusValue" placeholder="Describe the gift (e.g. Free Coffee)" value={formData.welcomeBonusValue || ''} onChange={handleInput} />
                    )}
                    {formData.welcomeBonusType === 'Discount %' && (
                      <input className="form-input mt-2" type="number" name="welcomeBonusValue" placeholder="Bonus Discount %" value={formData.welcomeBonusValue || ''} onChange={handleInput} />
                    )}
                    {['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusValue} />}
                    <p className="helper-text mt-2 text-sm italic">Note: Welcome bonus can only be redeemed on the very first purchase.</p>
                  </div>

                  <hr className="my-6 border-[var(--color-border)]" />
                  
                  <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                    <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                       {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                    </button>
                  </div>

                  {formData.showAdvancedConfig && (
                    <div className="advanced-settings-container animate-fadeUp">
                      <div className="form-group flex justify-between items-center mb-6">
                        <div>
                          <label className="form-label mb-0">Exclude discount for pre-discounted items</label>
                          <p className="helper-text text-xs">(ONLY IF POS IS INTEGRATED)</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="excludeDiscountedItems" checked={formData.excludeDiscountedItems || false} onChange={e => setFormData({...formData, excludeDiscountedItems: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <div className="form-group flex justify-between items-center mb-4">
                        <div>
                          <label className="form-label mb-0">Special occasions discounts (optional)</label>
                          <p className="helper-text text-xs">Automatically bump discounts for specific holidays.</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      {formData.hasSpecialOccasions && (<SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="percent" />)}
                    </div>
                  )}
                </div>
            )}

            {formData.loyaltyType === 'FlatAmount' && (
                <div className="config-box animate-fadeUp">
                  <h4>Flat Discount / OFF Configuration</h4>
                  <p className="helper-text mb-6">Offer a fixed amount discount to your customers.</p>
                  
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>
                  
                  <div className="form-group">
                    <label className="form-label">Discount Amount (UZS) *</label>
                    <input className="form-input" type="number" name="fixedDiscountAmount" placeholder="e.g. 50,000 UZS" value={formData.fixedDiscountAmount || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.fixedDiscountAmount} />
                  </div>
                  
                  <div className="form-group mt-4">
                    <label className="form-label">Minimum Spend (UZS) *</label>
                    <input className="form-input" type="number" name="fixedMinSpend" placeholder="e.g. 300,000 UZS" value={formData.fixedMinSpend || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.fixedMinSpend} />
                  </div>
                  
                  <div className="form-group mt-4 mb-8">
                    <label className="form-label">Welcome Bonus *</label>
                    <select className="form-select" name="welcomeBonusType" value={formData.welcomeBonusType || ''} onChange={handleInput}>
                      <option value="">Select an incentive strategy</option>
                      <option value="None">None</option>
                      <option value="Free Gift">Free Gift</option>
                      <option value="Discount %">Discount %</option>
                    </select>
                    <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusType} />
                    
                    {formData.welcomeBonusType === 'Free Gift' && (
                      <input className="form-input mt-2" type="text" name="welcomeBonusValue" placeholder="Describe the gift (e.g. Free Coffee)" value={formData.welcomeBonusValue || ''} onChange={handleInput} />
                    )}
                    {formData.welcomeBonusType === 'Discount %' && (
                      <input className="form-input mt-2" type="number" name="welcomeBonusValue" placeholder="Bonus Discount %" value={formData.welcomeBonusValue || ''} onChange={handleInput} />
                    )}
                    {['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusValue} />}
                    <p className="helper-text mt-2 text-sm italic">Note: Welcome bonus can only be redeemed on the very first purchase.</p>
                  </div>

                  <hr className="my-6 border-[var(--color-border)]" />
                  
                  <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                    <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                       {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                    </button>
                  </div>

                  {formData.showAdvancedConfig && (
                    <div className="advanced-settings-container animate-fadeUp">
                      <div className="form-group flex justify-between items-center mb-6">
                        <div>
                          <label className="form-label mb-0">Exclude discount for pre-discounted items</label>
                          <p className="helper-text text-xs">(ONLY IF POS IS INTEGRATED)</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="excludeDiscountedItems" checked={formData.excludeDiscountedItems || false} onChange={e => setFormData({...formData, excludeDiscountedItems: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <div className="form-group flex justify-between items-center mb-4">
                        <div>
                          <label className="form-label mb-0">Special occasions discounts (optional)</label>
                          <p className="helper-text text-xs">Automatically bump discounts for specific holidays.</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      {formData.hasSpecialOccasions && (<SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="percent" />)}
                    </div>
                  )}
                </div>
            )}

            {formData.loyaltyType === 'Visits' && (
                <div className="config-box animate-fadeUp">
                  <h4>Visit-based Discounts Configuration</h4>
                  <p className="helper-text mb-6">Reward frequency of visits — "Every 5th visit, coffee is free".</p>

                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <label className="form-label mb-0">Visit Milestones *</label>
                      <div className="flex gap-2">
                        <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-[var(--color-border)] rounded-md hover:border-[var(--color-gold)]"
                          onClick={() => setFormData({...formData, visitMilestones: [...formData.visitMilestones, { visits: '', rewardType: 'Discount %', rewardValue: '' }]})}>
                          + Add Milestone
                        </button>
                        {formData.visitMilestones.length > 1 && (
                          <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-red-500/30 text-red-400 rounded-md hover:bg-red-500/10"
                            onClick={() => { const m = [...formData.visitMilestones]; m.pop(); setFormData({...formData, visitMilestones: m}); }}>
                            - Remove Milestone
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-5">
                      {formData.visitMilestones.map((ms, idx) => (
                        <div key={idx} className="p-5 rounded-lg bg-white/5 border border-[var(--color-border)]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Visits Required</label>
                              <input className="form-input text-sm py-2" type="number" placeholder="e.g. 5, 10, 15..."
                                value={ms.visits}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    visitMilestones: formData.visitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, visits: e.target.value } : ms
                                    )
                                  });
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Reward Type</label>
                              <select className="form-select text-sm py-2" value={ms.rewardType}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    visitMilestones: formData.visitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, rewardType: e.target.value, rewardValue: '' } : ms
                                    )
                                  });
                                }}
                              >
                                <option value="Discount %">Discount %</option>
                                <option value="Fixed Discount">Fixed Discount (UZS)</option>
                                <option value="Free Gift">Free Gift</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">{ms.rewardType === 'Free Gift' ? 'Gift Name' : 'Value'}</label>
                              <input className="form-input text-sm py-2"
                                type={ms.rewardType === 'Free Gift' ? 'text' : 'number'}
                                placeholder={ms.rewardType === 'Free Gift' ? 'e.g. Free Coffee' : ms.rewardType === 'Discount %' ? '%' : 'UZS'}
                                value={ms.rewardValue}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    visitMilestones: formData.visitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, rewardValue: e.target.value } : ms
                                    )
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={formData.visitMilestones.some(m => !m.visits || !m.rewardValue)} />
                  </div>

                  <div className="form-group mt-6 mb-6">
                    <label className="form-label">Reset Visits After (visit count) *</label>
                    <input className="form-input" type="number" name="visitResetAt" placeholder="e.g. 26" value={formData.visitResetAt || ''} onChange={handleInput} />
                    <p className="helper-text mt-1 text-xs italic">After this visit number, the counter resets to 1 for the next cycle.</p>
                    <ErrorMsg showErrors={showErrors} condition={!formData.visitResetAt} />
                  </div>

                  <div className="form-group mt-6 mb-8">
                    <label className="form-label">Welcome Bonus *</label>
                    <select className="form-select" name="welcomeBonusType" value={formData.welcomeBonusType || ''} onChange={handleInput}>
                      <option value="">Select an incentive strategy</option>
                      <option value="None">None</option>
                      <option value="Free Gift">Free Gift</option>
                      <option value="Discount %">Discount %</option>
                    </select>
                    <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusType} />
                    {formData.welcomeBonusType === 'Free Gift' && <input className="form-input mt-2" type="text" name="welcomeBonusValue" placeholder="Describe the gift" value={formData.welcomeBonusValue || ''} onChange={handleInput} />}
                    {formData.welcomeBonusType === 'Discount %' && <input className="form-input mt-2" type="number" name="welcomeBonusValue" placeholder="Bonus Discount %" value={formData.welcomeBonusValue || ''} onChange={handleInput} />}
                    {['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusValue} />}
                    <p className="helper-text mt-2 text-sm italic">Note: Welcome bonus can only be redeemed on the very first purchase.</p>
                  </div>

                  <hr className="my-6 border-[var(--color-border)]" />
                  <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                    <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                      {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                    </button>
                  </div>

                  {formData.showAdvancedConfig && (
                    <div className="advanced-settings-container animate-fadeUp">
                      <div className="form-group flex justify-between items-center mb-4">
                        <div>
                          <label className="form-label mb-0">Special occasions discounts (optional)</label>
                          <p className="helper-text text-xs">Automatically bump rewards on specific holidays.</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      {formData.hasSpecialOccasions && (
                        <SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="percent" />
                      )}
                      <div className="form-group mt-6 mb-6">
                        <label className="form-label">Maximum Discount Cap (UZS)</label>
                        <input className="form-input" type="number" name="visitMaxDiscountCap" placeholder="e.g. 100,000 UZS" value={formData.visitMaxDiscountCap || ''} onChange={handleInput} />
                        <p className="helper-text mt-1 text-xs italic">Maximum discount that can be applied per visit reward.</p>
                      </div>
                      <div className="form-group mt-4">
                        <label className="form-label">Reward Validity Period (days)</label>
                        <input className="form-input" type="number" name="visitRewardValidity" placeholder="e.g. 7" value={formData.visitRewardValidity || ''} onChange={handleInput} />
                        <p className="helper-text mt-1 text-xs italic">Days from unlock date before the reward expires.</p>
                      </div>
                    </div>
                  )}
                </div>
            )}

            {formData.loyaltyType === 'Custom' && (
              <div className="config-box animate-fadeUp">
                <h4>Customized / Combined Program</h4>
                <p className="helper-text mb-6">Stack multiple loyalty engines into one powerful system.</p>

                <div className="form-group mb-8">
                  <label className="form-label">Select Combination *</label>
                  <select className="form-select" name="customSubType" value={formData.customSubType} onChange={handleInput}>
                    <option value="flat_tier_points">Customized 1: Flat % + Tier-Based + Points</option>
                    <option value="fixed_visit_points">Customized 2: Fixed Discount + Visit-Based + Points</option>
                    <option value="tier_visit_points">Customized 3: Visit-Based + Tier-Based + Points</option>
                    <option value="visit_points">Customized 4: Visit-Based + Points</option>
                  </select>
                </div>

                {formData.customSubType === 'flat_tier_points' && (<>
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>

                  {/* ── Base Benefit (Flat %) ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Base Benefit (Flat %)</p>
                  <div className="form-group mb-8">
                    <label className="form-label">% Off on Every Purchase *</label>
                    <input className="form-input" type="number" name="comboFlatPercent" placeholder="e.g. 5" value={formData.comboFlatPercent || ''} onChange={handleInput} />
                    <p className="helper-text mt-1 text-xs italic">All members receive this flat discount on every purchase.</p>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboFlatPercent} />
                  </div>

                  {/* ── Tier Configuration ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Tier Configuration</p>
                  <div className="form-group mb-6">
                    <label className="form-label">Tier Allotment Period *</label>
                    <select className="form-select" name="comboTierPeriod" value={formData.comboTierPeriod} onChange={handleInput}>
                      <option value="Annual">Annual Spend</option>
                      <option value="Quarterly">Quarterly Spend</option>
                      <option value="Monthly">Monthly Spend</option>
                    </select>
                  </div>

                  <div className="space-y-4 mb-8">
                    {formData.comboTiers.map((tier, idx) => (
                      <div key={idx} className="p-5 rounded-lg bg-white/5 border border-[var(--color-border)] relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{background: ['#CD7F32','#A8A9AD','#FFD700','#E5E4E2'][idx]}}></div>
                        <p className="text-xs font-bold mb-3 opacity-60 uppercase tracking-widest">{tier.name}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div>
                            <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Spending Req. (UZS)</label>
                            <input className="form-input text-sm py-2" type="number"
                              placeholder={`e.g. ${(idx+1)*100000}`}
                              value={tier.spending}
                              onChange={e => {
                                setFormData({
                                  ...formData,
                                  comboTiers: formData.comboTiers.map((t, i) => 
                                    i === idx ? { ...t, spending: e.target.value } : t
                                  )
                                });
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Discount (%)</label>
                            <input className="form-input text-sm py-2" type="number"
                              placeholder={`e.g. ${[5,10,15,20][idx]}%`}
                              value={tier.discount}
                              onChange={e => {
                                setFormData({
                                  ...formData,
                                  comboTiers: formData.comboTiers.map((t, i) => 
                                    i === idx ? { ...t, discount: e.target.value } : t
                                  )
                                });
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Points Multiplier</label>
                            <input className="form-input text-sm py-2" type="number" step="0.1"
                              placeholder={`e.g. ${[1,1.3,1.7,2][idx]}x`}
                              value={tier.multiplier}
                              onChange={e => {
                                setFormData({
                                  ...formData,
                                  comboTiers: formData.comboTiers.map((t, i) => 
                                    i === idx ? { ...t, multiplier: e.target.value } : t
                                  )
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <ErrorMsg showErrors={showErrors} condition={formData.comboTiers.some(t => !t.spending || !t.discount || !t.multiplier)} />
                  </div>

                  {/* ── Points System ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Points System Configuration</p>

                  <div className="form-group mb-6">
                    <label className="form-label">Earning Ratio *</label>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                      <input className="form-input" type="number" name="comboEarningRatio" placeholder="e.g. 1000" value={formData.comboEarningRatio || ''} onChange={handleInput} />
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS spent</span>
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboEarningRatio} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Minimum Spend to Earn (UZS) *</label>
                    <input className="form-input" type="number" name="comboMinSpend" placeholder="e.g. 10,000 UZS" value={formData.comboMinSpend || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMinSpend} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Earn On *</label>
                    <select className="form-select" name="comboEarnOn" value={formData.comboEarnOn} onChange={handleInput}>
                      <option value="Sale Amount">Sale Amount (before discount)</option>
                      <option value="After discount Amount">After Discount Amount</option>
                    </select>
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Points Expiry (days from creation) *</label>
                    <input className="form-input" type="number" name="comboExpiryDays" placeholder="e.g. 365" value={formData.comboExpiryDays || ''} onChange={handleInput} />
                    <p className="helper-text mt-1 text-xs italic">Set 0 for no expiry.</p>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboExpiryDays} />
                  </div>

                  <div className="form-group mb-10">
                    <label className="form-label">Welcome Bonus *</label>
                    <select className="form-select" name="welcomeBonusType" value={formData.welcomeBonusType || ''} onChange={handleInput}>
                      <option value="">Select an incentive strategy</option>
                      <option value="None">None</option>
                      <option value="Free Gift">Free Gift</option>
                      <option value="Discount %">Discount %</option>
                    </select>
                    <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusType} />
                    {formData.welcomeBonusType === 'Free Gift' && <input className="form-input mt-2" type="text" name="welcomeBonusValue" placeholder="Describe the gift" value={formData.welcomeBonusValue || ''} onChange={handleInput} />}
                    {formData.welcomeBonusType === 'Discount %' && <input className="form-input mt-2" type="number" name="welcomeBonusValue" placeholder="Bonus Discount %" value={formData.welcomeBonusValue || ''} onChange={handleInput} />}
                    {['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusValue} />}
                    <p className="helper-text mt-2 text-sm italic">Note: Welcome bonus can only be redeemed on the very first purchase.</p>
                  </div>

                  {/* ── Redemption Rules ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Redemption Rules Configuration</p>

                  <div className="form-group mb-6">
                    <label className="form-label">Redemption Value *</label>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                      <input className="form-input" type="number" name="comboRedemptionValue" placeholder="e.g. 50" value={formData.comboRedemptionValue || ''} onChange={handleInput} />
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS discount</span>
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboRedemptionValue} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Minimum Points to Redeem *</label>
                    <input className="form-input" type="number" name="comboMinRedeem" placeholder="e.g. 100 points" value={formData.comboMinRedeem || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMinRedeem} />
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Max % of Order Allowed for Redemption *</label>
                    <input className="form-input" type="number" name="comboMaxOrderPercent" placeholder="e.g. 20 (%)" value={formData.comboMaxOrderPercent || ''} onChange={handleInput} />
                    <p className="helper-text mt-1 text-xs italic">Cap how much of any order can be paid via points.</p>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMaxOrderPercent} />
                  </div>

                  <hr className="my-6 border-[var(--color-border)]" />
                  <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                    <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                      {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                    </button>
                  </div>
                  {formData.showAdvancedConfig && (
                    <div className="advanced-settings-container animate-fadeUp">
                      <div className="form-group flex justify-between items-center mb-4">
                        <div>
                          <label className="form-label mb-0">Special occasions discounts (optional)</label>
                          <p className="helper-text text-xs">Award bonus points on specific holidays.</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      {formData.hasSpecialOccasions && (
                        <SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="pts" />
                      )}
                    </div>
                  )}
                </>)}

                {formData.customSubType === 'fixed_visit_points' && (<>
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>

                  {/* ── Base Benefit (Flat Discount Amount) ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Base Benefit (Flat Discount Amount)</p>
                  <div className="form-group mb-6">
                    <label className="form-label">Flat Discount Amount (UZS) *</label>
                    <input className="form-input" type="number" name="comboFixedAmount" placeholder="e.g. 10,000 UZS" value={formData.comboFixedAmount || ''} onChange={handleInput} />
                    <p className="helper-text mt-1 text-xs italic">All members get this set amount discount on every purchase.</p>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboFixedAmount} />
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Minimum Spend for Flat Discount *</label>
                    <input className="form-input" type="number" name="comboFixedMinSpend" placeholder="e.g. 50,000 UZS" value={formData.comboFixedMinSpend || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboFixedMinSpend} />
                  </div>

                  {/* ── Visit & Save Rewards ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Visit & Save Rewards</p>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <label className="form-label mb-0">Visit Milestones *</label>
                      <div className="flex gap-2">
                        <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-[var(--color-border)] rounded-md hover:border-[var(--color-gold)]"
                          onClick={() => setFormData({...formData, comboVisitMilestones: [...formData.comboVisitMilestones, { visits: '', rewardType: 'Discount %', rewardValue: '' }]})}>
                          + Add Milestone
                        </button>
                        {formData.comboVisitMilestones.length > 1 && (
                          <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-red-500/30 text-red-400 rounded-md hover:bg-red-500/10"
                            onClick={() => { const m = [...formData.comboVisitMilestones]; m.pop(); setFormData({...formData, comboVisitMilestones: m}); }}>
                            - Remove Milestone
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      {formData.comboVisitMilestones.map((ms, idx) => (
                        <div key={idx} className="p-5 rounded-lg bg-white/5 border border-[var(--color-border)]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Visits Required</label>
                              <input className="form-input text-sm py-2" type="number" placeholder="e.g. 5"
                                value={ms.visits}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, visits: e.target.value } : ms
                                    )
                                  });
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Reward Type</label>
                              <select className="form-select text-sm py-2" value={ms.rewardType}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, rewardType: e.target.value, rewardValue: '' } : ms
                                    )
                                  });
                                }}
                              >
                                <option value="Discount %">Discount %</option>
                                <option value="Fixed Discount">Fixed Discount (UZS)</option>
                                <option value="Free Gift">Free Gift</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">{ms.rewardType === 'Free Gift' ? 'Gift Name' : 'Value'}</label>
                              <input className="form-input text-sm py-2"
                                type={ms.rewardType === 'Free Gift' ? 'text' : 'number'}
                                placeholder={ms.rewardType === 'Free Gift' ? 'e.g. Free Coffee' : ms.rewardType === 'Discount %' ? '%' : 'UZS'}
                                value={ms.rewardValue}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, rewardValue: e.target.value } : ms
                                    )
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={formData.comboVisitMilestones.some(m => !m.visits || !m.rewardValue)} />
                  </div>

                  <div className="form-group mb-8">
                    <label className="form-label">Reset Visits Count after X visits *</label>
                    <input className="form-input" type="number" name="comboVisitResetAt" placeholder="e.g. 26" value={formData.comboVisitResetAt || ''} onChange={handleInput} />
                    <p className="helper-text mt-1 text-xs italic">After this visit count, rewards reset to the first milestone.</p>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboVisitResetAt} />
                  </div>

                  {/* ── Points System ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Points System Configuration</p>

                  <div className="form-group mb-6">
                    <label className="form-label">Earning Ratio *</label>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                      <input className="form-input" type="number" name="comboEarningRatio" placeholder="e.g. 1000" value={formData.comboEarningRatio || ''} onChange={handleInput} />
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS spent</span>
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboEarningRatio} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Minimum Spend to Earn *</label>
                    <input className="form-input" type="number" name="comboMinSpend" placeholder="e.g. 10,000 UZS" value={formData.comboMinSpend || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMinSpend} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Earn On *</label>
                    <select className="form-select" name="comboEarnOn" value={formData.comboEarnOn} onChange={handleInput}>
                      <option value="Sale Amount">Sale Amount (before discount)</option>
                      <option value="After discount Amount">After Discount Amount</option>
                    </select>
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Points Expiry (days) *</label>
                    <input className="form-input" type="number" name="comboExpiryDays" placeholder="e.g. 365" value={formData.comboExpiryDays || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboExpiryDays} />
                  </div>

                  <div className="form-group mb-10">
                    <label className="form-label">Welcome Bonus *</label>
                    <select className="form-select" name="welcomeBonusType" value={formData.welcomeBonusType || ''} onChange={handleInput}>
                      <option value="">Select an incentive strategy</option>
                      <option value="None">None</option>
                      <option value="Free Gift">Free Gift</option>
                      <option value="Discount %">Discount %</option>
                    </select>
                    <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusType} />
                    {formData.welcomeBonusType === 'Free Gift' && <input className="form-input mt-2" type="text" name="welcomeBonusValue" placeholder="Describe the gift" value={formData.welcomeBonusValue || ''} onChange={handleInput} />}
                    {formData.welcomeBonusType === 'Discount %' && <input className="form-input mt-2" type="number" name="welcomeBonusValue" placeholder="Bonus Discount %" value={formData.welcomeBonusValue || ''} onChange={handleInput} />}
                    {['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusValue} />}
                  </div>

                  {/* ── Redemption Rules ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Redemption Rules Configuration</p>

                  <div className="form-group mb-6">
                    <label className="form-label">Redemption Value *</label>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                      <input className="form-input" type="number" name="comboRedemptionValue" placeholder="e.g. 50" value={formData.comboRedemptionValue || ''} onChange={handleInput} />
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS discount</span>
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboRedemptionValue} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Minimum Points to Redeem *</label>
                    <input className="form-input" type="number" name="comboMinRedeem" placeholder="e.g. 100" value={formData.comboMinRedeem || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMinRedeem} />
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Max % of Order Allowed for Redemption *</label>
                    <input className="form-input" type="number" name="comboMaxOrderPercent" placeholder="e.g. 20 (%)" value={formData.comboMaxOrderPercent || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMaxOrderPercent} />
                  </div>

                  <hr className="my-6 border-[var(--color-border)]" />
                  <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                    <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                      {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                    </button>
                  </div>
                  {formData.showAdvancedConfig && (
                    <div className="advanced-settings-container animate-fadeUp">
                      <div className="form-group flex justify-between items-center mb-4">
                        <div>
                          <label className="form-label mb-0">Special occasions discounts (optional)</label>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      {formData.hasSpecialOccasions && (<SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="percent" />)}
                    </div>
                  )}
                </>)}

                {formData.customSubType === 'tier_visit_points' && (<>
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>

                  {/* ── Visit Rewards ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Visit Rewards</p>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="form-label mb-0">Visit Milestones *</label>
                      <div className="flex gap-2">
                        <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-[var(--color-border)] rounded-md hover:border-[var(--color-gold)]"
                          onClick={() => setFormData({...formData, comboVisitMilestones: [...formData.comboVisitMilestones, { visits: '', rewardType: 'Discount %', rewardValue: '' }]})}>
                          + Add Milestone
                        </button>
                        {formData.comboVisitMilestones.length > 1 && (
                          <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-red-500/30 text-red-400 rounded-md hover:bg-red-500/10"
                            onClick={() => { const m = [...formData.comboVisitMilestones]; m.pop(); setFormData({...formData, comboVisitMilestones: m}); }}>
                            - Remove Milestone
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      {formData.comboVisitMilestones.map((ms, idx) => (
                        <div key={idx} className="p-5 rounded-lg bg-white/5 border border-[var(--color-border)]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Visits Required</label>
                              <input className="form-input text-sm py-2" type="number" placeholder="e.g. 5"
                                value={ms.visits}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, visits: e.target.value } : ms
                                    )
                                  });
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Reward Type</label>
                              <select className="form-select text-sm py-2" value={ms.rewardType}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, rewardType: e.target.value, rewardValue: '' } : ms
                                    )
                                  });
                                }}
                              >
                                <option value="Discount %">Discount %</option>
                                <option value="Fixed Discount">Fixed Discount (UZS)</option>
                                <option value="Free Gift">Free Gift</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">{ms.rewardType === 'Free Gift' ? 'Gift Name' : 'Value'}</label>
                              <input className="form-input text-sm py-2"
                                type={ms.rewardType === 'Free Gift' ? 'text' : 'number'}
                                placeholder={ms.rewardType === 'Free Gift' ? 'e.g. Free Coffee' : ms.rewardType === 'Discount %' ? '%' : 'UZS'}
                                value={ms.rewardValue}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, rewardValue: e.target.value } : ms
                                    )
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={formData.comboVisitMilestones.some(m => !m.visits || !m.rewardValue)} />
                  </div>

                  <div className="form-group mb-8">
                    <label className="form-label">Reset Visits Count after X visits *</label>
                    <input className="form-input" type="number" name="comboVisitResetAt" placeholder="e.g. 26" value={formData.comboVisitResetAt || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboVisitResetAt} />
                  </div>

                  {/* ── Tier Configuration ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Tier Configuration</p>
                  <div className="form-group mb-6">
                    <label className="form-label">Tier Allotment Period *</label>
                    <select className="form-select" name="comboTierPeriod" value={formData.comboTierPeriod} onChange={handleInput}>
                      <option value="Annual">Annual Spend</option>
                      <option value="Quarterly">Quarterly Spend</option>
                      <option value="Monthly">Monthly Spend</option>
                    </select>
                  </div>

                  <div className="space-y-4 mb-8">
                    {formData.comboTiers.map((tier, idx) => (
                      <div key={idx} className="p-5 rounded-lg bg-white/5 border border-[var(--color-border)] relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{background: ['#CD7F32','#A8A9AD','#FFD700','#E5E4E2'][idx]}}></div>
                        <p className="text-xs font-bold mb-3 opacity-60 uppercase tracking-widest">{tier.name}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div>
                            <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Spending Req. (UZS)</label>
                            <input className="form-input text-sm py-2" type="number"
                              placeholder={`e.g. ${(idx+1)*100000}`}
                              value={tier.spending}
                              onChange={e => {
                                setFormData({
                                  ...formData,
                                  comboTiers: formData.comboTiers.map((t, i) => 
                                    i === idx ? { ...t, spending: e.target.value } : t
                                  )
                                });
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Discount (%)</label>
                            <input className="form-input text-sm py-2" type="number"
                              placeholder={`e.g. ${[5,10,15,20][idx]}%`}
                              value={tier.discount}
                              onChange={e => {
                                setFormData({
                                  ...formData,
                                  comboTiers: formData.comboTiers.map((t, i) => 
                                    i === idx ? { ...t, discount: e.target.value } : t
                                  )
                                });
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Points Multiplier</label>
                            <input className="form-input text-sm py-2" type="number" step="0.1"
                              placeholder={`e.g. ${[1,1.3,1.7,2][idx]}x`}
                              value={tier.multiplier}
                              onChange={e => {
                                setFormData({
                                  ...formData,
                                  comboTiers: formData.comboTiers.map((t, i) => 
                                    i === idx ? { ...t, multiplier: e.target.value } : t
                                  )
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <ErrorMsg showErrors={showErrors} condition={formData.comboTiers.some(t => !t.spending || !t.discount || !t.multiplier)} />
                  </div>

                  {/* ── Points System ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Points System Configuration</p>

                  <div className="form-group mb-6">
                    <label className="form-label">Earning Ratio *</label>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                      <input className="form-input" type="number" name="comboEarningRatio" placeholder="e.g. 1000" value={formData.comboEarningRatio || ''} onChange={handleInput} />
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS spent</span>
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboEarningRatio} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Minimum Spend to Earn *</label>
                    <input className="form-input" type="number" name="comboMinSpend" placeholder="e.g. 10,000 UZS" value={formData.comboMinSpend || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMinSpend} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Earn On *</label>
                    <select className="form-select" name="comboEarnOn" value={formData.comboEarnOn} onChange={handleInput}>
                      <option value="Sale Amount">Sale Amount (before discount)</option>
                      <option value="After discount Amount">After Discount Amount</option>
                    </select>
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Points Expiry (days) *</label>
                    <input className="form-input" type="number" name="comboExpiryDays" placeholder="e.g. 365" value={formData.comboExpiryDays || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboExpiryDays} />
                  </div>

                  <div className="form-group mb-10">
                    <label className="form-label">Welcome Bonus *</label>
                    <select className="form-select" name="welcomeBonusType" value={formData.welcomeBonusType || ''} onChange={handleInput}>
                      <option value="">Select an incentive strategy</option>
                      <option value="None">None</option>
                      <option value="Free Gift">Free Gift</option>
                      <option value="Discount %">Discount %</option>
                    </select>
                    <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusType} />
                    {formData.welcomeBonusType === 'Free Gift' && <input className="form-input mt-2" type="text" name="welcomeBonusValue" placeholder="Describe the gift" value={formData.welcomeBonusValue || ''} onChange={handleInput} />}
                    {formData.welcomeBonusType === 'Discount %' && <input className="form-input mt-2" type="number" name="welcomeBonusValue" placeholder="Bonus Discount %" value={formData.welcomeBonusValue || ''} onChange={handleInput} />}
                    {['Free Gift', 'Discount %'].includes(formData.welcomeBonusType) && <ErrorMsg showErrors={showErrors} condition={!formData.welcomeBonusValue} />}
                  </div>

                  {/* ── Redemption Rules ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Redemption Rules Configuration</p>

                  <div className="form-group mb-6">
                    <label className="form-label">Redemption Value *</label>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                      <input className="form-input" type="number" name="comboRedemptionValue" placeholder="e.g. 50" value={formData.comboRedemptionValue || ''} onChange={handleInput} />
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS discount</span>
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboRedemptionValue} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Minimum Points to Redeem *</label>
                    <input className="form-input" type="number" name="comboMinRedeem" placeholder="e.g. 100" value={formData.comboMinRedeem || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMinRedeem} />
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Max % of Order Allowed for Redemption *</label>
                    <input className="form-input" type="number" name="comboMaxOrderPercent" placeholder="e.g. 20 (%)" value={formData.comboMaxOrderPercent || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMaxOrderPercent} />
                  </div>

                  <hr className="my-6 border-[var(--color-border)]" />
                  <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                    <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                      {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                    </button>
                  </div>
                  {formData.showAdvancedConfig && (
                    <div className="advanced-settings-container animate-fadeUp">
                      <div className="form-group flex justify-between items-center mb-4">
                        <div>
                          <label className="form-label mb-0">Special occasions discounts (optional)</label>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      {formData.hasSpecialOccasions && (<SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="percent" />)}
                    </div>
                  )}
                </>)}

                {formData.customSubType === 'visit_points' && (<>
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Basic Settings</h4>

                  {/* ── Visit Rewards ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Visit & Save Rewards</p>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="form-label mb-0">Visit Milestones *</label>
                      <div className="flex gap-2">
                        <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-[var(--color-border)] rounded-md hover:border-[var(--color-gold)]"
                          onClick={() => setFormData({...formData, comboVisitMilestones: [...formData.comboVisitMilestones, { visits: '', rewardType: 'Discount %', rewardValue: '' }]})}>
                          + Add Milestone
                        </button>
                        {formData.comboVisitMilestones.length > 1 && (
                          <button type="button" className="btn btn-ghost text-xs py-1 px-3 border border-red-500/30 text-red-400 rounded-md hover:bg-red-500/10"
                            onClick={() => { const m = [...formData.comboVisitMilestones]; m.pop(); setFormData({...formData, comboVisitMilestones: m}); }}>
                            - Remove Milestone
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      {formData.comboVisitMilestones.map((ms, idx) => (
                        <div key={idx} className="p-5 rounded-lg bg-white/5 border border-[var(--color-border)]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Visits Required</label>
                              <input className="form-input text-sm py-2" type="number" placeholder="e.g. 5"
                                value={ms.visits}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, visits: e.target.value } : ms
                                    )
                                  });
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">Reward Type</label>
                              <select className="form-select text-sm py-2" value={ms.rewardType}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, rewardType: e.target.value, rewardValue: '' } : ms
                                    )
                                  });
                                }}
                              >
                                <option value="Discount %">Discount %</option>
                                <option value="Fixed Discount">Fixed Discount (UZS)</option>
                                <option value="Free Gift">Free Gift</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-tighter opacity-60 block mb-2">{ms.rewardType === 'Free Gift' ? 'Gift Name' : 'Value'}</label>
                              <input className="form-input text-sm py-2"
                                type={ms.rewardType === 'Free Gift' ? 'text' : 'number'}
                                placeholder={ms.rewardType === 'Free Gift' ? 'e.g. Free Coffee' : ms.rewardType === 'Discount %' ? '%' : 'UZS'}
                                value={ms.rewardValue}
                                onChange={e => {
                                  setFormData({
                                    ...formData,
                                    comboVisitMilestones: formData.comboVisitMilestones.map((ms, i) => 
                                      i === idx ? { ...ms, rewardValue: e.target.value } : ms
                                    )
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={formData.comboVisitMilestones.some(m => !m.visits || !m.rewardValue)} />
                  </div>

                  <div className="form-group mb-8">
                    <label className="form-label">Reset Visits Count after X visits *</label>
                    <input className="form-input" type="number" name="comboVisitResetAt" placeholder="e.g. 26" value={formData.comboVisitResetAt || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboVisitResetAt} />
                  </div>

                  {/* ── Points System ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Points System Configuration</p>

                  <div className="form-group mb-6">
                    <label className="form-label">Earning Ratio *</label>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                      <input className="form-input" type="number" name="comboEarningRatio" placeholder="e.g. 1000" value={formData.comboEarningRatio || ''} onChange={handleInput} />
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS spent</span>
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboEarningRatio} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Minimum Spend to Earn *</label>
                    <input className="form-input" type="number" name="comboMinSpend" placeholder="e.g. 10,000 UZS" value={formData.comboMinSpend || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMinSpend} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Earn On *</label>
                    <select className="form-select" name="comboEarnOn" value={formData.comboEarnOn} onChange={handleInput}>
                      <option value="Sale Amount">Sale Amount (before discount)</option>
                      <option value="After discount Amount">After Discount Amount</option>
                    </select>
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Points Expiry (days) *</label>
                    <input className="form-input" type="number" name="comboExpiryDays" placeholder="e.g. 365" value={formData.comboExpiryDays || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboExpiryDays} />
                  </div>

                  {/* ── Redemption Rules ── */}
                  <p className="form-label mb-3" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5}}>Redemption Rules Configuration</p>

                  <div className="form-group mb-6">
                    <label className="form-label">Redemption Value *</label>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>1 Point =</span>
                      <input className="form-input" type="number" name="comboRedemptionValue" placeholder="e.g. 50" value={formData.comboRedemptionValue || ''} onChange={handleInput} />
                      <span style={{color:'var(--color-text-muted)', fontSize:'14px', whiteSpace:'nowrap'}}>UZS discount</span>
                    </div>
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboRedemptionValue} />
                  </div>
                  <div className="form-group mb-6">
                    <label className="form-label">Minimum Points to Redeem *</label>
                    <input className="form-input" type="number" name="comboMinRedeem" placeholder="e.g. 100" value={formData.comboMinRedeem || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMinRedeem} />
                  </div>
                  <div className="form-group mb-8">
                    <label className="form-label">Max % of Order Allowed for Redemption *</label>
                    <input className="form-input" type="number" name="comboMaxOrderPercent" placeholder="e.g. 20 (%)" value={formData.comboMaxOrderPercent || ''} onChange={handleInput} />
                    <ErrorMsg showErrors={showErrors} condition={!formData.comboMaxOrderPercent} />
                  </div>

                  <hr className="my-6 border-[var(--color-border)]" />
                  <div style={{ textAlign: 'center', margin: '16px 0 24px 0' }}>
                    <button type="button" className="btn btn-secondary transition-colors" style={{padding: '8px 24px', borderRadius: '20px', fontSize: '14px', background: 'var(--color-surface)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)', width: 'fit-content', margin: '0 auto'}} onClick={() => setFormData({...formData, showAdvancedConfig: !formData.showAdvancedConfig})}>
                      {formData.showAdvancedConfig ? '- Hide Advanced Settings' : '+ Show Advanced Settings'}
                    </button>
                  </div>
                  {formData.showAdvancedConfig && (
                    <div className="advanced-settings-container animate-fadeUp">
                      <div className="form-group flex justify-between items-center mb-6">
                        <div>
                          <label className="form-label mb-0">Special occasions discounts (optional)</label>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="hasSpecialOccasions" checked={formData.hasSpecialOccasions || false} onChange={e => setFormData({...formData, hasSpecialOccasions: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <div className="form-group flex justify-between items-center mb-6">
                        <div>
                          <label className="form-label mb-0">Exclude Pre-Discounted Items</label>
                          <p className="helper-text text-xs italic">Prevent double discounting on items already on sale.</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" name="excludePreDiscounted" checked={formData.excludePreDiscounted || false} onChange={e => setFormData({...formData, excludePreDiscounted: e.target.checked})} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      {formData.hasSpecialOccasions && (<SpecialOccasionsConfig formData={formData} handleInput={handleInput} type="percent" />)}
                    </div>
                  )}
                </>)}
              </div>
            )}

          </div>
        );
      case 7:
        if (formData.isSubmitted) {
          return (
            <div className="onboarding-step animate-fadeUp text-center py-10">
              <div className="success-icon mb-6 mx-auto" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-gold)' }}>
                 <Icons.Check style={{ color: 'var(--color-gold)', width: '40px', height: '40px' }} />
              </div>
              <h2 className="step-heading">Request Submitted!</h2>
              <p className="step-subheading" style={{ maxWidth: '500px', margin: '0 auto 30px' }}>
                Your Request has been submitted, Kindly please wait for Activation Email. It may take 3 working days to review and activate the Plan
              </p>
              <button 
                type="button"
                className="btn btn-secondary px-8" 
                onClick={() => window.location.href = '/'}
              >
                Back to Website
              </button>
            </div>
          );
        }
        return (
          <div className="onboarding-step animate-fadeUp">
            <h2 className="step-heading text-center">Business Onboarding - Select & Activate</h2>
            <p className="step-subheading text-center">Choose a plan that fits your business scale and needs.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '32px' }}>
              {/* Basic Plan */}
              <div className={`plan-card-detailed ${formData.subscriptionPlan === 'Basic' ? 'active' : ''}`} onClick={() => setFormData({...formData, subscriptionPlan: 'Basic'})}>
                <div className="plan-header">
                  <h3>Basic Plan</h3>
                  <div className="best-for">Small shops / startups</div>
                </div>
                <ul className="plan-features mt-6">
                  <li><Icons.Check /> Points-Based Program</li>
                  <li><Icons.Check /> Basic Reporting & Analytics</li>
                  <li><Icons.Check /> Store Visibility on Customer App</li>
                  <li><Icons.Check /> In App Notifications to customers</li>
                  <li><Icons.Check /> Personalized Inapp Messages to customers</li>
                  <li><Icons.Check /> 1 Active Program Only</li>
                  <li><Icons.Check /> Max 5,000 Customers</li>
                </ul>
              </div>

              {/* Growth Plan */}
              <div className={`plan-card-detailed ${formData.subscriptionPlan === 'Growth' ? 'active' : ''}`} onClick={() => setFormData({...formData, subscriptionPlan: 'Growth'})}>
                <div className="plan-header">
                  <h3>Growth Plan</h3>
                  <div className="best-for">Growing retail / cafés</div>
                </div>
                <ul className="plan-features mt-6">
                  <li><Icons.Check /> Points-Based Program</li>
                  <li><Icons.Check /> Visit-Based Rewards</li>
                  <li><Icons.Check /> Fixed Discount Rewards</li>
                  <li><Icons.Check /> Tier-Based System</li>
                  <li><Icons.Check /> Auto Expiry Rules</li>
                  <li><Icons.Check /> Advanced Reports</li>
                  <li><Icons.Check /> 3 Active Programs</li>
                  <li><Icons.Check /> Store Visibility on Customer App</li>
                  <li><Icons.Check /> In App Notifications to customers</li>
                  <li><Icons.Check /> Personalized Inapp Messages to customers</li>
                  <li><Icons.Check /> Max 25,000 Customers</li>
                </ul>
              </div>

              {/* Premium Plan */}
              <div className={`plan-card-detailed ${formData.subscriptionPlan === 'Premium' ? 'active' : ''}`} onClick={() => setFormData({...formData, subscriptionPlan: 'Premium'})}>
                <div className="plan-header">
                  <h3>Premium Plan</h3>
                  <div className="best-for">Chains / franchises</div>
                </div>
                <ul className="plan-features mt-6">
                  <li><Icons.Check /> All Loyalty Types</li>
                  <li><Icons.Check /> Hybrid Programs</li>
                  <li><Icons.Check /> Tier Multipliers</li>
                  <li><Icons.Check /> Campaign Builder</li>
                  <li><Icons.Check /> White-label</li>
                  <li><Icons.Check /> Unlimited Customers</li>
                  <li><Icons.Check /> Multi-Branch Support</li>
                  <li><Icons.Check /> Store Visibility on Customer App</li>
                  <li><Icons.Check /> In App Notifications to customers</li>
                  <li><Icons.Check /> Personalized Inapp Messages to customers</li>
                </ul>
              </div>
            </div>

            <div className="payment-plans-section mt-12 bg-black/10 p-10 rounded-2xl border border-[var(--color-border)]">
              <h4 className="mb-8 text-center" style={{ color: 'var(--color-gold)', fontSize: '1.4rem' }}>Select Payment Plan</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}>
                {[
                  { value: 'Trial', label: 'Start Free Trial (14 days)' },
                  { value: 'Monthly', label: 'Monthly Payment Plan' },
                  { value: 'Quarterly', label: 'Quarterly Payment Plan' },
                  { value: 'Half-Yearly', label: 'Half-Yearly Payment Plan' },
                  { value: 'Annual', label: 'Annual Payment Plan' }
                ].map((plan) => (
                  <label 
                    key={plan.value} 
                    className={`payment-option-card transform transition-all duration-200 ${formData.paymentPlan === plan.value ? 'active' : ''}`} 
                    style={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '110px', 
                      textAlign: 'center',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="paymentPlan" 
                      value={plan.value} 
                      onChange={handleInput} 
                      style={{ display: 'none' }}
                    />
                    <span className="text-xs font-bold uppercase tracking-wide leading-tight px-2">{plan.label}</span>
                  </label>
                ))}
              </div>
              <ErrorMsg showErrors={showErrors} condition={!formData.paymentPlan} />
              
              <div className="mt-8 p-4 bg-yellow-500/5 rounded border border-yellow-500/20">
                <p className="text-xs italic opacity-70">
                  {formData.paymentPlan === 'Trial' 
                    ? "Upon selecting 'Free Trial', your request will be reviewed and activated by our team within 3 working days." 
                    : "Payment gateway integration will follow this step for secure transaction processing. Request goes to Sysadmin for Activation upon successful payment."}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-nav">
        <div className="nav-logo" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
          <div className="nav-logo-icon"><Icons.Crown /></div>
          <span>ZakazPro</span>
        </div>
        <div className="progress-indicator">Step {currentStep} of 7</div>
      </div>

      <div className="onboarding-content">
        <div className="stepper-sidebar hide-mobile">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            return (
              <div key={stepNum} className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="stepper-circle">
                  {isCompleted ? <Icons.Check /> : stepNum}
                </div>
                <div className="stepper-label">
                  <div className="stepper-title">Step {stepNum}</div>
                  <div className="stepper-desc">{label}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="form-container">
          <form onSubmit={nextStep}>
            {renderStepContent()}
            
            <div className="form-actions mt-10">
              {currentStep > 1 && !formData.isSubmitted ? (
                <button type="button" className="btn btn-secondary" onClick={prevStep} style={{padding: '12px 24px'}}>
                  <Icons.ArrowLeft /> Back
                </button>
              ) : <div></div>}
              
              {!formData.isSubmitted && (
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button type="submit" className="btn btn-primary" style={{padding: '12px 32px'}}>
                    {currentStep === 7 ? 'Submit & Activate' : 'Next page'} {currentStep < 7 && <Icons.ArrowRight />}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

