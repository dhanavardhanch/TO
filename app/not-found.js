import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Page Not Found · 404 | The Original Palasa Cashews',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="not-found-page">
        <div className="cart-empty-state not-found-state">
          <div className="cart-empty-video-wrap">
            <video
              src="/assets/empty_cart_animation.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="cart-empty-video"
            >
              <source src="/assets/empty_cart_animation.webm" type="video/webm" />
            </video>
          </div>
          <span className="not-found-tag">404 &bull; Page Not Found</span>
          <h1 className="cart-empty-title">Nothing Found Here</h1>
          <p className="cart-empty-sub">
            The page you are looking for does not exist, was removed, or is temporarily unavailable.
          </p>
          <div className="cart-empty-actions">
            <Link href="/products" className="btn-primary cart-shop-btn">
              Browse Products
            </Link>
            <Link href="/" className="btn-secondary cart-home-btn">
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
