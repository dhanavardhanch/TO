'use client';

import { useRef, useState, useEffect } from 'react';

export default function LazyDroneVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onPlay = () => setIsPlaying(true);
    el.addEventListener('playing', onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If video isn't loaded yet, assign src and play
          if (!el.src || el.src === window.location.href) {
            el.src = '/assets/about_drone.mp4?v=3';
            el.load();
          }
          const playPromise = el.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          el.pause();
        }
      },
      { rootMargin: '300px 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => {
      el.removeEventListener('playing', onPlay);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="about-drone-video-container">
      {/* Instant Cinematic Poster Image */}
      <img
        src="/assets/about-drone-poster.jpg"
        alt="Aerial terroir of Palasa cashew orchards"
        className={`about-drone-poster-img ${isPlaying ? 'fade-out' : ''}`}
        loading="eager"
        fetchPriority="high"
      />

      {/* Background Drone Video */}
      <video
        ref={videoRef}
        poster="/assets/about-drone-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="about-drone-video"
      />
    </div>
  );
}
