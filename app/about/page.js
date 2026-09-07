import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'About Us | The Original | Founder CH Dhana Vardhan & Palasa Roots',
  description:
    'Learn about The Original, founded by CH Dhana Vardhan in Palasa. Selective multi factory curation, strictly factory fresh stock, and premium packaging carrying Palasa cashews with pride across India.',
};

export default function AboutPage() {
  const pillars = [
    {
      num: '01',
      title: 'Multi factory curation',
      desc: 'We are selective relabellers and repackers. Instead of being locked into a single factory’s daily output, we inspect multiple processing units in Palasa and hand pick only the finest batches with superior grade, sweetness, and crispness.',
    },
    {
      num: '02',
      title: 'Strictly factory fresh',
      desc: 'Commercial brands let stock sit in warehouse cold storage for 6 to 12 months. We reject stored stock entirely. Our cashews move fresh from the roasting drum into airtight seals so you experience genuine origin crunch.',
    },
    {
      num: '03',
      title: 'Rigorous manual sorting',
      desc: 'Every single lot undergoes meticulous sorting to eliminate broken edges, scorched kernels, and inconsistent color. Only immaculate, uniform whole nuts make it into The Original pouch.',
    },
    {
      num: '04',
      title: 'Packaging that brings pride',
      desc: 'Palasa cashews deserve more than cheap, transparent plastic bags. We encase our harvest in luxury, multi layer aroma barrier packaging that protects quality and makes every box a gift of honor.',
    },
  ];

  return (
    <main className="about-page">
      <Nav />

      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="section-tag">Our roots · Our conviction</span>
          <h1 className="about-hero-title">
            The soul of Palasa, sent with pride to all of India.
          </h1>
          <p className="about-hero-lead">
            The Original was created by <strong>CH Dhana Vardhan</strong> with a single, heartfelt ambition:
            to take home grown Palasa origin cashews and deliver them nationwide in premium packaging that honors the land, the farmers, and the authentic taste of Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Drone Video Showcase */}
      <section className="about-drone-section">
        <div className="about-drone-inner">
          <div className="about-drone-card">
            <video
              src="/assets/about_drone.mp4?v=2"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="about-drone-video"
            />
            <div className="about-drone-overlay">
              <div className="about-drone-badge">
                <span className="about-drone-dot"></span>
                <span>Aerial terroir · Palasa, Andhra Pradesh</span>
              </div>
              <p className="about-drone-caption">
                Where the Eastern Ghats touch the Bay of Bengal. Red laterite soils, tropical humidity, and centuries of cashew mastery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="about-founder-section">
        <div className="about-founder-inner">
          <div className="about-founder-grid">
            {/* Founder Portrait */}
            <div className="about-founder-photo-wrap">
              <div className="about-founder-card">
                <img
                  src="/assets/founder.jpg"
                  alt="CH Dhana Vardhan, Founder of The Original"
                  className="about-founder-img"
                />
                <div className="about-founder-label">
                  <span className="about-founder-name">CH Dhana Vardhan</span>
                  <span className="about-founder-role">Founder · Palasa Native · Working Professional</span>
                </div>
              </div>
              <div className="about-founder-quote-pill">
                &ldquo;Quality on our side, trust from yours.&rdquo;
              </div>
            </div>

            {/* Founder Narrative */}
            <div className="about-founder-story">
              <span className="section-tag">Founder&apos;s personal note</span>
              <h2 className="section-title">
                &ldquo;I wanted our own Palasa roots cashew to travel across all of India with true pride.&rdquo;
              </h2>
              <div className="about-founder-body">
                <p>
                  I was born and brought up in <strong>Palasa</strong>. Growing up here, the aroma of roasting cashews and the hum of sorting tables are part of everyday life. Palasa is widely celebrated as the cashew capital of India, yet for years I noticed a painful paradox.
                </p>
                <p>
                  As a working professional traveling across cities, whenever I bought cashews from supermarkets or renowned brands, the difference was stark: they were often aged warehouse stock, dry, brittle, and stripped of the natural sweet oils that define real Palasa nuts. Furthermore, local Palasa cashews were often sold in flimsy, generic plastic covers without identity.
                </p>
                <p>
                  I decided to build <strong>The Original</strong> to change that. I wanted to take the authentic cashews grown right here from our Palasa roots and send them to every household, corporate desk, and festive table across India, packaged in a sleek, premium, modern design so that our town&apos;s heritage is recognized with genuine pride.
                </p>
                <div className="about-founder-signature">
                  <div className="signature-name">CH Dhana Vardhan</div>
                  <div className="signature-title">Founder, The Original</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Transparency & The Relabeller Philosophy */}
      <section className="about-philosophy-section">
        <div className="about-philosophy-inner">
          <div className="about-philosophy-header">
            <span className="section-tag">Complete transparency</span>
            <h2 className="section-title">
              We are selective repackers and curators, and that is our greatest strength.
            </h2>
            <p className="about-philosophy-lead">
              Unlike traditional single factory owners who are forced to sell whatever comes off their machines on a given day, we are independent curators.
            </p>
          </div>

          <div className="about-curator-explanation">
            <div className="curator-card">
              <div className="curator-card-icon">01</div>
              <h3 className="curator-card-title">Multi factory inspection</h3>
              <p className="curator-card-text">
                Palasa houses dozens of processing units. Rather than relying on a single plant, we inspect and test batches across multiple trusted factories in the belt. We evaluate moisture levels, kernel consistency, and roast perfection before procuring a single kilogram.
              </p>
            </div>

            <div className="curator-card highlight">
              <div className="curator-card-icon">02</div>
              <h3 className="curator-card-title">Only the best quality</h3>
              <p className="curator-card-text">
                We take only the stock that has the finest quality, rejecting off-spec, broken, or sub par lots. Because we are relabellers, our allegiance is not to machinery or production quotas, our allegiance is entirely to <strong>your taste experience</strong>.
              </p>
            </div>

            <div className="curator-card">
              <div className="curator-card-icon">03</div>
              <h3 className="curator-card-title">Quality on our side, trust from yours</h3>
              <p className="curator-card-text">
                This transparent pact is the foundation of The Original. When you order from us, you receive curated excellence, backed by someone whose personal reputation and hometown honor are on every single pouch.
              </p>
            </div>
          </div>

          {/* Comparison Table / Box: Factory Fresh vs Warehouse Stored */}
          <div className="about-comparison-wrap">
            <h3 className="comparison-headline">
              Factory-fresh harvest stock vs. Commercial warehouse stock
            </h3>
            <div className="comparison-grid">
              <div className="comparison-box commercial">
                <div className="comparison-badge">Commercial big brands</div>
                <ul className="comparison-list">
                  <li>
                    <span className="comparison-cross">&times;</span>
                    <span>Mass stockpiled in cold storage warehouses for 6 to 12 months</span>
                  </li>
                  <li>
                    <span className="comparison-cross">&times;</span>
                    <span>Kernels lose their natural oils, turning chalky and prone to rancidity</span>
                  </li>
                  <li>
                    <span className="comparison-cross">&times;</span>
                    <span>Blended with cheaper imported raw nuts from varied global origins</span>
                  </li>
                  <li>
                    <span className="comparison-cross">&times;</span>
                    <span>Inconsistent sizing with hidden split or broken pieces</span>
                  </li>
                  <li>
                    <span className="comparison-cross">&times;</span>
                    <span>Generic packaging with no direct traceability to origin</span>
                  </li>
                </ul>
              </div>

              <div className="comparison-box original">
                <div className="comparison-badge gold">The Original standard</div>
                <ul className="comparison-list">
                  <li>
                    <span className="comparison-check">&#10003;</span>
                    <span><strong>100% Factory-fresh:</strong> Sourced directly after peeling and gentle roasting</span>
                  </li>
                  <li>
                    <span className="comparison-check">&#10003;</span>
                    <span><strong>Rich natural oils intact:</strong> Distinctive sweet buttery crunch in every bite</span>
                  </li>
                  <li>
                    <span className="comparison-check">&#10003;</span>
                    <span><strong>Pure Palasa terroir:</strong> 100% native soil harvest, never blended</span>
                  </li>
                  <li>
                    <span className="comparison-check">&#10003;</span>
                    <span><strong>Strictly hand-sorted:</strong> Uniform calibers (W180, W220, W320, JH) with zero flaws</span>
                  </li>
                  <li>
                    <span className="comparison-check">&#10003;</span>
                    <span><strong>Luxury aroma-barrier pouch:</strong> Nitrogen-sealed for maximum freshness</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Pillars */}
      <section className="about-pillars-section">
        <div className="about-pillars-inner">
          <span className="section-tag">How we deliver on our promise</span>
          <h2 className="section-title">The four non-negotiable standards.</h2>

          <div className="about-pillars-grid">
            {pillars.map((pil) => (
              <div key={pil.num} className="about-pillar-card">
                <span className="pillar-num">{pil.num}</span>
                <h3 className="pillar-title">{pil.title}</h3>
                <p className="pillar-desc">{pil.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="about-cta-section">
        <div className="about-cta-inner">
          <span className="section-tag">Taste origin perfection</span>
          <h2 className="about-cta-title">
            Experience the true pride of Palasa cashews.
          </h2>
          <p className="about-cta-text">
            Freshly packed, uncompromised, and delivered directly to your doorstep anywhere in India.
          </p>
          <div className="about-cta-actions">
            <a href="/#products" className="btn-primary">
              View harvest products
            </a>
            <a href="/#gifting" className="btn-ghost">
              Corporate &amp; occasion gifting
            </a>
            <a
              href="https://wa.me/919100267404"
              target="_blank"
              rel="noopener noreferrer"
              className="about-whatsapp-link"
            >
              Direct WhatsApp: +91 9100267404
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
