export default function Footer() {
  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Grades', href: '/#grades' },
    { label: 'Gifting', href: '/gifting' },
    { label: 'Contact', href: '/contact' },
  ];

  const productLinks = [
    { label: 'W180 Jumbo King', href: '/products' },
    { label: 'W220 Selected Jumbo', href: '/products' },
    { label: 'W320 Classic Benchmark', href: '/products' },
    { label: 'Palasa Skin Cashews', href: '/products' },
    { label: 'JH Split Cashews', href: '/products' },
    { label: 'Curated Combos', href: '/products' },
  ];

  const socials = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'WhatsApp', href: 'https://wa.me/919100267404' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'X (Twitter)', href: 'https://x.com' },
  ];

  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        {/* Top Grid */}
        <div className="footer-grid">
          {/* Brand & Origin column */}
          <div className="footer-col footer-col-brand">
            <div className="brand footer-brand">
              <div className="brand-mark">TO</div>
              <span className="brand-name">The Original</span>
            </div>
            <p className="footer-tagline">
              Hand picked from heirloom orchards in Palasa, Andhra Pradesh.
              Clean whole kernels roasted in small batches and vacuum sealed at origin.
            </p>
            <div className="footer-origin-stamp">
              13/1/76, THE ORIGINAL · Little Angels School Straight, Tilak Nagar, Kasibugga, Palasa 532222
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-nav-list">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Harvest & Calibers */}
          <div className="footer-col">
            <h4 className="footer-heading">Harvest grades</h4>
            <ul className="footer-nav-list">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Socials */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Direct contact</h4>
            <div className="footer-contact-details">
              <a href="tel:+919100267404" className="footer-contact-item">
                <span className="footer-contact-label">Mobile</span>
                <span className="footer-contact-value">+91 9100267404</span>
              </a>

              <a href="mailto:theoriginalcashews@gmail.com" className="footer-contact-item">
                <span className="footer-contact-label">Email</span>
                <span className="footer-contact-value">theoriginalcashews@gmail.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=Tilak+Nagar,+Kasibugga,+Palasa+532222"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <span className="footer-contact-label">Visit</span>
                <span className="footer-contact-value">Kasibugga, Palasa 532222</span>
              </a>
            </div>

            <div className="footer-socials">
              <h5 className="footer-subheading">Follow our harvests</h5>
              <div className="footer-social-links">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-pill"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Big Background Display Brand Watermark */}
        <div className="footer-watermark-wrap" aria-hidden="true">
          <span className="footer-watermark">THE ORIGINAL</span>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} The Original Cashew Co. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#home">Back to top</a>
            <span>·</span>
            <span>Palasa, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
