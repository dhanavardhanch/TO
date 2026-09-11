'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import Nav from './Nav';
import Footer from './Footer';

export default function CheckoutPageClient() {
  const { cart, cartTotal, clearCart } = useShop();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', pincode: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const deliveryCharge = cartTotal >= 599 ? 0 : 60;
  const finalTotal = cartTotal + deliveryCharge;

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
    text += `\n*Total:* Rs.${finalTotal.toLocaleString('en-IN')}\nPlease confirm and share payment details.`;
    window.open(`https://wa.me/919100267404?text=${encodeURIComponent(text)}`, '_blank');
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
            <div className="cart-empty-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h1 className="cart-empty-title">Nothing to checkout</h1>
            <p className="cart-empty-sub">Add some cashews to your cart first.</p>
            <Link href="/products" className="btn-primary cart-shop-btn">Browse Products</Link>
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
                    <span>Delivery</span>
                    <span className={deliveryCharge === 0 ? 'free-delivery' : ''}>{deliveryCharge === 0 ? 'Free' : `Rs.${deliveryCharge}`}</span>
                  </div>
                  <div className="cart-summary-divider"></div>
                  <div className="cart-summary-row total"><span>Total</span><span>Rs.{finalTotal.toLocaleString('en-IN')}</span></div>
                </div>
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
