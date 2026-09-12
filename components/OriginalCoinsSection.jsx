'use client';

import { useState } from 'react';
import { useShop, REDEEM_THRESHOLD } from '../context/ShopContext';

export default function OriginalCoinsSection() {
  const { coins, coinsValue, progressPercent, canRedeemCoins, setIsCoinsModalOpen } = useShop();
  const [selectedCalcOrders, setSelectedCalcOrders] = useState(5);

  const calcCoins = selectedCalcOrders * 100;
  const calcRupees = selectedCalcOrders * 10;
  const isGoalReached = calcCoins >= REDEEM_THRESHOLD;

  return (
    <section className="section original-coins-section" id="original-coins">
      <div className="section-inner">
        {/* Section Header */}
        <div className="coins-section-header">
          <div className="coins-pill-tag">
            <span className="sparkle">✦</span>
            <span>HONEST CUSTOMER REWARDS</span>
            <span className="sparkle">✦</span>
          </div>
          <h2 className="section-title coins-main-title">
            1 Delivered Order = 100 Original Coins
          </h2>
          <p className="coins-header-sub">
            Every delivered box of Palasa cashews credits 100 Original Coins (worth ₹10) into your wallet.
            Stack them up — when your wallet reaches 5,000 Coins, redeem a flat <strong>₹500 instant cash discount</strong>!
          </p>
        </div>

        {/* 3 Step Visual Cards (Clean, Fixed Grid — Zero Routine Scrolling) */}
        <div className="coins-steps-showcase">
          {/* Card 1 */}
          <div className="coins-step-card">
            <div className="step-number-badge">Step 1</div>
            <div className="step-icon-bubble">📦</div>
            <h3 className="step-title">Order Any Harvest</h3>
            <p className="step-text">
              Place your order for fresh Palasa cashews. Once delivered safely to your doorstep, you get <strong>100 Coins</strong> automatically.
            </p>
            <div className="step-formula-pill">
              <span>1 Delivered Order = </span>
              <strong>100 Coins</strong>
            </div>
          </div>

          {/* Card 2 */}
          <div className="coins-step-card">
            <div className="step-number-badge">Step 2</div>
            <div className="step-icon-bubble">👛</div>
            <h3 className="step-title">Stacks in Your Wallet</h3>
            <p className="step-text">
              Every 100 Coins = <strong>₹10 real cash value</strong>. Stored safely in your account with zero expiration and zero gimmicks.
            </p>
            <div className="step-formula-pill">
              <span>100 Coins = </span>
              <strong>₹10 Real Cash</strong>
            </div>
          </div>

          {/* Card 3 */}
          <div className="coins-step-card goal-card">
            <div className="step-number-badge gold-bg">Step 3 · The Big Reward</div>
            <div className="step-icon-bubble gold-glow">🎁</div>
            <h3 className="step-title">Cash in at 5,000 Coins</h3>
            <p className="step-text">
              When your coins reach <strong>5,000 Coins</strong> (50 orders), claim your flat <strong>₹500 instant discount</strong> at checkout!
            </p>
            <div className="step-formula-pill gold-pill">
              <span>5,000 Coins = </span>
              <strong>Flat ₹500 OFF!</strong>
            </div>
          </div>
        </div>

        {/* Live Personal Wallet & Calculator Hub */}
        <div className="coins-interactive-hub">
          {/* Left: Your Current Wallet Status */}
          <div className="coins-user-status-card">
            <div className="user-status-header">
              <span className="status-label">Your Active Wallet</span>
              <button
                type="button"
                className="btn-open-wallet-pill"
                onClick={() => setIsCoinsModalOpen(true)}
              >
                <span>Open Wallet</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            <div className="user-coin-balance-display">
              <div className="coin-disc-anim">
                <span className="coin-disc-symbol">TO</span>
              </div>
              <div className="coin-balance-meta">
                <div className="coin-amount-huge">
                  <span className="amount-num">{coins.toLocaleString('en-IN')}</span>
                  <span className="amount-txt">Coins</span>
                </div>
                <div className="coin-rupee-value-sub">
                  Real Cash Value: <strong>₹{coinsValue.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            {/* Progress Gauge to 5,000 */}
            <div className="wallet-progress-block">
              <div className="progress-labels">
                <span className="progress-curr">{coins.toLocaleString('en-IN')} Coins</span>
                <span className="progress-target">Goal: 5,000 Coins (₹500)</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <span className="progress-hint">
                {canRedeemCoins
                  ? '🎉 5,000 Coins reached! You can apply ₹500 OFF at checkout.'
                  : `Earn ${Math.max(0, 5000 - coins).toLocaleString('en-IN')} more coins to unlock your ₹500 cash voucher!`}
              </span>
            </div>
          </div>

          {/* Right: Non-tech Friendly Rewards Calculator */}
          <div className="coins-calculator-card">
            <h3 className="calc-card-title">Coins Value Calculator</h3>
            <p className="calc-card-sub">
              Tap the buttons below to see how quickly your orders turn into real money:
            </p>

            <div className="calc-buttons-row">
              {[1, 5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`calc-btn ${selectedCalcOrders === num ? 'active' : ''}`}
                  onClick={() => setSelectedCalcOrders(num)}
                >
                  {num} {num === 1 ? 'Box' : 'Boxes'}
                </button>
              ))}
            </div>

            <div className="calc-summary-panel">
              <div className="summary-item">
                <span className="sum-label">Orders Delivered</span>
                <span className="sum-val">{selectedCalcOrders}</span>
              </div>
              <div className="summary-operator">×</div>
              <div className="summary-item">
                <span className="sum-label">Coins Earned</span>
                <span className="sum-val gold">🪙 {calcCoins.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-operator">=</div>
              <div className="summary-item">
                <span className="sum-label">Real Cash Savings</span>
                <span className="sum-val cash">₹{calcRupees.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="calc-milestone-footer">
              {isGoalReached ? (
                <div className="goal-reached-pill">
                  🎉 <strong>Goal Achieved!</strong> 5,000 Coins unlocks your <strong>flat ₹500 discount</strong> on the spot!
                </div>
              ) : (
                <div className="goal-ongoing-pill">
                  💡 Just {(50 - selectedCalcOrders)} more delivered orders to unlock your <strong>₹500 flat discount</strong>!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
