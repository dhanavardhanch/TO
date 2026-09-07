'use client';

import { useState } from 'react';

export default function Grades() {
  const [activeGrade, setActiveGrade] = useState('W180');

  const grades = [
    {
      id: 'W180',
      label: 'W180',
      sub: 'King size',
      detail: 'Under 180 count · Rare jumbo harvest',
      image: '/assets/grade-w180.jpg',
    },
    {
      id: 'W240',
      label: 'W240',
      sub: 'The standard',
      detail: '220 to 240 count · Signature balance',
      image: '/assets/grade-w240.jpg',
    },
    {
      id: 'W320',
      label: 'W320',
      sub: 'Regular benchmark',
      detail: '300 to 320 count · Everyday classic',
      image: '/assets/grade-w320.jpg',
    },
    {
      id: 'JH',
      label: 'JH',
      sub: 'Split cashew',
      detail: 'Natural halves · Pure sweet crunch',
      image: '/assets/grade-jh.jpg',
    },
  ];

  return (
    <section className="section grades" id="grades">
      <div className="section-inner section-reveal">
        <div className="grades-header">
          <span className="section-tag">Kernel calibers · Palasa standards</span>
          <h2 className="section-title">The cashew has ranks.</h2>
          <p className="grades-header-sub">
            Hover or tap any grade to inspect the kernel caliber and selection.
          </p>
        </div>

        <div className="grades-display">
          {grades.map((g) => {
            const isActive = activeGrade === g.id;
            return (
              <div
                key={g.id}
                className={`grade-item ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveGrade(g.id)}
                onClick={() => setActiveGrade(g.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveGrade(g.id);
                }}
                aria-label={`Inspect ${g.label} grade: ${g.sub}`}
              >
                <div className="grade-disc">
                  <div className="grade-text-view">
                    <span className="grade-code">{g.label}</span>
                  </div>

                  <div className="grade-image-view">
                    <img
                      src={g.image}
                      alt={`${g.label} ${g.sub} Palasa cashew caliber`}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="grade-meta">
                  <div className="grade-sub">{g.sub}</div>
                  <div className="grade-detail">{g.detail}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pre-order allocation callout */}
        <div className="grades-preorder-card">
          <div className="grades-preorder-info">
            <h3 className="grades-preorder-title">Looking for specialty calibers?</h3>
            <p className="grades-preorder-text">
              We also source micro-lots including <strong>W210</strong> and{' '}
              <strong>W400</strong>. While not kept in immediate daily stock,
              these grades are available for private allocations upon seasonal
              pre order.
            </p>
          </div>
          <a href="#contact" className="btn-primary grades-preorder-cta">
            Pre order reserve grades
          </a>
        </div>
      </div>
    </section>
  );
}
