'use client';

import { useState } from 'react';

export default function FaqSection({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our authentic Palasa harvest, grading, and direct-from-origin dispatch.',
  badge = 'GOT QUESTIONS?',
  faqs = [],
  id = 'faq',
  showContactCta = true,
}) {
  // Allow toggling accordions, defaulting to opening the first FAQ item
  const [openId, setOpenId] = useState(faqs[0]?.id || null);

  const toggleFaq = (faqId) => {
    setOpenId((prev) => (prev === faqId ? null : faqId));
  };

  if (!faqs || faqs.length === 0) return null;

  // Split into 2 balanced columns for two-column desktop display
  const half = Math.ceil(faqs.length / 2);
  const leftCol = faqs.slice(0, half);
  const rightCol = faqs.slice(half);

  return (
    <section className="faq-section" id={id} aria-label="Frequently Asked Questions">
      <div className="faq-container">
        {/* Section Header */}
        <div className="faq-header">
          {badge && <span className="faq-badge">{badge}</span>}
          <h2 className="faq-title">{title}</h2>
          {subtitle && <p className="faq-subtitle">{subtitle}</p>}
        </div>

        {/* Two-Column Accordion Grid */}
        <div className="faq-two-col-grid" role="tablist">
          {/* Left Column */}
          <div className="faq-column">
            {leftCol.map((faq, index) => {
              const globalIndex = index;
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id || index}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-btn-${faq.id}`}
                  >
                    <div className="faq-question-content">
                      <span className="faq-num">
                        {globalIndex + 1 < 10 ? `0${globalIndex + 1}` : globalIndex + 1}
                      </span>
                      <span className="faq-question-text">{faq.question}</span>
                    </div>
                    <span className="faq-icon-wrap" aria-hidden="true">
                      <svg
                        className={`faq-chevron-icon ${isOpen ? 'rotate' : ''}`}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="faq-column">
            {rightCol.map((faq, index) => {
              const globalIndex = half + index;
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id || index}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-btn-${faq.id}`}
                  >
                    <div className="faq-question-content">
                      <span className="faq-num">
                        {globalIndex + 1 < 10 ? `0${globalIndex + 1}` : globalIndex + 1}
                      </span>
                      <span className="faq-question-text">{faq.question}</span>
                    </div>
                    <span className="faq-icon-wrap" aria-hidden="true">
                      <svg
                        className={`faq-chevron-icon ${isOpen ? 'rotate' : ''}`}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Still Have Questions CTA */}
        {showContactCta && (
          <div className="faq-footer-cta">
            <div className="faq-cta-box">
              <div className="faq-cta-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="faq-cta-texts">
                <h4 className="faq-cta-title">Have a specific question about your order or cashew caliber?</h4>
                <p className="faq-cta-desc">Our Palasa harvest team is available on WhatsApp to assist with bespoke orders, inquiries &amp; tracking.</p>
              </div>
              <a
                href="https://wa.me/919100267404?text=Hi%2C%20I%20have%20a%20question%20about%20The%20Original%20Palasa%20Cashews"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-faq-whatsapp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
