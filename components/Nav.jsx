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
  const { cartCount, wishlistCount } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <a href="/" className="brand">
            <div className="brand-mark">TO</div>
            <span className="brand-name">The Original</span>
          </a>

          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side: Wishlist + Cart + Shop CTA */}
          <div className="nav-right-actions">
            {/* Wishlist Icon */}
            <Link href="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlistCount > 0 ? '#C9A455' : 'none'} stroke={wishlistCount > 0 ? '#C9A455' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="nav-icon-btn" aria-label="Shopping cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="nav-badge cart-badge">{cartCount}</span>}
            </Link>

            <a href="/products" className="nav-cta">
              Shop now
            </a>
          </div>

          <button
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
          </button>
        </nav>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <div className="mobile-menu-icons">
          <Link href="/wishlist" className="mobile-menu-icon-link" onClick={() => setMenuOpen(false)}>
            ♡ Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </Link>
          <Link href="/cart" className="mobile-menu-icon-link" onClick={() => setMenuOpen(false)}>
            🛒 Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      </div>
    </>
  );
}
