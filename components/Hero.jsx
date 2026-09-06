'use client';

import { useRef, useEffect, useState } from 'react';

export default function Hero() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setReady(true);
    video.addEventListener('canplaythrough', onCanPlay);
    video.addEventListener('playing', onCanPlay);
    video.addEventListener('loadeddata', onCanPlay);

    if (video.readyState >= 2) {
      setReady(true);
    } else {
      video.load();
    }

    return () => {
      video.removeEventListener('canplaythrough', onCanPlay);
      video.removeEventListener('playing', onCanPlay);
      video.removeEventListener('loadeddata', onCanPlay);
    };
  }, []);

  return (
    <section className="hero hero-fullscreen" id="home">
      {/* Full-screen Background Video */}
      <div className="hero-video-backdrop">
        <video
          ref={videoRef}
          className={`hero-bg-video ${ready ? 'is-ready' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/hero-cashew.mp4?v=3" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      {/* Top Meta Labels */}
      <div className="hero-top-meta">
        <span className="hero-label">An original harvest · est. Palasa</span>
        <span className="hero-label right">
          Palasa, Andhra Pradesh
          <br />
          India&apos;s cashew capital
        </span>
      </div>

      {/* Content Staged on Top of Full-Screen Video */}
      <div className="hero-content-stage">
        <div className="hero-tag-pill">Direct from the Cashew Capital</div>

        <h1 className="hero-main-title">
          <span className="title-row cream">The Original</span>
          <span className="title-row gold">Grown right, in Palasa.</span>
        </h1>

        <p className="hero-lead-text">
          Hand-picked from the soil that gave the crop its name, roasted in
          small batches, sealed the same day.
        </p>

        <div className="hero-actions-row">
          <a href="/products" className="btn-hero-primary">
            Shop the Original
          </a>
          <a href="/about" className="btn-hero-ghost">
            Our story
          </a>
        </div>
      </div>
    </section>
  );
}
