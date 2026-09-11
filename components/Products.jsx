'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';

export default function Products() {
  const [selectedSizes, setSelectedSizes] = useState({ 0: 0, 1: 0, 2: 0 });
  const [toast, setToast] = useState('');
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const featuredProducts = [
    {
      id: 'w180',
      grade: 'Grade W180 Â· Jumbo King',
      name: 'The Original W180',
      desc: 'The rarest and largest king cashew of Palasa. Renowned for its rich ivory density, creamy mouthfeel, and naturally sweet finish.',
      image: '/assets/pouch.jpeg',
      options: [
        { size: '250g', price: 460, mrp: 520 },
        { size: '500g', price: 890, mrp: 999 },
      ],
    },
    {
      id: 'w240',
      grade: 'Grade W240 Â· Standard Jumbo',
      name: 'The Original W240',
      desc: 'Generously sized whole cashews offering the quintessential crisp snap and delicate buttery character of coastal laterite soil.',
      image: '/assets/pouch.jpeg',
      options: [
        { size: '250g', price: 380, mrp: 440 },
        { size: '500g', price: 740, mrp: 850 },
      ],
    },
    {
      id: 'w320',
      grade: 'Grade W320 Â· Classic Benchmark',
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
    addToCart({
      id: `${product.id}-${opt.size}`,
      productId: product.id,
      name: product.name,
      size: opt.size,
      price: opt.price,
      mrp: opt.mrp,
      image: product.image,
      quantity: 1,
    });
    setToast(`Added ${product.name} (${opt.size}) to cart!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleBuyNow = (product, cardIdx) => {
    const optIdx = selectedSizes[cardIdx] ?? 0;
    const opt = product.options[optIdx];
    const text = `Hi The Original, I would like to order:\n*${product.name}* (${opt.size}) | â‚¹${opt.price}\nPlease confirm dispatch details.`;
    const url = `https://wa.me/919100267404?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleToggleWishlist = (product) => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      grade: product.grade,
      image: product.image,
      desc: product.desc,
      options: product.options,
    });
    const msg = isWishlisted(product.id) ? `Removed from wishlist` : `Added to wishlist!`;
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <section className="section products" id="products">
      {/* Top-right decorative cashew bowl visual */}
      <div className="products-corner-cashews" aria-hidden="true">
        <img
          src="/assets/cashew-bowl-corner.png"
          alt=""
          className="corner-cashews-img"
          width={860}
          height={668}
          loading="lazy"
        />
      </div>

      <div className="section-inner section-reveal">
        {/* Section Header */}
        <div className="products-showcase-header">
          <div className="products-header-content">
            <span className="products-eyebrow">PREMIUM PALASA CASHEWS</span>
            <h2 className="section-title products-main-title">
              Pure. Natural. Exceptional.
            </h2>
            <p className="products-header-sub">
              Carefully sourced from the rich soils of Palasa, our cashews bring you
              unmatched taste, quality and purity in every bite.
            </p>
          </div>

          <div className="products-header-callout">
            <span className="callout-script">From the Cashew Capital</span>
            <span className="callout-sub">â€” Palasa â€”</span>
            <div className="callout-line"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {featuredProducts.map((p, cardIdx) => {
            const activeOptIdx = selectedSizes[cardIdx] ?? 0;
            const activeOpt = p.options[activeOptIdx];
            const wishlisted = isWishlisted(p.id);

            return (
              <article key={p.name} className="product-card">
                <Link
                  href={`/products/${p.id}`}
                  className="product-image-link"
                  aria-label={`View details for ${p.name}`}
                >
                  <div className="product-image-wrap">
                    <span className="product-grade-badge">
                      {p.grade.split('Â·')[0].trim().toUpperCase()}
                    </span>
                    <img
                      src={p.image}
                      alt={`${p.name} pouch`}
                      width={1178}
                      height={1280}
                      loading="lazy"
                      className="product-image"
                    />
                  </div>
                </Link>

                {/* Wishlist Heart */}
                <button
                  type="button"
                  className={`card-wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
                  onClick={() => handleToggleWishlist(p)}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>

                <div className="product-info">
                  <h3 className="product-title">
                    <Link href={`/products/${p.id}`} className="product-title-link">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="product-description">{p.desc}</p>

                  <div className="product-price-row">
                    <div className="price-stack">
                      <span className="current-price">â‚¹{activeOpt.price}</span>
                      <span className="mrp-price">â‚¹{activeOpt.mrp}</span>
                    </div>
                    <span className="tax-inclusive-tag">Taxes included</span>
                  </div>

                  <div className="product-size-selector">
                    <span className="size-selector-label">Choose Size:</span>
                    <div className="size-pills">
                      {p.options.map((opt, optIdx) => (
                        <button
                          key={opt.size}
                          type="button"
                          className={`size-pill ${activeOptIdx === optIdx ? 'active' : ''}`}
                          onClick={() => handleSizeSelect(cardIdx, optIdx)}
                        >
                          {opt.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="product-actions-grid">
                    <button
                      type="button"
                      className="btn-add-to-cart"
                      onClick={() => handleAddToCart(p, cardIdx)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <span>Buy now</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
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

      {toast && (
        <div className="shop-toast" role="status">
          <span className="toast-check">âœ“</span>
          <span>{toast}</span>
        </div>
      )}
    </section>
  );
}
