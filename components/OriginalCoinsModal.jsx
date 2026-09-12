'use client';

import { useState, useEffect } from 'react';
import { useShop, REDEEM_THRESHOLD, REDEEM_DISCOUNT } from '../context/ShopContext';

export default function OriginalCoinsModal() {
  const {
    coins,
    coinsValue,
    coinsNeededForRedeem,
    progressPercent,
    canRedeemCoins,
    addCoins,
    isCoinsModalOpen,
    setIsCoinsModalOpen,
  } = useShop();

  const [simOrders, setSimOrders] = useState(1);
  const [justEarned, setJustEarned] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsCoinsModalOpen(false);
    };
    if (isCoinsModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCoinsModalOpen, setIsCoinsModalOpen]);

  if (!isCoinsModalOpen) return null;

  const handleSimulateEarn = (amount = 100) => {
    addCoins(amount);
    setJustEarned(true);
    setTimeout(() => setJustEarned(false), 2400);
  };

  const simCoins = simOrders * 100;
  const simRupees = simOrders * 10;
  const simUnlocked = simCoins >= REDEEM_THRESHOLD;

  return (
    <div className="coins-modal-backdrop" onClick={() => setIsCoinsModalOpen(false)} role="dialog" aria-modal="true">
      <div className="coins-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="coins-modal-close"
          onClick={() => setIsCoinsModalOpen(false)}
          aria-label="Close coins wallet"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="coins-modal-header">
          <div className="coins-brand-pill">
            <span className="coin-sparkle">✦</span>
            <span>ORIGINAL WALLET REWARDS</span>
            <span className="coin-sparkle">✦</span>
          </div>
          <h2 className="coins-modal-title">Original Coins</h2>
          <p className="coins-modal-lead">
            Every delivered cashew order earns you real cash value. No gimmicks, no confusing points.
          </p>
        </div>

        {/* Balance Card with Animated 3D Coin */}
        <div className="coins-balance-hero">
          <div className="coins-3d-coin-wrap">
            <div className="coins-3d-coin">
              <div className="coin-face front">
                <span className="coin-emboss">TO</span>
                <span className="coin-sub-emboss">ORIGINAL</span>
              </div>
              <div className="coin-edge"></div>
              <div className="coin-glimmer"></div>
            </div>
            {justEarned && (
              <span className="coins-floating-plus">+100 COINS!</span>
            )}
          </div>

          <div className="coins-balance-info">
            <span className="coins-balance-label">Your Wallet Balance</span>
            <div className="coins-balance-number-row">
              <span className="coins-number">{coins.toLocaleString('en-IN')}</span>
              <span className="coins-unit">Coins</span>
            </div>
            <div className="coins-rupee-equiv">
              <span>Real Value:</span>
              <strong className="rupee-tag">₹{coinsValue.toLocaleString('en-IN')}</strong>
              <span className="rate-hint">(100 Coins = ₹10)</span>
            </div>
          </div>
        </div>

        {/* Milestone Goal Progress Bar */}
        <div className="coins-milestone-box">
          <div className="milestone-top">
            <span className="milestone-title">Goal: ₹500 Cash Discount</span>
            <span className="milestone-target">5,000 Coins ({progressPercent}%)</span>
          </div>

          <div className="milestone-bar-track">
            <div
              className="milestone-bar-fill"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="milestone-bar-glow"></div>
            </div>
          </div>

          <div className="milestone-markers">
            <span className="marker">0 Coins (₹0)</span>
            <span className="marker">1,000 Coins (₹100)</span>
            <span className="marker target-marker">🎁 5,000 Coins (₹500 OFF)</span>
          </div>

          <div className="milestone-status-message">
            {canRedeemCoins ? (
              <div className="milestone-celebrate">
                🎉 <strong>Congratulations!</strong> You have reached 5,000 Coins! You can now redeem ₹500 off at checkout!
              </div>
            ) : (
              <div className="milestone-needed">
                🌱 <strong>{coinsNeededForRedeem.toLocaleString('en-IN')} more coins</strong> to reach your flat ₹500 discount voucher!
              </div>
            )}
          </div>
        </div>

        {/* Simple 3-Step Guide for Non-Tech People (Clean, No-Scrolling Grid) */}
        <div className="coins-guide-section">
          <h3 className="coins-guide-heading">How Original Coins Work</h3>
          <div className="coins-steps-grid">
            {/* Step 1 */}
            <div className="coin-step-card">
              <div className="coin-step-badge">Step 1</div>
              <div className="coin-step-icon">📦</div>
              <h4 className="coin-step-title">Order Any Pack</h4>
              <p className="coin-step-desc">
                For every delivered order, you automatically get <strong>100 Original Coins</strong>.
              </p>
              <span className="coin-step-highlight">+100 Coins = ₹10 Value</span>
            </div>

            {/* Step 2 */}
            <div className="coin-step-card">
              <div className="coin-step-badge">Step 2</div>
              <div className="coin-step-icon">👛</div>
              <h4 className="coin-step-title">Stays in Wallet</h4>
              <p className="coin-step-desc">
                Coins stack securely in your account. They have <strong>no expiry date</strong> and never disappear.
              </p>
              <span className="coin-step-highlight">100% Safe &amp; Real Cash</span>
            </div>

            {/* Step 3 */}
            <div className="coin-step-card feature-step">
              <div className="coin-step-badge gold">Step 3</div>
              <div className="coin-step-icon">🎁</div>
              <h4 className="coin-step-title">Redeem at 5,000 Coins</h4>
              <p className="coin-step-desc">
                When your balance reaches <strong>5,000 Coins</strong>, unlock a flat <strong>₹500 instant discount</strong> on your next cashew order!
              </p>
              <span className="coin-step-highlight gold-pill">Redeem Flat ₹500 OFF</span>
            </div>
          </div>
        </div>

        {/* Interactive Rewards Calculator (Instant, Visual, Engaging) */}
        <div className="coins-calculator-section">
          <div className="calc-header">
            <h4 className="calc-title">Interactive Rewards Calculator</h4>
            <span className="calc-sub">Select order count to see your rewards</span>
          </div>

          <div className="calc-chips">
            {[1, 5, 10, 25, 50].map((num) => (
              <button
                key={num}
                type="button"
                className={`calc-chip ${simOrders === num ? 'active' : ''}`}
                onClick={() => setSimOrders(num)}
              >
                {num} {num === 1 ? 'Order' : 'Orders'}
              </button>
            ))}
          </div>

          <div className="calc-result-row">
            <div className="calc-stat">
              <span className="stat-label">Total Coins Earned</span>
              <span className="stat-value coin-value">🪙 {simCoins.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-stat-divider">=</div>
            <div className="calc-stat">
              <span className="stat-label">Real Rupee Value</span>
              <span className="stat-value rupee-value">₹{simRupees.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-stat-badge">
              {simUnlocked ? (
                <span className="calc-unlocked-badge">🎉 ₹500 DISCOUNT UNLOCKED!</span>
              ) : (
                <span className="calc-progress-badge">{(5000 - simCoins).toLocaleString('en-IN')} coins to ₹500 voucher</span>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Testing Actions */}
        <div className="coins-modal-actions">
          <button
            type="button"
            className="btn-coins-test-add"
            onClick={() => handleSimulateEarn(100)}
          >
            <span>+ Simulate 1 Delivered Order (+100 Coins)</span>
          </button>
          {!canRedeemCoins && (
            <button
              type="button"
              className="btn-coins-test-5000"
              onClick={() => handleSimulateEarn(5000)}
              title="Test reaching 5,000 coins milestone"
            >
              <span>⭐ Reach 5,000 Coins Milestone (Test)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
