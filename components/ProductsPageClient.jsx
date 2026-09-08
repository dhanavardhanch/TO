'use client';

import { useState, useMemo } from 'react';
import Nav from './Nav';
import Footer from './Footer';

// Catalog Data (No prefilled combos; strict Flavours & Mixes)
export const PRODUCTS_DATA = [
  // --- Whole & Specialty Cashews (250g & 500g only) ---
  {
    id: 'w180',
    name: 'The Original W180',
    grade: 'Grade W180 · Jumbo King',
    gradeKey: 'w180',
    category: 'cashews',
    categoryLabel: 'Cashews',
    desc: 'The rarest and largest king cashew of Palasa. Renowned for its rich ivory density, creamy mouthfeel, and naturally sweet finish.',
    image: '/assets/pouch.jpeg',
    badge: 'Jumbo King',
    options: [
      { size: '250g', price: 460, mrp: 520 },
      { size: '500g', price: 890, mrp: 999 },
    ],
  },
  {
    id: 'w240',
    name: 'The Original W240',
    grade: 'Grade W240 · Standard Jumbo',
    gradeKey: 'w240',
    category: 'cashews',
    categoryLabel: 'Cashews',
    desc: 'Generously calibrated whole cashews offering crisp snap and delicate buttery character of coastal laterite soil.',
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
    gradeKey: 'w320',
    category: 'cashews',
    categoryLabel: 'Cashews',
    desc: 'The traditional standard of Palasa harvests. Pristine whole kernels, perfectly balanced for everyday nourishment and gifting.',
    image: '/assets/pouch.jpeg',
    badge: 'Benchmark',
    options: [
      { size: '250g', price: 320, mrp: 380 },
      { size: '500g', price: 620, mrp: 720 },
    ],
  },
  {
    id: 'pottu-pappu',
    name: 'Palasa Raw Cashew / Skin Cashews',
    grade: 'Heritage Roasted · Skin-On (Pottu Pappu)',
    gradeKey: 'skin',
    category: 'cashews',
    categoryLabel: 'Cashews',
    desc: 'Traditional unpeeled Palasa cashews roasted slow with protective natural skin intact. Extra crunch and deep roasted nutty flavor.',
    image: '/assets/skin-cashew.png',
    badge: 'Heritage Roasted',
    options: [
      { size: '250g', price: 290, mrp: 350 },
      { size: '500g', price: 560, mrp: 660 },
    ],
  },
  {
    id: 'splits',
    name: 'The Original Splits',
    grade: 'Clean Split Cashews · Halves & Kernels',
    gradeKey: 'splits',
    category: 'cashews',
    categoryLabel: 'Cashews',
    desc: 'Clean, hand-selected split cashew kernels. Perfect for everyday cooking, traditional Andhra sweets, rich curries, and festive home baking.',
    image: '/assets/grade-jh.jpg',
    badge: 'Kitchen Essential',
    options: [
      { size: '250g', price: 240, mrp: 290 },
      { size: '500g', price: 460, mrp: 540 },
    ],
  },

  // --- Strict Flavours & Mixes ---
  {
    id: 'choco-cashew',
    name: 'Chocolate Cashew',
    grade: 'Artisanal Confectionery · Grade Customizable',
    category: 'flavours-mixes',
    categoryLabel: 'Flavours & Mixes',
    desc: 'Slow roasted Palasa whole cashews coated in rich Belgian-style dark chocolate. Choose your preferred kernel caliber (W180 / W210 / W320).',
    image: '/assets/pouch.jpeg',
    badge: 'Artisanal',
    hasGradeCustomization: true,
    customGrades: ['W320', 'W210', 'W180'],
    gradeOptions: {
      W320: [
        { size: '100g', price: 210, mrp: 250 },
        { size: '200g', price: 399, mrp: 460 },
      ],
      W210: [
        { size: '100g', price: 230, mrp: 270 },
        { size: '200g', price: 440, mrp: 520 },
      ],
      W180: [
        { size: '100g', price: 260, mrp: 310 },
        { size: '200g', price: 490, mrp: 580 },
      ],
    },
    options: [
      { size: '100g', price: 210, mrp: 250 },
      { size: '200g', price: 399, mrp: 460 },
    ],
  },
  {
    id: 'choco-badam',
    name: 'Chocolate Badam',
    grade: 'Artisanal Confectionery · Handcrafted',
    category: 'flavours-mixes',
    categoryLabel: 'Flavours & Mixes',
    desc: 'Crisp roasted California almonds hand coated in smooth dark chocolate with a velvety snap and rich cocoa finish.',
    image: '/assets/pouch.jpeg',
    badge: 'Artisanal',
    options: [
      { size: '100g', price: 210, mrp: 250 },
      { size: '200g', price: 399, mrp: 480 },
    ],
  },
  {
    id: 'mix-dry-fruit',
    name: 'Dry Fruits Mix',
    grade: '5-in-1 Luxury Blend · Almond, Cashew, Pista, Raisin, Walnut',
    category: 'flavours-mixes',
    categoryLabel: 'Flavours & Mixes',
    desc: 'Curated 5-variety luxury dry fruit blend. Customize the cashew kernel caliber in your mix (W320 / W210 / W180).',
    image: '/assets/dryfruits-category.png',
    badge: 'Superfood Blend',
    hasGradeCustomization: true,
    customGrades: ['W320', 'W210', 'W180'],
    gradeOptions: {
      W320: [
        { size: '100g each', price: 350, mrp: 420 },
        { size: '200g each', price: 680, mrp: 799 },
      ],
      W210: [
        { size: '100g each', price: 380, mrp: 460 },
        { size: '200g each', price: 730, mrp: 860 },
      ],
      W180: [
        { size: '100g each', price: 420, mrp: 510 },
        { size: '200g each', price: 800, mrp: 940 },
      ],
    },
    options: [
      { size: '100g each', price: 350, mrp: 420 },
      { size: '200g each', price: 680, mrp: 799 },
    ],
  },
];

// Top-Level Navigation Tabs with clear label for Combos
const TOP_CATEGORIES = [
  { id: 'all', label: 'All', shortLabel: 'All' },
  { id: 'cashews', label: 'Cashews', shortLabel: 'Cashews' },
  { id: 'combos', label: 'Combos (Build Your Own)', shortLabel: 'Combos', hint: 'Build your own' },
  { id: 'flavours-mixes', label: 'Flavours & Mixes', shortLabel: 'Flavours & Mixes' },
];

// Secondary Grade Filter for Cashews
const CASHEW_GRADES = [
  { id: 'all', label: 'All Grades' },
  { id: 'w320', label: 'W320' },
  { id: 'w240', label: 'W240' },
  { id: 'w180', label: 'W180' },
  { id: 'skin', label: 'Skin Cashew (Pottu Pappu)' },
  { id: 'splits', label: 'Splits' },
];

// Items available in Build Your Own Combo with weight options
export const COMBO_BUILDER_ITEMS = [
  {
    id: 'cb-w180',
    name: 'W180 Jumbo King',
    tag: 'Jumbo King',
    image: '/assets/pouch.jpeg',
    weightOptions: [
      { size: '250g', price: 460 },
      { size: '500g', price: 890 },
    ],
  },
  {
    id: 'cb-w240',
    name: 'W240 Selected Jumbo',
    tag: 'Jumbo',
    image: '/assets/pouch.jpeg',
    weightOptions: [
      { size: '250g', price: 380 },
      { size: '500g', price: 740 },
    ],
  },
  {
    id: 'cb-w320',
    name: 'W320 Classic Benchmark',
    tag: 'Classic',
    image: '/assets/pouch.jpeg',
    weightOptions: [
      { size: '250g', price: 320 },
      { size: '500g', price: 620 },
    ],
  },
  {
    id: 'cb-skin',
    name: 'Palasa Skin Cashew (Pottu Pappu)',
    tag: 'Heritage',
    image: '/assets/skin-cashew.png',
    weightOptions: [
      { size: '250g', price: 290 },
      { size: '500g', price: 560 },
    ],
  },
  {
    id: 'cb-splits',
    name: 'The Original Splits',
    tag: 'Kitchen',
    image: '/assets/grade-jh.jpg',
    weightOptions: [
      { size: '250g', price: 240 },
      { size: '500g', price: 460 },
    ],
  },
  {
    id: 'cb-choco-cashew',
    name: 'Chocolate Cashew',
    tag: 'Artisanal',
    image: '/assets/pouch.jpeg',
    weightOptions: [
      { size: '100g', price: 210 },
      { size: '200g', price: 399 },
    ],
  },
  {
    id: 'cb-choco-badam',
    name: 'Chocolate Badam',
    tag: 'Artisanal',
    image: '/assets/pouch.jpeg',
    weightOptions: [
      { size: '100g', price: 210 },
      { size: '200g', price: 399 },
    ],
  },
  {
    id: 'cb-mix',
    name: 'Dry Fruits Mix (5-in-1)',
    tag: 'Superfood',
    image: '/assets/dryfruits-category.png',
    weightOptions: [
      { size: '100g each', price: 350 },
      { size: '200g each', price: 680 },
    ],
  },
];

export default function ProductsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Selected size per product: { [productId]: optionIndex }
  const [selectedSizes, setSelectedSizes] = useState({});
  // Selected custom grade for customizable products: { [productId]: 'W320' | 'W210' | 'W180' }
  const [selectedCustomGrades, setSelectedCustomGrades] = useState({
    'choco-cashew': 'W320',
    'mix-dry-fruit': 'W320',
  });

  // Cart state: [ { id, name, size, price, quantity, image, isCustomCombo?, comboItems? } ]
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Quick Order Modal (Buy Now)
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [directOrderItem, setDirectOrderItem] = useState(null);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '', pincode: '' });

  // Custom Combo Builder State:
  // selectedComboState: { [itemId]: { checked: boolean, weightIndex: number } }
  const [comboBuilderOpen, setComboBuilderOpen] = useState(false);
  const [selectedComboState, setSelectedComboState] = useState({});

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  const handleSizeChange = (productId, optIndex) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: optIndex }));
  };

  const handleCustomGradeChange = (productId, gradeKey) => {
    setSelectedCustomGrades((prev) => ({ ...prev, [productId]: gradeKey }));
    // reset size index when switching grade, unless size filter applies
    setSelectedSizes((prev) => {
      const updated = { ...prev, [productId]: 0 };
      if (selectedSizeFilter) {
        const prod = PRODUCTS_DATA.find((p) => p.id === productId);
        if (prod && prod.gradeOptions && prod.gradeOptions[gradeKey]) {
          const matchIdx = prod.gradeOptions[gradeKey].findIndex((o) =>
            o.size.toLowerCase().includes(selectedSizeFilter.toLowerCase())
          );
          if (matchIdx !== -1) updated[productId] = matchIdx;
        }
      }
      return updated;
    });
  };

  // When clicking packaging size filter, set filter AND default matching products to that weight!
  const handleSizeFilterClick = (sizeId) => {
    const newFilter = selectedSizeFilter === sizeId ? '' : sizeId;
    setSelectedSizeFilter(newFilter);

    if (newFilter) {
      // Automatically default matching products to that packaging size!
      setSelectedSizes((prev) => {
        const updated = { ...prev };
        PRODUCTS_DATA.forEach((product) => {
          const activeGrade = selectedCustomGrades[product.id] || product.customGrades?.[0];
          const opts = product.hasGradeCustomization
            ? product.gradeOptions[activeGrade]
            : product.options;

          const matchIdx = opts.findIndex((opt) =>
            opt.size.toLowerCase().includes(newFilter.toLowerCase())
          );
          if (matchIdx !== -1) {
            updated[product.id] = matchIdx;
          }
        });
        return updated;
      });
    }
  };

  const getProductOption = (product) => {
    const activeGrade = product.hasGradeCustomization
      ? selectedCustomGrades[product.id] || product.customGrades[0]
      : null;
    const currentOptions = product.hasGradeCustomization
      ? product.gradeOptions[activeGrade] || product.options
      : product.options;

    let idx = selectedSizes[product.id];
    // If active size filter exists and this card has a matching option, default to it
    if (selectedSizeFilter) {
      const matchIdx = currentOptions.findIndex((opt) =>
        opt.size.toLowerCase().includes(selectedSizeFilter.toLowerCase())
      );
      if (matchIdx !== -1 && (idx === undefined || !currentOptions[idx]?.size.toLowerCase().includes(selectedSizeFilter.toLowerCase()))) {
        idx = matchIdx;
      }
    }

    const safeIdx = idx !== undefined && idx < currentOptions.length ? idx : 0;
    const opt = currentOptions[safeIdx] || currentOptions[0];

    return {
      ...opt,
      activeIdx: safeIdx,
      selectedGrade: activeGrade,
    };
  };

  // Add standard product to cart
  const addToCart = (product) => {
    const opt = getProductOption(product);
    const displayName = opt.selectedGrade
      ? `${product.name} (${opt.selectedGrade})`
      : product.name;

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.size === opt.size && item.name === displayName
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
          name: displayName,
          size: opt.size,
          price: opt.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    showToast(`Added ${displayName} (${opt.size}) to bag`);
  };

  // Buy Now direct flow
  const handleBuyNow = (product) => {
    const opt = getProductOption(product);
    const displayName = opt.selectedGrade
      ? `${product.name} (${opt.selectedGrade})`
      : product.name;

    setDirectOrderItem({
      ...product,
      name: displayName,
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

  // Combo Builder Handlers with Real-Time Weight Switcher
  const toggleComboItem = (id) => {
    setSelectedComboState((prev) => {
      const current = prev[id];
      if (current && current.checked) {
        return { ...prev, [id]: { ...current, checked: false } };
      }
      return {
        ...prev,
        [id]: { checked: true, weightIndex: current?.weightIndex ?? 0 },
      };
    });
  };

  const setComboItemWeight = (id, weightIndex) => {
    setSelectedComboState((prev) => ({
      ...prev,
      [id]: { checked: true, weightIndex },
    }));
  };

  const checkedComboEntries = useMemo(() => {
    return COMBO_BUILDER_ITEMS.map((item) => {
      const state = selectedComboState[item.id];
      if (!state || !state.checked) return null;
      const weightOpt = item.weightOptions[state.weightIndex ?? 0] || item.weightOptions[0];
      return {
        ...item,
        selectedWeight: weightOpt.size,
        selectedPrice: weightOpt.price,
      };
    }).filter(Boolean);
  }, [selectedComboState]);

  const comboRunningTotal = useMemo(() => {
    return checkedComboEntries.reduce((sum, itm) => sum + itm.selectedPrice, 0);
  }, [checkedComboEntries]);

  // When adding custom combo to cart, save complete item breakup
  const handleComboContinue = () => {
    if (checkedComboEntries.length === 0) return;
    const itemsBreakup = checkedComboEntries.map((itm) => ({
      name: itm.name,
      size: itm.selectedWeight,
      price: itm.selectedPrice,
    }));

    const newComboBundle = {
      id: `custom-combo-${Date.now()}`,
      name: `Custom Palasa Combo Box`,
      size: `${checkedComboEntries.length} Items Custom Pack`,
      price: comboRunningTotal,
      quantity: 1,
      image: '/assets/pouch.jpeg',
      isCustomCombo: true,
      comboItems: itemsBreakup,
    };

    setCart((prev) => [...prev, newComboBundle]);
    setComboBuilderOpen(false);
    setSelectedComboState({});
    showToast(`Added Custom Combo (${checkedComboEntries.length} items) to bag`);
    setCartOpen(true);
  };

  const handleComboCancel = () => {
    setSelectedComboState({});
    setComboBuilderOpen(false);
  };

  // Category change handler
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId !== 'cashews') {
      setSelectedGrade('all');
    }
  };

  // Filtered & Sorted Products (strictly no prefilled combos)
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'cashews' && item.category !== 'cashews') return false;
        if (selectedCategory === 'flavours-mixes' && item.category !== 'flavours-mixes')
          return false;
        // Combos tab has no prefilled cards; only Build Your Own Combo showcase banner
        if (selectedCategory === 'combos') return false;
      }

      // Secondary Cashew Grade filter
      if (selectedCategory === 'cashews' && selectedGrade !== 'all') {
        if (item.gradeKey !== selectedGrade) return false;
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

      // Package Size filter (100g, 200g, 250g, 500g)
      if (selectedSizeFilter) {
        const hasSize = item.options.some((opt) =>
          opt.size.toLowerCase().includes(selectedSizeFilter.toLowerCase())
        );
        if (!hasSize) return false;
      }

      // Price filter
      if (selectedPriceFilter) {
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
  }, [
    selectedCategory,
    selectedGrade,
    searchQuery,
    selectedSizeFilter,
    selectedPriceFilter,
    sortBy,
  ]);

  const isFilterActive =
    Boolean(selectedSizeFilter) ||
    Boolean(selectedPriceFilter) ||
    Boolean(searchQuery.trim()) ||
    (selectedCategory === 'cashews' && selectedGrade !== 'all');

  const resetFilters = () => {
    setSelectedSizeFilter('');
    setSelectedPriceFilter('');
    setSearchQuery('');
    setSelectedGrade('all');
  };

  const sendWhatsAppCartOrder = () => {
    if (cart.length === 0) return;
    let text = `*New Order from The Original Website*\n\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}* (${item.size})\n   Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
      if (item.isCustomCombo && item.comboItems) {
        text += `   *Box Packup Breakdown:*\n`;
        item.comboItems.forEach((ci) => {
          text += `     • ${ci.name} (${ci.size}): ₹${ci.price}\n`;
        });
      }
    });
    text += `\n*Total Amount:* ₹${cartTotal}\n`;
    text += `*Delivery:* Fresh Palasa Dispatch Across India\n\n`;
    if (orderForm.name) text += `*Customer:* ${orderForm.name}\n`;
    if (orderForm.phone) text += `*Phone:* ${orderForm.phone}\n`;
    if (orderForm.address) text += `*Address:* ${orderForm.address}, ${orderForm.pincode}\n`;
    text += `\nPlease confirm dispatch and payment details.`;

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

      {/* Hero Header - Minimal & Tightened */}
      <section className="shop-hero">
        <div className="shop-hero-inner">
          <span className="section-tag">Palasa harvest catalog · Direct factory roast</span>
          <h1 className="shop-hero-title">The Harvest Catalog</h1>
          <p className="shop-hero-lead">
            Slow-roasted whole calibers, skin-on heritage nuts, and artisanal confections sealed fresh at source in Palasa.
          </p>
        </div>

        {/* Streamlined Category Navigation */}
        <div className="shop-category-nav-wrapper">
          <nav className="shop-category-nav" aria-label="Product Categories">
            {TOP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`shop-category-tab ${
                  selectedCategory === cat.id ? 'active' : ''
                }`}
                onClick={() => handleCategorySelect(cat.id)}
              >
                <span className="tab-desktop-label">{cat.label}</span>
                <span className="tab-mobile-label">
                  <span className="tab-mobile-title">{cat.shortLabel}</span>
                  {cat.hint && <span className="tab-mobile-hint">{cat.hint}</span>}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Secondary Grade Selector for Cashews */}
        {selectedCategory === 'cashews' && (
          <div className="shop-secondary-grades-wrap">
            <div className="shop-secondary-grades" aria-label="Cashew Grades">
              {CASHEW_GRADES.map((grade) => (
                <button
                  key={grade.id}
                  type="button"
                  className={`shop-grade-chip ${
                    selectedGrade === grade.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedGrade(grade.id)}
                >
                  {grade.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Main Catalog Area: Simplified Sidebar + Boutique Grid */}
      <section className="shop-catalog-section">
        <div className="shop-catalog-inner">
          {/* Mobile Filter Toggle */}
          <div className="mobile-filter-bar">
            <button
              type="button"
              className="btn-filter-toggle"
              onClick={() => setMobileFilterOpen((o) => !o)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span>Filters &amp; Sort</span>
              {isFilterActive && <span className="filter-badge-dot"></span>}
            </button>
            <span className="product-count-label">
              {selectedCategory === 'combos' ? '1 custom builder' : `${filteredProducts.length} items`}
            </span>
          </div>

          <div className="shop-layout">
            {/* Simplified Sidebar Filter Panel */}
            <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
              <div className="sidebar-header">
                <h3 className="sidebar-title">Refine Harvest</h3>
                <button
                  type="button"
                  className="sidebar-close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                >
                  &times;
                </button>
              </div>

              {/* Search */}
              <div className="filter-group">
                <label className="filter-group-label" htmlFor="shop-search">
                  Search
                </label>
                <input
                  id="shop-search"
                  type="text"
                  placeholder="e.g. W180, Skin, Chocolate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="filter-search-input"
                />
              </div>

              {/* Packaging Size Filter: Clicking a pill filters AND selects that size on all cards */}
              <div className="filter-group">
                <div className="filter-label-row">
                  <h4 className="filter-group-label">Packaging Size</h4>
                  {selectedSizeFilter && (
                    <button
                      type="button"
                      className="filter-clear-sub"
                      onClick={() => setSelectedSizeFilter('')}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="filter-pills-row">
                  {[
                    { id: '100', label: '100g' },
                    { id: '200', label: '200g' },
                    { id: '250', label: '250g' },
                    { id: '500', label: '500g' },
                  ].map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      className={`filter-pill ${
                        selectedSizeFilter === size.id ? 'active' : ''
                      }`}
                      onClick={() => handleSizeFilterClick(size.id)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <div className="filter-label-row">
                  <h4 className="filter-group-label">Price Range</h4>
                  {selectedPriceFilter && (
                    <button
                      type="button"
                      className="filter-clear-sub"
                      onClick={() => setSelectedPriceFilter('')}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="filter-options-list">
                  {[
                    { id: 'under500', label: 'Under ₹500' },
                    { id: '500to1000', label: '₹500 to ₹1,000' },
                    { id: 'above1000', label: 'Above ₹1,000' },
                  ].map((pr) => (
                    <button
                      key={pr.id}
                      type="button"
                      className={`filter-option-btn ${
                        selectedPriceFilter === pr.id ? 'active' : ''
                      }`}
                      onClick={() =>
                        setSelectedPriceFilter(selectedPriceFilter === pr.id ? '' : pr.id)
                      }
                    >
                      <span>{pr.label}</span>
                      {selectedPriceFilter === pr.id && (
                        <span className="filter-active-tick">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {isFilterActive && (
                <button
                  type="button"
                  className="filter-reset-btn"
                  onClick={resetFilters}
                >
                  Clear all active filters
                </button>
              )}
            </aside>

            {/* Product Grid Main Area */}
            <div className="shop-main">
              {/* Top Controls Bar */}
              <div className="shop-top-bar">
                <span className="shop-results-count">
                  {selectedCategory === 'combos'
                    ? 'Bespoke Combo Builder'
                    : `Showing ${filteredProducts.length} harvests`}
                </span>

                {selectedCategory !== 'combos' && (
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
                )}
              </div>

              {/* COMBOS TAB: ELEGANT WIDE SHOWCASE BANNER (No awkward narrow card) */}
              {selectedCategory === 'combos' && (
                <div className="combo-showcase-banner">
                  <div className="combo-banner-left">
                    <div className="combo-banner-badge-row">
                      <span className="shop-card-badge combo-badge">Custom Combo</span>
                      <span className="combo-banner-hint">You can build your own combo</span>
                    </div>
                    <h3 className="combo-banner-title">Build Your Bespoke Harvest Combo</h3>
                    <p className="combo-banner-desc">
                      Handpick any combination of slow-roasted whole cashews (250g / 500g) and artisanal dark chocolates (100g / 200g). Packaged factory-fresh in Palasa with live running totals.
                    </p>
                    <div className="combo-builder-perks horizontal">
                      <span className="combo-perk-tag">✓ Choose weights per nut</span>
                      <span className="combo-perk-tag">✓ Real-time live total calculation</span>
                      <span className="combo-perk-tag">✓ Fresh Palasa gift packing</span>
                    </div>
                  </div>
                  <div className="combo-banner-right">
                    <button
                      type="button"
                      className="btn-buy-now btn-open-builder-banner"
                      onClick={() => setComboBuilderOpen(true)}
                    >
                      <span>Start Building Your Box</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Standard Catalog Grid (Notice: Custom Combo is removed from 'All' grid) */}
              {selectedCategory !== 'combos' && (
                <div className="shop-products-grid">
                  {filteredProducts.map((product) => {
                    const optData = getProductOption(product);
                    const activeOpt = optData;
                    const activeOptIdx = optData.activeIdx;
                    const activeGrade = optData.selectedGrade;

                    const currentOptions = product.hasGradeCustomization
                      ? product.gradeOptions[activeGrade] || product.options
                      : product.options;

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

                        {/* Card Content */}
                        <div className="shop-card-body">
                          <span className="shop-card-grade">{product.grade}</span>
                          <h3 className="shop-card-title">{product.name}</h3>
                          <p className="shop-card-desc">{product.desc}</p>

                          {/* Grade Customization Selector (for Chocolate Cashew & Dry Fruits Mix) */}
                          {product.hasGradeCustomization ? (
                            <div className="shop-grade-custom-selector">
                              <span className="grade-custom-label">Cashew Grade:</span>
                              <div className="grade-custom-pills">
                                {product.customGrades.map((gKey) => (
                                  <button
                                    key={gKey}
                                    type="button"
                                    className={`grade-custom-pill ${
                                      activeGrade === gKey ? 'active' : ''
                                    }`}
                                    onClick={() => handleCustomGradeChange(product.id, gKey)}
                                  >
                                    {gKey}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            /* Spacer to ensure perfect vertical baseline alignment across all cards */
                            <div className="shop-grade-custom-spacer" aria-hidden="true" />
                          )}

                          {/* Size Selection Pills */}
                          {currentOptions.length > 1 ? (
                            <div className="shop-size-selector">
                              <span className="size-selector-label">Select Weight:</span>
                              <div className="size-pills">
                                {currentOptions.map((opt, idx) => (
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
                          ) : (
                            <div className="shop-size-selector single-size">
                              <span className="single-size-tag">{activeOpt.size}</span>
                            </div>
                          )}

                          {/* Price Display */}
                          <div className="shop-card-price-row">
                            <div className="price-stack">
                              <span className="current-price">₹{activeOpt.price}</span>
                              {activeOpt.mrp && (
                                <span className="mrp-price">₹{activeOpt.mrp}</span>
                              )}
                            </div>
                            <span className="tax-inclusive-tag">Tax incl.</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="shop-card-actions">
                            <button
                              type="button"
                              className="btn-add-to-cart"
                              onClick={() => addToCart(product)}
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <svg
                                width="15"
                                height="15"
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
                              <span>Add</span>
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

              {/* Empty state if nothing matches */}
              {selectedCategory !== 'combos' && filteredProducts.length === 0 && (
                <div className="shop-empty-state">
                  <h3 className="empty-title">No harvests found</h3>
                  <p className="empty-text">
                    Try clearing your search or switching to another category.
                  </p>
                  <button
                    type="button"
                    className="btn-buy-now"
                    onClick={resetFilters}
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BUILD YOUR OWN COMBO SELECTOR (WITH WEIGHT FILTER PER ITEM)
          Cashews: 250g & 500g
          Chocolates: 100g & 200g
          Dry Fruits Mix: 100g each & 200g each
          ========================================================================= */}
      {comboBuilderOpen && (
        <div
          className="combo-modal-overlay"
          onClick={handleComboCancel}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="combo-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="combo-modal-header">
              <div>
                <span className="combo-modal-subtitle">Custom Curation</span>
                <h3 className="combo-modal-title">Build Your Own Combo</h3>
              </div>
              <button
                type="button"
                className="combo-modal-close-btn"
                onClick={handleComboCancel}
                aria-label="Close Combo Builder"
              >
                &times;
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="combo-modal-body">
              {/* DESKTOP ITEM GRID VIEW */}
              <div className="combo-desktop-grid">
                <div className="combo-items-grid">
                  {COMBO_BUILDER_ITEMS.map((item) => {
                    const itemState = selectedComboState[item.id];
                    const isChecked = Boolean(itemState?.checked);
                    const currentWeightIdx = itemState?.weightIndex ?? 0;
                    const activeWeight = item.weightOptions[currentWeightIdx] || item.weightOptions[0];

                    return (
                      <div
                        key={item.id}
                        className={`combo-grid-card ${isChecked ? 'selected' : ''}`}
                      >
                        <div
                          className="combo-grid-card-check"
                          onClick={() => toggleComboItem(item.id)}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            aria-label={`Select ${item.name}`}
                          />
                        </div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="combo-grid-card-img"
                          onClick={() => toggleComboItem(item.id)}
                        />
                        <div className="combo-grid-card-content">
                          <div className="combo-grid-card-top" onClick={() => toggleComboItem(item.id)}>
                            <span className="combo-grid-card-tag">{item.tag}</span>
                            <h4 className="combo-grid-card-name">{item.name}</h4>
                          </div>

                          {/* Weight Filter Selector on Desktop Card */}
                          <div className="combo-item-weight-row">
                            <span className="combo-weight-label">Weight:</span>
                            <div className="combo-weight-pills">
                              {item.weightOptions.map((wOpt, wIdx) => (
                                <button
                                  key={wOpt.size}
                                  type="button"
                                  className={`combo-weight-pill ${
                                    currentWeightIdx === wIdx && isChecked ? 'active' : ''
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setComboItemWeight(item.id, wIdx);
                                  }}
                                >
                                  {wOpt.size}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="combo-grid-card-price" onClick={() => toggleComboItem(item.id)}>
                            ₹{activeWeight.price}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* DESKTOP STICKY SIDEBAR / RUNNING SUMMARY */}
                <aside className="combo-desktop-sidebar">
                  <div className="combo-summary-box">
                    <h4 className="combo-summary-title">Your Custom Box</h4>
                    <p className="combo-summary-desc">
                      Select cashews (250g/500g) and confections (100g/200g). Packaged factory-fresh in Palasa.
                    </p>

                    <div className="combo-selected-list">
                      {checkedComboEntries.length === 0 ? (
                        <div className="combo-selected-empty">
                          No items checked yet. Select any item on the left and choose your preferred weight.
                        </div>
                      ) : (
                        checkedComboEntries.map((itm) => (
                          <div key={itm.id} className="combo-selected-row">
                            <div className="combo-selected-left">
                              <span className="combo-selected-name">{itm.name}</span>
                              <span className="combo-selected-weight-tag">{itm.selectedWeight}</span>
                            </div>
                            <span className="combo-selected-price">₹{itm.selectedPrice}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="combo-total-divider"></div>

                    <div className="combo-summary-total-row">
                      <span>Live Running Total:</span>
                      <strong className="combo-summary-total-amt">
                        ₹{comboRunningTotal}
                      </strong>
                    </div>
                    <span className="combo-summary-count">
                      {checkedComboEntries.length} {checkedComboEntries.length === 1 ? 'item' : 'items'} in combo
                    </span>

                    <div className="combo-desktop-actions">
                      <button
                        type="button"
                        className="btn-buy-now btn-combo-continue"
                        disabled={checkedComboEntries.length === 0}
                        onClick={handleComboContinue}
                      >
                        Add Custom Combo to Bag (₹{comboRunningTotal})
                      </button>
                      <button
                        type="button"
                        className="btn-combo-cancel"
                        onClick={handleComboCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </aside>
              </div>

              {/* MOBILE SINGLE-COLUMN LIST VIEW WITH WEIGHT SELECTOR PER ROW */}
              <div className="combo-mobile-list-view">
                <p className="combo-mobile-instruction">
                  Check items and select packaging weight to build your bespoke box:
                </p>
                <div className="combo-mobile-rows">
                  {COMBO_BUILDER_ITEMS.map((item) => {
                    const itemState = selectedComboState[item.id];
                    const isChecked = Boolean(itemState?.checked);
                    const currentWeightIdx = itemState?.weightIndex ?? 0;
                    const activeWeight = item.weightOptions[currentWeightIdx] || item.weightOptions[0];

                    return (
                      <div
                        key={item.id}
                        className={`combo-mobile-row ${isChecked ? 'selected' : ''}`}
                      >
                        <div
                          className="combo-mobile-row-left"
                          onClick={() => toggleComboItem(item.id)}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="combo-mobile-checkbox"
                          />
                          <div className="combo-mobile-row-info">
                            <span className="combo-mobile-row-name">{item.name}</span>
                            <span className="combo-mobile-row-meta">{item.tag}</span>
                          </div>
                        </div>

                        {/* Weight Switcher Pills in Mobile Row */}
                        <div className="combo-mobile-weight-controls">
                          <div className="combo-weight-pills">
                            {item.weightOptions.map((wOpt, wIdx) => (
                              <button
                                key={wOpt.size}
                                type="button"
                                className={`combo-weight-pill ${
                                  currentWeightIdx === wIdx && isChecked ? 'active' : ''
                                }`}
                                onClick={() => setComboItemWeight(item.id, wIdx)}
                              >
                                {wOpt.size}
                              </button>
                            ))}
                          </div>
                          <span className="combo-mobile-row-price">₹{activeWeight.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MOBILE STICKY BOTTOM BAR (Total + Continue + Cancel) */}
            <div className="combo-mobile-sticky-bar">
              <div className="combo-mobile-sticky-left">
                <span className="combo-mobile-sticky-count">
                  {checkedComboEntries.length} {checkedComboEntries.length === 1 ? 'item' : 'items'}
                </span>
                <span className="combo-mobile-sticky-total">₹{comboRunningTotal}</span>
              </div>
              <div className="combo-mobile-sticky-actions">
                <button
                  type="button"
                  className="btn-combo-mobile-cancel"
                  onClick={handleComboCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-combo-mobile-continue"
                  disabled={checkedComboEntries.length === 0}
                  onClick={handleComboContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <button
          type="button"
          className="floating-cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label="View Cart"
        >
          <div className="cart-badge-count">{cartItemCount}</div>
          <svg
            width="18"
            height="18"
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

      {/* Cart Slide-Over Drawer with Combo Breakup */}
      {cartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-title-wrap">
                <h3 className="cart-title">Your Harvest Bag</h3>
                <span className="cart-items-count">({cartItemCount} items)</span>
              </div>
              <button
                type="button"
                className="cart-close-btn"
                onClick={() => setCartOpen(false)}
                aria-label="Close Bag"
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
                  Explore products
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${item.size}-${item.name}`} className="cart-item-row-wrapper">
                      <div className="cart-item-row">
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
                            type="button"
                            className="qty-btn"
                            onClick={() => updateCartQty(idx, -1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="qty-num">{item.quantity}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateCartQty(idx, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="cart-item-total">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      {/* Breakup of Custom Combo Packup */}
                      {item.isCustomCombo && item.comboItems && (
                        <div className="cart-combo-breakdown">
                          <span className="cart-combo-breakdown-title">Box Contents:</span>
                          <ul className="cart-combo-items-list">
                            {item.comboItems.map((ci, cIdx) => (
                              <li key={cIdx} className="cart-combo-subitem">
                                <span className="combo-subitem-name">• {ci.name} ({ci.size})</span>
                                <span className="combo-subitem-price">₹{ci.price}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
                    type="button"
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
              <h3 className="order-modal-title">Direct Harvest Order</h3>
              <button
                type="button"
                className="sidebar-close-btn"
                onClick={() => setOrderModalOpen(false)}
                aria-label="Close Order Modal"
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
                <button type="submit" className="btn-buy-now modal-submit">
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
