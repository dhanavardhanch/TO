'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '../context/ShopContext';
import Nav from './Nav';
import Footer from './Footer';
import { PRODUCTS_MASTER, getProductById } from '../data/productsData';

const FLAT_DELIVERY_CHARGE = 70;

export default function CartPageClient() {
  const { cart, removeFromCart, updateCartQty, addToCart, cartTotal, cartCount, coins, openCartDrawer } = useShop();
  const router = useRouter();
  const [toastMsg, setToastMsg] = useState('');
  const [editingItem, setEditingItem] = useState(null); // for size change modal

  const savings = cart.reduce((sum, c) => sum + (c.mrp - c.price) * c.quantity, 0);
  const deliveryCharge = FLAT_DELIVERY_CHARGE;
  const finalTotal = cartTotal + deliveryCharge;

  // Show recommendations ONLY when exactly 1 item is in the cart
  const shouldShowRecommendations = cart.length === 1;

  // All other catalog items for recommendation carousel (user requested: add all other items)
  const cartProductIds = new Set(cart.map((c) => c.productId));
  const candidates = PRODUCTS_MASTER.filter((p) => !cartProductIds.has(p.id));
  const recommendedProducts = candidates.length > 0 ? candidates : PRODUCTS_MASTER;

  const recScrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [recScrollPct, setRecScrollPct] = useState(15);
  // Per-card selected size index: { [productId]: optionIndex }
  const [selectedCardSizes, setSelectedCardSizes] = useState({});

  const handleRecScroll = () => {
    if (!recScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = recScrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const pct = Math.min(100, Math.max(15, ((scrollLeft + clientWidth) / scrollWidth) * 100));
      setRecScrollPct(pct);
    }
  };

  const handleMouseDown = (e) => {
    if (!recScrollRef.current) return;
    // Don't start drag if clicking on buttons or links
    if (e.target.closest('button') || e.target.closest('a')) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - recScrollRef.current.offsetLeft;
    scrollLeftRef.current = recScrollRef.current.scrollLeft;
    recScrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !recScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - recScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    recScrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!recScrollRef.current) return;
    isDraggingRef.current = false;
    recScrollRef.current.style.cursor = 'grab';
  };

  const handleWheel = (e) => {
    if (!recScrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      recScrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const scrollRecommendations = (offset) => {
    if (!recScrollRef.current) return;
    recScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleAddRecommendedWithSize = (product, opt) => {
    addToCart({
      id: `${product.id}-${opt.size}`,
      productId: product.id,
      name: product.name,
      size: opt.size,
      price: opt.price,
      mrp: opt.mrp,
      image: product.image,
      quantity: 1,
    });
    setToastMsg(`Added ${product.name} (${opt.size}) to your bag!`);
    setTimeout(() => setToastMsg(''), 2600);
  };

  const handleSwitchSize = (item, newOpt) => {
    removeFromCart(item.id);
    addToCart({
      id: `${item.productId}-${newOpt.size}`,
      productId: item.productId,
      name: item.name,
      size: newOpt.size,
      price: newOpt.price,
      mrp: newOpt.mrp,
      image: item.image,
      quantity: item.quantity,
    });
    setEditingItem(null);
    setToastMsg(`Updated size to ${newOpt.size}!`);
    setTimeout(() => setToastMsg(''), 2600);
  };

  // If cart is empty, redirect to products and open the clean side cart drawer
  // (User requirement: remove separate empty page, keep only the side drawer when empty)
  useEffect(() => {
    if (cart.length === 0) {
      openCartDrawer();
      router.replace('/products');
    }
  }, [cart.length, openCartDrawer, router]);

  if (cart.length === 0) {
    return null;
  }

  return (
    <>
      <Nav />
      <main className={`cart-page luxury-cart-page ${cart.length === 1 ? 'single-item-locked-mobile' : ''}`}>
        {/* Luxury Top Header Banner */}
        <section className="luxury-cart-top-banner">
          <div className="luxury-cart-top-inner">
            <div className="luxury-banner-main-row">
              <div className="luxury-banner-titles">
                <span className="luxury-cart-eyebrow">YOUR HARVEST BAG</span>
                <h1 className="luxury-cart-heading">
                  <span className="luxury-gold-italic">Your</span> picks
                </h1>
              </div>

              <Link href="/products" className="luxury-cart-close-link" aria-label="Close cart and continue shopping">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Link>
            </div>

            {/* Sub-header status strip (No free shipping concept) */}
            <div className="luxury-cart-status-strip">
              <div className="luxury-status-left">
                <span className="luxury-status-text">
                  {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'} IN BAG · EXPRESS PAN-INDIA DISPATCH
                </span>
              </div>
              <div className="luxury-status-right">
                <span className="luxury-boxed-total">₹ {finalTotal.toLocaleString('en-IN')}.00</span>
              </div>
            </div>
          </div>
        </section>

        <div className="cart-inner luxury-cart-content">
          <div className="cart-layout luxury-cart-layout">
            {/* Left Column — Luxury Cart Item Cards */}
            <div className="cart-items-col luxury-items-col">
              {cart.map((item, idx) => {
                const productDef = getProductById(item.productId);
                return (
                  <div key={item.id} className="luxury-item-card">
                    {/* Item Top Label Bar */}
                    <div className="luxury-card-label-row">
                      <span className="luxury-card-tag">{idx === 0 ? 'JUST ADDED' : 'HARVEST ITEM'}</span>
                      <span className="luxury-card-count">{item.quantity} {item.quantity === 1 ? 'ITEM' : 'ITEMS'}</span>
                    </div>

                    {/* Item Info Main Grid */}
                    <div className="luxury-card-main-grid">
                      <div className="luxury-card-img-wrap">
                        <img src={item.image} alt={item.name} className="luxury-card-img" />
                      </div>

                      <div className="luxury-card-info-col">
                        <div className="luxury-card-title-row">
                          <h3 className="luxury-card-name">{item.name}</h3>
                          <span className="luxury-card-price">
                            ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <span className="luxury-card-sub">
                          {productDef?.grade || 'Palasa Coastal Harvest'}
                        </span>

                        <div className="luxury-card-meta-row">
                          <span className="luxury-card-size">{item.size}</span>
                          <span className="luxury-meta-dot">·</span>
                          <span className="luxury-card-stock">In stock</span>
                        </div>

                        {/* Quantity Stepper & Remove */}
                        <div className="luxury-card-qty-row">
                          <div className="luxury-qty-stepper">
                            <button
                              type="button"
                              className="luxury-qty-btn"
                              onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateCartQty(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >−</button>
                            <span className="luxury-qty-val">{item.quantity}</span>
                            <button
                              type="button"
                              className="luxury-qty-btn"
                              onClick={() => updateCartQty(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >+</button>
                          </div>

                          <button
                            type="button"
                            className="luxury-card-remove-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom Action Buttons */}
                    <div className="luxury-card-actions-row">
                      <button
                        type="button"
                        className="btn-luxury-card-action"
                        onClick={() => setEditingItem(item)}
                      >
                        EDIT SIZE
                      </button>

                      <Link
                        href={`/products/${item.productId}`}
                        className="btn-luxury-card-action"
                      >
                        VIEW DETAILS
                      </Link>
                    </div>
                  </div>
                );
              })}

              {/* "YOU MAY ALSO LIKE" Section: Shown ONLY when exactly 1 item is in the cart */}
              {shouldShowRecommendations && recommendedProducts.length > 0 && (
                <section className="luxury-rec-section">
                  <div className="luxury-rec-heading-wrap">
                    <div className="luxury-rec-title-box">
                      <h2 className="luxury-rec-title">YOU MAY ALSO LIKE</h2>
                      <p className="luxury-rec-sub">ADD ONE MORE WITHOUT LEAVING CHECKOUT FLOW</p>
                    </div>

                    <div className="rec-nav-arrows">
                      <button
                        type="button"
                        className="rec-arrow-btn"
                        onClick={() => scrollRecommendations(-260)}
                        aria-label="Scroll left"
                        title="Previous recommendations"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="rec-arrow-btn"
                        onClick={() => scrollRecommendations(260)}
                        aria-label="Scroll right"
                        title="More recommendations"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div
                    ref={recScrollRef}
                    onScroll={handleRecScroll}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    onWheel={handleWheel}
                    className="luxury-rec-cards-container single-line"
                  >
                    {recommendedProducts.map((prod) => {
                      const selectedOptIdx = selectedCardSizes[prod.id] || 0;
                      const currentOpt = prod.options[selectedOptIdx] || prod.options[0];

                      return (
                        <article key={prod.id} className="luxury-product-card">
                          <div className="luxury-prod-media-box">
                            <span className="luxury-prod-intro-badge">
                              HARVEST · ₹ {currentOpt.price}
                            </span>

                            <Link href={`/products/${prod.id}`} className="luxury-prod-img-link">
                              <img src={prod.image} alt={prod.name} className="luxury-prod-img" />
                            </Link>

                            <button
                              type="button"
                              className="luxury-prod-plus-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddRecommendedWithSize(prod, currentOpt);
                              }}
                              aria-label={`Add ${prod.name} (${currentOpt.size}) to bag`}
                              title={`Add ${currentOpt.size} · ₹${currentOpt.price}`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </button>
                          </div>

                          <div className="luxury-prod-meta">
                            <div className="luxury-prod-name-row">
                              <Link href={`/products/${prod.id}`} className="luxury-prod-name-link">
                                <h3 className="luxury-prod-name">{prod.name}</h3>
                              </Link>
                              <span className="luxury-prod-price">₹ {currentOpt.price}</span>
                            </div>
                            <span className="luxury-prod-sub">
                              {(prod.grade || prod.categoryLabel || 'PALASA CASHEW').toUpperCase()}
                            </span>

                            {/* Direct In-Card Size Selector: "here give me the size" */}
                            <div className="luxury-card-size-row">
                              <span className="luxury-size-label">SIZE</span>
                              <div className="luxury-card-size-pills">
                                {prod.options.map((option, optIdx) => {
                                  const isSelected = selectedOptIdx === optIdx;
                                  return (
                                    <button
                                      key={option.size}
                                      type="button"
                                      className={`luxury-size-pill ${isSelected ? 'active' : ''}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedCardSizes((prev) => ({ ...prev, [prod.id]: optIdx }));
                                      }}
                                      aria-label={`Select ${option.size} for ${prod.name}`}
                                    >
                                      {option.size}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* Progress track line: dynamically increases as user scrolls horizontally */}
                  <div className="luxury-rec-scrollbar-track">
                    <div
                      className="luxury-rec-scrollbar-thumb"
                      style={{ width: `${recScrollPct}%` }}
                    ></div>
                  </div>
                </section>
              )}

              <Link href="/products" className="luxury-continue-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Continue shopping
              </Link>
            </div>

            {/* Right Column — Order Summary Card (Desktop always; on mobile only when 2+ items) */}
            <aside className={`cart-summary-col luxury-summary-col ${shouldShowRecommendations ? 'mobile-hide-summary' : ''}`}>
              <div className="cart-summary-card luxury-summary-card">
                <h2 className="cart-summary-title">Order Summary</h2>

                <div className="cart-summary-rows">
                  <div className="cart-summary-row">
                    <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {savings > 0 && (
                    <div className="cart-summary-row savings">
                      <span>You save</span>
                      <span>−₹{savings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="cart-summary-row">
                    <span>Standard Express Delivery</span>
                    <span>₹{FLAT_DELIVERY_CHARGE}</span>
                  </div>

                  <div className="cart-summary-divider"></div>
                  <div className="cart-summary-row total">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Original Coins Earn Notice */}
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
                  <Link href="/wallet" className="cart-coin-wallet-btn">
                    Wallet ({coins.toLocaleString('en-IN')})
                  </Link>
                </div>

                <Link href="/checkout" className="btn-luxury-checkout-desktop">
                  CHECKOUT · ₹{finalTotal.toLocaleString('en-IN')}
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

        {/* Sticky Mobile Checkout Actions Bar (With Checkout and Continue Shopping) */}
        <div className="luxury-sticky-bottom-bar">
          <Link href="/checkout" className="btn-luxury-sticky-checkout">
            CHECKOUT · ₹{finalTotal.toLocaleString('en-IN')}
          </Link>
          <Link href="/products" className="btn-luxury-sticky-secondary">
            CONTINUE SHOPPING
          </Link>
        </div>

        {/* Size Edit Modal */}
        {editingItem && (
          <div className="luxury-size-modal-overlay" onClick={() => setEditingItem(null)}>
            <div className="luxury-size-modal" onClick={(e) => e.stopPropagation()}>
              <div className="luxury-modal-header">
                <h3 className="luxury-modal-title">Select Pack Size</h3>
                <button
                  type="button"
                  className="luxury-modal-close"
                  onClick={() => setEditingItem(null)}
                >
                  &times;
                </button>
              </div>

              <p className="luxury-modal-item-name">{editingItem.name}</p>

              <div className="luxury-size-options-list">
                {getProductById(editingItem.productId)?.options.map((opt) => (
                  <button
                    key={opt.size}
                    type="button"
                    className={`luxury-size-option-row ${editingItem.size === opt.size ? 'active' : ''}`}
                    onClick={() => handleSwitchSize(editingItem, opt)}
                  >
                    <div className="luxury-size-row-left">
                      <span className="luxury-size-label">{opt.size}</span>
                      {opt.save && <span className="luxury-size-save">{opt.save}</span>}
                    </div>
                    <div className="luxury-size-row-right">
                      <span className="luxury-size-price">₹{opt.price}</span>
                      {opt.mrp && <span className="luxury-size-mrp">₹{opt.mrp}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating Quick Toast */}
        {toastMsg && (
          <div className="cart-quick-toast" role="status" aria-live="polite">
            <span className="toast-icon">✓</span>
            <span>{toastMsg}</span>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
