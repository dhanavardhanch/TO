'use client';

import { useState, useEffect } from 'react';

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

          <a href="/products" className="nav-cta">
            Shop now
          </a>

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
      </div>
    </>
  );
}
