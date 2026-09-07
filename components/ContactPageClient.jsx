'use client';

import { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'retail',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Format text for WhatsApp direct communication
    const inquiryLabels = {
      retail: 'Personal / Household Order',
      gifting: 'Corporate / Wedding Gifting',
      bulk: 'Bulk Cashew Allocation / Wholesale',
      general: 'General Inquiry / Feedback',
    };

    let text = `*New Inquiry | The Original Cashews*\n\n`;
    text += `*Name:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    if (formData.email) text += `*Email:* ${formData.email}\n`;
    text += `*Inquiry Type:* ${inquiryLabels[formData.inquiryType] || formData.inquiryType}\n`;
    text += `*Message:*\n${formData.message}\n`;

    const url = `https://wa.me/919100267404?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="contact-page">
      <Nav />

      {/* Hero Header */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <span className="section-tag">Direct from origin · Palasa, Andhra Pradesh</span>
          <h1 className="contact-hero-title">
            Connect with The Original.
          </h1>
          <p className="contact-hero-lead">
            Whether you are ordering personal harvest packs, planning bespoke festive gifting, or inquiring about wholesale allocations, founder <strong>CH Dhana Vardhan</strong> and our dispatch desk are here to assist you.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="contact-quick-section">
        <div className="contact-quick-inner">
          <div className="contact-quick-grid">
            {/* Phone & WhatsApp Card */}
            <div className="contact-quick-card">
              <div className="quick-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="quick-card-title">Phone &amp; WhatsApp</h3>
              <p className="quick-card-desc">Instant voice call or quick chat with our dispatch desk.</p>
              <div className="quick-card-value">+91 9100267404</div>
              <div className="quick-card-actions">
                <a href="tel:+919100267404" className="btn-quick-outline">Call Now</a>
                <a
                  href="https://wa.me/919100267404?text=Hi%20The%20Original,%20I%20have%20an%20inquiry%20regarding%20your%20Palasa%20cashews."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-quick-wa"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="contact-quick-card">
              <div className="quick-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="quick-card-title">Official Email</h3>
              <p className="quick-card-desc">For formal gifting catalogs, commercial quotes, or queries.</p>
              <div className="quick-card-value">theoriginalcashews@gmail.com</div>
              <div className="quick-card-actions">
                <a href="mailto:theoriginalcashews@gmail.com" className="btn-quick-outline">
                  Write Email
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="contact-quick-card">
              <div className="quick-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="quick-card-title">Origin &amp; Packing Unit</h3>
              <p className="quick-card-desc">Sourced, inspected, and packaged in the cashew capital.</p>
              <address className="quick-card-address">
                <strong>13/1/76, THE ORIGINAL</strong><br />
                Little Angels School Straight, Tilak Nagar,<br />
                Kasibugga, Palasa, Andhra Pradesh 532222
              </address>
              <div className="quick-card-actions">
                <a
                  href="https://maps.google.com/?q=Tilak+Nagar,+Kasibugga,+Palasa+532222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-quick-outline"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section: Form + Embedded Google Map */}
      <section className="contact-main-section">
        <div className="contact-main-inner">
          <div className="contact-main-grid">
            {/* Contact Form */}
            <div className="contact-form-card">
              <span className="section-tag">Direct Inquiry Form</span>
              <h2 className="contact-form-title">
                Send us a message.
              </h2>
              <p className="contact-form-subtitle">
                Fill out your details below. We respond within hours with freshly roasted batch availability and shipping schedules.
              </p>

              {submitted ? (
                <div className="contact-success-state">
                  <div className="success-icon">✓</div>
                  <h3 className="success-title">Message Forwarded!</h3>
                  <p className="success-text">
                    Thank you for reaching out to The Original. Your inquiry has been prepared for WhatsApp transmission.
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: 'retail',
                        message: '',
                      });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row-2">
                    <div className="contact-field">
                      <label htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Ramesh Varma"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-phone">Phone / WhatsApp *</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="e.g. 9100267404"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="contact-field">
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. ramesh@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-type">Inquiry Type *</label>
                      <select
                        id="contact-type"
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiryType: e.target.value })
                        }
                      >
                        <option value="retail">Personal / Household Order</option>
                        <option value="gifting">Corporate / Wedding Gifting</option>
                        <option value="bulk">Bulk Allocation / Relabeller Inquiry</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-message">Your Message or Order Requirement *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us about the grades you need (W180, W220, W320, Skin Cashews, JH splits, or custom gifting quantities)..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>

                  <div className="contact-submit-row">
                    <button type="submit" className="btn-primary contact-submit-btn">
                      Send Message &amp; Connect via WhatsApp
                    </button>
                    <span className="contact-hint">
                      Direct line to founder CH Dhana Vardhan
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Google Maps Embed & Location Details */}
            <div className="contact-map-column">
              <div className="contact-map-card">
                <div className="contact-map-header">
                  <div className="map-badge-live">
                    <span className="map-live-dot"></span>
                    <span>Palasa-Kasibugga Location</span>
                  </div>
                  <h3 className="contact-map-title">Where our cashews are curated</h3>
                </div>

                <div className="contact-iframe-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.839412865213!2d84.41751592496921!3d18.76426228237716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d07c90b115023%3A0xf9effed6eca5cf00!2sTilak%20Nagar%2C%20Shivaji%20Nagar%2C%20Kasibugga%2C%20Palasa%2C%20Andhra%20Pradesh%20532222!5e1!3m2!1sen!2sin!4v1788723593777!5m2!1sen!2sin"
                    width="100%"
                    height="380"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="The Original Cashews Location in Palasa"
                  />
                </div>

                <div className="contact-map-footer">
                  <div className="map-detail-item">
                    <span className="map-detail-label">Township</span>
                    <span className="map-detail-val">Kasibugga, Palasa (Cashew Capital)</span>
                  </div>
                  <div className="map-detail-item">
                    <span className="map-detail-label">District &amp; State</span>
                    <span className="map-detail-val">Srikakulam, Andhra Pradesh 532222</span>
                  </div>
                  <div className="map-detail-item">
                    <span className="map-detail-label">Dispatch Radius</span>
                    <span className="map-detail-val">All India Air &amp; Surface Courier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
