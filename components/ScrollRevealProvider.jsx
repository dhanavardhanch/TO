'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.section-reveal, .scroll-reveal').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const selectors = [
      '.section-reveal',
      '.scroll-reveal',
      '.about-drone-inner',
      '.about-founder-inner',
      '.about-philosophy-inner',
      '.gifting-showcase-inner',
      '.gifting-editions-inner',
      '.gifting-process-inner',
      '.gifting-form-inner',
      '.contact-quick-inner',
      '.contact-grid-section',
      '.footer-inner',
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    elements.forEach((el, index) => {
      // Assign alternating animation classes: even sections from left, odd from right
      if (!el.classList.contains('anim-slide-left') && !el.classList.contains('anim-slide-right')) {
        el.classList.add(index % 2 === 0 ? 'anim-slide-left' : 'anim-slide-right');
      }

      const rect = el.getBoundingClientRect();
      // If already in top viewport on load, reveal smoothly
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('is-revealed');
      } else {
        el.classList.remove('is-revealed');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
