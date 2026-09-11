import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Shipping Policy | The Original | Palasa Cashews Dispatch & Delivery Timelines',
  description:
    'Official Shipping Policy of The Original Cashews. Concrete dispatch schedules, delivery timelines by zone across India, flat rates and free shipping threshold, courier partners, tracking, and FSSAI compliance.',
};

export default function ShippingPolicyPage() {
  const dispatchPillars = [
    {
      num: '01',
      title: '1–2 Business Days Dispatch',
      desc: 'All orders are freshly packed, nitrogen-flushed, and dispatched from our Palasa facility within 1 to 2 business days of payment confirmation. Because we operate strictly on fresh small-batch roasts rather than prolonged warehouse cold-storage stock, your cashews are sealed immediately prior to courier handover.',
    },
    {
      num: '02',
      title: 'Shipping Charges & Threshold',
      desc: 'We provide Complimentary Free Shipping on all orders of ₹999 and above pan-India. For orders below ₹999, a flat shipping and handling charge of ₹70 is applied at checkout. All rates are transparent with no hidden fuel surcharges.',
    },
    {
      num: '03',
      title: 'Reputed National Couriers',
      desc: 'Consignments are routed via trusted national logistics carriers including Delhivery, Blue Dart, DTDC, and India Post Speed Post (utilized for regional and remote postal pin codes to ensure reliable last-mile delivery).',
    },
    {
      num: '04',
      title: 'Pan-India Serviceable Pin Codes',
      desc: 'We service 19,000+ pin codes across all Indian states and union territories. Both air express and surface transportation routes are deployed depending on the destination geography and consignment weight.',
    },
  ];

  const deliveryZones = [
    {
      badge: 'Zone 1 · Metro Cities',
      title: 'Tier-1 Metros & Capital Hubs',
      time: '3–5 Business Days',
      desc: 'Applicable to Bengaluru, Hyderabad, Chennai, Mumbai, Pune, Delhi NCR, Kolkata, and Ahmedabad. Shipments move primarily via air express hubs following dispatch from Palasa.',
    },
    {
      badge: 'Zone 2 · Rest of India',
      title: 'Tier-2 & Tier-3 Cities & Towns',
      time: '5–8 Business Days',
      desc: 'Covers Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Uttar Pradesh, and other non-metro urban & suburban districts.',
    },
    {
      badge: 'Zone 3 · Remote & Special Areas',
      title: 'Northeast, J&K & Remote Regions',
      time: '7–10 Business Days',
      desc: 'Covers Assam, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Arunachal Pradesh, Sikkim, Jammu & Kashmir, Ladakh, Andaman & Nicobar, and deep rural postal zones via India Post Speed Post.',
    },
  ];

  const operationsProtocols = [
    {
      num: '01',
      title: 'Live Order Tracking via SMS, WhatsApp & Email',
      desc: 'As soon as your package is manifested and scanned by our logistics partner in Palasa, an automated dispatch notification is sent to your registered mobile number and email. This includes your courier carrier name, Airway Bill (AWB) consignment number, and a direct live tracking link so you can monitor your shipment every step of the journey.',
    },
    {
      num: '02',
      title: 'Failed Delivery & Up to 3 Re-Attempts',
      desc: 'Our courier partners make up to three (3) delivery attempts at the provided shipping address. If the recipient is unavailable or unreachable by phone, the parcel will be held at the nearest courier delivery branch for up to 48 hours. If you anticipate being unavailable, contact our dispatch desk (+91 9100267404) immediately with your AWB number so we can reschedule the delivery or request branch pickup.',
    },
    {
      num: '03',
      title: 'Damaged or Tampered Package on Arrival',
      desc: 'Every parcel is dispatched in reinforced, tamper-evident packaging with security seals. If the external box arrives visibly crushed, torn, wet, or opened, please reject the package and mark "Refused Due to Damage" on the courier delivery slip. If accepted, you must record a single, continuous unboxing video (without cuts) showing the shipping label and contents, and report it within 24 to 48 hours of delivery to our support team for prompt replacement or resolution under our Refund & Cancellation Policy.',
    },
  ];

  return (
    <main className="shipping-page">
      <Nav />

      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="section-tag">Origin dispatch · Reliable pan-India logistics</span>
          <h1 className="about-hero-title">Shipping Policy</h1>
          <p className="about-hero-lead">
            Every harvest pack of <strong>The Original</strong> is cured, roasted, and packed fresh in Palasa, Andhra Pradesh.
            We partner with premier national express couriers to deliver uncompromised, factory-fresh cashew kernels directly to your doorstep across India with complete transparency and real-time tracking.
          </p>
        </div>
      </section>

      {/* Core Dispatch Commitments (4-Pillars Grid) */}
      <section className="about-pillars-section">
        <div className="about-pillars-inner">
          <span className="section-tag">Guaranteed standards</span>
          <h2 className="section-title">Freshness dispatch &amp; transparent charges.</h2>

          <div className="about-pillars-grid">
            {dispatchPillars.map((pillar) => (
              <div key={pillar.num} className="about-pillar-card">
                <span className="pillar-num">{pillar.num}</span>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone-wise Delivery Timelines */}
      <section className="shipping-zones-section">
        <div className="shipping-zones-inner">
          <span className="section-tag">Concrete timelines from Palasa (PIN 532222)</span>
          <h2 className="section-title">Estimated delivery timelines by zone.</h2>
          <p className="about-philosophy-lead">
            Delivery timelines begin from the date of dispatch from our origin facility in Palasa, Andhra Pradesh. Timelines reflect business days (excluding Sundays and statutory national holidays).
          </p>

          <div className="shipping-zones-grid">
            {deliveryZones.map((zone) => (
              <div key={zone.badge} className="shipping-zone-card">
                <span className="shipping-zone-badge">{zone.badge}</span>
                <h3 className="shipping-zone-title">{zone.title}</h3>
                <div className="shipping-zone-time">
                  <span>⏱</span>
                  <span>{zone.time}</span>
                </div>
                <p className="shipping-zone-desc">{zone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking, Delivery & Damaged Package Protocols */}
      <section className="about-philosophy-section">
        <div className="about-philosophy-inner">
          <div className="about-philosophy-header">
            <span className="section-tag">Transit operations &amp; buyer assurance</span>
            <h2 className="section-title">
              Tracking, failed attempts, and package protection.
            </h2>
            <p className="about-philosophy-lead">
              We stand behind every consignment from origin to your dining table. Here is exactly how we handle order visibility, delivery re-attempts, and transit damage.
            </p>
          </div>

          <div className="about-curator-explanation">
            {operationsProtocols.map((item) => (
              <div key={item.num} className="curator-card">
                <div className="curator-card-icon">{item.num}</div>
                <h3 className="curator-card-title">{item.title}</h3>
                <p className="curator-card-text">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FSSAI Compliance & Shipping Support Desk */}
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
                FSSAI Lic. No. <strong>10126001000104</strong> (State License)
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
                <span className="shipping-fssai-item-label">Shipping Desk Phone &amp; WhatsApp</span>
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
                <span className="shipping-fssai-item-label">Dispatch &amp; Escalation Email</span>
                <span className="shipping-fssai-item-val">
                  <a href="mailto:theoriginalcashews@gmail.com">
                    theoriginalcashews@gmail.com
                  </a>
                  <div style={{ fontSize: '12px', color: 'rgba(250,247,241,0.6)', marginTop: '4px', fontWeight: 400 }}>
                    Average response within 2–4 hours
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
