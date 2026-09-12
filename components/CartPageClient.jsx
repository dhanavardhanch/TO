'use client';

import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import Nav from './Nav';
import Footer from './Footer';

export default function CartPageClient() {
  const { cart, removeFromCart, updateCartQty, cartTotal, cartCount, coins } = useShop();

  const savings = cart.reduce((sum, c) => sum + (c.mrp - c.price) * c.quantity, 0);
  const deliveryCharge = cartTotal >= 599 ? 0 : 60;
  const finalTotal = cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <>
        <Nav />
        <main className="cart-page">
          <div className="cart-empty-state">
            <div className="cart-empty-video-wrap">
              <video
                src="/assets/empty_cart_animation.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="cart-empty-video"
              >
                <source src="/assets/empty_cart_animation.webm" type="video/webm" />
              </video>
            </div>
            <h1 className="cart-empty-title">Your Cart is Empty</h1>
            <p className="cart-empty-sub">
              Looks like you haven&apos;t added any handcrafted Palasa cashews to your cart yet.
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
      <main className="cart-page">
        <div className="cart-inner">
          {/* Header */}
          <div className="cart-header">
            <h1 className="cart-title">Your Cart</h1>
            <span className="cart-count-badge">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
          </div>

          <div className="cart-layout">
            {/* Left — Item List */}
            <div className="cart-items-col">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <img src={item.image} alt={item.name} className="cart-item-img" width={80} height={80} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <span className="cart-item-size">{item.size}</span>
                      </div>
                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="cart-qty-control">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateCartQty(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="cart-qty-num">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <div className="cart-item-price">
                        <span className="cart-price-current">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        {item.mrp && (
                          <span className="cart-price-mrp">₹{(item.mrp * item.quantity).toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link href="/products" className="cart-continue-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Continue shopping
              </Link>
            </div>

            {/* Right — Order Summary */}
            <aside className="cart-summary-col">
              <div className="cart-summary-card">
                <h2 className="cart-summary-title">Order Summary</h2>

                <div className="cart-summary-rows">
                  <div className="cart-summary-row">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {savings > 0 && (
                    <div className="cart-summary-row savings">
                      <span>You save</span>
                      <span>−₹{savings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="cart-summary-row">
                    <span>Delivery</span>
                    <span className={deliveryCharge === 0 ? 'free-delivery' : ''}>
                      {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  {deliveryCharge > 0 && (
                    <p className="cart-free-delivery-hint">
                      Add ₹{(599 - cartTotal).toLocaleString('en-IN')} more for free delivery
                    </p>
                  )}
                  <div className="cart-summary-divider"></div>
                  <div className="cart-summary-row total">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Original Coins Earn Notice in Cart */}
                <div className="cart-coins-reward-banner">
                  <div className="cart-coins-left">
                    <div className="cart-coin-icon-box">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                        <path d="M16 3H4a2 2 0 0 0-2 2v2"></path>
                        <circle cx="16" cy="14" r="1.5" fill="currentColor"></circle>
                      </svg>
                    </div>
                    <div className="cart-coin-texts">
                      <span className="cart-coin-earn-title">Earn 100 Original Coins</span>
                      <span className="cart-coin-earn-desc">₹10 value credited on delivery</span>
                    </div>
                  </div>
                  <Link
                    href="/wallet"
                    className="cart-coin-wallet-btn"
                  >
                    Wallet ({coins.toLocaleString('en-IN')})
                  </Link>
                </div>

                <Link href="/checkout" className="btn-buy-now cart-checkout-btn">
                  Proceed to Checkout
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>

                <div className="cart-trust-row">
                  <span className="cart-trust-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    Secure checkout
                  </span>
                  <span className="cart-trust-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13" rx="2"></rect>
                      <path d="M16 8h4l3 5v4h-7V8z"></path>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    Palasa dispatch
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

