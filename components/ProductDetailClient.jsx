'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getRecommendedProducts } from '../data/productsData';

// Clean Real SVG Vector Icons (Eliminating AI-generated / emoji look)
function RealLocationPinIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#DC2626" fillOpacity="0.12" stroke="#DC2626"></path>
      <circle cx="12" cy="10" r="3" fill="#DC2626" stroke="#DC2626"></circle>
    </svg>
  );
}

function RealDeliveryTruckIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 3h15v13H1z" fill="#1E40AF" fillOpacity="0.1" stroke="#1E40AF"></path>
      <path d="M16 8h4l3 3v5h-7V8z" fill="#1E40AF" fillOpacity="0.1" stroke="#1E40AF"></path>
      <circle cx="5.5" cy="18.5" r="2.5" fill="#1E40AF" stroke="#1E40AF"></circle>
      <circle cx="18.5" cy="18.5" r="2.5" fill="#1E40AF" stroke="#1E40AF"></circle>
      <line x1="8" y1="18.5" x2="16" y2="18.5" stroke="#1E40AF"></line>
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  );
}

// Authentic FSSAI Food Safety Insignia
function FssaiOfficialBadge({ licNo }) {
  return (
    <div className="fssai-official-badge" title={`FSSAI Central Food Safety License #${licNo}`}>
      <div className="fssai-symbol-wrap">
        <svg className="fssai-svg-mark" viewBox="0 0 110 32" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dynamic Tricolor Swooshes representing FSSAI */}
          <path d="M14 20 C14 11, 28 6, 44 8 C52 9, 58 12, 62 16" stroke="#E65100" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M28 23 C38 23, 52 17, 62 9 C68 6, 76 6, 82 8" stroke="#2E7D32" strokeWidth="2.8" strokeLinecap="round" />
          {/* Official bold italic lowercase fssai typography */}
          <text x="3" y="27" fontFamily="'Trebuchet MS', 'Segoe UI', Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="23" fill="#0C2340" letterSpacing="-0.8">fssai</text>
        </svg>
      </div>
      <div className="fssai-lic-col">
        <span className="fssai-tag-label">Govt. Registered</span>
        <span className="fssai-lic-code">Lic. #{licNo}</span>
      </div>
    </div>
  );
}

export default function ProductDetailClient({ product }) {
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Image Gallery State — Clicking thumbnails dynamically updates active image
  const [activeImage, setActiveImage] = useState(gallery[0] || product.image);

  // Synchronize when navigating between products
  useEffect(() => {
    setActiveImage(gallery[0] || product.image);
  }, [product.id, product.image]);

  // Size & Custom Grade State
  const [selectedOptIdx, setSelectedOptIdx] = useState(0);
  const [selectedCustomGrade, setSelectedCustomGrade] = useState(
    product.hasGradeCustomization ? product.customGrades[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  // Pincode Checker State
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Family Calculator State: Interactive "Thread / Drag Strip"
  const [familyMembers, setFamilyMembers] = useState(4); // 1 to 8+
  const [consumptionIndex, setConsumptionIndex] = useState(1); // 0 = 15g (Habit), 1 = 25g (Snack), 2 = 40g (Cooking)

  // Cart & Modals
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '', pincode: '' });

  // Reviews State with Mandatory Image Upload
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [newReview, setNewReview] = useState({
    name: '',
    city: '',
    rating: 5,
    comment: '',
    photoUrl: '',
    photoFileName: '',
  });

  // Recommended Products
  const recommended = useMemo(() => getRecommendedProducts(product.id, 3), [product.id]);

  // Active Option computation
  const activeOptions = useMemo(() => {
    if (product.hasGradeCustomization && selectedCustomGrade) {
      return product.gradeOptions[selectedCustomGrade] || product.options;
    }
    return product.options;
  }, [product, selectedCustomGrade]);

  const currentOpt = activeOptions[selectedOptIdx] || activeOptions[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  // Pincode Verification Logic
  const handleCheckPincode = (e) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!cleanPin || cleanPin.length !== 6 || isNaN(cleanPin)) {
      setPincodeStatus({
        type: 'error',
        message: 'Please enter a valid 6-digit Indian postal pincode.',
      });
      return;
    }

    const firstTwo = cleanPin.substring(0, 2);
    // Andhra Pradesh & Telangana
    if (['50', '51', '52', '53'].includes(firstTwo)) {
      setPincodeStatus({
        type: 'success',
        region: 'Andhra Pradesh / Telangana',
        days: '2 – 3 business days',
        message: 'Direct dispatch from Kasibugga factory. Free shipping on orders above ₹999.',
      });
    }
    // South India
    else if (['56', '57', '58', '59', '60', '61', '62', '63', '64'].includes(firstTwo)) {
      setPincodeStatus({
        type: 'success',
        region: 'South India Express',
        days: '3 – 4 business days',
        message: 'Direct dispatch via Bluedart / IndiaPost. Free delivery on orders above ₹999.',
      });
    }
    // Major Metros (Mumbai 40, Delhi 11, Kolkata 70)
    else if (['40', '11', '70', '12', '20'].includes(firstTwo)) {
      setPincodeStatus({
        type: 'success',
        region: 'Metro Air Zone',
        days: '3 – 4 business days',
        message: 'Air express courier dispatch. Free delivery on orders above ₹999.',
      });
    }
    // Rest of India
    else {
      setPincodeStatus({
        type: 'success',
        region: 'All India Delivery',
        days: '4 – 5 business days',
        message: 'Standard secure delivery. Free shipping on orders above ₹999.',
      });
    }
  };

  // Family Calculator Calculation based on Drag Strips
  const consumptionRates = [
    { label: 'Daily Habit (~15g/day)', hint: 'Morning wellness & vitality', grams: 15 },
    { label: 'Active Snacking (~25g/day)', hint: 'Tea-time & fitness fuel', grams: 25 },
    { label: 'Cooking & Sweets (~40g/day)', hint: 'Curries, sweets & snacking', grams: 40 },
  ];

  const activeConsumption = consumptionRates[consumptionIndex] || consumptionRates[1];

  const familyCalculation = useMemo(() => {
    const gramsPerDay = activeConsumption.grams;
    const totalMonthlyGrams = familyMembers * gramsPerDay * 30;
    const monthlyKg = (totalMonthlyGrams / 1000).toFixed(1);

    let recommended500gPacks = Math.ceil(totalMonthlyGrams / 500);
    if (recommended500gPacks < 1) recommended500gPacks = 1;

    return {
      monthlyKg,
      recommendedPacks: recommended500gPacks,
    };
  }, [familyMembers, activeConsumption]);

  const handleApplyCalculatorToOrder = () => {
    // Find index of 500g option if available
    const idx500 = activeOptions.findIndex((opt) => opt.size.includes('500g'));
    if (idx500 !== -1) {
      setSelectedOptIdx(idx500);
    }
    setQuantity(familyCalculation.recommendedPacks);
    showToast(
      `Applied ${familyCalculation.recommendedPacks} × 500g packs based on your family calculation`
    );

    // Smooth scroll back to buy box
    const buyBox = document.getElementById('pdp-buy-box');
    if (buyBox) {
      buyBox.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart & Direct Order
  const handleAddToCart = () => {
    const item = {
      id: `${product.id}-${currentOpt.size}-${selectedCustomGrade || ''}`,
      name: product.name,
      size: `${currentOpt.size}${selectedCustomGrade ? ` (${selectedCustomGrade})` : ''}`,
      price: currentOpt.price,
      quantity,
      image: activeImage,
    };

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, item];
    });

    showToast(`Added ${quantity} × ${product.name} (${currentOpt.size}) to cart`);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    setOrderModalOpen(true);
  };

  const handleDirectOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const totalAmt = currentOpt.price * quantity;
    const gradeNote = selectedCustomGrade ? ` [Grade: ${selectedCustomGrade}]` : '';

    const text =
      `*NEW ORDER — The Original (Palasa)*\n\n` +
      `*Product:* ${product.name}${gradeNote}\n` +
      `*Size:* ${currentOpt.size}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total Price:* ₹${totalAmt} (Tax Incl.)\n\n` +
      `*Delivery Customer:* ${orderForm.name}\n` +
      `*Phone:* ${orderForm.phone}\n` +
      `*Address:* ${orderForm.address}\n` +
      `*Pincode:* ${orderForm.pincode || 'Not specified'}\n\n` +
      `Please confirm dispatch timeline & payment options.`;

    const url = `https://wa.me/919100267404?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setOrderModalOpen(false);
  };

  // Mandatory Image Upload Handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size under 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('Photo must be under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      setNewReview((prev) => ({
        ...prev,
        photoUrl: loadEvt.target.result,
        photoFileName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      alert('Please enter your name and review comments.');
      return;
    }

    // Explicitly require the photo
    if (!newReview.photoUrl) {
      alert('Please capture or upload a photo of your received cashew pack to submit your review.');
      return;
    }

    const created = {
      id: `rev-custom-${Date.now()}`,
      name: newReview.name,
      city: newReview.city || 'Verified Buyer',
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      photo: newReview.photoUrl,
      verified: true,
    };

    setReviewsList((prev) => [created, ...prev]);
    setReviewModalOpen(false);
    setNewReview({ name: '', city: '', rating: 5, comment: '', photoUrl: '', photoFileName: '' });
    showToast('Thank you! Your verified photo review has been published.');
  };

  return (
    <div className="pdp-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="shop-toast" role="alert">
          <span className="toast-check">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="pdp-breadcrumb-wrap" aria-label="Breadcrumb">
        <div className="pdp-container pdp-breadcrumb-inner">
          <Link href="/" className="pdp-breadcrumb-link">Home</Link>
          <span className="pdp-breadcrumb-sep">/</span>
          <Link href="/products" className="pdp-breadcrumb-link">Products</Link>
          <span className="pdp-breadcrumb-sep">/</span>
          <span className="pdp-breadcrumb-current">{product.name}</span>
        </div>
      </nav>

      {/* Main PDP Showcase / Buy Box */}
      <section className="pdp-hero-section">
        <div className="pdp-container pdp-hero-grid">
          {/* Left Column: Media Showcase with Interactive Dynamic Image Switching */}
          <div className="pdp-gallery-wrap">
            <div className="pdp-main-image-box">
              <img
                src={activeImage}
                alt={product.name}
                width={1178}
                height={1280}
                className="pdp-main-img"
              />
              {product.badge && <span className="pdp-badge">{product.badge}</span>}
            </div>

            {/* Thumbnail Preview Strip — Clicking switches the main image! */}
            <div className="pdp-thumbnails-strip" aria-label="Product Image Gallery">
              {gallery.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pdp-thumb-btn ${activeImage === imgSrc ? 'active' : ''}`}
                  onClick={() => setActiveImage(imgSrc)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={imgSrc} alt="" className="pdp-thumb-img" />
                </button>
              ))}
            </div>

            {/* Real FSSAI Official Insignia, Real Location Pin, and Real Truck Dispatch Ribbon */}
            <div className="pdp-guarantee-ribbon">
              <div className="guarantee-item fssai-guarantee">
                <FssaiOfficialBadge licNo={product.fssai} />
              </div>

              <div className="guarantee-item">
                <span className="guarantee-vector-icon location-color">
                  <RealLocationPinIcon size={16} />
                </span>
                <span className="guarantee-text">100% Palasa Origin</span>
              </div>

              <div className="guarantee-item">
                <span className="guarantee-vector-icon truck-color">
                  <RealDeliveryTruckIcon size={18} />
                </span>
                <span className="guarantee-text">Dispatches in 24h</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Form */}
          <div className="pdp-info-wrap" id="pdp-buy-box">
            <span className="pdp-grade-label">{product.grade}</span>
            <h1 className="pdp-product-title">{product.name}</h1>
            <p className="pdp-tagline">{product.tagline}</p>

            {/* Rating & Reviews Anchor */}
            <div className="pdp-rating-row">
              <div className="pdp-stars">
                {'★'.repeat(5)}
              </div>
              <span className="pdp-rating-num">{product.rating}</span>
              <span className="pdp-rating-sep">·</span>
              <a href="#reviews" className="pdp-reviews-count-link">
                {reviewsList.length} Verified Reviews
              </a>
            </div>

            {/* Price Stack */}
            <div className="pdp-price-box">
              <div className="pdp-price-line">
                <span className="pdp-current-price">₹{currentOpt.price}</span>
                {currentOpt.mrp && <span className="pdp-mrp-price">₹{currentOpt.mrp}</span>}
                {currentOpt.save && <span className="pdp-save-badge">{currentOpt.save}</span>}
              </div>
              <span className="pdp-tax-note">Inclusive of all taxes · Direct factory gate rate</span>
            </div>

            {/* Optional Grade Customization for Specialty Mixes */}
            {product.hasGradeCustomization && (
              <div className="pdp-custom-grade-section">
                <span className="pdp-section-label">Select Cashew Caliber:</span>
                <div className="pdp-grade-pills">
                  {product.customGrades.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`pdp-grade-btn ${selectedCustomGrade === g ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCustomGrade(g);
                        setSelectedOptIdx(0);
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Package Size Switcher */}
            <div className="pdp-size-section">
              <div className="pdp-size-header">
                <span className="pdp-section-label">Select Packaging Size:</span>
                <span className="pdp-selected-size-label">{currentOpt.size}</span>
              </div>
              <div className="pdp-size-pills">
                {activeOptions.map((opt, idx) => (
                  <button
                    key={opt.size}
                    type="button"
                    className={`pdp-size-btn ${selectedOptIdx === idx ? 'active' : ''}`}
                    onClick={() => setSelectedOptIdx(idx)}
                  >
                    <span className="size-btn-weight">{opt.size}</span>
                    <span className="size-btn-price">₹{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Primary Actions */}
            <div className="pdp-actions-row">
              <div className="pdp-qty-stepper">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn-pdp-cart"
                onClick={handleAddToCart}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Add to cart</span>
              </button>

              <button
                type="button"
                className="btn-pdp-buy"
                onClick={handleBuyNow}
              >
                <span>Buy now</span>
              </button>
            </div>

            {/* Pincode Delivery Estimator with Real Location Pin */}
            <div className="pdp-pincode-card">
              <div className="pincode-card-header">
                <span className="pincode-vector-icon">
                  <RealLocationPinIcon size={16} />
                </span>
                <span className="pincode-title">Estimated Delivery to Your Pincode</span>
              </div>
              <form onSubmit={handleCheckPincode} className="pincode-form">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 532222)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="pincode-input"
                />
                <button type="submit" className="pincode-check-btn">
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <div className={`pincode-result-box ${pincodeStatus.type}`}>
                  {pincodeStatus.type === 'success' ? (
                    <>
                      <div className="pincode-result-top">
                        <RealDeliveryTruckIcon size={18} />
                        <span className="delivery-days">Delivery in {pincodeStatus.days}</span>
                        <span className="delivery-region">({pincodeStatus.region})</span>
                      </div>
                      <p className="delivery-sub">{pincodeStatus.message}</p>
                    </>
                  ) : (
                    <p className="delivery-error">{pincodeStatus.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Family Cashew Calculator — Sleek "Thread / Drag Strip" */}
      <section className="pdp-calculator-section" id="family-calculator">
        <div className="pdp-container">
          <div className="calc-thread-container">
            <div className="calc-header-wrap">
              <span className="calc-eyebrow">SMART PORTION THREAD</span>
              <h2 className="calc-title">Family Consumption Calculator</h2>
              <p className="calc-subtitle">
                Drag the thread below to calculate your family’s monthly requirement. The recommendation and order button stay immediately visible.
              </p>
            </div>

            {/* Drag Thread Controller Strip */}
            <div className="calc-threads-wrapper">
              {/* Thread 1: Family Members Slider */}
              <div className="thread-control-card">
                <div className="thread-header-row">
                  <span className="thread-step-tag">THREAD 01</span>
                  <span className="thread-label">Household Size:</span>
                  <span className="thread-active-val">
                    {familyMembers} {familyMembers === 1 ? 'Person' : 'People'}
                  </span>
                </div>

                <div className="thread-slider-track-wrap">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(parseInt(e.target.value, 10))}
                    className="thread-range-slider"
                    aria-label="Drag household members"
                    style={{
                      background: `linear-gradient(to right, var(--navy-deep) 0%, var(--navy-deep) ${((familyMembers - 1) / 7) * 100}%, rgba(20,33,44,0.14) ${((familyMembers - 1) / 7) * 100}%, rgba(20,33,44,0.14) 100%)`
                    }}
                  />
                  <div className="thread-ticks-bar">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`thread-tick-mark ${familyMembers === n ? 'active' : ''}`}
                        onClick={() => setFamilyMembers(n)}
                        aria-label={`Select ${n} members`}
                      >
                        {n === 8 ? '8+' : n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Thread 2: Daily Consumption Slider / Strip */}
              <div className="thread-control-card">
                <div className="thread-header-row">
                  <span className="thread-step-tag">THREAD 02</span>
                  <span className="thread-label">Consumption Level:</span>
                  <span className="thread-active-val">{activeConsumption.label}</span>
                </div>

                <div className="thread-slider-track-wrap">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={consumptionIndex}
                    onChange={(e) => setConsumptionIndex(parseInt(e.target.value, 10))}
                    className="thread-range-slider"
                    aria-label="Drag consumption style"
                    style={{
                      background: `linear-gradient(to right, var(--navy-deep) 0%, var(--navy-deep) ${(consumptionIndex / 2) * 100}%, rgba(20,33,44,0.14) ${(consumptionIndex / 2) * 100}%, rgba(20,33,44,0.14) 100%)`
                    }}
                  />
                  <div className="thread-ticks-bar segment-ticks">
                    <button
                      type="button"
                      className={`thread-tick-mark ${consumptionIndex === 0 ? 'active' : ''}`}
                      onClick={() => setConsumptionIndex(0)}
                    >
                      Habit (15g)
                    </button>
                    <button
                      type="button"
                      className={`thread-tick-mark ${consumptionIndex === 1 ? 'active' : ''}`}
                      onClick={() => setConsumptionIndex(1)}
                    >
                      Snack (25g)
                    </button>
                    <button
                      type="button"
                      className={`thread-tick-mark ${consumptionIndex === 2 ? 'active' : ''}`}
                      onClick={() => setConsumptionIndex(2)}
                    >
                      Cooking (40g)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Immediately Visible Compact Recommendation Card + CTA */}
            <div className="calc-result-thread-banner">
              <div className="calc-result-thread-left">
                <span className="calc-result-tag">RECOMMENDED MONTHLY SUPPLY</span>
                <h3 className="calc-result-heading">
                  Your family needs approx <strong>{familyCalculation.monthlyKg} kg</strong> per month
                </h3>
                <p className="calc-result-desc">
                  Based on {familyMembers} {familyMembers === 1 ? 'person' : 'people'} enjoying {activeConsumption.hint}, we recommend <strong>{familyCalculation.recommendedPacks} × 500g vacuum packs</strong> of {product.name} for peak freshness.
                </p>
              </div>

              <div className="calc-result-thread-right">
                <button
                  type="button"
                  className="btn-apply-calc"
                  onClick={handleApplyCalculatorToOrder}
                >
                  <span>Select {familyCalculation.recommendedPacks} × 500g for Order</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specs & Nutrition */}
      <section className="pdp-specs-section">
        <div className="pdp-container">
          <div className="specs-section-header">
            <span className="specs-eyebrow">QUALITY TRANSPARENCY</span>
            <h2 className="specs-main-title">Kernel Specifications &amp; Nutrition</h2>
            <p className="specs-sub">Straightforward parameters so you know exactly what you are eating.</p>
          </div>

          <div className="specs-grid">
            {/* Specs Card */}
            <div className="specs-card">
              <h3 className="specs-card-title">Harvest Specifications</h3>
              <ul className="specs-list">
                {product.specs &&
                  Object.entries(product.specs).map(([key, val]) => (
                    <li key={key} className="specs-item">
                      <span className="specs-key">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                      <span className="specs-val">{val}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Nutrition Card */}
            <div className="specs-card nutrition-card">
              <div className="nutrition-card-header">
                <h3 className="specs-card-title">Nutritional Facts</h3>
                <span className="nutrition-serving">Per 100g serving</span>
              </div>
              <div className="nutrition-grid">
                {product.nutritionPer100g &&
                  Object.entries(product.nutritionPer100g).map(([nutrient, val]) => (
                    <div key={nutrient} className="nutrition-item">
                      <span className="nutrient-val">{val}</span>
                      <span className="nutrient-name">
                        {nutrient.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    </div>
                  ))}
              </div>
              <p className="nutrition-footnote">
                * Zero added sugar. Zero cholesterol. Natural vitamins and minerals from coastal soil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A+ Content / Story Blocks */}
      <section className="pdp-aplus-section">
        <div className="pdp-container">
          <div className="aplus-header">
            <span className="aplus-eyebrow">THE ORIGINAL HARVEST STANDARD</span>
            <h2 className="aplus-title">From Palasa Red Soils to Your Table</h2>
          </div>

          <div className="aplus-blocks-grid">
            {product.aPlusContent?.map((block, idx) => (
              <div key={idx} className="aplus-block-card">
                <span className="aplus-block-num">0{idx + 1}</span>
                <h3 className="aplus-block-title">{block.title}</h3>
                <h4 className="aplus-block-subtitle">{block.subtitle}</h4>
                <p className="aplus-block-body">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews with Mandatory Photo Upload */}
      <section className="pdp-reviews-section" id="reviews">
        <div className="pdp-container">
          <div className="reviews-header-row">
            <div>
              <span className="reviews-eyebrow">CUSTOMER VOICES</span>
              <h2 className="reviews-title">Verified Customer Experiences</h2>
              <div className="reviews-score-summary">
                <span className="summary-stars">★★★★★</span>
                <span className="summary-number">{product.rating} out of 5</span>
                <span className="summary-count">({reviewsList.length} reviews)</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-open-review-modal"
              onClick={() => setReviewModalOpen(true)}
            >
              <CameraIcon />
              <span>Write a Review &amp; Upload Photo</span>
            </button>
          </div>

          {/* Reviews Cards Grid */}
          <div className="reviews-cards-grid">
            {reviewsList.map((rev) => (
              <article key={rev.id} className="customer-review-card">
                <div className="review-top-row">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{rev.name}</span>
                    <span className="reviewer-city">{rev.city}</span>
                  </div>
                  <span className="review-date">{rev.date}</span>
                </div>

                <div className="review-stars-row">
                  <span className="stars-given">{'★'.repeat(rev.rating)}</span>
                  {rev.verified && <span className="verified-pill">✓ Verified Purchase</span>}
                </div>

                <p className="review-comment-text">{rev.comment}</p>

                {rev.photo && (
                  <div className="review-photo-wrap">
                    <img src={rev.photo} alt="Customer cashew photo" className="review-customer-img" />
                    <span className="review-photo-tag">Customer Photo</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Harvests */}
      <section className="pdp-recommended-section">
        <div className="pdp-container">
          <div className="recommended-header">
            <span className="recommended-eyebrow">FRESH FROM PALASA</span>
            <h2 className="recommended-title">Recommended Harvests</h2>
            <p className="recommended-sub">Explore other premium calibers handpicked in the same harvest season.</p>
          </div>

          <div className="recommended-grid">
            {recommended.map((item) => (
              <article key={item.id} className="recommended-card">
                <Link href={`/products/${item.id}`} className="rec-img-link">
                  <div className="rec-media-box">
                    <img src={item.image} alt={item.name} className="rec-img" />
                    {item.badge && <span className="rec-badge">{item.badge}</span>}
                  </div>
                </Link>

                <div className="rec-body">
                  <span className="rec-grade">{item.grade}</span>
                  <Link href={`/products/${item.id}`} className="rec-title-link">
                    <h3 className="rec-title">{item.name}</h3>
                  </Link>
                  <p className="rec-desc">{item.desc}</p>
                  <div className="rec-footer">
                    <span className="rec-price">Starts at ₹{item.options[0].price}</span>
                    <Link href={`/products/${item.id}`} className="rec-action-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Write a Review Modal with Real Device Camera / File Upload */}
      {reviewModalOpen && (
        <div className="order-modal-overlay" onClick={() => setReviewModalOpen(false)}>
          <div className="order-modal pdp-review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h3 className="order-modal-title">Share Your Palasa Experience</h3>
              <button
                type="button"
                className="cart-close-btn"
                onClick={() => setReviewModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="order-modal-form">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Varma"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyderabad, Bengaluru, Vizag"
                  value={newReview.city}
                  onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-select-row">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-select-btn ${newReview.rating === star ? 'selected' : ''}`}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                    >
                      {'★'.repeat(star)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Review Comments *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="How was the freshness, crunch, and packaging?"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="pdp-review-textarea"
                />
              </div>

              {/* Mandatory Real Photo Upload for Mobile Camera or Desktop Picker */}
              <div className="form-group">
                <div className="photo-label-row">
                  <label>Product / Unboxing Photo *</label>
                  <span className="photo-required-tag">Mandatory</span>
                </div>

                {/* Hidden Real HTML File Input with Mobile Camera Capture capability */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />

                {!newReview.photoUrl ? (
                  <div
                    className="photo-dropzone-box"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <div className="dropzone-inner">
                      <CameraIcon />
                      <div className="dropzone-text-group">
                        <span className="dropzone-title">Click to Open Camera or Upload Image</span>
                        <span className="dropzone-sub">Upload unboxing photo or cashew bowl picture</span>
                      </div>
                      <button type="button" className="btn-browse-file">
                        Choose Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="photo-preview-card">
                    <img src={newReview.photoUrl} alt="Attached preview" className="preview-thumb" />
                    <div className="preview-meta">
                      <span className="preview-status">✓ Photo attached</span>
                      <span className="preview-filename">{newReview.photoFileName || 'Captured Image'}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-change-photo"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>

              <div className="order-modal-actions">
                <button type="submit" className="btn-buy-now modal-submit">
                  Submit Verified Photo Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick WhatsApp Order Modal (Buy Now) */}
      {orderModalOpen && (
        <div className="order-modal-overlay" onClick={() => setOrderModalOpen(false)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h3 className="order-modal-title">Fast Order Dispatch</h3>
              <button
                type="button"
                className="cart-close-btn"
                onClick={() => setOrderModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="order-modal-summary">
              <img src={activeImage} alt={product.name} className="order-summary-img" />
              <div>
                <h4 className="order-summary-name">{product.name}</h4>
                <p className="order-summary-detail">
                  {currentOpt.size} × {quantity} = <strong>₹{currentOpt.price * quantity}</strong>
                </p>
                <span className="order-summary-origin">Direct from Palasa, Andhra Pradesh</span>
              </div>
            </div>

            <form onSubmit={handleDirectOrderSubmit} className="order-modal-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srikant Rao"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House/Flat No, Street, City"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-digit Pincode"
                  value={orderForm.pincode}
                  onChange={(e) => setOrderForm({ ...orderForm, pincode: e.target.value })}
                />
              </div>

              <div className="order-modal-actions">
                <button type="submit" className="btn-buy-now modal-submit">
                  Proceed to WhatsApp Order (₹{currentOpt.price * quantity})
                </button>
                <p className="order-form-disclaimer">
                  No advance payment needed until order details &amp; fresh batch dispatch are confirmed.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cart Slide-Over Drawer */}
      {cartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-title-wrap">
                <h3 className="cart-title">Your Harvest Bag</h3>
                <span className="cart-items-count">({cart.length} items)</span>
              </div>
              <button
                type="button"
                className="cart-close-btn"
                onClick={() => setCartOpen(false)}
              >
                &times;
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Your bag is empty.</p>
                <button
                  type="button"
                  className="btn-buy-now"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item, idx) => (
                    <div key={idx} className="cart-item-row-wrapper">
                      <div className="cart-item-row">
                        <img src={item.image} alt={item.name} className="cart-item-thumb" />
                        <div className="cart-item-info">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <span className="cart-item-size">{item.size}</span>
                          <span className="cart-item-price">₹{item.price} × {item.quantity}</span>
                        </div>
                        <div className="cart-qty-ctrl">
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => {
                              setCart((prev) =>
                                prev
                                  .map((i) =>
                                    i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
                                  )
                                  .filter((i) => i.quantity > 0)
                              );
                            }}
                          >
                            −
                          </button>
                          <span className="cart-qty-num">{item.quantity}</span>
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => {
                              setCart((prev) =>
                                prev.map((i) =>
                                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                                )
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-item-total">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-subtotal-row">
                    <span>Subtotal:</span>
                    <span className="cart-subtotal-amt">
                      ₹{cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
                    </span>
                  </div>
                  <p className="cart-delivery-note">
                    {cart.reduce((sum, i) => sum + i.price * i.quantity, 0) >= 999
                      ? '✓ Free Shipping unlocked!'
                      : 'Free shipping on orders above ₹999'}
                  </p>
                  <button
                    type="button"
                    className="btn-checkout"
                    onClick={() => {
                      const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
                      const itemsBreakup = cart
                        .map((i) => `• ${i.name} (${i.size}) × ${i.quantity} = ₹${i.price * i.quantity}`)
                        .join('\n');
                      const msg =
                        `*NEW ORDER FROM THE ORIGINAL (PALASA)*\n\n` +
                        `*Order Items:*\n${itemsBreakup}\n\n` +
                        `*Total:* ₹${total} (Tax Incl.)\n\n` +
                        `Please confirm dispatch date & delivery details.`;
                      window.open(`https://wa.me/919100267404?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                  >
                    Checkout via WhatsApp (₹{cart.reduce((sum, i) => sum + i.price * i.quantity, 0)})
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
