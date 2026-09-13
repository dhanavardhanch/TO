'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

function CoinBenefitIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="url(#coinGradOuter)" stroke="#FFE898" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="7.5" stroke="#FDE68A" strokeWidth="0.9" strokeDasharray="1.5 1.5" />
      {/* Coin emblem - TO initials */}
      <text x="12" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="800" letterSpacing="0.05em" fontFamily="sans-serif">TO</text>
      <path d="M12 2.5V4M12 20v1.5M2.5 12H4M20 12h1.5" stroke="#FFE898" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <defs>
        <linearGradient id="coinGradOuter" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D"/>
          <stop offset="0.5" stopColor="#D97706"/>
          <stop offset="1" stopColor="#78350F"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function GiftBoxBenefitIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Box base */}
      <rect x="3.5" y="9.5" width="17" height="11.5" rx="2" fill="url(#giftBoxBody)" stroke="#FDE68A" strokeWidth="1.1"/>
      {/* Box lid */}
      <rect x="2.5" y="6" width="19" height="4" rx="1.5" fill="url(#giftBoxLid)" stroke="#FFFBEB" strokeWidth="1.1"/>
      {/* Vertical Ribbon */}
      <rect x="10.5" y="6" width="3" height="15" fill="#E11D48"/>
      {/* Horizontal Ribbon on Lid */}
      <line x1="2.5" y1="8" x2="21.5" y2="8" stroke="#BE123C" strokeWidth="0.8" opacity="0.4"/>
      {/* Satin Bow Loops */}
      <path d="M12 6C10.2 3.8 6.8 3.2 5.8 4.8C4.7 6.4 8.2 6.4 12 6Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="0.75"/>
      <path d="M12 6C13.8 3.8 17.2 3.2 18.2 4.8C19.3 6.4 15.8 6.4 12 6Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="0.75"/>
      <circle cx="12" cy="6" r="1.5" fill="#FFEAA7"/>
      <defs>
        <linearGradient id="giftBoxBody" x1="3.5" y1="9.5" x2="20.5" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B"/>
          <stop offset="1" stopColor="#92400E"/>
        </linearGradient>
        <linearGradient id="giftBoxLid" x1="2.5" y1="6" x2="21.5" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A"/>
          <stop offset="1" stopColor="#D97706"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function ShippingBenefitIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Truck Body */}
      <path d="M1.5 5C1.5 4.17 2.17 3.5 3 3.5H13.5C14.33 3.5 15 4.17 15 5V14.5C15 15.33 14.33 16 13.5 16H3C2.17 16 1.5 15.33 1.5 14.5V5Z" fill="url(#truckBodyGrad)" stroke="#FDE68A" strokeWidth="1.1"/>
      {/* Truck Cab */}
      <path d="M15 8H18.6C19.1 8 19.55 8.28 19.78 8.72L22.18 12.32C22.38 12.68 22.5 13.08 22.5 13.5V15C22.5 15.55 22.05 16 21.5 16H15V8Z" fill="url(#truckCabGrad)" stroke="#FDE68A" strokeWidth="1.1"/>
      {/* Cab Window */}
      <path d="M16.5 9.5H18.4L20.2 12.5H16.5V9.5Z" fill="#14212C" opacity="0.6"/>
      {/* Wheels */}
      <circle cx="5.5" cy="17.5" r="2.5" fill="#14212C" stroke="#FFEAA7" strokeWidth="1.3"/>
      <circle cx="18" cy="17.5" r="2.5" fill="#14212C" stroke="#FFEAA7" strokeWidth="1.3"/>
      <circle cx="5.5" cy="17.5" r="1" fill="#FFEAA7"/>
      <circle cx="18" cy="17.5" r="1" fill="#FFEAA7"/>
      {/* Speed lines */}
      <line x1="3.5" y1="8" x2="8.5" y2="8" stroke="#FFEAA7" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="3.5" y1="11" x2="6.5" y2="11" stroke="#FFEAA7" strokeWidth="1.1" strokeLinecap="round"/>
      <defs>
        <linearGradient id="truckBodyGrad" x1="1.5" y1="3.5" x2="15" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D97706"/>
          <stop offset="1" stopColor="#78350F"/>
        </linearGradient>
        <linearGradient id="truckCabGrad" x1="15" y1="8" x2="22.5" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B"/>
          <stop offset="1" stopColor="#B45309"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function EarlyAccessBenefitIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 1.5L3.5 13.5H11.5L9.5 22.5L20.5 10.5H13L15.5 1.5H13Z" fill="url(#flashGrad)" stroke="#FFFBEB" strokeWidth="1.1" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="flashGrad" x1="3.5" y1="1.5" x2="20.5" y2="22.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047"/>
          <stop offset="0.45" stopColor="#F59E0B"/>
          <stop offset="1" stopColor="#B45309"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

const BENEFITS = [
  {
    icon: <CoinBenefitIcon />,
    title: 'Earn Original Coins',
    desc: 'Get rewarded on every order. Coins can be redeemed for discounts on future purchases.',
  },
  {
    icon: <GiftBoxBenefitIcon />,
    title: '100 Coins on First Login',
    desc: 'Welcome to The Original — your 100 bonus coins are waiting, instantly credited.',
  },
  {
    icon: <ShippingBenefitIcon />,
    title: 'Free Shipping Above ₹999',
    desc: 'Orders over ₹999 ship free across India, direct from our factory in Palasa.',
  },
  {
    icon: <EarlyAccessBenefitIcon />,
    title: 'Early Access & Discounts',
    desc: 'Be the first to know about new harvests, limited drops, and exclusive member offers.',
  },
];

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [authMode, setAuthMode] = useState('email'); // 'email' | 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeBenefit, setActiveBenefit] = useState(0);
  const intervalRef = useRef(null);

  // Auto-scroll benefits ticker
  useEffect(() => {
    if (!isLoginModalOpen) return;
    intervalRef.current = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % BENEFITS.length);
    }, 2800);
    return () => clearInterval(intervalRef.current);
  }, [isLoginModalOpen]);

  // Reset on close
  useEffect(() => {
    if (!isLoginModalOpen) {
      setEmail('');
      setPhone('');
      setOtp('');
      setStep('input');
      setError('');
      setActiveBenefit(0);
    }
  }, [isLoginModalOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeLoginModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'email') {
      const emailTrimmed = email.trim();
      if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
        setError('Please enter a valid email address.');
        return;
      }
    } else {
      if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    setLoading(true);
    // Simulate sending OTP
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep('otp');
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length < 4) {
      setError('Please enter the 4-digit OTP (Dummy OTP: 1234).');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    setStep('success');
    setTimeout(() => {
      if (authMode === 'email') {
        const mail = email.trim();
        const autoName = mail.split('@')[0].replace(/[._-]/g, ' ');
        const formattedName = autoName.charAt(0).toUpperCase() + autoName.slice(1);
        login({ email: mail, phone: '', name: formattedName });
      } else {
        login({ phone, email: '', name: `User ${phone.slice(-4)}` });
      }
    }, 1100);
  };

  return (
    <div className="login-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeLoginModal(); }}>
      <div className="login-modal">
        {/* ── LEFT PANEL: Brand + Benefits ── */}
        <div className="login-modal-left">
          {/* Background image overlay */}
          <div className="login-modal-left-bg" />

          <div className="login-modal-left-content">
            {/* Brand mark */}
            <div className="login-brand">
              <div className="login-brand-mark">TO</div>
              <div className="login-brand-info">
                <span className="login-brand-name">The Original</span>
                <span className="login-brand-tagline">From the Cashew Capital, Palasa</span>
              </div>
            </div>

            <div className="login-hero-text">
              <h2>Welcome to<br />The Original</h2>
              <p>India&apos;s finest cashews, direct from our factory in Palasa.</p>
            </div>

            {/* Scrolling benefits ticker */}
            <div className="login-benefits-ticker">
              {BENEFITS.map((b, i) => (
                <div
                  key={i}
                  className={`login-benefit-card ${i === activeBenefit ? 'active' : ''}`}
                >
                  <span className="login-benefit-icon">{b.icon}</span>
                  <div>
                    <div className="login-benefit-title">{b.title}</div>
                    <div className="login-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
              {/* Dots indicator */}
              <div className="login-benefit-dots">
                {BENEFITS.map((_, i) => (
                  <button
                    key={i}
                    className={`login-benefit-dot ${i === activeBenefit ? 'active' : ''}`}
                    onClick={() => { setActiveBenefit(i); clearInterval(intervalRef.current); }}
                    aria-label={`Benefit ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Form ── */}
        <div className="login-modal-right">
          {/* Close button */}
          <button className="login-modal-close" onClick={closeLoginModal} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {step === 'success' ? (
            <div className="login-success">
              <div className="login-success-icon">✓</div>
              <h3>Welcome to The Original!</h3>
              <p>You&apos;re now signed in. 100 Original Coins credited to your wallet.</p>
            </div>
          ) : (
            <>
              <div className="login-form-header">
                <h2>Sign In / Sign Up</h2>
                <p>Join The Original family for exclusive coins &amp; member benefits</p>
              </div>

              {step === 'input' ? (
                <form onSubmit={handleSendOtp} className="login-form">
                  {/* Mode switcher tabs */}
                  <div className="login-tab-switcher">
                    <button
                      type="button"
                      className={`login-switcher-btn ${authMode === 'email' ? 'active' : ''}`}
                      onClick={() => { setAuthMode('email'); setError(''); }}
                    >
                      Mail ID
                    </button>
                    <button
                      type="button"
                      className={`login-switcher-btn ${authMode === 'phone' ? 'active' : ''}`}
                      onClick={() => { setAuthMode('phone'); setError(''); }}
                    >
                      Phone Number
                    </button>
                  </div>

                  {authMode === 'email' ? (
                    <>
                      <label className="login-label">Mail ID / Email Address</label>
                      <div className="login-input-wrap">
                        <span className="login-input-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2.5" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </span>
                        <input
                          type="email"
                          placeholder="e.g. yourname@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="login-text-input"
                          autoFocus
                          autoComplete="email"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="login-label">Mobile Number</label>
                      <div className="login-phone-input-wrap">
                        <span className="login-phone-prefix">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="Enter 10-digit number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          className="login-phone-input"
                          autoFocus
                          inputMode="numeric"
                        />
                      </div>
                    </>
                  )}

                  {error && <p className="login-error">{error}</p>}

                  <button type="submit" className="login-submit-btn" disabled={loading}>
                    {loading ? 'Sending OTP…' : 'Get OTP'}
                  </button>

                  <div className="login-dummy-notice">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                      <circle cx="12" cy="12" r="4" fill="#FEF3C7"/>
                    </svg>
                    <span>Demo Mode: Enter your mail ID and use dummy OTP <strong>1234</strong></span>
                  </div>

                  <p className="login-terms">
                    By continuing, you agree to our{' '}
                    <a href="/terms-conditions">Terms</a> &amp;{' '}
                    <a href="/privacy-policy">Privacy Policy</a>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="login-form">
                  <label className="login-label">Enter Verification OTP</label>
                  <p className="login-otp-sent">
                    We sent a 4-digit code to{' '}
                    <strong>{authMode === 'email' ? email : `+91 ${phone}`}</strong>
                  </p>

                  <div className="login-otp-row">
                    <input
                      type="tel"
                      maxLength={4}
                      placeholder="• • • •"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="login-otp-input"
                      autoFocus
                      inputMode="numeric"
                    />
                  </div>

                  {/* Dummy OTP Quick-Fill Badge */}
                  <div className="login-dummy-otp-box">
                    <div className="login-dummy-otp-text">
                      <span className="login-dummy-dot" />
                      <span>Dummy OTP: <strong>1234</strong></span>
                    </div>
                    <button
                      type="button"
                      className="login-autofill-btn"
                      onClick={() => setOtp('1234')}
                    >
                      Fill 1234
                    </button>
                  </div>

                  {error && <p className="login-error">{error}</p>}

                  <button type="submit" className="login-submit-btn" disabled={loading}>
                    {loading ? 'Verifying…' : 'Verify & Sign In'}
                  </button>

                  <button
                    type="button"
                    className="login-back-btn"
                    onClick={() => { setStep('input'); setOtp(''); setError(''); }}
                  >
                    ← Change {authMode === 'email' ? 'email' : 'number'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

