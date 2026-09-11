// Centralized Product Database for The Original (Palasa Cashews)
// Single Source of Truth for Catalog, Homepage, and Individual Product Detail Pages (PDP)

export const PRODUCTS_MASTER = [
  {
    id: 'w180',
    name: 'The Original W180',
    grade: 'Grade W180 · Jumbo King',
    gradeKey: 'w180',
    category: 'cashews',
    categoryLabel: 'Cashews',
    tagline: 'The King of Cashews — Largest Caliber Harvested in Palasa',
    desc: 'The rarest and largest king cashew of Palasa. Renowned for its rich ivory density, natural sweetness, and exceptionally creamy texture that melts on the palate.',
    fullStory:
      'Harvested from mature cashew trees nurtured by the coastal red laterite soil of Palasa, Grade W180 is the pinnacle of cashew calibration. Only 3 to 4 out of every hundred raw kernels qualify for this regal caliber (under 180 whole kernels per pound). We steam-boil and hand-crack each kernel with heritage care, preserving the rich natural oils and delicate crunch that commercial factory processing destroys.',
    image: '/assets/pouch.jpeg',
    gallery: [
      '/assets/pouch.jpeg',
      '/assets/grade-w180.jpg',
      '/assets/cashew-bowl-corner.jpg',
      '/assets/decorative-cashews.jpg',
    ],
    badge: 'Jumbo King',
    rating: 4.9,
    reviewCount: 142,
    origin: 'Palasa, Srikakulam District, Andhra Pradesh',
    fssai: '10126001000104',
    options: [
      { size: '250g', price: 460, mrp: 520, save: 'Save ₹60' },
      { size: '500g', price: 890, mrp: 999, save: 'Save ₹109 (Best Value)' },
    ],
    specs: {
      caliber: 'W180 (170–180 whole kernels / lb)',
      texture: 'Dense, exceptionally creamy, crisp snap',
      processing: 'Steam-boiled, hand-cracked & sun-finished',
      roastType: 'Raw / Naturally Cured (Zero Chemicals)',
      shelfLife: '6 months in airtight pack (Store cool & dry)',
      packaging: 'Multi-layer barrier nitrogen vacuum pouch',
    },
    nutritionPer100g: {
      energy: '585 kcal',
      protein: '18.2 g',
      healthyFats: '46.3 g',
      carbohydrates: '28.5 g',
      dietaryFiber: '3.3 g',
      cholesterol: '0 mg',
    },
    aPlusContent: [
      {
        title: 'Coastal Laterite Terroir',
        subtitle: 'Why Palasa Kernels Taste Different',
        body: 'The unique mineral-rich coastal laterite soil of the Bay of Bengal coastline infuses Palasa cashews with naturally higher oleic acid, giving them an unmistakable gentle sweetness without any added sugar.',
      },
      {
        title: 'Zero Chemical Bleaching',
        subtitle: 'Pure Ivory Hue as Nature Intended',
        body: 'Commercial white cashews are frequently sulfur-bleached for artificial whiteness. At The Original, we strictly avoid chemical washing. What you receive is pure, unadulterated ivory goodness.',
      },
      {
        title: 'Sealed at Kasibugga Factory',
        subtitle: 'Direct from Andhra’s Cashew Hub',
        body: 'Packaged directly at 13/1/76, Little Angels School Straight, Kasibugga, Palasa. No warehouse intermediaries, no stale shelf-life loss.',
      },
    ],
    reviews: [
      {
        id: 'rev-w180-1',
        name: 'Venkatesh Rao',
        city: 'Visakhapatnam',
        rating: 5,
        date: '2 weeks ago',
        comment:
          'Hands down the largest cashews I have seen. Each kernel is massive and has that fresh buttery taste that you only get directly from Palasa.',
        photo: '/assets/cashew-bowl-corner.jpg',
        verified: true,
      },
      {
        id: 'rev-w180-2',
        name: 'Priya Sundaram',
        city: 'Bengaluru',
        rating: 5,
        date: '1 month ago',
        comment:
          'Ordered the 500g pack. The vacuum packaging kept them so crisp. Absolutely zero broken pieces in the whole bag. Ordering again!',
        photo: '/assets/decorative-cashews.jpg',
        verified: true,
      },
      {
        id: 'rev-w180-3',
        name: 'Rajesh Sharma',
        city: 'Hyderabad',
        rating: 5,
        date: '3 weeks ago',
        comment:
          'Genuinely authentic Palasa cashews. Great crunch, clean taste, and my kids love having 5 every morning before school.',
        verified: true,
      },
    ],
  },
  {
    id: 'w240',
    name: 'The Original W240',
    grade: 'Grade W240 · Standard Jumbo',
    gradeKey: 'w240',
    category: 'cashews',
    categoryLabel: 'Cashews',
    tagline: 'Generously Sized Whole Kernels — The Crowd-Favorite Jumbo',
    desc: 'Generously calibrated whole cashews offering crisp snap and delicate buttery character of coastal laterite soil. Loved across India for luxury snacking.',
    fullStory:
      'Grade W240 represents the ideal sweet spot between king caliber size and everyday snacking luxury. With approximately 220 to 240 whole kernels per pound, each nut provides a satisfying, wholesome bite with clean ivory finish. Sourced directly from local Palasa farmers and processed within days of harvest.',
    image: '/assets/pouch.jpeg',
    gallery: [
      '/assets/pouch.jpeg',
      '/assets/grade-w240.jpg',
      '/assets/cashew-bowl-corner.jpg',
      '/assets/decorative-cashews.jpg',
    ],
    badge: 'Popular',
    rating: 4.8,
    reviewCount: 118,
    origin: 'Palasa, Srikakulam District, Andhra Pradesh',
    fssai: '10126001000104',
    options: [
      { size: '250g', price: 380, mrp: 440, save: 'Save ₹60' },
      { size: '500g', price: 740, mrp: 850, save: 'Save ₹110 (Best Value)' },
    ],
    specs: {
      caliber: 'W240 (230–240 whole kernels / lb)',
      texture: 'Firm snap, sweet nutty finish',
      processing: 'Heritage steam boiled & hand calibrated',
      roastType: 'Raw / Naturally Dried',
      shelfLife: '6 months in airtight pack',
      packaging: 'Multi-layer barrier nitrogen vacuum pouch',
    },
    nutritionPer100g: {
      energy: '575 kcal',
      protein: '18.0 g',
      healthyFats: '45.8 g',
      carbohydrates: '29.0 g',
      dietaryFiber: '3.2 g',
      cholesterol: '0 mg',
    },
    aPlusContent: [
      {
        title: 'Perfect Snacking Caliber',
        subtitle: 'Generous Size, Irresistible Crunch',
        body: 'Large enough to feel premium in your hand, yet perfectly calibrated for everyday healthy snacking at your desk or home.',
      },
      {
        title: 'Naturally Energizing',
        subtitle: 'Plant Protein & Heart-Healthy Fats',
        body: 'Packed with magnesium, plant protein, and oleic mono-unsaturated fats to keep your energy steady throughout demanding days.',
      },
      {
        title: 'Factory Direct from Kasibugga',
        subtitle: 'Pristine Coastal Processing',
        body: 'Steam cracked in Palasa and vacuum sealed within 48 hours to preserve peak freshness and moisture levels.',
      },
    ],
    reviews: [
      {
        id: 'rev-w240-1',
        name: 'Ananya Deshmukh',
        city: 'Mumbai',
        rating: 5,
        date: '1 week ago',
        comment:
          'Super fresh! Delivery took only 3 days to Mumbai. W240 size is very generous and tastes way fresher than supermarket brands.',
        photo: '/assets/cashew-bowl-corner.jpg',
        verified: true,
      },
      {
        id: 'rev-w240-2',
        name: 'K. Satyanarayana',
        city: 'Vijayawada',
        rating: 5,
        date: '2 weeks ago',
        comment:
          'Being from AP, I know authentic Palasa cashews when I taste them. The Original delivers genuine quality.',
        verified: true,
      },
    ],
  },
  {
    id: 'w320',
    name: 'The Original W320',
    grade: 'Grade W320 · Classic Benchmark',
    gradeKey: 'w320',
    category: 'cashews',
    categoryLabel: 'Cashews',
    tagline: 'The Gold Standard of Indian Cashews — Everyday Pure Nourishment',
    desc: 'The traditional standard of Palasa harvests. Pristine whole kernels, perfectly balanced for everyday nourishment, family health habits, and festive gifting.',
    fullStory:
      'W320 is universally recognized as the gold benchmark of whole cashew kernels across India and export markets (300–320 kernels per pound). It offers consistent kernel structure, crisp texture, and reliable buttery flavor. Ideal for families wanting daily health nutrition at an accessible factory price point.',
    image: '/assets/pouch.jpeg',
    gallery: [
      '/assets/pouch.jpeg',
      '/assets/grade-w320.jpg',
      '/assets/cashew-bowl-corner.jpg',
      '/assets/decorative-cashews.jpg',
    ],
    badge: 'Benchmark',
    rating: 4.8,
    reviewCount: 205,
    origin: 'Palasa, Srikakulam District, Andhra Pradesh',
    fssai: '10126001000104',
    options: [
      { size: '250g', price: 320, mrp: 380, save: 'Save ₹60' },
      { size: '500g', price: 620, mrp: 720, save: 'Save ₹100 (Best Value)' },
    ],
    specs: {
      caliber: 'W320 (300–320 whole kernels / lb)',
      texture: 'Crisp, delicately buttery, uniform',
      processing: 'Steam boiled, calibrated & vacuum sealed',
      roastType: 'Raw / Naturally Dried',
      shelfLife: '6 months in airtight pack',
      packaging: 'Multi-layer barrier nitrogen vacuum pouch',
    },
    nutritionPer100g: {
      energy: '570 kcal',
      protein: '18.0 g',
      healthyFats: '45.0 g',
      carbohydrates: '29.5 g',
      dietaryFiber: '3.1 g',
      cholesterol: '0 mg',
    },
    aPlusContent: [
      {
        title: 'Daily Family Wellness',
        subtitle: 'Doctor Recommended Morning Habit',
        body: 'A small handful of 5 to 6 whole cashews provides essential zinc, magnesium, and plant protein for sustained heart and brain vitality.',
      },
      {
        title: 'Heritage Palasa Calibration',
        subtitle: 'Zero Pieces, 100% Whole Kernels',
        body: 'Every single kernel passes mechanical sieves and visual inspection in Palasa so you never find splits or broken chips.',
      },
      {
        title: 'Purity Tested',
        subtitle: 'Zero Preservatives or Additives',
        body: 'Just 100% pure raw cashew nut kernels direct from Kasibugga to your kitchen cabinet.',
      },
    ],
    reviews: [
      {
        id: 'rev-w320-1',
        name: 'Suresh Menon',
        city: 'Chennai',
        rating: 5,
        date: '2 weeks ago',
        comment:
          'Great value and supreme quality. We use this daily in our breakfast oats and evening snacks.',
        photo: '/assets/decorative-cashews.jpg',
        verified: true,
      },
      {
        id: 'rev-w320-2',
        name: 'Kavita Reddy',
        city: 'Tirupati',
        rating: 5,
        date: '1 month ago',
        comment:
          'Very crisp and fresh! Delivery was on time and packaging was completely sealed with vacuum integrity.',
        verified: true,
      },
    ],
  },
  {
    id: 'pottu-pappu',
    name: 'Palasa Raw Cashew / Skin Cashews',
    grade: 'Heritage Roasted · Skin-On (Pottu Pappu)',
    gradeKey: 'skin',
    category: 'cashews',
    categoryLabel: 'Cashews',
    tagline: 'Rustic Andhra Specialty — Roasted with Natural Fiber Skin',
    desc: 'Traditional unpeeled Palasa cashews roasted slow with protective natural skin intact. Extra crunch, deep roasted aroma, and rich antioxidant skin fiber.',
    fullStory:
      'Known locally in Andhra Pradesh as "Pottu Pappu", these cashews are slow-roasted with their natural reddish-brown outer testa skin intact. The skin locks in volatile aromatic oils during roasting, giving an intense earthy, rustic nuttiness with extra crunch. The skin is completely edible, packed with polyphenols and natural dietary fiber.',
    image: '/assets/skin-cashew.png',
    gallery: [
      '/assets/skin-cashew.png',
      '/assets/cashew-bowl-corner.jpg',
      '/assets/decorative-cashews.jpg',
    ],
    badge: 'Heritage Roasted',
    rating: 4.9,
    reviewCount: 96,
    origin: 'Palasa, Srikakulam District, Andhra Pradesh',
    fssai: '10126001000104',
    options: [
      { size: '250g', price: 290, mrp: 350, save: 'Save ₹60' },
      { size: '500g', price: 560, mrp: 660, save: 'Save ₹100 (Best Value)' },
    ],
    specs: {
      caliber: 'Whole Kernel with Natural Testa Skin',
      texture: 'Extra-crisp, roasted smokey finish',
      processing: 'Slow drum-roasted with skin intact',
      roastType: 'Slow Roasted (Zero Oil Added)',
      shelfLife: '6 months in airtight pack',
      packaging: 'Multi-layer barrier nitrogen vacuum pouch',
    },
    nutritionPer100g: {
      energy: '590 kcal',
      protein: '18.5 g',
      healthyFats: '47.0 g',
      carbohydrates: '27.0 g',
      dietaryFiber: '5.2 g',
      cholesterol: '0 mg',
    },
    aPlusContent: [
      {
        title: 'Authentic Pottu Pappu Tradition',
        subtitle: 'Andhra’s Favorite Teatime Nut',
        body: 'Roasted slow on gentle heat so the natural testa skin crisps up like a delicate wafer, providing deep roasted aroma.',
      },
      {
        title: 'Higher Antioxidants & Fiber',
        subtitle: 'Nutrient-Dense Natural Skin',
        body: 'The cashew skin contains natural plant tannins and flavonoids comparable to dark chocolate and green tea.',
      },
      {
        title: 'Zero Added Oil or Salt',
        subtitle: 'Dry Roasted to Perfection',
        body: 'No palm oil, no artificial seasoning. Just wholesome roasted goodness from Palasa.',
      },
    ],
    reviews: [
      {
        id: 'rev-skin-1',
        name: 'Gowri Shankar',
        city: 'Rajahmundry',
        rating: 5,
        date: '3 weeks ago',
        comment:
          'This is real Pottu Pappu! Reminds me of childhood when my grandfather brought fresh roasted cashews from Kasibugga. Super crunchy!',
        photo: '/assets/skin-cashew.png',
        verified: true,
      },
    ],
  },
  {
    id: 'splits',
    name: 'The Original Splits',
    grade: 'Clean Split Cashews · Halves & Kernels',
    gradeKey: 'splits',
    category: 'cashews',
    categoryLabel: 'Cashews',
    tagline: 'Kitchen Essential — Hand-Selected Pure Halves for Festive Cooking',
    desc: 'Clean, hand-selected split cashew kernels. Perfect for everyday cooking, traditional Andhra sweets, rich curries, biryanis, and home festive baking.',
    fullStory:
      'When raw whole cashews are gently cracked, some kernels naturally separate into pristine halves (splits). Our Palasa Splits are rigorously sorted to remove tiny crumbs and dust, leaving only clean, large halves. Perfect for roasting with ghee for kheer, payasam, upma, and creamy restaurant-style gravy bases.',
    image: '/assets/grade-jh.jpg',
    gallery: [
      '/assets/grade-jh.jpg',
      '/assets/cashew-bowl-corner.jpg',
      '/assets/decorative-cashews.jpg',
    ],
    badge: 'Kitchen Essential',
    rating: 4.7,
    reviewCount: 88,
    origin: 'Palasa, Srikakulam District, Andhra Pradesh',
    fssai: '10126001000104',
    options: [
      { size: '250g', price: 240, mrp: 290, save: 'Save ₹50' },
      { size: '500g', price: 460, mrp: 540, save: 'Save ₹80 (Best Value)' },
    ],
    specs: {
      caliber: 'JH (Jumbo Halves & Clean Splits)',
      texture: 'Tender, rich in natural oils, fast cooking',
      processing: 'Steam cracked, sorted and de-dusted',
      roastType: 'Raw / Kitchen Grade',
      shelfLife: '6 months in airtight pack',
      packaging: 'Multi-layer barrier vacuum pouch',
    },
    nutritionPer100g: {
      energy: '570 kcal',
      protein: '17.8 g',
      healthyFats: '45.2 g',
      carbohydrates: '29.0 g',
      dietaryFiber: '3.0 g',
      cholesterol: '0 mg',
    },
    aPlusContent: [
      {
        title: 'Pure Kitchen Convenience',
        subtitle: 'No Breaking Needed for Cooking',
        body: 'Pre-split clean halves ready to roast in desi ghee for festive sweets, biryanis, and rich nut pastes.',
      },
      {
        title: 'Same Farm Purity',
        subtitle: 'Fresh Harvest from Palasa',
        body: 'Split from the exact same premium coastal crop as our whole grades, delivering the same rich taste at cooking-friendly economics.',
      },
    ],
    reviews: [
      {
        id: 'rev-splits-1',
        name: 'Lakshmi Narayana',
        city: 'Guntur',
        rating: 5,
        date: '2 weeks ago',
        comment:
          'Very clean splits with zero dust or broken residue. Fried in ghee for Diwali sweets and the aroma was incredible.',
        verified: true,
      },
    ],
  },
  {
    id: 'choco-cashew',
    name: 'Chocolate Cashew',
    grade: 'Artisanal Confectionery · Grade Customizable',
    gradeKey: 'choco',
    category: 'flavours-mixes',
    categoryLabel: 'Flavours & Mixes',
    tagline: 'Slow Roasted Palasa Cashews Coated in Belgian-Style Dark Chocolate',
    desc: 'Slow roasted Palasa whole cashews enrobed in decadent 55% Belgian-style dark chocolate. Choose your preferred kernel caliber (W180 / W210 / W320) for customized indulgence.',
    fullStory:
      'We marry Andhra’s premier cashew harvest with rich European cocoa confectionery. Whole cashews are gently drum-roasted to a golden snap, then coated in silky layers of artisanal dark chocolate. A guilt-free balance of wholesome nut crunch and velvety cocoa richness.',
    image: '/assets/pouch.jpeg',
    gallery: ['/assets/pouch.jpeg'],
    badge: 'Artisanal',
    rating: 4.9,
    reviewCount: 74,
    hasGradeCustomization: true,
    customGrades: ['W320', 'W210', 'W180'],
    gradeOptions: {
      W320: [
        { size: '100g', price: 210, mrp: 250, save: 'Save ₹40' },
        { size: '200g', price: 390, mrp: 460, save: 'Save ₹70' },
      ],
      W210: [
        { size: '100g', price: 240, mrp: 290, save: 'Save ₹50' },
        { size: '200g', price: 450, mrp: 540, save: 'Save ₹90' },
      ],
      W180: [
        { size: '100g', price: 280, mrp: 340, save: 'Save ₹60' },
        { size: '200g', price: 520, mrp: 620, save: 'Save ₹100' },
      ],
    },
    origin: 'Palasa, Andhra Pradesh',
    fssai: '10126001000104',
    options: [
      { size: '100g', price: 210, mrp: 250, save: 'Save ₹40' },
      { size: '200g', price: 390, mrp: 460, save: 'Save ₹70' },
    ],
    specs: {
      caliber: 'Whole Roasted Kernel with Dark Chocolate Coating',
      texture: 'Melt-in-mouth cocoa followed by crisp nut snap',
      cocoaPercent: '55% Rich Dark Cocoa Formulation',
      shelfLife: '4 months (Store below 22°C away from sunlight)',
      packaging: 'Ziplock luxury matte pouch',
    },
    nutritionPer100g: {
      energy: '540 kcal',
      protein: '11.5 g',
      healthyFats: '38.0 g',
      carbohydrates: '44.0 g',
      dietaryFiber: '4.5 g',
      cholesterol: '0 mg',
    },
    aPlusContent: [
      {
        title: 'Slow Roasted Nut Core',
        subtitle: 'Crisp Core That Won’t Turn Soggy',
        body: 'Cashews are batch-roasted before chocolate panning so the nut core stays delightfully crisp.',
      },
      {
        title: '55% Fine Dark Chocolate',
        subtitle: 'Not Overly Sweet',
        body: 'Balanced cocoa profile that lets the natural cashew sweetness shine through.',
      },
    ],
    reviews: [
      {
        id: 'rev-choco-1',
        name: 'Deepika K.',
        city: 'Kolkata',
        rating: 5,
        date: '1 week ago',
        comment:
          'Absolute heaven! The dark chocolate is not sickeningly sweet and the cashew inside is huge and crunchy. Highly recommended!',
        photo: '/assets/pouch.jpeg',
        verified: true,
      },
    ],
  },
  {
    id: 'mix-dry-fruit',
    name: 'Dry Fruits & Cashew Mix',
    grade: 'Gourmet Medley · California Almonds & Palasa Nuts',
    gradeKey: 'mix',
    category: 'flavours-mixes',
    categoryLabel: 'Flavours & Mixes',
    tagline: 'The Ultimate Energy Medley — Palasa Cashews, Almonds & Afghan Raisins',
    desc: 'Slow roasted Palasa whole cashews paired with crunchy California almonds and sun-ripened green raisins. Customize with your preferred cashew caliber.',
    fullStory:
      'A masterfully balanced daily energy trail mix created for health enthusiasts and families. Hand-blended in Palasa, combining whole golden cashews, sweet green raisins, and crisp California almonds.',
    image: '/assets/pouch.jpeg',
    gallery: ['/assets/pouch.jpeg'],
    badge: 'Gourmet Blend',
    rating: 4.8,
    reviewCount: 65,
    hasGradeCustomization: true,
    customGrades: ['W320', 'W210', 'W180'],
    gradeOptions: {
      W320: [
        { size: '250g', price: 340, mrp: 400, save: 'Save ₹60' },
        { size: '500g', price: 650, mrp: 750, save: 'Save ₹100' },
      ],
      W210: [
        { size: '250g', price: 380, mrp: 450, save: 'Save ₹70' },
        { size: '500g', price: 720, mrp: 840, save: 'Save ₹120' },
      ],
      W180: [
        { size: '250g', price: 420, mrp: 500, save: 'Save ₹80' },
        { size: '500g', price: 790, mrp: 920, save: 'Save ₹130' },
      ],
    },
    origin: 'Palasa, Andhra Pradesh',
    fssai: '10126001000104',
    options: [
      { size: '250g', price: 340, mrp: 400, save: 'Save ₹60' },
      { size: '500g', price: 650, mrp: 750, save: 'Save ₹100' },
    ],
    specs: {
      ingredients: 'Palasa Cashews (50%), California Almonds (30%), Green Raisins (20%)',
      texture: 'Chewy, crunchy, naturally sweet',
      processing: 'Dry roasted nuts with sun-dried fruits',
      shelfLife: '6 months in airtight pack',
      packaging: 'Multi-layer barrier vacuum pouch',
    },
    nutritionPer100g: {
      energy: '535 kcal',
      protein: '16.5 g',
      healthyFats: '39.0 g',
      carbohydrates: '38.0 g',
      dietaryFiber: '6.0 g',
      cholesterol: '0 mg',
    },
    aPlusContent: [
      {
        title: 'Handcrafted Ratio',
        subtitle: 'Generous on Nuts, Light on Fillers',
        body: 'Unlike commercial mixes stuffed with cheap raisins, our blend is over 80% premium whole nuts.',
      },
    ],
    reviews: [
      {
        id: 'rev-mix-1',
        name: 'Arun Varma',
        city: 'Kochi',
        rating: 5,
        date: '2 weeks ago',
        comment:
          'Superb balance. The cashews are whole and crunchy, almonds are fresh. Best pre-workout snack.',
        verified: true,
      },
    ],
  },
  {
    id: 'gift-box-duo',
    name: 'Palasa Royal Harvest Duo',
    grade: 'Artisanal Festive Gift Pack',
    gradeKey: 'gifting',
    category: 'gifting',
    categoryLabel: 'Gifting',
    tagline: 'Luxury Gifting Box — Featuring Jumbo King W180 & Pottu Pappu',
    desc: 'An opulent rigid gift box featuring 250g of Jumbo King W180 and 250g of slow-roasted Skin-On Cashews. Crafted for corporate gifting and festive celebrations.',
    fullStory:
      'Designed for weddings, corporate tokens of appreciation, and festive greetings. Packed in an embossed royal navy and gold box with airtight inner tins to ensure pristine presentation and freshness.',
    image: '/assets/pouch.jpeg',
    gallery: ['/assets/pouch.jpeg'],
    badge: 'Royal Gift',
    rating: 5.0,
    reviewCount: 42,
    origin: 'Palasa, Andhra Pradesh',
    fssai: '10126001000104',
    options: [
      { size: '500g Gift Box (2 × 250g Tins)', price: 850, mrp: 999, save: 'Save ₹149' },
    ],
    specs: {
      boxContents: '1 × 250g W180 King Kernels + 1 × 250g Roasted Skin Cashews',
      packaging: 'Rigid magnetic luxury box with embossed gold foil',
      shelfLife: '6 months sealed',
    },
    nutritionPer100g: {
      energy: '585 kcal',
      protein: '18.2 g',
      healthyFats: '46.0 g',
      carbohydrates: '28.0 g',
      dietaryFiber: '4.0 g',
      cholesterol: '0 mg',
    },
    aPlusContent: [
      {
        title: 'Unboxing Luxury',
        subtitle: 'A Gift That Leaves an Impression',
        body: 'Rich navy textured exterior with gold foil calligraphy from the Cashew Capital of Palasa.',
      },
    ],
    reviews: [
      {
        id: 'rev-gift-1',
        name: 'Madhavan K.',
        city: 'Bangalore',
        rating: 5,
        date: '1 month ago',
        comment:
          'Ordered 20 boxes for our executive corporate Diwali gifting. Everyone was raving about the packaging and kernel size!',
        photo: '/assets/cashew-bowl-corner.jpg',
        verified: true,
      },
    ],
  },
];

// Helper to get product by ID
export function getProductById(id) {
  if (!id) return null;
  return PRODUCTS_MASTER.find((p) => p.id.toLowerCase() === id.toLowerCase()) || null;
}

// Helper to get recommended products excluding current ID
export function getRecommendedProducts(currentId, limit = 3) {
  return PRODUCTS_MASTER.filter((p) => p.id !== currentId).slice(0, limit);
}
