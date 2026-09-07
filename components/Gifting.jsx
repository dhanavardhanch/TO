export default function Gifting() {
  const occasions = [
    {
      title: 'Corporate gifting & partnerships',
      desc: 'Bespoke corporate hampers with custom company branding, personalized note cards, and curated harvest selections for leadership, teams, and valued clients.',
    },
    {
      title: 'Weddings & milestone celebrations',
      desc: 'Festive gift presentations and heirloom wooden boxes curated with King W180 Jumbo cashews, premium dry fruits, and celebratory artisanal blends.',
    },
    {
      title: 'Private events & festive gatherings',
      desc: 'Tailored favor sets and small-batch gift packs customized for Diwali, family ceremonies, conferences, and memorable private gatherings.',
    },
  ];

  return (
    <section className="section gifting" id="gifting">
      <div className="section-inner section-reveal">
        <div className="gifting-grid">
          {/* Left Column: Gifting Video */}
          <div className="gifting-media-wrap">
            <div className="gifting-video-card">
              <video
                src="/assets/gifting.mp4?v=2"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="gifting-video"
              />
            </div>
          </div>

          {/* Right Column: Editorial Gifting Content */}
          <div className="gifting-content">
            <span className="section-tag">Bespoke allocations · Heritage boxes</span>
            <h2 className="section-title">
              Thoughtful gifting, rooted in Palasa tradition.
            </h2>
            <p className="gifting-lead">
              From grand corporate milestone celebrations to intimate family
              weddings and festivals, The Original crafts distinctive gifting
              editions that celebrate the finest harvest of India&apos;s cashew
              capital.
            </p>

            <div className="gifting-occasions">
              {occasions.map((item) => (
                <div key={item.title} className="gifting-occasion-item">
                  <div className="gifting-occasion-bullet"></div>
                  <div>
                    <h3 className="gifting-occasion-title">{item.title}</h3>
                    <p className="gifting-occasion-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="gifting-actions">
              <a href="/gifting" className="btn-primary">
                Explore gifting collection
              </a>
              <a href="#contact" className="btn-ghost">
                Contact for bespoke orders
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
