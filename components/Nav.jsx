'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

const LEFT_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/gifting', label: 'Gifting' },
  { href: '/about', label: 'About' },
];

const RIGHT_LINKS = [
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, openCartDrawer } = useShop();
  const { isLoggedIn, user, coins, openLoginModal, logout } = useAuth();
  const pathname = usePathname();

  // Only home page gets the full-transparent treatment
  const isHomePage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Home page: transparent until scroll/hover/menu
  // Other pages: always active (frosted, dark text)
  const isActive = !isHomePage || scrolled || hovered || menuOpen;

  return (
    <>
      <header
        className={`nav-header ${isActive ? 'nav-active' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="nav-inner">
          {/* ── LEFT: Desktop nav links ── */}
          <nav className="nav-left-links" aria-label="Primary navigation">
            {LEFT_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          {/* ── MOBILE: Hamburger toggle ── */}
          <button
            type="button"
            className={`mobile-nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          {/* ── CENTER: Stacked Logo ── */}
          <Link href="/" className="nav-brand-center" onClick={() => setMenuOpen(false)}>
            <div className="nav-brand-mark">TO</div>
            <span className="nav-brand-text">The Original</span>
          </Link>

          {/* ── RIGHT: actions ── */}
          <div className="nav-right-actions">
            {/* Desktop: extra right links */}
            {RIGHT_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link nav-link-right">
                {l.label}
              </a>
            ))}

            {/* Profile / Sign In Icon */}
            {isLoggedIn ? (
              <Link
                href="/profile"
                className="nav-icon-btn nav-profile-btn"
                aria-label="Profile"
                title={user?.name || 'My Profile'}
                onClick={() => setMenuOpen(false)}
              >
                {/* Filled person icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
                {coins > 0 && (
                  <span className="nav-badge nav-coins-badge">{coins}</span>
                )}
              </Link>
            ) : (
              <button
                type="button"
                className="nav-icon-btn nav-profile-btn"
                aria-label="Sign In"
                title="Sign In"
                onClick={() => { setMenuOpen(false); openLoginModal(); }}
              >
                {/* Outlined person icon (not logged in) */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            )}

            {/* Cart Icon — bold shopping bag */}
            <button
              type="button"
              className="nav-icon-btn nav-cart-btn"
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              onClick={() => {
                setMenuOpen(false);
                openCartDrawer();
              }}
            >
              {/* Bold shopping bag icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="nav-badge cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-down menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-nav">
          {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              <span>{l.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          ))}
        </div>

        <div className="mobile-menu-divider" />

        <div className="mobile-menu-actions">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="mobile-menu-wallet-item"
                onClick={() => setMenuOpen(false)}
              >
                <div className="mobile-wallet-left">
                  <div className="mobile-wallet-icon-box">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <div className="mobile-wallet-info">
                    <span className="mobile-wallet-name">{user?.name || 'My Profile'}</span>
                    <span className="mobile-wallet-balance">
                      {coins} Original Coins · ₹{Math.round(coins * 0.1)} Value
                    </span>
                  </div>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
              <button
                type="button"
                className="mobile-menu-signout-btn"
                onClick={() => { setMenuOpen(false); logout(); }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="mobile-menu-cta-btn"
              onClick={() => { setMenuOpen(false); openLoginModal(); }}
            >
              Sign In / Sign Up
            </button>
          )}

          <Link
            href="/products"
            className="mobile-menu-shop-btn"
            onClick={() => setMenuOpen(false)}
          >
            Shop All Cashews
          </Link>
        </div>
      </div>
    </>
  );
}
