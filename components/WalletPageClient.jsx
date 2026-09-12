'use client';

import Link from 'next/link';
import { useShop, REDEEM_THRESHOLD, REDEEM_DISCOUNT } from '../context/ShopContext';
import Nav from './Nav';
import Footer from './Footer';

export default function WalletPageClient() {
  const { coins, coinsValue, progressPercent, transactions, canRedeemCoins } = useShop();

  const neededCoins = Math.max(0, REDEEM_THRESHOLD - coins);

  return (
    <>
      <Nav />
      <main className="wallet-page">
        <div className="wallet-container">
          {/* Breadcrumbs */}
          <nav className="wallet-breadcrumbs" aria-label="Breadcrumbs">
            <Link href="/" className="wallet-crumb-link">Home</Link>
            <span className="wallet-crumb-sep">/</span>
            <span className="wallet-crumb-current">Original Coins Wallet</span>
          </nav>

          {/* Page Heading */}
          <header className="wallet-header">
            <div className="wallet-header-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                <path d="M16 3H4a2 2 0 0 0-2 2v2"></path>
                <circle cx="16" cy="14" r="1.5" fill="currentColor"></circle>
              </svg>
            </div>
            <div>
              <h1 className="wallet-title">Original Coins Wallet</h1>
              <p className="wallet-subtitle">
                Earn 100 Original Coins for every delivered order. Save them in your wallet and redeem a flat ₹500 discount when you hit 5,000 Coins.
              </p>
            </div>
          </header>

          {/* Top Hero: Wallet Balance & Milestone Card */}
          <section className="wallet-balance-hero" aria-label="Wallet balance and milestone status">
            <div className="wallet-balance-left">
              <span className="wallet-balance-kicker">Current Balance</span>
              <div className="wallet-balance-row">
                <span className="wallet-balance-number">{coins.toLocaleString('en-IN')}</span>
                <span className="wallet-balance-unit">Original Coins</span>
              </div>
              <div className="wallet-cash-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>₹{coinsValue.toLocaleString('en-IN')} Real Cash Value (100 Coins = ₹10)</span>
              </div>
            </div>

            <div className="wallet-milestone-box">
              <div className="milestone-header">
                <div className="milestone-title-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span className="milestone-title">₹500 Flat Discount Milestone</span>
                </div>
                <span className="milestone-status-tag">
                  {canRedeemCoins ? 'Unlocked!' : `${progressPercent}% Achieved`}
                </span>
              </div>

              {/* Progress Gauge */}
              <div className="milestone-progress-track">
                <div
                  className="milestone-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>

              <div className="milestone-labels">
                <span>{coins.toLocaleString('en-IN')} Coins</span>
                <span>Goal: {REDEEM_THRESHOLD.toLocaleString('en-IN')} Coins (₹{REDEEM_DISCOUNT} OFF)</span>
              </div>

              <p className="milestone-hint-text">
                {canRedeemCoins ? (
                  <strong className="milestone-unlocked-text">
                    🎉 Milestone Reached! You have unlocked a flat ₹500 discount for your next order. Apply it directly on checkout.
                  </strong>
                ) : (
                  <span>
                    💡 Earn <strong>{neededCoins.toLocaleString('en-IN')} more Original Coins</strong> to unlock your flat ₹500 checkout discount!
                  </span>
                )}
              </p>
            </div>
          </section>

          {/* How It Works: 3 Steps with Real SVG Icons (No AI art) */}
          <section className="wallet-rules-section" aria-label="How Original Coins work">
            <h2 className="wallet-section-title">How Original Coins Work</h2>
            <div className="wallet-rules-grid">
              {/* Step 1: Real Package Delivery Icon */}
              <div className="wallet-rule-card">
                <div className="wallet-rule-num">1</div>
                <div className="wallet-rule-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="wallet-rule-title">Order Any Pack</h3>
                <p className="wallet-rule-desc">
                  Every delivered order credits <strong>100 Original Coins</strong> directly into your account wallet upon delivery.
                </p>
              </div>

              {/* Step 2: Real Vault / Shield Icon */}
              <div className="wallet-rule-card">
                <div className="wallet-rule-num">2</div>
                <div className="wallet-rule-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    <circle cx="12" cy="16" r="1.5"></circle>
                  </svg>
                </div>
                <h3 className="wallet-rule-title">Safe in Your Wallet</h3>
                <p className="wallet-rule-desc">
                  <strong>100 Coins = ₹10 Real Cash Value</strong>. Your coins accumulate securely with <strong>zero expiration date</strong>.
                </p>
              </div>

              {/* Step 3: Real Discount Ticket Icon */}
              <div className="wallet-rule-card">
                <div className="wallet-rule-num">3</div>
                <div className="wallet-rule-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                <h3 className="wallet-rule-title">Redeem Flat ₹500 OFF</h3>
                <p className="wallet-rule-desc">
                  When your wallet reaches <strong>5,000 Coins</strong>, redeem them for an immediate <strong>₹500 cash discount</strong> at checkout.
                </p>
              </div>
            </div>
          </section>

          {/* Transaction History Section */}
          <section className="wallet-transactions-section" aria-label="Wallet transaction ledger">
            <div className="wallet-section-header-row">
              <div>
                <h2 className="wallet-section-title">Transaction History</h2>
                <p className="wallet-section-sub">
                  Automatic ledger of your credited order bonuses and milestone redemptions.
                </p>
              </div>
              <Link href="/products" className="btn-wallet-shop">
                Shop Cashews
              </Link>
            </div>

            {transactions.length === 0 ? (
              <div className="wallet-empty-history">
                <div className="wallet-empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <p className="wallet-empty-title">No transactions yet</p>
                <p className="wallet-empty-sub">Your coin credits will appear here automatically when orders are delivered.</p>
              </div>
            ) : (
              <div className="wallet-transactions-list">
                {transactions.map((txn) => {
                  const isCredit = txn.type === 'credit';
                  return (
                    <div key={txn.id} className="wallet-txn-item">
                      <div className="wallet-txn-left">
                        <div className={`wallet-txn-icon-box ${isCredit ? 'credit' : 'debit'}`}>
                          {isCredit ? (
                            /* Real Arrow Up Right SVG */
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          ) : (
                            /* Real Arrow Down Left SVG */
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="17" y1="7" x2="7" y2="17"></line>
                              <polyline points="17 17 7 17 7 7"></polyline>
                            </svg>
                          )}
                        </div>
                        <div className="wallet-txn-meta">
                          <span className="wallet-txn-title">{txn.title}</span>
                          <span className="wallet-txn-desc">{txn.desc}</span>
                          <span className="wallet-txn-date">{txn.date} &bull; Ref: {txn.orderId}</span>
                        </div>
                      </div>

                      <div className="wallet-txn-right">
                        <span className={`wallet-txn-status ${txn.status === 'Delivered' ? 'status-delivered' : 'status-redeemed'}`}>
                          <span className="status-dot" />
                          {txn.status}
                        </span>
                        <span className={`wallet-txn-amount ${isCredit ? 'credit' : 'debit'}`}>
                          {isCredit ? `+${txn.amount}` : txn.amount} Original Coins
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
