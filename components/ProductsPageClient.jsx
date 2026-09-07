'use client';

import { useState, useMemo } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export const PRODUCTS_DATA = [
  // --- Whole Cashews ---
  {
    id: 'w180',
    name: 'The Original W180',
    grade: 'Grade W180 · Jumbo King',
    category: 'cashews',
    categoryLabel: 'Whole Cashews',
    desc: 'The rarest and largest king cashew of Palasa. Renowned for its rich ivory density, creamy mouthfeel, and naturally sweet finish.',
    image: '/assets/pouch.jpeg',
    badge: 'Jumbo King',
    options: [
      { size: '250g', price: 460, mrp: 520 },
      { size: '500g', price: 890, mrp: 999 },
    ],
  },
  {
    id: 'w220',
    name: 'The Original W220',
    grade: 'Grade W220 · Selected Jumbo',
    category: 'cashews',
    categoryLabel: 'Whole Cashews',
    desc: 'Generously sized whole cashews offering the quintessential crisp snap and delicate buttery character of coastal laterite soil.',
    image: '/assets/pouch.jpeg',
    badge: 'Popular',
    options: [
      { size: '250g', price: 380, mrp: 440 },
      { size: '500g', price: 740, mrp: 850 },
    ],
  },
  {
    id: 'w320',
    name: 'The Original W320',
    grade: 'Grade W320 · Classic Benchmark',
    category: 'cashews',
    categoryLabel: 'Whole Cashews',
    desc: 'The traditional standard of Palasa harvests. Pristine whole kernels, perfectly balanced for everyday nourishment and gifting.',
    image: '/assets/pouch.jpeg',
    badge: 'Benchmark',
    options: [
      { size: '250g', price: 320, mrp: 380 },
      { size: '500g', price: 620, mrp: 720 },
    ],
  },

  // --- Skin Cashews (Pottu Pappu) ---
  {
    id: 'pottu-pappu',
    name: 'Palasa Raw Cashew Nuts / Skin Cashews',
    grade: 'Heritage Roasted · Skin-On (Pottu Pappu)',
    category: 'skin',
    categoryLabel: 'Skin Cashews',
    desc: 'Traditional unpeeled Palasa cashews roasted slow with protective natural skin intact. Extra crunch, nutty roasted depth, and high natural fiber.',
    image: '/assets/skin-cashew.png',
    badge: 'Heritage Roasted',
    options: [
      { size: '250g', price: 290, mrp: 350 },
      { size: '500g', price: 560, mrp: 660 },
    ],
  },

  // --- Split Cashews ---
  {
    id: 'jh',
    name: 'The Original JH',
    grade: 'JH · Clean Split Halves',
    category: 'splits',
    categoryLabel: 'Split Cashews',
    desc: 'Clean natural split cashews. Perfect for traditional Andhra sweets, rich curries, gravies, and everyday culinary excellence.',
    image: '/assets/grade-jh.jpg',
    badge: 'Culinary Choice',
    options: [
      { size: '250g', price: 260, mrp: 310 },
      { size: '500g', price: 499, mrp: 590 },
    ],
  },
  {
    id: 'sjh',
    name: 'The Original SJH',
    grade: 'SJH · Small Split Kernels',
    category: 'splits',
    categoryLabel: 'Split Cashews',
    desc: 'Finely sorted small split cashews, hand selected for uniform texture, kheer, halwa, pulav, and festive baking.',
    image: '/assets/grade-jh.jpg',
    badge: 'Kitchen Essential',
    options: [
      { size: '250g', price: 240, mrp: 290 },
      { size: '500g', price: 460, mrp: 540 },
    ],
  },

  // --- Chocolates & Dry Fruits ---
  {
    id: 'choco-cashew-badam',
    name: 'Chocolate Cashew & Badam',
    grade: 'Artisanal Confectionery · Handcrafted',
    category: 'dryfruits',
    categoryLabel: 'Chocolates & Dry Fruits',
    desc: 'Roasted whole Palasa cashews and California almonds coated in rich artisanal dark chocolate. A velvety, crisp festive treat.',
    image: '/assets/pouch.jpeg',
    badge: 'Artisanal',
    options: [
      { size: '100g', price: 220, mrp: 260 },
      { size: '200g', price: 420, mrp: 499 },
    ],
  },
  {
    id: 'mix-dry-fruit',
    name: 'Royal Mix Dry Fruit Selection',
    grade: '5-in-1 Blend · Almond, Cashew, Pista, Raisin, Walnut',
    category: 'dryfruits',
    categoryLabel: 'Chocolates & Dry Fruits',
    desc: 'Curated 5-variety luxury dry fruit blend: Palasa whole cashews, rich California almonds, green pistachios, golden Afghan raisins, and walnut halves.',
    image: '/assets/dryfruits-category.png',
    badge: 'Superfood Blend',
    options: [
      { size: '100g each', price: 350, mrp: 420 },
      { size: '200g each', price: 680, mrp: 799 },
    ],
  },
  {
    id: 'flavoured-cashew',
    name: 'Flavoured Cashew (Coming Soon)',
    grade: 'Gourmet Roasted Infusions',
    category: 'dryfruits',
    categoryLabel: 'Chocolates & Dry Fruits',
    desc: 'Palasa whole cashews roasted in small batches with Peri Peri, Himalayan Pink Salt & Cracked Black Pepper. Pre order open now.',
    image: '/assets/pouch.jpeg',
    badge: 'Coming Soon',
    isComingSoon: true,
    options: [
      { size: '100g', price: 190, mrp: 230 },
      { size: '200g', price: 360, mrp: 420 },
    ],
  },

  // --- Combos ---
  {
    id: 'combo-w320-w220',
    name: 'W320 + W220 Combo',
    grade: 'Signature Dual Pack · Classic & Jumbo',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'Pairing our most celebrated everyday whole cashew W320 with the generously sized W220. Balance of crunch and sweetness.',
    image: '/assets/pouch.jpeg',
    badge: 'Value Pair',
    options: [
      { size: '500g (250g × 2)', price: 680, mrp: 790 },
      { size: '1kg (500g × 2)', price: 1320, mrp: 1540 },
    ],
  },
  {
    id: 'combo-w320-w180',
    name: 'W320 + W180 Combo',
    grade: 'Everyday Standard + Jumbo King',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'Experience the spectrum of Palasa sizes: the timeless W320 paired with the colossal, buttery W180 Jumbo King.',
    image: '/assets/pouch.jpeg',
    badge: 'Bestseller Duo',
    options: [
      { size: '500g (250g × 2)', price: 760, mrp: 880 },
      { size: '1kg (500g × 2)', price: 1480, mrp: 1720 },
    ],
  },
  {
    id: 'combo-w220-w180',
    name: 'W220 + W180 Combo',
    grade: 'Exclusively Jumbo Pairing',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'The ultimate royal pairing for cashew connoisseurs: two exclusively jumbo grades side by side in luxury pouches.',
    image: '/assets/pouch.jpeg',
    badge: 'Royal Reserve',
    options: [
      { size: '500g (250g × 2)', price: 820, mrp: 960 },
      { size: '1kg (500g × 2)', price: 1590, mrp: 1850 },
    ],
  },
  {
    id: 'combo-w320-skin',
    name: 'W320 + Palasa Raw Skin Cashews Combo',
    grade: 'White Whole + Heritage Roasted Skin',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'The clean, pristine crunch of classic W320 paired with the smoky, earthy fiber richness of Palasa Raw Skin Cashews (Pottu Pappu).',
    image: '/assets/skin-cashew.png',
    badge: 'Terroir Blend',
    options: [
      { size: '500g (250g × 2)', price: 590, mrp: 690 },
      { size: '1kg (500g × 2)', price: 1150, mrp: 1350 },
    ],
  },
  {
    id: 'combo-w180-skin',
    name: 'W180 + Palasa Raw Skin Cashews Combo',
    grade: 'King Jumbo + Heritage Roasted Skin',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'Colossal W180 Jumbo Kings paired with traditional Palasa unpeeled skin cashews. The highest grade meets authentic rustic terroir.',
    image: '/assets/skin-cashew.png',
    badge: 'Connoisseur Pick',
    options: [
      { size: '500g (250g × 2)', price: 730, mrp: 850 },
      { size: '1kg (500g × 2)', price: 1420, mrp: 1650 },
    ],
  },
  {
    id: 'combo-w220-skin',
    name: 'W220 + Palasa Raw Skin Cashews Combo',
    grade: 'Selected Jumbo + Roasted Skin-On',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'Generously calibrated W220 cashews paired with crunchy, unpeeled skin-on cashews from heirloom Palasa batches.',
    image: '/assets/skin-cashew.png',
    badge: 'Heritage Duo',
    options: [
      { size: '500g (250g × 2)', price: 650, mrp: 760 },
      { size: '1kg (500g × 2)', price: 1270, mrp: 1490 },
    ],
  },
  {
    id: 'combo-w320-jh',
    name: 'W320 + JH/SJH Combo',
    grade: 'Whole Table Nut + Culinary Split',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'The versatile household combination: whole W320 kernels for snacking and clean JH/SJH split cashews for your daily cooking.',
    image: '/assets/grade-jh.jpg',
    badge: 'Home Essential',
    options: [
      { size: '500g (250g × 2)', price: 560, mrp: 660 },
      { size: '1kg (500g × 2)', price: 1080, mrp: 1280 },
    ],
  },
  {
    id: 'combo-w220-jh',
    name: 'W220 + JH/SJH Combo',
    grade: 'Selected Jumbo + Culinary Split',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'Selected Jumbo kernels for evening tea time snacking paired with pristine split halves for rich gravies and festive sweets.',
    image: '/assets/grade-jh.jpg',
    badge: 'Kitchen & Table',
    options: [
      { size: '500g (250g × 2)', price: 620, mrp: 730 },
      { size: '1kg (500g × 2)', price: 1190, mrp: 1410 },
    ],
  },
  {
    id: 'combo-w180-jh',
    name: 'W180 + JH/SJH Combo',
    grade: 'Jumbo King + Culinary Split',
    category: 'combos',
    categoryLabel: 'Curated Combos',
    desc: 'The pinnacle of size: W180 King cashews paired with versatile split cashew kernels. Luxury table snacking meets kitchen perfection.',
    image: '/assets/grade-jh.jpg',
    badge: 'Royal Feast',
    options: [
      { size: '500g (250g × 2)', price: 700, mrp: 820 },
      { size: '1kg (500g × 2)', price: 1350, mrp: 1580 },
    ],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'cashews', label: 'Whole Cashews' },
  { id: 'skin', label: 'Skin Cashews (Pottu Pappu)' },
  { id: 'splits', label: 'Split Cashews' },
  { id: 'combos', label: 'Curated Combos' },
  { id: 'dryfruits', label: 'Chocolates & Dry Fruits' },
];

const VISUAL_TILES = [
  { name: 'Cashew', image: '/assets/cat-cashew.png', category: 'cashews' },
  { name: 'Palasa Skin', image: '/assets/skin-cashew.png', category: 'skin' },
  { name: 'Combos', image: '/assets/pouch.jpeg', category: 'combos' },
  { name: 'Almond', image: '/assets/cat-almond.png', category: 'dryfruits' },
  { name: 'Pista', image: '/assets/cat-pista.png', category: 'dryfruits' },
  { name: 'Raisin', image: '/assets/cat-raisin.png', category: 'dryfruits' },
  { name: 'Walnut', image: '/assets/cat-walnut.png', category: 'dryfruits' },
];

export default function ProductsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Selected size per product: { [productId]: optionIndex }
  const [selectedSizes, setSelectedSizes] = useState({});

  // Cart state: [ { id, name, size, price, quantity, image } ]
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Quick Order Modal
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [directOrderItem, setDirectOrderItem] = useState(null);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '', pincode: '' });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  const handleSizeChange = (productId, optIndex) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: optIndex }));
  };

  const getProductOption = (product) => {
    const idx = selectedSizes[product.id] ?? 0;
    return product.options[idx] || product.options[0];
  };

  // Add to cart
  const addToCart = (product) => {
    const opt = getProductOption(product);
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.size === opt.size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          size: opt.size,
          price: opt.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    showToast(`Added ${product.name} (${opt.size}) to cart`);
  };

  // Buy Now direct flow
  const handleBuyNow = (product) => {
    const opt = getProductOption(product);
    setDirectOrderItem({
      ...product,
      chosenSize: opt.size,
      chosenPrice: opt.price,
      quantity: 1,
    });
    setOrderModalOpen(true);
  };

  const updateCartQty = (idx, delta) => {
    setCart((prev) => {
      const next = [...prev];
      const newQty = next[idx].quantity + delta;
      if (newQty <= 0) {
        next.splice(idx, 1);
      } else {
        next[idx].quantity = newQty;
      }
      return next;
    });
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.grade.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Size filter
      if (selectedSizeFilter !== 'all') {
        const hasSize = item.options.some((opt) =>
          opt.size.toLowerCase().includes(selectedSizeFilter.toLowerCase())
        );
        if (!hasSize) return false;
      }

      // Price filter
      if (selectedPriceFilter !== 'all') {
        const basePrice = item.options[0].price;
        if (selectedPriceFilter === 'under500' && basePrice >= 500) return false;
        if (
          selectedPriceFilter === '500to1000' &&
          (basePrice < 500 || basePrice > 1000)
        )
          return false;
        if (selectedPriceFilter === 'above1000' && basePrice <= 1000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.options[0].price - b.options[0].price;
      }
      if (sortBy === 'price-high') {
        return b.options[0].price - a.options[0].price;
      }
      return 0; // default featured order
    });
  }, [selectedCategory, searchQuery, selectedSizeFilter, selectedPriceFilter, sortBy]);

  const sendWhatsAppCartOrder = () => {
    if (cart.length === 0) return;
    let text = `*New Order from The Original Website*\n\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}* (${item.size})\n   Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
    });
    text += `\n*Total Amount:* ₹${cartTotal}\n`;
    text += `*Delivery:* Fresh Palasa Dispatch Across India\n\n`;
    if (orderForm.name) text += `*Customer:* ${orderForm.name}\n`;
    if (orderForm.phone) text += `*Phone:* ${orderForm.phone}\n`;
    if (orderForm.address) text += `*Address:* ${orderForm.address}, ${orderForm.pincode}\n`;
    text += `\nPlease confirm availability and payment details.`;

    const url = `https://wa.me/919100267404?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const sendWhatsAppDirectOrder = () => {
    if (!directOrderItem) return;
    let text = `*Direct Buy Order | The Original Palasa Cashews*\n\n`;
    text += `*Product:* ${directOrderItem.name}\n`;
    text += `*Size:* ${directOrderItem.chosenSize}\n`;
    text += `*Price:* ₹${directOrderItem.chosenPrice}\n`;
    text += `*Quantity:* ${directOrderItem.quantity}\n`;
    text += `*Total:* ₹${directOrderItem.chosenPrice * directOrderItem.quantity}\n\n`;
    if (orderForm.name) text += `*Customer:* ${orderForm.name}\n`;
    if (orderForm.phone) text += `*Phone:* ${orderForm.phone}\n`;
    if (orderForm.address) text += `*Address:* ${orderForm.address}, ${orderForm.pincode}\n`;
    text += `\nPlease confirm dispatch details.`;

    const url = `https://wa.me/919100267404?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setOrderModalOpen(false);
  };

  return (
    <main className="shop-page">
      <Nav />

      {/* Hero Header */}
      <section className="shop-hero">
        <div className="shop-hero-inner">
          <span className="section-tag">Palasa harvest catalog · Factory fresh stock</span>
          <h1 className="shop-hero-title">
            Pure Palasa Cashews, Crafted Combos &amp; Heritage Harvests.
          </h1>
          <p className="shop-hero-lead">
            Every pouch is sealed immediately after slow roasting in Palasa. Free of warehouse staleness,
            curated across top processing units, and delivered directly to your doorstep.
          </p>
        </div>

        {/* Visual Category Tiles (Inspired by User Category Banner) */}
        <div className="shop-visual-tiles-wrap">
          <div className="shop-visual-tiles">
            <button
              className={`shop-visual-tile all-tile ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <div className="visual-tile-circle">TO</div>
              <span className="visual-tile-label">All Harvest</span>
            </button>

            {VISUAL_TILES.map((t) => (
              <button
                key={t.name}
                className={`shop-visual-tile ${selectedCategory === t.category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(t.category)}
              >
                <div className="visual-tile-img-box">
                  <img src={t.image} alt={t.name} className="visual-tile-img" />
                </div>
                <span className="visual-tile-label">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Area: Sidebar Filter + Products Grid */}
      <section className="shop-catalog-section">
        <div className="shop-catalog-inner">
          {/* Mobile Filter Toggle */}
          <div className="mobile-filter-bar">
            <button
              className="btn-filter-toggle"
              onClick={() => setMobileFilterOpen((o) => !o)}
            >
              <span>Filters &amp; Sort</span>
              {selectedCategory !== 'all' || selectedSizeFilter !== 'all' ? (
                <span className="filter-badge-dot"></span>
              ) : null}
            </button>
            <span className="product-count-label">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="shop-layout">
            {/* Sidebar Filter Menu */}
            <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
              <div className="sidebar-header">
                <h3 className="sidebar-title">Filters</h3>
                <button
                  className="sidebar-close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  &times;
                </button>
              </div>

              {/* Search */}
              <div className="filter-group">
                <label className="filter-group-label" htmlFor="shop-search">
                  Search harvest
                </label>
                <input
                  id="shop-search"
                  type="text"
                  placeholder="e.g. W180, Skin, Combo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="filter-search-input"
                />
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <h4 className="filter-group-label">Categories</h4>
                <div className="filter-options-list">
                  {CATEGORIES.map((cat) => {
                    const count =
                      cat.id === 'all'
                        ? PRODUCTS_DATA.length
                        : PRODUCTS_DATA.filter((p) => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        className={`filter-option-btn ${
                          selectedCategory === cat.id ? 'active' : ''
                        }`}
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        <span>{cat.label}</span>
                        <span className="filter-count">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Size Filter */}
              <div className="filter-group">
                <h4 className="filter-group-label">Package Size</h4>
                <div className="filter-pills-row">
                  {[
                    { id: 'all', label: 'All Sizes' },
                    { id: '250', label: '250g' },
                    { id: '500', label: '500g' },
                    { id: '1kg', label: '1kg Combo' },
                    { id: '100', label: '100g' },
                    { id: '200', label: '200g' },
                  ].map((size) => (
                    <button
                      key={size.id}
                      className={`filter-pill ${
                        selectedSizeFilter === size.id ? 'active' : ''
                      }`}
                      onClick={() => setSelectedSizeFilter(size.id)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <h4 className="filter-group-label">Price Range</h4>
                <div className="filter-options-list">
                  {[
                    { id: 'all', label: 'All prices' },
                    { id: 'under500', label: 'Under ₹500' },
                    { id: '500to1000', label: '₹500 to ₹1,000' },
                    { id: 'above1000', label: 'Above ₹1,000' },
                  ].map((pr) => (
                    <button
                      key={pr.id}
                      className={`filter-option-btn ${
                        selectedPriceFilter === pr.id ? 'active' : ''
                      }`}
                      onClick={() => setSelectedPriceFilter(pr.id)}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {(selectedCategory !== 'all' ||
                selectedSizeFilter !== 'all' ||
                selectedPriceFilter !== 'all' ||
                searchQuery !== '') && (
                <button
                  className="filter-reset-btn"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSizeFilter('all');
                    setSelectedPriceFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Reset all filters
                </button>
              )}
            </aside>

            {/* Product Grid Area */}
            <div className="shop-main">
              {/* Top Controls Bar */}
              <div className="shop-top-bar">
                <span className="shop-results-count">
                  Showing <strong>{filteredProducts.length}</strong> items
                </span>

                <div className="shop-sort-wrap">
                  <label htmlFor="shop-sort" className="sort-label">
                    Sort by:
                  </label>
                  <select
                    id="shop-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="shop-sort-select"
                  >
                    <option value="featured">Featured Curations</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              {filteredProducts.length === 0 ? (
                <div className="shop-empty-state">
                  <h3 className="empty-title">No products match your filter</h3>
                  <p className="empty-text">
                    Try adjusting your category, package size, or search criteria.
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSizeFilter('all');
                      setSelectedPriceFilter('all');
                      setSearchQuery('');
                    }}
                  >
                    Show all harvests
                  </button>
                </div>
              ) : (
                <div className="shop-products-grid">
                  {filteredProducts.map((product) => {
                    const activeOptIdx = selectedSizes[product.id] ?? 0;
                    const activeOpt = product.options[activeOptIdx] || product.options[0];

                    return (
                      <article key={product.id} className="shop-product-card">
                        {/* Image Showcase */}
                        <div className="shop-card-media">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="shop-card-img"
                          />
                          {product.badge && (
                            <span className="shop-card-badge">{product.badge}</span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="shop-card-body">
                          <span className="shop-card-grade">{product.grade}</span>
                          <h3 className="shop-card-title">{product.name}</h3>
                          <p className="shop-card-desc">{product.desc}</p>

                          {/* Size Selection Pills */}
                          <div className="shop-size-selector">
                            <span className="size-selector-label">Available Sizes:</span>
                            <div className="size-pills">
                              {product.options.map((opt, idx) => (
                                <button
                                  key={opt.size}
                                  type="button"
                                  className={`size-pill ${
                                    activeOptIdx === idx ? 'active' : ''
                                  }`}
                                  onClick={() => handleSizeChange(product.id, idx)}
                                >
                                  {opt.size}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Price Display */}
                          <div className="shop-card-price-row">
                            <div className="price-stack">
                              <span className="current-price">₹{activeOpt.price}</span>
                              {activeOpt.mrp && (
                                <span className="mrp-price">₹{activeOpt.mrp}</span>
                              )}
                            </div>
                            <span className="tax-inclusive-tag">All taxes included</span>
                          </div>

                          {/* Action Buttons: Add to Cart & Buy Now */}
                          <div className="shop-card-actions">
                            <button
                              type="button"
                              className="btn-add-to-cart"
                              onClick={() => addToCart(product)}
                            >
                              <svg
                                width="17"
                                height="17"
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
                              onClick={() => handleBuyNow(product)}
                            >
                              Buy now
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <button
          className="floating-cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label="View Cart"
        >
          <div className="cart-badge-count">{cartItemCount}</div>
          <svg
            width="20"
            height="20"
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
          <span>₹{cartTotal}</span>
        </button>
      )}

      {/* Cart Slide-Over Drawer */}
      {cartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-title-wrap">
                <h3 className="cart-title">Your Harvest Bag</h3>
                <span className="cart-items-count">({cartItemCount} items)</span>
              </div>
              <button
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
                  className="btn-primary"
                  onClick={() => setCartOpen(false)}
                >
                  Explore products
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${item.size}`} className="cart-item-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-thumb"
                      />
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <span className="cart-item-size">{item.size}</span>
                        <div className="cart-item-price">₹{item.price} each</div>
                      </div>

                      <div className="cart-qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => updateCartQty(idx, -1)}
                        >
                          -
                        </button>
                        <span className="qty-num">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateCartQty(idx, 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-total">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-drawer-footer">
                  <div className="cart-subtotal-row">
                    <span>Subtotal</span>
                    <span className="cart-subtotal-amount">₹{cartTotal}</span>
                  </div>
                  <div className="cart-shipping-note">
                    ✓ Factory-fresh dispatch directly from Palasa, Andhra Pradesh
                  </div>

                  <button
                    className="btn-checkout-wa"
                    onClick={sendWhatsAppCartOrder}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.155-.542-1.782-.736-2.915-2.548-3.003-2.667-.088-.119-.716-.953-.716-1.815 0-.862.451-1.286.611-1.46.16-.174.348-.217.464-.217.116 0 .232.002.333.007.106.005.249-.04.39.299.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.077.356.101.174.449.741.963 1.2 1.077.962 1.554 1.127 1.771 1.215.217.088.347.073.477-.073.13-.146.55-1.042.694-1.216.145-.174.29-.145.492-.072.203.072 1.288.608 1.505.717.217.109.362.16.419.261.058.101.058.594-.086.999z" />
                    </svg>
                    <span>Order Bag on WhatsApp</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Buy Now / Quick Checkout Modal */}
      {orderModalOpen && directOrderItem && (
        <div
          className="order-modal-overlay"
          onClick={() => setOrderModalOpen(false)}
        >
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h3 className="order-modal-title">Instant Harvest Order</h3>
              <button
                className="sidebar-close-btn"
                onClick={() => setOrderModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="order-modal-summary">
              <img
                src={directOrderItem.image}
                alt={directOrderItem.name}
                className="order-summary-img"
              />
              <div>
                <h4 className="order-summary-name">{directOrderItem.name}</h4>
                <div className="order-summary-detail">
                  Size: <strong>{directOrderItem.chosenSize}</strong> · Price:{' '}
                  <strong>₹{directOrderItem.chosenPrice}</strong>
                </div>
                <div className="order-summary-origin">
                  Direct Palasa dispatch · Fresh batch
                </div>
              </div>
            </div>

            <form
              className="order-modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                sendWhatsAppDirectOrder();
              }}
            >
              <div className="form-group">
                <label>Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Kumar"
                  value={orderForm.name}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number (WhatsApp preferred)</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={orderForm.phone}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address &amp; City</label>
                <input
                  type="text"
                  placeholder="Street, locality, city"
                  value={orderForm.address}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="e.g. 500081"
                  value={orderForm.pincode}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, pincode: e.target.value })
                  }
                  required
                />
              </div>

              <div className="order-modal-actions">
                <button type="submit" className="btn-primary modal-submit">
                  Confirm &amp; Order on WhatsApp
                </button>
                <p className="order-form-disclaimer">
                  You will connect directly with founder CH Dhana Vardhan / The Original dispatch desk.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="shop-toast" role="status">
          <span className="toast-check">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </main>
  );
}
