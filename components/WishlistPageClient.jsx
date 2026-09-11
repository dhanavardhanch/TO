'use client';

import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import Nav from './Nav';
import Footer from './Footer';

export default function WishlistPageClient() {
  const { wishlist, removeFromWishlist, clearWishlist, addToCart } = useShop();

  const handleMoveToCart = (item) => {
    const opt = item.options?.[0];
    if (!opt) return;
    addToCart({
      id: `${item.id}-${opt.size}`,
      productId: item.id,
      name: item.name,
      size: opt.size,
      price: opt.price,
      mrp: opt.mrp,
      image: item.image,
      quantity: 1,
    });
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <>
        <Nav />
        <main className="wishlist-page">
          <div className="cart-empty-state">
            <div className="cart-empty-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h1 className="cart-empty-title">Your wishlist is empty</h1>
            <p className="cart-empty-sub">Save your favourite cashews by clicking the heart on any product.</p>
            <Link href="/products" className="btn-primary cart-shop-btn">Browse Products</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="wishlist-page">
        <div className="wishlist-inner">
          <div className="wishlist-header">
            <div>
              <h1 className="cart-title">Wishlist</h1>
              <span className="cart-count-badge">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</span>
            </div>
            <button type="button" className="wishlist-clear-btn" onClick={clearWishlist}>
              Clear all
            </button>
          </div>

          <div className="wishlist-grid">
            {wishlist.map((item) => {
              const opt = item.options?.[0];
              return (
                <article key={item.id} className="wishlist-card">
                  <Link href={`/products/${item.id}`} className="wishlist-card-img-link">
                    <div className="wishlist-card-img-wrap">
                      <img src={item.image} alt={item.name} className="wishlist-card-img" width={300} height={300} loading="lazy" />
                    </div>
                  </Link>
                  <div className="wishlist-card-body">
                    <span className="wishlist-card-grade">{item.grade}</span>
                    <h3 className="wishlist-card-name">
                      <Link href={`/products/${item.id}`} className="wishlist-name-link">{item.name}</Link>
                    </h3>
                    {opt && (
                      <div className="wishlist-card-price">
                        <span className="current-price">Rs.{opt.price}</span>
                        {opt.mrp && <span className="mrp-price">Rs.{opt.mrp}</span>}
                        <span className="wishlist-card-size">{opt.size}</span>
                      </div>
                    )}
                    <div className="wishlist-card-actions">
                      <button
                        type="button"
                        className="btn-add-to-cart wishlist-move-btn"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        className="wishlist-remove-btn"
                        onClick={() => removeFromWishlist(item.id)}
                        aria-label="Remove from wishlist"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
