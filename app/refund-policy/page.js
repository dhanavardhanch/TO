import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Refund & Cancellation Policy | The Original | Concrete Timelines & Food Safety',
  description:
    'Official Refund and Cancellation Policy of The Original Cashews. Concrete windows for order cancellation (2-4 hours), 48-hour transit damage claims, 7-day quality guarantee, refund timelines (5-7 business days via Razorpay/Cashfree), and FSSAI compliance.',
};

export default function RefundPolicyPage() {
  const cancellationPillars = [
    {
      num: '01',
      title: 'Order Cancellation Window (2–4 Hours)',
      desc: 'You can request cancellation within 2 to 4 hours of placing your order, provided your harvest batch has not entered roasting, pouch sealing, or courier manifesting. To cancel, immediately contact our dispatch desk via WhatsApp/Phone at +91 9100267404 or email theoriginalcashews@gmail.com with your Order ID. A full 100% refund is processed upon cancellation confirmation.',
    },
    {
      num: '02',
      title: 'Post-Dispatch Policy',
      desc: 'Once your order has been packed and handed over to our national courier partners (Delhivery, Blue Dart, DTDC, India Post) with an active Airway Bill (AWB), the shipment is in transit and cannot be cancelled or recalled. In such cases, standard delivery protocols apply.',
    },
    {
      num: '03',
      title: 'Damaged, Tampered or Incorrect Items (48-Hour Notice)',
      desc: 'If your parcel arrives with crushed packaging, compromised aroma seals, moisture leakage, or incorrect products, you must report the issue within 48 hours of delivery. Prompt reporting ensures we can file transit claims with our courier partners and arrange immediate remediation.',
    },
    {
      num: '04',
      title: 'Mandatory Unboxing Video Verification',
      desc: 'To protect against fraudulent claims and ensure transparent carrier accountability, customers must record a continuous, unedited unboxing video starting from the unopened outer box with shipping label clearly visible. Share the video and photos via WhatsApp (+91 9100267404) or email. Verified claims receive an immediate free replacement or 100% refund.',
    },
  ];

  const qualityAndReturnRules = [
    {
      num: '01',
      title: '7-Day Freshness & Quality Guarantee',
      desc: 'As an authentic Palasa roastery, we curate only factory-fresh harvests with natural sweet oils intact. If you encounter legitimate quality defects—such as stale crunch, rancidity, broken vacuum seal upon opening, or foreign matter—notify our quality desk within 7 days of delivery. We cross-verify against our lot retention samples and provide a complimentary replacement batch or full refund.',
    },
    {
      num: '02',
      title: 'Perishable Food Non-Returnable Clause',
      desc: 'In compliance with Indian Food Safety and Standards Authority of India (FSSAI) hygiene regulations, edible dry fruit and cashew products are non-returnable once opened or consumed, except under verified quality defect or transit damage claims as stated above. Unsolicited physical returns sent to our facility cannot be accepted.',
    },
    {
      num: '03',
      title: 'Customer Address Errors & Failed Deliveries',
      desc: 'No refunds are issued if a delivery fails due to an incorrect or incomplete shipping address, invalid PIN code, unreachable phone number, or recipient unavailability after two (2) delivery attempts by the courier. If the package returns to our Palasa facility (RTO), we can arrange re-shipment upon payment of actual re-dispatch courier charges.',
    },
  ];

  const refundSchedules = [
    {
      badge: 'Step 1 · Approval & Processing',
      title: 'Refund Initiation Window',
      time: '5–7 Business Days',
      desc: 'Once your cancellation or damage/quality claim is reviewed and approved by our support team, the refund is formally initiated directly through our payment gateway partners (Razorpay / Cashfree) back to your original payment instrument.',
    },
    {
      badge: 'Step 2 · Bank Settlement',
      title: 'Bank Reflection Time',
      time: '3–5 Business Days',
      desc: 'Following gateway release, the refunded amount typically reflects in your bank account, credit/debit card, or UPI linked wallet within 3 to 5 business days, depending on your issuing bank’s standard clearing cycle.',
    },
    {
      badge: 'Step 3 · Technical Failures',
      title: 'Failed & Duplicate Deductions',
      time: 'Automatic 5–7 Days',
      desc: 'If money was deducted from your account but the order failed to confirm due to network interruption, the gateway automatically reverses the transaction within 5 to 7 business days. If uncredited after 7 days, contact us with your bank UTR number for priority tracing.',
    },
  ];

  return (
    <main className="shipping-page">
      <Nav />

      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="section-tag">Consumer assurance · Food safety guarantee</span>
          <h1 className="about-hero-title">Refund &amp; Cancellation Policy</h1>
          <p className="about-hero-lead">
            Every lot of <strong>The Original</strong> cashews is roasted in small batches and vacuum-sealed at origin in Palasa, Andhra Pradesh. We stand behind our harvests with concrete timelines, transparent replacement guarantees, and fair refund protocols.
          </p>
        </div>
      </section>

      {/* Cancellation & Damage Pillars (4-Pillars Grid) */}
      <section className="about-pillars-section">
        <div className="about-pillars-inner">
          <span className="section-tag">Cancellation &amp; transit protection</span>
          <h2 className="section-title">Order cancellation &amp; damage claims.</h2>

          <div className="about-pillars-grid">
            {cancellationPillars.map((item) => (
              <div key={item.num} className="about-pillar-card">
                <span className="pillar-num">{item.num}</span>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Window & Food Safety Rules */}
      <section className="about-philosophy-section">
        <div className="about-philosophy-inner">
          <div className="about-philosophy-header">
            <span className="section-tag">Quality standards &amp; hygiene guidelines</span>
            <h2 className="section-title">
              7-day quality assurance &amp; non-returnable exemptions.
            </h2>
            <p className="about-philosophy-lead">
              Because cashews and dry fruits are agricultural consumables, clear food safety guidelines govern all returns and product replacements.
            </p>
          </div>

          <div className="about-curator-explanation">
            {qualityAndReturnRules.map((rule) => (
              <div key={rule.num} className="curator-card">
                <div className="curator-card-icon">{rule.num}</div>
                <h3 className="curator-card-title">{rule.title}</h3>
                <p className="curator-card-text">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Method & Concrete Timelines */}
      <section className="shipping-zones-section">
        <div className="shipping-zones-inner">
          <span className="section-tag">Financial settlements</span>
          <h2 className="section-title">Refund methods, bank timelines &amp; failed payments.</h2>
          <p className="about-philosophy-lead">
            All approved refunds are settled directly to the original payment source via our PCI-DSS compliant payment gateways (Razorpay and Cashfree). We do not issue store credits unless specifically requested.
          </p>

          <div className="shipping-zones-grid">
            {refundSchedules.map((schedule) => (
              <div key={schedule.badge} className="shipping-zone-card">
                <span className="shipping-zone-badge">{schedule.badge}</span>
                <h3 className="shipping-zone-title">{schedule.title}</h3>
                <div className="shipping-zone-time">
                  <span>💳</span>
                  <span>{schedule.time}</span>
                </div>
                <p className="shipping-zone-desc">{schedule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FSSAI & Support Desk */}
      <section className="shipping-fssai-section">
        <div className="shipping-fssai-inner">
          <div className="shipping-fssai-card">
            <div className="shipping-fssai-header">
              <div>
                <div className="shipping-fssai-brand">The Original · Claims &amp; Refund Desk</div>
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
                <span className="shipping-fssai-item-label">Dispatch &amp; Operating Facility</span>
                <span className="shipping-fssai-item-val">
                  13/1/76, THE ORIGINAL, Little Angels School Straight, Tilak Nagar, Kasibugga, Palasa, Srikakulam District, Andhra Pradesh 532222
                </span>
              </div>

              <div className="shipping-fssai-item">
                <span className="shipping-fssai-item-label">Claims &amp; Cancellation WhatsApp</span>
                <span className="shipping-fssai-item-val">
                  <a href="https://wa.me/919100267404" target="_blank" rel="noopener noreferrer">
                    +91 9100267404
                  </a>
                  <div style={{ fontSize: '12px', color: 'rgba(250,247,241,0.6)', marginTop: '4px', fontWeight: 400 }}>
                    Direct WhatsApp for instant unboxing video review
                  </div>
                </span>
              </div>

              <div className="shipping-fssai-item">
                <span className="shipping-fssai-item-label">Formal Claims Email</span>
                <span className="shipping-fssai-item-val">
                  <a href="mailto:theoriginalcashews@gmail.com">
                    theoriginalcashews@gmail.com
                  </a>
                  <div style={{ fontSize: '12px', color: 'rgba(250,247,241,0.6)', marginTop: '4px', fontWeight: 400 }}>
                    Include Order ID &amp; video in subject line
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
