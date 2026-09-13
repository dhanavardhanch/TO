'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_MASTER } from '../data/productsData';

export default function GlobalCartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateCartQty,
    addToCart,
    isCartDrawerOpen,
    closeCartDrawer,
  } = useShop();

  const drawerScrollRef = useRef(null);
  const [selectedCardSizes, setSelectedCardSizes] = useState({});

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const deliveryCharge = 70;
  const grandTotal = cartTotal + deliveryCharge;

  // Filter out products already in cart for recommendations
  const cartProductIds = new Set(cart.map((c) => c.productId));
  const candidates = PRODUCTS_MASTER.filter((p) => !cartProductIds.has(p.id));
  const recommendedProducts = candidates.length > 0 ? candidates : PRODUCTS_MASTER;

  const handleAddRecommended = (product, opt) => {
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
  };

  return (
    <div className="global-drawer-overlay" onClick={closeCartDrawer} role="dialog" aria-modal="true">
      <aside className="global-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="global-drawer-header">
          <div className="global-drawer-title-group">
            <span className="global-drawer-eyebrow">YOUR HARVEST BAG</span>
            <h2 className="global-drawer-title">
              Cart <span className="global-drawer-count">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
            </h2>
          </div>
          <button
            type="button"
            className="global-drawer-close-btn"
            onClick={closeCartDrawer}
            aria-label="Close cart drawer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Drawer Dispatch Sub-strip */}
        <div className="global-drawer-strip">
          <span>⚡ EXPRESS PAN-INDIA DISPATCH DIRECT FROM PALASA</span>
        </div>

        {/* Drawer Body */}
        {cart.length === 0 ? (
          <div className="global-drawer-empty">
            <div className="global-drawer-empty-icon">🛒</div>
            <h3 className="global-empty-heading">Your Bag is Empty</h3>
            <p className="global-empty-sub">
              Explore our freshly cracked Palasa harvests and artisanal dry fruits.
            </p>
            <Link href="/products" onClick={closeCartDrawer} className="btn-drawer-browse">
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            <div className="global-drawer-items">
              {cart.map((item) => (
                <div key={item.id} className="global-drawer-item">
                  <div className="global-item-thumb-box">
                    <img src={item.image} alt={item.name} className="global-item-thumb" />
                  </div>

                  <div className="global-item-info">
                    <div className="global-item-top-row">
                      <h4 className="global-item-name">{item.name}</h4>
                      <button
                        type="button"
                        className="global-item-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="global-item-meta-row">
                      <span className="global-item-size">{item.size}</span>
                      <span className="global-item-single-price">₹{item.price} each</span>
                    </div>

                    <div className="global-item-bottom-row">
                      <div className="global-drawer-stepper">
                        <button
                          type="button"
                          className="drawer-stepper-btn"
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeFromCart(item.id);
                            } else {
                              updateCartQty(item.id, item.quantity - 1);
                            }
                          }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="drawer-stepper-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="drawer-stepper-btn"
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="global-item-total-price">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations Row (shown ONLY when exactly 1 item is in cart) */}
            {cart.length === 1 && recommendedProducts.length > 0 && (
              <div className="drawer-rec-section">
                <div className="drawer-rec-header">
                  <div className="drawer-rec-title-wrap">
                    <span className="drawer-rec-title">YOU MAY ALSO LIKE</span>
                    <span className="drawer-rec-sub">Swipe to add more</span>
                  </div>
                  <div className="drawer-rec-nav">
                    <button
                      type="button"
                      className="drawer-arrow-btn"
                      onClick={() => drawerScrollRef.current?.scrollBy({ left: -160, behavior: 'smooth' })}
                      aria-label="Previous items"
                      title="Previous items"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="drawer-arrow-btn"
                      onClick={() => drawerScrollRef.current?.scrollBy({ left: 160, behavior: 'smooth' })}
                      aria-label="Next items"
                      title="Next items"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div
                  ref={drawerScrollRef}
                  className="drawer-rec-carousel"
                >
                  {recommendedProducts.map((prod) => {
                    const selectedOptIdx = selectedCardSizes[prod.id] || 0;
                    const currentOpt = prod.options[selectedOptIdx] || prod.options[0];

                    return (
                      <div key={prod.id} className="drawer-rec-card">
                        <div className="drawer-rec-media">
                          <span className="drawer-rec-badge">₹{currentOpt.price}</span>
                          <img src={prod.image} alt={prod.name} className="drawer-rec-img" />
                          <button
                            type="button"
                            className="drawer-rec-plus-btn"
                            onClick={() => handleAddRecommended(prod, currentOpt)}
                            aria-label={`Add ${prod.name} (${currentOpt.size}) to cart`}
                            title={`Add ${currentOpt.size} · ₹${currentOpt.price}`}
                          >
                            +
                          </button>
                        </div>
                        <div className="drawer-rec-info">
                          <span className="drawer-rec-name" title={prod.name}>
                            {prod.name}
                          </span>
                          <div className="drawer-rec-size-row">
                            {prod.options.map((opt, oIdx) => (
                              <button
                                key={opt.size}
                                type="button"
                                className={`drawer-size-pill ${selectedOptIdx === oIdx ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCardSizes((prev) => ({ ...prev, [prod.id]: oIdx }));
                                }}
                              >
                                {opt.size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Drawer Footer / Summary & Actions */}
            <div className="global-drawer-footer">
              <div className="global-drawer-summary-box">
                <div className="drawer-summary-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="drawer-summary-row">
                  <span>Standard Express Delivery</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div className="drawer-summary-divider"></div>
                <div className="drawer-summary-row total">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="global-drawer-actions">
                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="btn-global-drawer-checkout"
                >
                  PROCEED TO CHECKOUT · ₹{grandTotal.toLocaleString('en-IN')}
                </Link>

                <div className="global-drawer-dual-links">
                  <Link
                    href="/cart"
                    onClick={closeCartDrawer}
                    className="btn-global-drawer-cart"
                  >
                    View Full Bag ({cartCount})
                  </Link>

                  <button
                    type="button"
                    onClick={closeCartDrawer}
                    className="btn-global-drawer-keep-shopping"
                  >
                    Keep Shopping
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
