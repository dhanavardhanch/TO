import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Privacy Policy | The Original | Data Security & Payment Gateway Compliance',
  description:
    'Official Privacy Policy of The Original Cashews. Concrete information on personal data handling, zero payment card storage, Razorpay/Cashfree gateway integration, logistics data sharing, cookie policy, and user privacy rights under Indian law.',
};

export default function PrivacyPolicyPage() {
  const dataCategories = [
    {
      num: '01',
      title: 'Contact & Account Identifiers',
      desc: 'When you place an order, create an inquiry, or interact with our dispatch desk, we collect your full name, primary telephone / WhatsApp contact number, and email address. This information is utilized strictly to verify transactions, generate invoices, and send essential shipment milestone notifications.',
    },
    {
      num: '02',
      title: 'Shipping & Invoicing Address',
      desc: 'We collect your exact delivery location—including house/apartment number, street address, landmark, town/city, state, and postal PIN code. This data is required solely to orchestrate accurate routing and parcel handover with our contracted national logistics carriers.',
    },
    {
      num: '03',
      title: 'Order History & Harvest Records',
      desc: 'We maintain records of the cashew grades, pack sizes, item quantities, total purchase amounts, transaction timestamps, and dispatch statuses linked to your purchases. This enables seamless reorders, warranty support, and compliance with statutory business accounting regulations.',
    },
    {
      num: '04',
      title: 'Zero Card / UPI Credential Storage',
      desc: 'We strictly DO NOT collect, store, or hold access to your full credit/debit card numbers, CVVs, net banking credentials, or UPI MPINs. All online payments are handled directly by PCI-DSS Level 1 compliant gateway partners (Razorpay / Cashfree) over 256-bit encrypted SSL/HTTPS sessions. We receive only transaction authorization tokens and bank reference IDs.',
    },
  ];

  const usagePillars = [
    {
      num: '01',
      title: 'Order Fulfillment & Dispatch',
      desc: 'To confirm and process your order, roast and package your cashews at our Palasa facility, generate shipping manifests, and transmit delivery instructions to our courier partners.',
    },
    {
      num: '02',
      title: 'Automated Status Updates',
      desc: 'To dispatch critical, non-marketing transaction alerts—including order confirmations, courier AWB tracking links via SMS, WhatsApp, or email, and delivery attempt notifications.',
    },
    {
      num: '03',
      title: 'Customer Service & Inquiries',
      desc: 'To respond to your inquiries regarding bulk orders, corporate gifting, harvest schedules, delivery tracking, or refund requests submitted via WhatsApp, phone, or email.',
    },
    {
      num: '04',
      title: 'Strict Opt-In Marketing',
      desc: 'Promotional communications regarding new season harvests, festive gifting specials, or seasonal discounts are sent strictly to customers who have explicitly opted in. You may opt out at any time.',
    },
  ];

  const securityAndCookies = [
    {
      num: '01',
      title: 'Data Sharing with Operational Third Parties',
      desc: 'We never sell, rent, lease, or trade your personal data to any external advertising agencies or unrelated commercial entities. We disclose necessary data solely to: (1) Certified Payment Gateways (Razorpay / Cashfree) to authorize and settle your payments, and (2) Contracted National Courier Partners (Delhivery, Blue Dart, DTDC, India Post) exclusively to complete doorstep delivery.',
    },
    {
      num: '02',
      title: 'HTTPS Transmission & Infrastructure Security',
      desc: 'All communications between your device and our web application are encrypted using Transport Layer Security (HTTPS/TLS 1.3). Administrative access to order records is restricted to authenticated personnel under strict role-based authorization protocols to protect against unauthorized access, loss, or misuse.',
    },
    {
      num: '03',
      title: 'Cookie Usage & Browser Controls',
      desc: 'Our platform uses essential first-party cookies and browser local storage to maintain shopping cart items, preserve active sessions, and ensure smooth navigation. When anonymous analytics tools (such as Google Analytics or Meta Pixel) are enabled, they collect aggregated, non-identifying telemetry to help us improve page speeds and user flows. You can manage or block cookies at any time via your web browser settings.',
    },
    {
      num: '04',
      title: 'Statutory Retention & Children’s Privacy',
      desc: 'Transactional and invoicing records are retained for 7 to 8 years to fulfill statutory commercial, GST, and tax compliance obligations under Indian law. Promotional contact data is purged immediately upon opt-out. Furthermore, our website is not directed at minors under the age of 18, and we do not knowingly solicit or collect data from children.',
    },
  ];

  const userRights = [
    {
      num: '01',
      title: 'Right to Access & Review',
      desc: 'You may request an export of the personal information recorded in connection with your account or previous orders.',
    },
    {
      num: '02',
      title: 'Right to Rectification',
      desc: 'You may request immediate correction or updating of any inaccurate, outdated, or incomplete contact or delivery details.',
    },
    {
      num: '03',
      title: 'Right to Erasure & Deletion',
      desc: 'Subject to mandatory commercial recordkeeping and taxation requirements under Indian law, you can request the permanent deletion of your profile and marketing data.',
    },
    {
      num: '04',
      title: 'Opt-Out of Marketing',
      desc: 'You can withdraw marketing consent at any time by clicking the unsubscribe link in our emails, replying "STOP" on WhatsApp, or contacting our privacy desk.',
    },
  ];

  return (
    <main className="shipping-page">
      <Nav />

      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="section-tag">Consumer trust · Privacy &amp; data security</span>
          <h1 className="about-hero-title">Privacy Policy</h1>
          <p className="about-hero-lead">
            At <strong>The Original</strong>, founded by <strong>CH Dhana Vardhan</strong> in Palasa, Andhra Pradesh, we hold customer trust and data privacy to the highest standard. This Privacy Policy outlines the specific data we collect, how it is handled for order fulfillment, and our strict safeguards ensuring zero compromise of your personal information.
          </p>
        </div>
      </section>

      {/* Introduction & Scope */}
      <section className="shipping-zones-section">
        <div className="shipping-zones-inner">
          <span className="section-tag">Scope &amp; applicability</span>
          <h2 className="section-title">Transparent data protection for every customer.</h2>
          <p className="about-philosophy-lead" style={{ maxWidth: '880px' }}>
            This Privacy Policy applies to all visitors, buyers, and corporate partners interacting with <strong>The Original</strong> via our website, digital storefront, cart drawer, checkout integrations, and direct support channels. By browsing our catalog or placing an order, you acknowledge the collection and handling of your data in accordance with the terms described below.
          </p>
        </div>
      </section>

      {/* What Data We Collect (4-Pillars Grid) */}
      <section className="about-pillars-section">
        <div className="about-pillars-inner">
          <span className="section-tag">Information collection</span>
          <h2 className="section-title">What personal data we collect &amp; handle.</h2>

          <div className="about-pillars-grid">
            {dataCategories.map((item) => (
              <div key={item.num} className="about-pillar-card">
                <span className="pillar-num">{item.num}</span>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Collect Data & Marketing Policy */}
      <section className="about-philosophy-section">
        <div className="about-philosophy-inner">
          <div className="about-philosophy-header">
            <span className="section-tag">Purpose &amp; communication rules</span>
            <h2 className="section-title">
              Why we collect data &amp; our zero-spam marketing guarantee.
            </h2>
            <p className="about-philosophy-lead">
              We collect only the minimum personal data required to fulfill our promise of factory-fresh Palasa cashews delivered promptly to your home or office.
            </p>
          </div>

          <div className="about-curator-explanation" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {usagePillars.map((pillar) => (
              <div key={pillar.num} className="curator-card">
                <div className="curator-card-icon">{pillar.num}</div>
                <h3 className="curator-card-title">{pillar.title}</h3>
                <p className="curator-card-text">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third-Party Sharing, Security & Cookies */}
      <section className="shipping-zones-section">
        <div className="shipping-zones-inner">
          <span className="section-tag">Security &amp; operational integrations</span>
          <h2 className="section-title">Data sharing, encryption &amp; cookie usage.</h2>
          <p className="about-philosophy-lead" style={{ maxWidth: '880px', marginBottom: '32px' }}>
            We do not monetize your data. Here is how your information is safeguarded, how cookies are utilized, and who our verified operational partners are.
          </p>

          <div className="about-curator-explanation" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {securityAndCookies.map((item) => (
              <div key={item.num} className="curator-card">
                <div className="curator-card-icon">{item.num}</div>
                <h3 className="curator-card-title">{item.title}</h3>
                <p className="curator-card-text">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section className="about-pillars-section">
        <div className="about-pillars-inner">
          <span className="section-tag">Your rights</span>
          <h2 className="section-title">Exercising control over your personal data.</h2>

          <div className="about-pillars-grid">
            {userRights.map((right) => (
              <div key={right.num} className="about-pillar-card">
                <span className="pillar-num">{right.num}</span>
                <h3 className="pillar-title">{right.title}</h3>
                <p className="pillar-desc">{right.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Changes to this Policy */}
      <section className="about-philosophy-section" style={{ padding: '60px 32px' }}>
        <div className="about-philosophy-inner">
          <div className="about-comparison-wrap" style={{ padding: '36px 32px' }}>
            <span className="section-tag">Policy evolution</span>
            <h3 className="comparison-headline" style={{ textAlign: 'left', marginBottom: '14px' }}>
              Modifications &amp; regulatory revisions
            </h3>
            <p className="curator-card-text" style={{ fontSize: '15px' }}>
              We reserve the right to revise this Privacy Policy periodically to reflect enhancements in our store technology, operational courier changes, or updates to Indian data protection laws (such as the Digital Personal Data Protection Act, 2023). Any updates will be posted immediately on this URL with an updated &quot;Last updated&quot; timestamp. Continued use of our website constitutes acceptance of the amended terms.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Grievance Desk */}
      <section className="shipping-fssai-section">
        <div className="shipping-fssai-inner">
          <div className="shipping-fssai-card">
            <div className="shipping-fssai-header">
              <div>
                <div className="shipping-fssai-brand">The Original · Privacy &amp; Grievance Desk</div>
                <div style={{ fontSize: '13px', color: 'rgba(250,247,241,0.7)', marginTop: '4px' }}>
                  Founder &amp; Data Custodian: CH Dhana Vardhan · Kasibugga, Palasa, Andhra Pradesh
                </div>
              </div>
              <div className="shipping-fssai-lic">
                FSSAI Lic. No. <strong>10126001000104</strong> (State License)
              </div>
            </div>

            <div className="shipping-fssai-grid">
              <div className="shipping-fssai-item">
                <span className="shipping-fssai-item-label">Postal &amp; Dispatch Facility</span>
                <span className="shipping-fssai-item-val">
                  13/1/76, THE ORIGINAL, Little Angels School Straight, Tilak Nagar, Kasibugga, Palasa, Srikakulam District, Andhra Pradesh 532222
                </span>
              </div>

              <div className="shipping-fssai-item">
                <span className="shipping-fssai-item-label">Privacy &amp; WhatsApp Desk</span>
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
                <span className="shipping-fssai-item-label">Grievance Officer Email</span>
                <span className="shipping-fssai-item-val">
                  <a href="mailto:theoriginalcashews@gmail.com">
                    theoriginalcashews@gmail.com
                  </a>
                  <div style={{ fontSize: '12px', color: 'rgba(250,247,241,0.6)', marginTop: '4px', fontWeight: 400 }}>
                    Acknowledgment within 24 hours
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
