'use client';

import { useState } from 'react';

export default function Products() {
  const [selectedSizes, setSelectedSizes] = useState({
    0: 0, // W180
    1: 0, // W220
    2: 0, // W320
  });

  const [toast, setToast] = useState('');

  const featuredProducts = [
    {
      id: 'w180',
      grade: 'Grade W180 · Jumbo King',
      name: 'The Original W180',
      desc: 'The rarest and largest king cashew of Palasa. Renowned for its rich ivory density, creamy mouthfeel, and naturally sweet finish.',
      image: '/assets/pouch.jpeg',
      options: [
        { size: '250g', price: 460, mrp: 520 },
        { size: '500g', price: 890, mrp: 999 },
      ],
    },
    {
      id: 'w220',
      grade: 'Grade W220 · Selected Jumbo',
      name: 'The Original W220',
      desc: 'Generously sized whole cashews offering the quintessential crisp snap and delicate buttery character of coastal laterite soil.',
      image: '/assets/pouch.jpeg',
      options: [
        { size: '250g', price: 380, mrp: 440 },
        { size: '500g', price: 740, mrp: 850 },
      ],
    },
    {
      id: 'w320',
      grade: 'Grade W320 · Classic Benchmark',
      name: 'The Original W320',
      desc: 'The traditional standard of Palasa harvests. Pristine whole kernels, perfectly balanced for everyday nourishment and gifting.',
      image: '/assets/pouch.jpeg',
      options: [
        { size: '250g', price: 320, mrp: 380 },
        { size: '500g', price: 620, mrp: 720 },
      ],
    },
  ];

  const handleSizeSelect = (cardIdx, optIdx) => {
    setSelectedSizes((prev) => ({ ...prev, [cardIdx]: optIdx }));
  };

  const handleAddToCart = (product, cardIdx) => {
    const optIdx = selectedSizes[cardIdx] ?? 0;
    const opt = product.options[optIdx];
    setToast(`Added ${product.name} (${opt.size}) to cart!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleBuyNow = (product, cardIdx) => {
    const optIdx = selectedSizes[cardIdx] ?? 0;
    const opt = product.options[optIdx];
    const text = `Hi The Original, I would like to order:\n*${product.name}* (${opt.size}) - ₹${opt.price}\nPlease confirm dispatch details.`;
    const url = `https://wa.me/919100267404?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="section products" id="products">
      <div className="section-inner section-reveal is-revealed">
        <div className="products-header">
          <div className="products-header-content">
            <span className="section-tag">Harvest grades · Palasa origin</span>
            <h2 className="section-title">Signature Palasa cashew grades.</h2>
            <p className="products-header-sub">
              Clean whole kernels sorted by hand and packed at origin. Sourced
              exclusively from the highest-yield coastal orchards of Srikakulam.
            </p>
          </div>
        </div>

        <div className="products-grid">
          {featuredProducts.map((p, cardIdx) => {
            const activeOptIdx = selectedSizes[cardIdx] ?? 0;
            const activeOpt = p.options[activeOptIdx];

            return (
              <article key={p.name} className="product-card">
                <div className="product-image-wrap">
                  <img
                    src={p.image}
                    alt={`${p.name} 500g pouch`}
                    loading="lazy"
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <span className="product-grade">{p.grade}</span>
                  <h3 className="product-title">{p.name}</h3>
                  <p className="product-description">{p.desc}</p>

                  {/* Size Selection Toggle */}
                  <div className="product-size-selector">
                    <span className="size-selector-label">Choose Size:</span>
                    <div className="size-pills">
                      {p.options.map((opt, optIdx) => (
                        <button
                          key={opt.size}
                          type="button"
                          className={`size-pill ${
                            activeOptIdx === optIdx ? 'active' : ''
                          }`}
                          onClick={() => handleSizeSelect(cardIdx, optIdx)}
                        >
                          {opt.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Row */}
                  <div className="product-price-row">
                    <div className="price-stack">
                      <span className="current-price">₹{activeOpt.price}</span>
                      <span className="mrp-price">₹{activeOpt.mrp}</span>
                    </div>
                    <span className="tax-inclusive-tag">Taxes included</span>
                  </div>

                  {/* Add to Cart and Buy Now Buttons */}
                  <div className="product-actions-grid">
                    <button
                      type="button"
                      className="btn-add-to-cart"
                      onClick={() => handleAddToCart(p, cardIdx)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span>Add to cart</span>
                    </button>

                    <button
                      type="button"
                      className="btn-buy-now"
                      onClick={() => handleBuyNow(p, cardIdx)}
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="products-footer-cta">
          <p className="products-footer-note">
            Also harvesting Pottu Pappu, JH, SJH, Chocolate Cashew &amp; Badam,
            Mix Dry Fruit, and seasonal batches.
          </p>
          <a href="/products" className="btn-primary products-view-all">
            View all products
          </a>
        </div>
      </div>

      {/* Quick Action Toast */}
      {toast && (
        <div className="shop-toast" role="status">
          <span className="toast-check">✓</span>
          <span>{toast}</span>
        </div>
      )}
    </section>
  );
}
