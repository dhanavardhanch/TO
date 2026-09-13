// Comprehensive FAQ Database for The Original (Palasa Cashews)
// Single source of truth for Homepage and Product Detail Page (PDP) FAQs
// Uses even numbers of questions (8 for Homepage, 6 for Product PDP) for balanced 2-column layout

export const HOMEPAGE_FAQS = [
  {
    id: 'faq-home-1',
    question: 'What makes Palasa cashews different from regular supermarket cashews?',
    answer:
      'Palasa, situated on the coastal laterite belt of Andhra Pradesh along the Bay of Bengal, possesses a rare terroir rich in mineral density and coastal humidity. This environment infuses the cashew kernels with naturally elevated oleic acid, giving them an authentic, gentle sweetness and a dense, buttery crunch. Unlike supermarket brands that change hands through multiple middlemen, warehouse aging, and sulfur bleaching, The Original processes and vacuum-packs directly at our Kasibugga facility within days of harvest.',
    category: 'Origin & Quality',
  },
  {
    id: 'faq-home-2',
    question: 'What do cashew grades like W180, W240, and W320 actually mean?',
    answer:
      "Cashew grades designate kernel caliber and size count per imperial pound (approx. 454 grams). 'W' stands for 'White Whole'. For instance, Grade W180 is the revered 'Jumbo King' caliber containing only 170–180 whole kernels per pound—the largest and rarest harvested in Palasa. W210 is premium jumbo, W240 is the crowd-favorite snacking standard, and W320 is the everyday household benchmark. The lower the number, the larger and meatier the cashew.",
    category: 'Grades & Selection',
  },
  {
    id: 'faq-home-3',
    question: 'Are your cashews chemically bleached or treated with preservatives?',
    answer:
      'Never. Mass-market cashews are frequently washed with chemical sulfur baths or chlorine agents to artificially bleach them stark white. At The Original, we strictly practice zero chemical bleaching. Our kernels retain their natural, rich ivory hue, achieved purely through traditional steam boiling, delicate hand-cracking, and gentle sun drying. What you receive is 100% pure, unadulterated nature.',
    category: 'Processing & Purity',
  },
  {
    id: 'faq-home-4',
    question: 'How are the cashews packaged to ensure farm-fresh crispness?',
    answer:
      'Every pack is sealed at our Palasa facility in premium multi-layer barrier vacuum pouches with nitrogen flushing. This completely prevents oxygen contact and moisture absorption, locking in natural essential oils and crisp snap for up to 6 months without synthetic preservatives.',
    category: 'Packaging & Freshness',
  },
  {
    id: 'faq-home-5',
    question: 'What is your shipping policy and delivery timeline across India?',
    answer:
      'We provide reliable Pan-India express delivery directly from Palasa. Orders are freshly batched and dispatched within 1–2 business days. Metro cities (Hyderabad, Bengaluru, Chennai, Mumbai, Delhi NCR) typically receive delivery within 3–5 business days, while other regions take 5–7 business days via premier air express and surface courier partners with real-time SMS and WhatsApp tracking.',
    category: 'Shipping & Delivery',
  },
  {
    id: 'faq-home-6',
    question: 'What are Original Coins and how do I earn and redeem them?',
    answer:
      'Original Coins is our exclusive customer loyalty program. Every completed order automatically credits 100 Original Coins into your digital wallet upon verified delivery (worth ₹10 value). Once you reach 5,000 coins, you can instantly redeem a flat ₹500 voucher on your checkout order in a single click.',
    category: 'Rewards & Wallet',
  },
  {
    id: 'faq-home-7',
    question: 'Do you offer bulk, corporate, and festive wedding gifting orders?',
    answer:
      'Yes! We craft bespoke luxury gift boxes (such as our Royal Harvest Duo) in regal navy and gold packaging with personalized greeting notes. For corporate bulk inquiries or customized festive hampers, contact us directly via WhatsApp at +91 91002 67404.',
    category: 'Gifting & Corporate',
  },
  {
    id: 'faq-home-8',
    question: 'How do I track my shipment, and what is your quality satisfaction policy?',
    answer:
      'The moment your order is dispatched from our Palasa facility, an automated SMS and WhatsApp update with your courier Airway Bill (AWB) and live tracking link is dispatched to you. We stand behind our harvest quality with 100% replacement assurance: if you experience any transit damage or pouch seal compromise, message our support on WhatsApp within 48 hours for an immediate replacement or prompt refund.',
    category: 'Tracking & Assurance',
  },
];

/**
 * Returns tailored FAQ items for any individual product detail page
 * Always returns an even number (6 items: 3 in left col, 3 in right col) for a balanced 2-column grid
 */
export function getProductFaqs(product) {
  if (!product) return HOMEPAGE_FAQS.slice(0, 6);

  const isFlavored = product.category === 'flavored' || product.category === 'roasted';
  const isGifting = product.category === 'gifting';
  const isSplits = product.gradeKey === 'jh' || product.id.includes('split');

  const faqs = [];

  // Q1: Caliber / Product Specific
  if (isGifting) {
    faqs.push({
      id: `pdp-${product.id}-1`,
      question: `What is included inside the ${product.name}?`,
      answer:
        product.specs?.boxContents ||
        `Each ${product.name} includes carefully curated, vacuum-sealed tins of our finest Palasa harvests, packaged in an opulent rigid gift box with embossed gold foil details, ready for premium festive or corporate presentation.`,
    });
  } else if (isFlavored) {
    faqs.push({
      id: `pdp-${product.id}-1`,
      question: `How is ${product.name} seasoned and roasted?`,
      answer:
        `Our ${product.name} is slow-roasted in small batches using gentle indirect heat. We use authentic stone-ground spices and natural seasoning without refined palm oils, MSG, or artificial food dyes, ensuring a clean, savory crunch that complements the cashew's natural creaminess.`,
    });
  } else if (isSplits) {
    faqs.push({
      id: `pdp-${product.id}-1`,
      question: `What are JH Split Cashews best used for?`,
      answer:
        `JH (Jumbo Halves) are natural whole splits produced during careful hand-cracking. They boast the exact same rich coastal terroir, buttery crunch, and nutritional profile as whole king kernels, making them the ultimate cost-effective choice for daily breakfast oatmeal, homemade cashew butter, payasam, rich biryanis, and curries.`,
    });
  } else {
    faqs.push({
      id: `pdp-${product.id}-1`,
      question: `What makes ${product.name} (${product.grade || ''}) distinct?`,
      answer:
        `${product.name} is selected from the ${product.specs?.caliber || 'finest kernel caliber'} harvest of Palasa. ${product.desc} Only a small fraction of raw cashew kernels harvested in coastal Andhra Pradesh qualify for this exacting caliber.`,
    });
  }

  // Q2: Direct Sourcing & FSSAI
  faqs.push({
    id: `pdp-${product.id}-2`,
    question: `Is this product guaranteed 100% genuine Palasa origin?`,
    answer:
      `Yes. Every single batch is sourced directly from heritage family orchards in Palasa, Srikakulam District, Andhra Pradesh. We process and pack at our Kasibugga facility under Central FSSAI License #${product.fssai || '10126001000104'}, ensuring complete origin traceability with zero mixed African or imported warehouse lots.`,
  });

  // Q3: Storage and Shelf Life
  faqs.push({
    id: `pdp-${product.id}-3`,
    question: `How should I store ${product.name} once the vacuum seal is opened?`,
    answer:
      `Before opening, the nitrogen-flushed barrier pack keeps the cashews crisp for 6 months at room temperature. Once opened, transfer the cashews into a clean, airtight glass or metal container and store in a cool, dry place away from direct sunlight. In hot or humid climates, refrigerating in an airtight jar preserves that signature fresh-cracked crunch even longer.`,
  });

  // Q4: Health & Nutritional Value
  faqs.push({
    id: `pdp-${product.id}-4`,
    question: `What are the health benefits of eating ${product.name} daily?`,
    answer:
      `Palasa cashews are a natural powerhouse of heart-healthy monounsaturated fats (oleic acid), plant-based protein (~18g per 100g), magnesium, zinc, and dietary fiber with zero dietary cholesterol. Enjoying 5–8 kernels daily supports sustained cognitive energy, heart wellness, and satiety without blood sugar spikes.`,
  });

  // Q5: Available Pack Sizes & Batch Freshness
  faqs.push({
    id: `pdp-${product.id}-5`,
    question: `What pack sizes are available and how fresh is each batch?`,
    answer:
      `We offer convenient 250g trial pouches, 500g value packs, and custom multi-pack gift boxes. Rather than warehousing bulk stock, we pack in small daily batches immediately prior to courier pickup, ensuring you always receive peak fresh-cracked crunch.`,
  });

  // Q6: Shipping & Delivery
  faqs.push({
    id: `pdp-${product.id}-6`,
    question: `When will my order of ${product.name} be delivered?`,
    answer:
      `Orders are freshly sealed and dispatched from Palasa within 24 to 48 business hours. Delivery to major metro hubs (Hyderabad, Bengaluru, Chennai, Mumbai, Delhi) takes approximately 3–5 business days with real-time SMS and WhatsApp tracking.`,
  });

  return faqs;
}
