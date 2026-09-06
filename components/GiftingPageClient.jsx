'use client';

import { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default function GiftingPageClient() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    quantity: '50-100',
    occasion: 'corporate',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const giftingEditions = [
    {
      id: 'royal-sovereign',
      name: 'The Royal Sovereign Box',
      tag: 'Grand CXO & VIP Dignitary Gifting',
      desc: 'Our rarest Jumbo King W180 paired alongside rustic Palasa Raw Skin Cashews. Presented in a rigid magnetic-closure navy box with embossed gold foil lettering.',
      contents: ['The Original W180 Jumbo King (250g)', 'Palasa Raw Skin Cashews (250g)', 'Custom Greeting Stationery Card'],
      badge: 'Flagship Edition',
    },
    {
      id: 'executive-reserve',
      name: 'The Executive Reserve Caddy',
      tag: 'Corporate Appreciation & Milestones',
      desc: 'Selected Jumbo W220 cashews paired with our 5-in-1 Royal Mix Dry Fruits (Almonds, Cashews, Pistachios, Raisins, Walnuts). Minimalist matte sleeve with bespoke corporate logo branding.',
      contents: ['The Original W220 Selected Jumbo (250g)', 'Royal Mix Dry Fruits (250g)', 'Custom Company Logo Sleeve'],
      badge: 'Bestseller Corporate',
    },
    {
      id: 'shubh-vivaha',
      name: 'The Shubh Vivaha Wedding Suite',
      tag: 'Wedding Trousseau & Return Favors',
      desc: 'Crafted for auspicious beginnings. Benchmark W320 whole cashews paired with velvety dark chocolate-coated nuts and sweet-making split kernels in an elegant keepsake box.',
      contents: ['The Original W320 Classic Benchmark (250g)', 'Chocolate Cashew & Badam (200g)', 'JH Clean Split Halves (250g)'],
      badge: 'Wedding Signature',
    },
    {
      id: 'festive-celebrations',
      name: 'The Festive Celebrations Trunk',
      tag: 'Diwali, Sankranti & New Year',
      desc: 'An opulent multi-tier treasure containing four signature calibers and confectionery varieties. Designed to create a showstopping centerpiece in any family celebration.',
      contents: ['Grade W180 King (250g)', 'Skin Cashews (250g)', 'Artisanal Chocolates (200g)', 'Royal Mix Dry Fruit (250g)'],
      badge: 'Grand Feast Trunk',
    },
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Consultation & Samples',
      desc: 'Discuss your budget, timeline, and audience. We courier curated sample boxes directly to your desk within 48 hours.',
    },
    {
      num: '02',
      title: 'Curate Calibers & Flavors',
      desc: 'Choose from Jumbo W180, unpeeled skin cashews, artisanal dark chocolates, or superfood mixed dry fruit combinations.',
    },
    {
      num: '03',
      title: 'Bespoke Sleeves & Cards',
      desc: 'Incorporate your corporate identity, wedding crest, or family monogram with gold hot-foil stamping and personalized notes.',
    },
    {
      num: '04',
      title: 'Pan-India Delivery',
      desc: 'We handle temperature-controlled multi-address dispatch across India, ensuring each hamper arrives fresh and intact.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const occasionLabels = {
      corporate: 'Corporate Milestone / Client Gifting',
      wedding: 'Wedding Invitation / Return Favors',
      festive: 'Diwali / Sankranti / New Year',
      personal: 'Personal Celebrations / Anniversary',
    };

    let text = `*New Gifting Inquiry - The Original Cashews*\n\n`;
    text += `*Contact Person:* ${form.name}\n`;
    if (form.company) text += `*Company / Event:* ${form.company}\n`;
    text += `*Phone / WhatsApp:* ${form.phone}\n`;
    if (form.email) text += `*Email:* ${form.email}\n`;
    text += `*Occasion:* ${occasionLabels[form.occasion] || form.occasion}\n`;
    text += `*Quantity Needed:* ${form.quantity} boxes\n`;
    if (form.message) text += `*Requirements:*\n${form.message}\n`;

    const url = `https://wa.me/919100267404?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="gifting-page">
      <Nav />

      {/* Hero Header */}
      <section className="gifting-hero">
        <div className="gifting-hero-inner">
          <span className="section-tag">Bespoke allocations · Heritage boxes</span>
          <h1 className="gifting-hero-title">
            Thoughtful Gifting, Rooted in Palasa Tradition.
          </h1>
          <p className="gifting-hero-lead">
            From landmark corporate partnerships to intimate wedding blessings, The Original creates bespoke gifting editions showcasing India&apos;s finest origin cashews and luxury confectionery.
          </p>
          <div className="gifting-hero-actions">
            <a href="#inquiry-form" className="btn-primary">
              Request Gifting Proposal
            </a>
            <a
              href="https://wa.me/919100267404?text=Hi%20The%20Original,%20I%20would%20like%20to%20request%20your%20corporate%20and%20wedding%20gifting%20catalog."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quick-wa"
            >
              WhatsApp Gifting Desk
            </a>
          </div>
        </div>
      </section>

      {/* Video Presentation Section */}
      <section className="gifting-showcase-section">
        <div className="gifting-showcase-inner">
          <div className="gifting-showcase-grid">
            <div className="gifting-video-wrapper">
              <video
                src="/assets/gifting.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="gifting-presentation-video"
              />
              <div className="gifting-video-badge">
                <span className="badge-pulse-dot"></span>
                <span>Signature Gifting Presentation</span>
              </div>
            </div>

            <div className="gifting-showcase-narrative">
              <span className="section-tag">Unboxing Excellence</span>
              <h2 className="section-title">A gift that commands genuine pride.</h2>
              <p className="showcase-lead">
                Most commercial nut hampers feature generic dry fruit mixes sitting in cardboard dividers. The Original elevates gifting with uncompromised quality that your recipients will remember.
              </p>

              <div className="showcase-pillars">
                <div className="showcase-pillar-item">
                  <div className="pillar-bullet"></div>
                  <div>
                    <h4 className="pillar-title">Factory-Fresh Sourcing</h4>
                    <p className="pillar-desc">
                      Every hamper is filled with stock roasted just days before dispatch — never aged warehouse inventory.
                    </p>
                  </div>
                </div>

                <div className="showcase-pillar-item">
                  <div className="pillar-bullet"></div>
                  <div>
                    <h4 className="pillar-title">Bespoke Monogram &amp; Logo Sleeves</h4>
                    <p className="pillar-desc">
                      Customize box sleeves with gold foil debossing of your corporate insignia or wedding couple monogram.
                    </p>
                  </div>
                </div>

                <div className="showcase-pillar-item">
                  <div className="pillar-bullet"></div>
                  <div>
                    <h4 className="pillar-title">Pan-India Doorstep Dispatch</h4>
                    <p className="pillar-desc">
                      Provide an Excel sheet of addresses, and we will safely ship individual gift boxes directly to clients and guests nationwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Signature Gifting Editions */}
      <section className="gifting-editions-section">
        <div className="gifting-editions-inner">
          <div className="editions-header">
            <span className="section-tag">Curated Collections</span>
            <h2 className="section-title">Signature Gifting Hampers</h2>
            <p className="editions-sub">
              Available in quantities starting from 10 units. Each hamper can be customized to your exact caliber preferences.
            </p>
          </div>

          <div className="editions-grid">
            {giftingEditions.map((edition) => (
              <article key={edition.id} className="edition-card">
                <span className="edition-badge">{edition.badge}</span>
                <span className="edition-tag">{edition.tag}</span>
                <h3 className="edition-title">{edition.name}</h3>
                <p className="edition-desc">{edition.desc}</p>

                <div className="edition-contents">
                  <span className="contents-label">Includes:</span>
                  <ul className="contents-list">
                    {edition.contents.map((c) => (
                      <li key={c}>
                        <span className="contents-check">&#10003;</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="edition-action">
                  <a
                    href={`https://wa.me/919100267404?text=${encodeURIComponent(
                      `Hi The Original, I would like to inquire about pricing and customization for ${edition.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-add-to-cart"
                  >
                    Inquire for this hamper
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps Custom Process */}
      <section className="gifting-process-section">
        <div className="gifting-process-inner">
          <span className="section-tag">How it works</span>
          <h2 className="section-title">Seamless gifting from start to delivery.</h2>

          <div className="gifting-steps-grid">
            {processSteps.map((s) => (
              <div key={s.num} className="process-step-card">
                <span className="step-num">{s.num}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gifting Inquiry Form Section */}
      <section className="gifting-form-section" id="inquiry-form">
        <div className="gifting-form-inner">
          <div className="gifting-form-card">
            <div className="form-card-header">
              <span className="section-tag">Direct Corporate &amp; Wedding Desk</span>
              <h2 className="contact-form-title">
                Request a Custom Gifting Quotation
              </h2>
              <p className="contact-form-subtitle">
                Share your requirements below. Founder <strong>CH Dhana Vardhan</strong> and our gifting specialists will respond within hours with custom mockup options and bulk pricing.
              </p>
            </div>

            {submitted ? (
              <div className="contact-success-state">
                <div className="success-icon">✓</div>
                <h3 className="success-title">Inquiry Forwarded!</h3>
                <p className="success-text">
                  Thank you! Your custom gifting inquiry has been prepared for WhatsApp direct dispatch.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: '',
                      company: '',
                      phone: '',
                      email: '',
                      quantity: '50-100',
                      occasion: 'corporate',
                      message: '',
                    });
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row-2">
                  <div className="contact-field">
                    <label>Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Vikram Reddy"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label>Organization / Event Name</label>
                    <input
                      type="text"
                      placeholder="Company name, bride & groom, etc."
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="contact-field">
                    <label>Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9100267404"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. vikram@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="contact-field">
                    <label>Occasion *</label>
                    <select
                      value={form.occasion}
                      onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    >
                      <option value="corporate">Corporate Milestones &amp; Clients</option>
                      <option value="wedding">Wedding Invitations &amp; Favors</option>
                      <option value="festive">Diwali, Sankranti &amp; Festive</option>
                      <option value="personal">Personal Celebrations</option>
                    </select>
                  </div>

                  <div className="contact-field">
                    <label>Approximate Quantity *</label>
                    <select
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    >
                      <option value="10-25">10 – 25 boxes</option>
                      <option value="25-50">25 – 50 boxes</option>
                      <option value="50-100">50 – 100 boxes</option>
                      <option value="100-250">100 – 250 boxes</option>
                      <option value="250+">250+ boxes</option>
                    </select>
                  </div>
                </div>

                <div className="contact-field">
                  <label>Specific Preferences &amp; Timeline</label>
                  <textarea
                    rows={4}
                    placeholder="Preferred cashew grades (W180, W220, Skin Cashews, Chocolates), delivery date, budget per box, etc..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="contact-submit-row">
                  <button type="submit" className="btn-primary contact-submit-btn">
                    Submit Gifting Request via WhatsApp
                  </button>
                  <span className="contact-hint">
                    Direct communication with founder CH Dhana Vardhan (+91 9100267404)
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
