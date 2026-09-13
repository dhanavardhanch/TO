'use client';

import { useRef, useState, useEffect } from 'react';

export default function Gifting() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const onPlay = () => setIsPlaying(true);
    videoEl.addEventListener('playing', onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!videoEl.src || videoEl.src === window.location.href) {
            videoEl.src = '/assets/gifting.mp4?v=3';
            videoEl.load();
          }
          const p = videoEl.play();
          if (p !== undefined) p.catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { rootMargin: '300px 0px', threshold: 0.05 }
    );

    observer.observe(videoEl);
    return () => {
      videoEl.removeEventListener('playing', onPlay);
      observer.disconnect();
    };
  }, []);

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
          {/* Left Column: Gifting Video with Instant Poster */}
          <div className="gifting-media-wrap">
            <div className="gifting-video-card">
              <img
                src="/assets/gifting-poster.jpg"
                alt="The Original bespoke cashew gifting hamper"
                className={`gifting-poster-img ${isPlaying ? 'fade-out' : ''}`}
                loading="eager"
                fetchPriority="high"
              />
              <video
                ref={videoRef}
                poster="/assets/gifting-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
