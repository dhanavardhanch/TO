'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';

const LINKS = [
  { href: '/#home', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/gifting', label: 'Gifting' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, coins } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          {/* Mobile Left 3-Lines Hamburger Menu Button */}
          <button
            type="button"
            className={`mobile-nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Brand: TO Emblem + Text (Centered on mobile) */}
          <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
            <div className="brand-mark">TO</div>
            <span className="brand-name">The Original</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions: Wallet + Cart + Shop CTA */}
          <div className="nav-right-actions">
            {/* Desktop Real SVG Wallet Icon Button (Hidden on Mobile) */}
            <Link
              href="/wallet"
              className="nav-icon-btn nav-wallet-btn"
              aria-label="Original Coins Wallet"
              title="Original Coins Wallet"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                <path d="M16 3H4a2 2 0 0 0-2 2v2"></path>
                <circle cx="16" cy="14" r="1.5" fill="currentColor"></circle>
              </svg>
              {coins > 0 && <span className="nav-badge wallet-badge">{coins}</span>}
            </Link>

            {/* Cart Icon (with notification counter badge) */}
            <Link href="/cart" className="nav-icon-btn nav-cart-btn" aria-label="Shopping cart" onClick={() => setMenuOpen(false)}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="nav-badge cart-badge">{cartCount}</span>}
            </Link>

            {/* Desktop Shop CTA button */}
            <a href="/products" className="nav-cta">
              Shop now
            </a>
          </div>
        </nav>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-nav">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              <span>{l.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          ))}
        </div>

        <div className="mobile-menu-divider" />

        <div className="mobile-menu-actions">
          {/* Mobile Wallet Item (Inside Menu Only) */}
          <Link
            href="/wallet"
            className="mobile-menu-wallet-item"
            onClick={() => setMenuOpen(false)}
          >
            <div className="mobile-wallet-left">
              <div className="mobile-wallet-icon-box">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                  <path d="M16 3H4a2 2 0 0 0-2 2v2"></path>
                  <circle cx="16" cy="14" r="1.5" fill="currentColor"></circle>
                </svg>
              </div>
              <div className="mobile-wallet-info">
                <span className="mobile-wallet-name">Original Coins</span>
                <span className="mobile-wallet-balance">{coins.toLocaleString('en-IN')} Coins &bull; ₹{Math.round(coins * 0.1)} Value</span>
              </div>
            </div>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>

          <Link
            href="/products"
            className="mobile-menu-cta-btn"
            onClick={() => setMenuOpen(false)}
          >
            Shop All Cashews
          </Link>
        </div>
      </div>
    </>
  );
}
