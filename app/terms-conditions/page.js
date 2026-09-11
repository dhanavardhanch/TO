import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Terms & Conditions | The Original | User Agreement & Purchase Terms',
  description:
    'Official Terms and Conditions for The Original Cashews. Covers order acceptance, pricing, secure payment processing via Razorpay/Cashfree, shipping and refund references, intellectual property, user conduct, and FSSAI compliance.',
};

export default function TermsConditionsPage() {
  const commercialPillars = [
    {
      num: '01',
      title: 'Premium Dry Fruit Catalog & Batch Variances',
      desc: 'The Original retails premium agricultural food products, including whole and split cashew calibers (W180, W220, W320, JH), roasted skin cashews (Pottu Pappu), artisanal chocolate-coated nuts, and royal dry fruit mixes. All photographs, mockups, and descriptions are representative of our rigorous quality grades. Natural variances in kernel dimensions, color shades, or seasonal crunch may occur across harvest lots due to native soil terroir and climate characteristics.',
    },
    {
      num: '02',
      title: 'Pricing & All-Inclusive Taxes',
      desc: 'All prices published across our catalog are denominated in Indian Rupees (INR / ₹) and are inclusive of applicable Goods and Services Tax (GST) unless explicitly noted otherwise. Product rates, promotions, and bundle combinations are subject to modification without prior notice; however, the confirmed price displayed at the exact time of order placement applies to your transaction.',
    },
    {
      num: '03',
      title: 'Order Acceptance & Contract Formation',
      desc: 'Browsing products or submitting an order constitutes an offer to purchase. An order is deemed formally accepted and confirmed only upon successful authorization of payment through our certified gateway partner and issuance of an official order confirmation receipt. We reserve the right to refuse or cancel orders due to unforeseen harvest shortages, typographical pricing errors, or suspected fraudulent activity, in which case a 100% full refund is immediately initiated.',
    },
    {
      num: '04',
      title: 'Secure Payment Gateway Authorization',
      desc: 'All online monetary transactions on our storefront are processed through accredited, PCI-DSS compliant third-party payment gateway providers (including Razorpay and Cashfree). By providing payment information, you authorize our gateway partners to process the full transaction amount via your selected method (UPI, Debit/Credit Card, Net Banking, or Digital Wallet). The Original never stores, logs, or accesses your sensitive payment credentials.',
    },
  ];

  const policyReferences = [
    {
      num: '01',
      title: 'Shipping Schedules & Doorstep Delivery',
      desc: 'Orders are freshly roasted, vacuum-sealed, and dispatched from Palasa within 1 to 2 business days of payment confirmation. Deliveries are routed via reputed national logistics partners (Delhivery, Blue Dart, DTDC, India Post Speed Post). Free shipping applies on prepaid orders of ₹999 and above, with a flat ₹70 fee on orders below ₹999. Estimated transit timelines are 3–5 business days for Metro hubs, 5–8 days for Rest of India, and 7–10 days for remote regions.',
      linkHref: '/shipping-policy',
      linkLabel: 'Read Full Shipping Policy →',
    },
    {
      num: '02',
      title: 'Returns, Damage Claims & Refund Policy',
      desc: 'Because cashew nuts and confectionery are perishable food items, returns are restricted under strict food safety and hygiene regulations. In the event of transit damage, packaging tampering, or broken seals, customers are instructed to refuse delivery or record a single continuous unboxing video and notify our dispatch desk within 24 to 48 hours for immediate replacement or resolution.',
      linkHref: '/refund-policy',
      linkLabel: 'Read Refund & Cancellation Policy →',
    },
  ];

  const legalSafeguards = [
    {
      num: '01',
      title: 'Intellectual Property & Brand Rights',
      desc: 'All trademarks, brand marks ("TO", "The Original"), packaging artwork, typography, product descriptions, aerial drone footage, photography, and website source code are the sole proprietary property of The Original and founder CH Dhana Vardhan. Reproduction, copying, redistributing, or commercial exploitation of any brand assets without express written consent is strictly prohibited under Indian copyright and trademark law.',
    },
    {
      num: '02',
      title: 'User Conduct & Prohibited Activities',
      desc: 'Users agree not to misuse this website, including but not limited to: initiating fraudulent orders, submitting false chargebacks, automated web scraping or crawling, injecting malicious code or DDoS traffic, interfering with payment gateway communications, or impersonating any individual or entity.',
    },
    {
      num: '03',
      title: 'Limitation of Reasonable Liability',
      desc: 'To the maximum extent permitted by applicable Indian law, The Original, its management, and operating staff shall not be liable for any indirect, punitive, or consequential damages resulting from website downtime, carrier transit delays, or improper food storage after receipt. In all circumstances, our maximum aggregate liability for any claim arising out of a purchased product shall be strictly capped at the total amount actually paid by you for that specific order.',
    },
    {
      num: '04',
      title: 'Governing Law & Exclusive Jurisdiction',
      desc: 'These Terms & Conditions and all purchase agreements entered into through this website shall be governed by, construed, and enforced in accordance with the laws of the Republic of India. In the event of any dispute, claim, or controversy arising out of these terms, the courts having competent jurisdiction in Srikakulam District / Palasa, Andhra Pradesh shall have exclusive jurisdiction.',
    },
  ];

  return (
    <main className="shipping-page">
      <Nav />

      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="section-tag">Terms of Service · Consumer Agreement</span>
          <h1 className="about-hero-title">Terms &amp; Conditions</h1>
          <p className="about-hero-lead">
            Welcome to <strong>The Original</strong>. These Terms &amp; Conditions establish the commercial framework and binding agreement governing your access to our website, purchase of Palasa cashew harvests, payment handling, and customer rights.
          </p>
        </div>
      </section>

      {/* Agreement & Business Identity */}
      <section className="shipping-zones-section">
        <div className="shipping-zones-inner">
          <span className="section-tag">Agreement to terms</span>
          <h2 className="section-title">Acceptance of terms &amp; commercial entity.</h2>
          <div className="about-philosophy-lead" style={{ maxWidth: '880px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>
              By accessing, browsing, or purchasing products on this website (theoriginal.in and associated order channels), you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions in full, along with our <a href="/privacy-policy" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="/shipping-policy" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Shipping Policy</a>. If you do not agree to these terms, please discontinue your use of the website.
            </p>
            <p>
              The business operates under the brand name <strong>&quot;The Original&quot;</strong>, founded by <strong>CH Dhana Vardhan</strong>, with dispatch and operations headquartered at <strong>13/1/76, Little Angels School Straight, Tilak Nagar, Kasibugga, Palasa, Srikakulam District, Andhra Pradesh 532222</strong>. Registered Food Business Operator under <strong>FSSAI State License No. 10126001000104</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Products, Pricing, Orders & Payment (4-Pillars Grid) */}
      <section className="about-pillars-section">
        <div className="about-pillars-inner">
          <span className="section-tag">Commercial terms</span>
          <h2 className="section-title">Products, orders, pricing &amp; payment.</h2>

          <div className="about-pillars-grid">
            {commercialPillars.map((item) => (
              <div key={item.num} className="about-pillar-card">
                <span className="pillar-num">{item.num}</span>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping & Refund Cross-References */}
      <section className="about-philosophy-section">
        <div className="about-philosophy-inner">
          <div className="about-philosophy-header">
            <span className="section-tag">Fulfillment &amp; buyer guarantees</span>
            <h2 className="section-title">
              Shipping schedules &amp; cancellation policies.
            </h2>
            <p className="about-philosophy-lead">
              Our fulfillment and consumer guarantees are articulated across dedicated policy documents for complete operational clarity.
            </p>
          </div>

          <div className="about-curator-explanation" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {policyReferences.map((ref) => (
              <div key={ref.num} className="curator-card">
                <div className="curator-card-icon">{ref.num}</div>
                <h3 className="curator-card-title">{ref.title}</h3>
                <p className="curator-card-text" style={{ marginBottom: '18px' }}>
                  {ref.desc}
                </p>
                <a
                  href={ref.linkHref}
                  style={{
                    color: 'var(--gold-soft)',
                    fontWeight: 600,
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {ref.linkLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IP, Conduct, Liability & Jurisdiction */}
      <section className="shipping-zones-section">
        <div className="shipping-zones-inner">
          <span className="section-tag">Legal provisions</span>
          <h2 className="section-title">Intellectual property, conduct &amp; liability.</h2>
          <p className="about-philosophy-lead" style={{ maxWidth: '880px', marginBottom: '32px' }}>
            Fair use conditions, brand protection, and legal boundaries governing all transactions.
          </p>

          <div className="about-pillars-grid">
            {legalSafeguards.map((item) => (
              <div key={item.num} className="about-pillar-card">
                <span className="pillar-num">{item.num}</span>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="about-philosophy-section" style={{ padding: '60px 32px' }}>
        <div className="about-philosophy-inner">
          <div className="about-comparison-wrap" style={{ padding: '36px 32px' }}>
            <span className="section-tag">Agreement revisions</span>
            <h3 className="comparison-headline" style={{ textAlign: 'left', marginBottom: '14px' }}>
              Modifications to terms of service
            </h3>
            <p className="curator-card-text" style={{ fontSize: '15px' }}>
              The Original reserves the right to modify or replace these Terms &amp; Conditions at any time to accommodate statutory regulatory amendments, logistics partner changes, or payment gateway updates. Revisions will be published directly on this page accompanied by an updated &quot;Last updated&quot; effective date. Your continued interaction with the storefront after any such publication constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>
      </section>

      {/* Registered Entity & Grievance Desk */}
      <section className="shipping-fssai-section">
        <div className="shipping-fssai-inner">
          <div className="shipping-fssai-card">
            <div className="shipping-fssai-header">
              <div>
                <div className="shipping-fssai-brand">The Original Cashew Co.</div>
                <div style={{ fontSize: '13px', color: 'rgba(250,247,241,0.7)', marginTop: '4px' }}>
                  Founder: CH Dhana Vardhan · Registered Food Business Unit
                </div>
              </div>
              <div className="shipping-fssai-lic">
                FSSAI State Lic. No. <strong>10126001000104</strong>
              </div>
            </div>

            <div className="shipping-fssai-grid">
              <div className="shipping-fssai-item">
                <span className="shipping-fssai-item-label">Principal Place of Business</span>
                <span className="shipping-fssai-item-val">
                  13/1/76, THE ORIGINAL, Little Angels School Straight, Tilak Nagar, Kasibugga, Palasa, Srikakulam District, Andhra Pradesh 532222
                </span>
              </div>

              <div className="shipping-fssai-item">
                <span className="shipping-fssai-item-label">Customer Support &amp; WhatsApp</span>
                <span className="shipping-fssai-item-val">
                  <a href="https://wa.me/919100267404" target="_blank" rel="noopener noreferrer">
                    +91 9100267404
                  </a>
                  <div style={{ fontSize: '12px', color: 'rgba(250,247,241,0.6)', marginTop: '4px', fontWeight: 400 }}>
                    Mon – Sat · 9:00 AM to 7:00 PM IST
                  </div>
                </span>
              </div>

              <div className="shipping-fssai-item">
                <span className="shipping-fssai-item-label">Legal Inquiries &amp; Support Email</span>
                <span className="shipping-fssai-item-val">
                  <a href="mailto:theoriginalcashews@gmail.com">
                    theoriginalcashews@gmail.com
                  </a>
                  <div style={{ fontSize: '12px', color: 'rgba(250,247,241,0.6)', marginTop: '4px', fontWeight: 400 }}>
                    Official correspondence desk
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated Timestamp */}
      <div className="shipping-meta-bar">
        <span>Last updated: September 11, 2026</span>
      </div>

      <Footer />
    </main>
  );
}
