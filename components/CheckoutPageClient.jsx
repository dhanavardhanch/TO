'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import Nav from './Nav';
import Footer from './Footer';

export default function CheckoutPageClient() {
  const {
    cart,
    cartTotal,
    clearCart,
    coins,
    canRedeemCoins,
    isCoinsRedeemed,
    toggleRedeemCoins,
    addCoins,
    redeemCoins,
  } = useShop();

  const { isLoggedIn, openLoginModal, user } = useAuth();

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', pincode: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [earnedSummary, setEarnedSummary] = useState(null);

  // Auto-fill form if user is signed in
  useEffect(() => {
    if (isLoggedIn && user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [isLoggedIn, user]);

  // Unique cashew varieties in cart (if 1 item added multiple times e.g. W180 x 3, coin counts only 1 time = 83 coins)
  const uniqueProductsCount = new Set(
    cart.map((item) => item.productId || item.name?.split(' (')[0] || item.id)
  ).size || (cart.length > 0 ? 1 : 0);

  const totalEarnedCoins = uniqueProductsCount * 83; // 1 item = 83 coins, 2 items = 166 coins

  // Toggle state to use 100 coins for ₹10 instant discount now
  // Available if order has 2+ items (166 coins) OR user has >= 100 coins in wallet
  const canUseInstantCoins = totalEarnedCoins >= 100 || (isLoggedIn && coins >= 100);
  const [useCoinsDiscount, setUseCoinsDiscount] = useState(true);

  const instantDiscount = canUseInstantCoins && useCoinsDiscount ? 10 : 0;
  const coinsUsedForInstant = instantDiscount > 0 ? 100 : 0;
  const remainingCoinsToWallet = Math.max(0, totalEarnedCoins - coinsUsedForInstant);

  // Free shipping on order above 999 ONLY when signed in
  const freeShippingUnlocked = isLoggedIn && cartTotal >= 999;
  const deliveryCharge = freeShippingUnlocked ? 0 : 70;
  const voucherDiscount = isLoggedIn && isCoinsRedeemed && canRedeemCoins ? 500 : 0;
  const finalTotal = Math.max(0, cartTotal + deliveryCharge - instantDiscount - voucherDiscount);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    let text = `*New Order — The Original Palasa Cashews*\n\n`;
    text += `*Customer:* ${form.name}\n*Phone:* ${form.phone}\n`;
    if (form.email) text += `*Email:* ${form.email}\n`;
    text += `*Address:* ${form.address}, ${form.pincode}\n`;
    if (form.notes) text += `*Notes:* ${form.notes}\n`;
    text += `\n*Order Items:*\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} (${item.size}) x${item.quantity} = Rs.${item.price * item.quantity}\n`;
    });
    if (isLoggedIn) {
      if (instantDiscount > 0) {
        text += `*Coins Instant Discount:* -Rs.10 (100 Coins applied)\n`;
      }
      if (voucherDiscount > 0) {
        text += `*Coins Voucher Discount:* -Rs.500 (5,000 Coins)\n`;
      }
      text += `*Delivery:* ${freeShippingUnlocked ? 'FREE (Order above Rs.999 - Member Perk)' : `Rs.${deliveryCharge}`}\n`;
      text += `\n*Total to Pay:* Rs.${finalTotal.toLocaleString('en-IN')}\n`;
      text += `*Original Coins Credited on Delivery:* +${remainingCoinsToWallet} Coins (${uniqueProductsCount} unique varieties × 83 Coins${instantDiscount > 0 ? ' - 100 Coins used for Rs.10 discount' : ''})\nPlease confirm and share payment details.`;
    } else {
      if (instantDiscount > 0) {
        text += `*Coins Instant Discount:* -Rs.10 (100 Coins applied)\n`;
      }
      text += `*Delivery:* Rs.${deliveryCharge}\n`;
      text += `\n*Total to Pay:* Rs.${finalTotal.toLocaleString('en-IN')}\n`;
      text += `*Original Coins Credited on Delivery:* +${remainingCoinsToWallet} Coins\nPlease confirm and share payment details.`;
    }
    window.open(`https://wa.me/919100267404?text=${encodeURIComponent(text)}`, '_blank');

    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `TO-${orderNum}`;

    if (isLoggedIn) {
      // Credit remaining coins into wallet (e.g. in 166 coins with 100 coins used for Rs.10 discount, rest 66 coins are added)
      if (remainingCoinsToWallet > 0) {
        addCoins(remainingCoinsToWallet, orderId);
      }
      if (voucherDiscount > 0) {
        redeemCoins(orderId);
      }
      const calculatedNewTotal = coins - (voucherDiscount > 0 ? 5000 : 0) + remainingCoinsToWallet;
      setEarnedSummary({
        addedCoins: remainingCoinsToWallet,
        totalEarnedCoins,
        instantDiscount,
        coinsUsedForInstant,
        newTotal: calculatedNewTotal,
        orderId,
      });
    } else {
      setEarnedSummary({
        addedCoins: remainingCoinsToWallet,
        totalEarnedCoins,
        instantDiscount,
        coinsUsedForInstant,
        newTotal: remainingCoinsToWallet,
        orderId,
      });
    }
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Nav />
        <main className="checkout-page">
          <div className="checkout-success">
            <div className="checkout-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h1 className="checkout-success-title">Order Sent!</h1>
            <p className="checkout-success-sub">Your order has been shared on WhatsApp. We will confirm and dispatch from Palasa shortly.</p>

            {/* Original Coins Earned Banner */}
            {isLoggedIn ? (
              <div className="checkout-coins-earned-card">
                <div className="coin-earned-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    <path d="M16 3H4a2 2 0 0 0-2 2v2"></path>
                    <circle cx="16" cy="14" r="1.5" fill="currentColor"></circle>
                  </svg>
                </div>
                <div className="coin-earned-content">
                  <h3 className="coin-earned-title">
                    {earnedSummary?.instantDiscount > 0
                      ? `₹10 Discount Applied! +${earnedSummary?.addedCoins} Coins Added to Wallet`
                      : `+${earnedSummary?.addedCoins} Original Coins Credited to Your Wallet!`}
                  </h3>
                  <p className="coin-earned-text">
                    Order <strong>#{earnedSummary?.orderId}</strong> reward processed.
                    {earnedSummary?.instantDiscount > 0 ? (
                      <> You saved <strong>₹10</strong> with 100 Coins, and the remaining <strong>+{earnedSummary?.addedCoins} Coins</strong> have been added to your wallet upon delivery.</>
                    ) : (
                      <> <strong>+{earnedSummary?.addedCoins} Coins</strong> ({uniqueProductsCount} unique varieties × 83 Coins) have been credited to your wallet.</>
                    )}
                    {' '}Your current balance is now <strong>{(earnedSummary?.newTotal || coins).toLocaleString('en-IN')} Coins</strong> (₹{Math.round(((earnedSummary?.newTotal || coins) / 100) * 10)} value).
                    When your wallet reaches 5,000 Coins, you unlock a flat ₹500 discount voucher!
                  </p>
                  <Link
                    href="/wallet"
                    className="btn-view-wallet-mini"
                  >
                    View Wallet &amp; Transactions &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="checkout-coins-earned-card checkout-guest-claim-card">
                <div className="coin-earned-icon">🪙</div>
                <div className="coin-earned-content">
                  <h3 className="coin-earned-title">
                    {earnedSummary?.instantDiscount > 0
                      ? `Saved ₹10! Claim Your 100 Welcome + ${earnedSummary?.addedCoins} Coins`
                      : `Claim Your ${100 + (earnedSummary?.addedCoins || 0)} Original Coins!`}
                  </h3>
                  <p className="coin-earned-text">
                    Sign in with the phone or email used for this order to receive your <strong>100 Welcome Coins</strong> plus <strong>{earnedSummary?.addedCoins} Order Reward Coins</strong> (100 coins = ₹10)!
                  </p>
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="btn-view-wallet-mini btn-claim-coins-now"
                  >
                    Sign In to Claim Coins &rarr;
                  </button>
                </div>
              </div>
            )}

            <Link href="/products" className="btn-primary cart-shop-btn">Continue Shopping</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Nav />
        <main className="checkout-page">
          <div className="cart-empty-state">
            <div className="cart-empty-video-wrap">
              <video
                src="/assets/empty_cart_animation.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="cart-empty-video"
              >
                <source src="/assets/empty_cart_animation.webm" type="video/webm" />
              </video>
            </div>
            <h1 className="cart-empty-title">Your Cart is Empty</h1>
            <p className="cart-empty-sub">
              There are no items in your cart to checkout. Explore our premium Palasa cashews first.
            </p>
            <div className="cart-empty-actions">
              <Link href="/products" className="btn-primary cart-shop-btn">
                Browse Products
              </Link>
              <Link href="/" className="btn-secondary cart-home-btn">
                Return Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="checkout-page">
        <div className="checkout-inner">
          <div className="checkout-header">
            <h1 className="cart-title">Checkout</h1>
            <Link href="/cart" className="checkout-back-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to cart
            </Link>
          </div>

          <div className="checkout-layout">
            <form className="checkout-form-col" onSubmit={handleSubmit} id="checkout-form">
              <div className="checkout-section-card">
                <h2 className="checkout-section-label">Delivery Details</h2>
                <div className="checkout-field-grid">
                  <div className="checkout-field">
                    <label htmlFor="co-name" className="checkout-label">Full Name <span className="req">*</span></label>
                    <input id="co-name" name="name" type="text" required value={form.name} onChange={handleChange} className="checkout-input" placeholder="Your name" />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="co-phone" className="checkout-label">Mobile Number <span className="req">*</span></label>
                    <input id="co-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="checkout-input" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="checkout-field checkout-field-full">
                    <label htmlFor="co-email" className="checkout-label">Email <span className="checkout-optional">(optional)</span></label>
                    <input id="co-email" name="email" type="email" value={form.email} onChange={handleChange} className="checkout-input" placeholder="your@email.com" />
                  </div>
                  <div className="checkout-field checkout-field-full">
                    <label htmlFor="co-address" className="checkout-label">Delivery Address <span className="req">*</span></label>
                    <textarea id="co-address" name="address" required value={form.address} onChange={handleChange} className="checkout-input checkout-textarea" placeholder="House / Flat no., Street, City, State" rows={3} />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="co-pincode" className="checkout-label">Pincode <span className="req">*</span></label>
                    <input id="co-pincode" name="pincode" type="text" required pattern="[0-9]{6}" value={form.pincode} onChange={handleChange} className="checkout-input" placeholder="6-digit pincode" />
                  </div>
                  <div className="checkout-field checkout-field-full">
                    <label htmlFor="co-notes" className="checkout-label">Notes <span className="checkout-optional">(optional)</span></label>
                    <textarea id="co-notes" name="notes" value={form.notes} onChange={handleChange} className="checkout-input checkout-textarea" placeholder="Any special instructions?" rows={2} />
                  </div>
                </div>
              </div>
              <div className="checkout-section-card checkout-payment-info">
                <h2 className="checkout-section-label">Payment</h2>
                <div className="checkout-payment-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>After placing via WhatsApp, we share UPI / Bank Transfer details. Order dispatches only after payment confirmation.</span>
                </div>
              </div>
            </form>

            <aside className="cart-summary-col checkout-summary-col">
              <div className="cart-summary-card">
                <h2 className="cart-summary-title">Order Summary</h2>
                <div className="checkout-order-items">
                  {cart.map((item) => (
                    <div key={item.id} className="checkout-order-item">
                      <img src={item.image} alt={item.name} className="checkout-item-thumb" width={44} height={44} />
                      <div className="checkout-item-info">
                        <span className="checkout-item-name">{item.name}</span>
                        <span className="checkout-item-meta">{item.size} x {item.quantity}</span>
                      </div>
                      <span className="checkout-item-price">Rs.{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <div className="cart-summary-rows">
                  <div className="cart-summary-row"><span>Subtotal</span><span>Rs.{cartTotal.toLocaleString('en-IN')}</span></div>
                  <div className="cart-summary-row">
                    <span>Standard Express Delivery</span>
                    {freeShippingUnlocked ? (
                      <span className="free-shipping-badge">
                        <s style={{ opacity: 0.55, marginRight: 6 }}>Rs.70</s>
                        <strong style={{ color: '#16a34a' }}>FREE</strong>
                      </span>
                    ) : (
                      <span>Rs.{deliveryCharge}</span>
                    )}
                  </div>
                  {!isLoggedIn && cartTotal >= 999 && (
                    <div className="checkout-perk-hint-row">
                      <span style={{ fontSize: '11.5px', color: '#B45309', fontWeight: 600 }}>
                        💡 Sign in below to get FREE Delivery on this order!
                      </span>
                    </div>
                  )}
                  {instantDiscount > 0 && (
                    <div className="cart-summary-row coins-discount">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span>🪙</span> Original Coins Discount (100 Coins)
                      </span>
                      <span className="discount-amount" style={{ color: '#16a34a', fontWeight: 700 }}>-Rs.10</span>
                    </div>
                  )}
                  {voucherDiscount > 0 && (
                    <div className="cart-summary-row coins-discount">
                      <span>Voucher: 5,000 Coins Redeemed</span>
                      <span className="discount-amount">-Rs.500</span>
                    </div>
                  )}
                  <div className="cart-summary-divider"></div>
                  <div className="cart-summary-row total"><span>Total</span><span>Rs.{finalTotal.toLocaleString('en-IN')}</span></div>
                </div>

                {/* Original Coins & Member Perks: Only show active coins if signed in */}
                {isLoggedIn ? (
                  <div className="checkout-coins-summary-box">
                    <div className="coins-box-header">
                      <div className="coins-box-title-row">
                        <div className="coins-box-svg-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                            <path d="M16 3H4a2 2 0 0 0-2 2v2"></path>
                            <circle cx="16" cy="14" r="1.5" fill="currentColor"></circle>
                          </svg>
                        </div>
                        <span className="coins-title">Original Coins Rewards</span>
                      </div>
                      <Link
                        href="/wallet"
                        className="coins-info-link"
                      >
                        Wallet ({coins.toLocaleString('en-IN')})
                      </Link>
                    </div>

                    {/* Instant Coins Discount Toggle */}
                    {canUseInstantCoins && (
                      <div className="coins-instant-toggle-card">
                        <div className="coins-toggle-header">
                          <div className="coins-toggle-info">
                            <div className="coins-toggle-title-wrap">
                              <span className="coins-toggle-badge">⚡ Coins Discount</span>
                              <span className="coins-toggle-title">Use 100 Coins for ₹10 OFF</span>
                            </div>
                            <p className="coins-toggle-sub">
                              {useCoinsDiscount ? (
                                <>
                                  100 Coins applied for <strong>₹10 instant discount</strong>.
                                  {remainingCoinsToWallet > 0 ? (
                                    <> Rest <strong>+{remainingCoinsToWallet} Coins</strong> will be added to your wallet upon delivery!</>
                                  ) : (
                                    <> Remaining coins will be added upon delivery.</>
                                  )}
                                </>
                              ) : (
                                <>
                                  Toggle ON to save ₹10 right now, or keep full <strong>+{totalEarnedCoins} Coins</strong> in wallet for bigger discounts!
                                </>
                              )}
                            </p>
                          </div>
                          <label className="coins-switch" aria-label="Toggle ₹10 coins discount">
                            <input
                              type="checkbox"
                              checked={useCoinsDiscount}
                              onChange={(e) => setUseCoinsDiscount(e.target.checked)}
                            />
                            <span className="coins-slider"></span>
                          </label>
                        </div>
                      </div>
                    )}

                    <div className="coins-earn-notice">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      <span>
                        Order earns <strong>+{totalEarnedCoins} Original Coins</strong> ({uniqueProductsCount} {uniqueProductsCount === 1 ? 'item' : 'items'} × 83 Coins · 100 coins = ₹10).
                        {instantDiscount > 0
                          ? ` (100 coins applied for ₹10 discount · rest +${remainingCoinsToWallet} coins will add to wallet upon delivery)`
                          : ` (Will add to wallet upon delivery)`}
                      </span>
                    </div>

                    {canRedeemCoins ? (
                      <div className="coins-redeem-available">
                        <label className="coins-redeem-checkbox-label">
                          <input
                            type="checkbox"
                            checked={isCoinsRedeemed}
                            onChange={toggleRedeemCoins}
                            className="coins-redeem-checkbox"
                          />
                          <span className="coins-redeem-text">
                            Redeem 5,000 Coins for <strong>₹500 OFF</strong>
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="coins-needed-hint">
                        <span><strong>{Math.max(0, 5000 - coins).toLocaleString('en-IN')} more coins</strong> until your flat ₹500 discount voucher.</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="checkout-coins-summary-box checkout-signin-prompt-card">
                    {canUseInstantCoins && (
                      <div className="coins-instant-toggle-card" style={{ marginBottom: 14 }}>
                        <div className="coins-toggle-header">
                          <div className="coins-toggle-info">
                            <div className="coins-toggle-title-wrap">
                              <span className="coins-toggle-badge">⚡ Coins Discount</span>
                              <span className="coins-toggle-title">Use 100 Coins for ₹10 OFF</span>
                            </div>
                            <p className="coins-toggle-sub">
                              {useCoinsDiscount ? (
                                <>
                                  100 Coins applied for <strong>₹10 instant discount</strong>. Sign in below or after order to receive rest <strong>+{remainingCoinsToWallet} Coins</strong> in your wallet!
                                </>
                              ) : (
                                <>
                                  Toggle ON to save ₹10 now with 100 Coins!
                                </>
                              )}
                            </p>
                          </div>
                          <label className="coins-switch" aria-label="Toggle ₹10 coins discount">
                            <input
                              type="checkbox"
                              checked={useCoinsDiscount}
                              onChange={(e) => setUseCoinsDiscount(e.target.checked)}
                            />
                            <span className="coins-slider"></span>
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="signin-prompt-header">
                      <span className="signin-prompt-icon">🪙</span>
                      <div>
                        <div className="signin-prompt-title">Sign In for Coins &amp; Free Delivery</div>
                        <p className="signin-prompt-desc">
                          {cartTotal >= 999
                            ? 'Sign in now to get FREE Delivery on this order (save ₹70) plus 83 Coins!'
                            : `Sign in to earn ${totalEarnedCoins} Original Coins (100 coins = ₹10) & unlock free shipping above ₹999.`}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={openLoginModal}
                      className="btn-checkout-signin-unlock"
                    >
                      Sign In to Unlock &rarr;
                    </button>
                  </div>
                )}

                <button type="submit" form="checkout-form" className="btn-buy-now cart-checkout-btn checkout-place-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Place Order via WhatsApp
                </button>
                <p className="checkout-wa-note">You will be redirected to WhatsApp to confirm your order.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
