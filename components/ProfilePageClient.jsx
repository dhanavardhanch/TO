'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Nav from './Nav';
import Footer from './Footer';

const TABS = [
  {
    id: 'profile',
    label: 'My Profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'orders',
    label: 'Order History',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
      </svg>
    ),
  },
  {
    id: 'wallet',
    label: 'My Wallet',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M12 8v8M9.5 10.5C9.5 9.5 10.5 9 12 9s2.5.5 2.5 1.5c0 2-5 1.5-5 3.5 0 1 1 1.5 2.5 1.5s2.5-.5 2.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'addresses',
    label: 'Saved Addresses',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

// Mock order data — in production this would come from API
const MOCK_ORDERS = [
  {
    id: 'TO-2847',
    date: '10 Sep 2026',
    status: 'Delivered',
    items: [{ name: 'The Original W240 · 250g', qty: 2, price: 760 }],
    total: 760,
    coinsEarned: 86,
  },
  {
    id: 'TO-2801',
    date: '28 Aug 2026',
    status: 'Delivered',
    items: [{ name: 'The Original W320 · 500g', qty: 1, price: 620 }],
    total: 620,
    coinsEarned: 86,
  },
];

export default function ProfilePageClient() {
  const { isLoggedIn, isHydrated, user, coins, transactions, logout, updateProfile, openLoginModal } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  // Check URL query tab on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['profile', 'orders', 'wallet', 'addresses'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  // Editing state
  const [editMode, setEditMode] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');

  // Address state
  const [addresses, setAddresses] = useState([]);
  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: 'Home', line1: '', city: '', state: '', pin: '' });

  useEffect(() => {
    if (user) {
      setFormName(user.name || '');
      setFormEmail(user.email || '');
      setFormPhone(user.phone || '');
    }
    try {
      const saved = JSON.parse(localStorage.getItem('to_addresses') || '[]');
      setAddresses(saved);
    } catch { /* ignore */ }
  }, [user]);

  // Redirect to home + open login if not logged in (only AFTER hydration)
  useEffect(() => {
    if (isHydrated && !isLoggedIn) {
      openLoginModal();
      router.replace('/');
    }
  }, [isHydrated, isLoggedIn, openLoginModal, router]);

  if (!isHydrated || !isLoggedIn || !user) return null;

  const handleSaveProfile = () => {
    updateProfile({ name: formName, email: formEmail, phone: formPhone });
    setEditMode(false);
  };

  const handleSaveAddress = () => {
    const updated = [...addresses, { ...newAddress, id: Date.now() }];
    setAddresses(updated);
    try { localStorage.setItem('to_addresses', JSON.stringify(updated)); } catch { /* ignore */ }
    setNewAddress({ label: 'Home', line1: '', city: '', state: '', pin: '' });
    setAddingAddress(false);
  };

  const handleRemoveAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    try { localStorage.setItem('to_addresses', JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const coinsValue = Math.round(coins * 0.1);

  return (
    <>
      <Nav />
      <main className="profile-page">
        <div className="profile-hero">
          <div className="profile-hero-inner">
            <div className="profile-avatar">
              {(user.name || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="profile-hero-info">
              <h1 className="profile-hero-name">{user.name || (user.email ? user.email.split('@')[0] : 'My Account')}</h1>
              {user.email && (
                <p className="profile-hero-email">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }}>
                    <rect width="20" height="16" x="2" y="4" rx="2.5" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {user.email}
                </p>
              )}
              {user.phone && (
                <p className="profile-hero-phone">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 {user.phone}
                </p>
              )}
            </div>
            <button className="profile-signout-btn" onClick={() => { logout(); router.replace('/'); }}>
              Sign Out
            </button>
          </div>
        </div>

        <div className="profile-layout">
          {/* Sidebar tabs */}
          <aside className="profile-sidebar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`profile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="profile-tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}

            {/* Coins summary */}
            <div className="profile-coins-card">
              <div className="profile-coins-label">Original Coins</div>
              <div className="profile-coins-amount">{coins.toLocaleString('en-IN')}</div>
              <div className="profile-coins-value">≈ ₹{coinsValue} value</div>
            </div>
          </aside>

          {/* Main content */}
          <div className="profile-content">
            {/* ── Profile Tab ── */}
            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="profile-section-header">
                  <h2>Personal Information</h2>
                  {!editMode && (
                    <button className="profile-edit-btn" onClick={() => setEditMode(true)}>
                      Edit
                    </button>
                  )}
                </div>

                {editMode ? (
                  <div className="profile-edit-form">
                    <div className="profile-field">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="profile-field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="profile-field">
                      <label>Mobile Number</label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                      />
                    </div>
                    <div className="profile-edit-actions">
                      <button className="profile-save-btn" onClick={handleSaveProfile}>Save Changes</button>
                      <button className="profile-cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-info-grid">
                    <div className="profile-info-item">
                      <span className="profile-info-label">Full Name</span>
                      <span className="profile-info-value">{user.name || '—'}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">Email Address</span>
                      <span className="profile-info-value">{user.email || 'Not provided'}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">Mobile Number</span>
                      <span className="profile-info-value">{user.phone ? `+91 ${user.phone}` : 'Not provided'}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Orders Tab ── */}
            {activeTab === 'orders' && (
              <div className="profile-section">
                <div className="profile-section-header">
                  <h2>Order History</h2>
                </div>
                {MOCK_ORDERS.length === 0 ? (
                  <div className="profile-empty">
                    <p>No orders yet.</p>
                    <Link href="/products" className="profile-shop-link">Shop Now →</Link>
                  </div>
                ) : (
                  <div className="profile-orders-list">
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="profile-order-card">
                        <div className="profile-order-header">
                          <div>
                            <span className="profile-order-id">#{order.id}</span>
                            <span className="profile-order-date">{order.date}</span>
                          </div>
                          <span className={`profile-order-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="profile-order-items">
                          {order.items.map((item, i) => (
                            <div key={i} className="profile-order-item">
                              <span>{item.name} × {item.qty}</span>
                              <span>₹{item.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="profile-order-footer">
                          <span className="profile-order-total">Total: ₹{order.total}</span>
                          <span className="profile-order-coins">+{order.coinsEarned} Coins earned</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Wallet Tab ── */}
            {activeTab === 'wallet' && (
              <div className="profile-section">
                <div className="profile-section-header">
                  <h2>My Wallet</h2>
                </div>
                <div className="profile-wallet-summary">
                  <div className="profile-wallet-balance-card">
                    <div className="profile-wallet-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="url(#walletCoinGrad)" stroke="#FFE898" strokeWidth="1.2" />
                        <circle cx="12" cy="12" r="7.5" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
                        <text x="12" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="800" letterSpacing="0.05em" fontFamily="sans-serif">TO</text>
                        <defs>
                          <linearGradient id="walletCoinGrad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FCD34D"/>
                            <stop offset="0.5" stopColor="#D97706"/>
                            <stop offset="1" stopColor="#78350F"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <div className="profile-wallet-balance">{coins.toLocaleString('en-IN')} Coins</div>
                      <div className="profile-wallet-rupee">≈ ₹{coinsValue} redeemable value</div>
                    </div>
                  </div>
                  <div className="profile-wallet-note">
                    Earn 86 coins on every order. Use coins for discounts on future purchases.
                  </div>
                </div>

                <h3 className="profile-wallet-history-title">Transaction History</h3>
                <div className="profile-txn-list">
                  {transactions.length === 0 ? (
                    <p className="profile-empty-text">No transactions yet.</p>
                  ) : (
                    transactions.map((txn) => (
                      <div key={txn.id} className={`profile-txn-item ${txn.type}`}>
                        <div className="profile-txn-left">
                          <span className="profile-txn-title">{txn.title}</span>
                          <span className="profile-txn-desc">{txn.desc}</span>
                          <span className="profile-txn-date">{txn.date}</span>
                        </div>
                        <span className={`profile-txn-amount ${txn.type}`}>
                          {txn.type === 'credit' ? '+' : ''}{txn.amount} Coins
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── Addresses Tab ── */}
            {activeTab === 'addresses' && (
              <div className="profile-section">
                <div className="profile-section-header">
                  <h2>Saved Addresses</h2>
                  {!addingAddress && (
                    <button className="profile-edit-btn" onClick={() => setAddingAddress(true)}>
                      + Add New
                    </button>
                  )}
                </div>

                {addingAddress && (
                  <div className="profile-address-form">
                    <div className="profile-address-form-row">
                      <div className="profile-field">
                        <label>Label</label>
                        <select
                          value={newAddress.label}
                          onChange={(e) => setNewAddress((p) => ({ ...p, label: e.target.value }))}
                        >
                          <option>Home</option>
                          <option>Work</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="profile-field">
                      <label>Address Line</label>
                      <input
                        type="text"
                        placeholder="Flat / Street / Area"
                        value={newAddress.line1}
                        onChange={(e) => setNewAddress((p) => ({ ...p, line1: e.target.value }))}
                      />
                    </div>
                    <div className="profile-address-form-row">
                      <div className="profile-field">
                        <label>City</label>
                        <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress((p) => ({ ...p, city: e.target.value }))} />
                      </div>
                      <div className="profile-field">
                        <label>State</label>
                        <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress((p) => ({ ...p, state: e.target.value }))} />
                      </div>
                      <div className="profile-field">
                        <label>PIN Code</label>
                        <input type="tel" maxLength={6} placeholder="PIN" value={newAddress.pin} onChange={(e) => setNewAddress((p) => ({ ...p, pin: e.target.value.replace(/\D/g, '') }))} />
                      </div>
                    </div>
                    <div className="profile-edit-actions">
                      <button className="profile-save-btn" onClick={handleSaveAddress}>Save Address</button>
                      <button className="profile-cancel-btn" onClick={() => setAddingAddress(false)}>Cancel</button>
                    </div>
                  </div>
                )}

                {addresses.length === 0 && !addingAddress ? (
                  <div className="profile-empty">
                    <p>No saved addresses yet.</p>
                  </div>
                ) : (
                  <div className="profile-address-list">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="profile-address-card">
                        <div className="profile-address-tag">{addr.label}</div>
                        <div className="profile-address-text">
                          {addr.line1}, {addr.city}, {addr.state} — {addr.pin}
                        </div>
                        <button className="profile-remove-btn" onClick={() => handleRemoveAddress(addr.id)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
