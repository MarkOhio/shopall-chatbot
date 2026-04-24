const products = [
  // Electronics
  { id: 1, name: "Wireless Bluetooth Headphones", category: "Electronics", price: 12500, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", description: "Over-ear noise cancelling, 30hr battery life." },
  { id: 2, name: "Smart LED Desk Lamp", category: "Electronics", price: 4800, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", description: "Touch control, 3 colour modes, USB charging port." },
  { id: 3, name: "Mechanical Keyboard", category: "Electronics", price: 18900, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", description: "TKL layout, blue switches, RGB backlight." },
  { id: 4, name: "Portable Power Bank 20000mAh", category: "Electronics", price: 7500, image: "https://images.unsplash.com/photo-1609592806596-4f8e3e6e0e6e?w=400&q=80", description: "Dual USB + USB-C, fast charge support." },
  { id: 5, name: "Wireless Mouse", category: "Electronics", price: 3200, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", description: "Silent click, 12 months battery, plug-and-play." },

  // Fashion
  { id: 6, name: "Men's Classic Oxford Shirt", category: "Fashion", price: 5500, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80", description: "100% cotton, slim fit, available S–XXL." },
  { id: 7, name: "Women's Floral Midi Dress", category: "Fashion", price: 8200, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80", description: "Lightweight chiffon, summer collection." },
  { id: 8, name: "Unisex Canvas Sneakers", category: "Fashion", price: 9800, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", description: "Rubber sole, sizes 36–46, 5 colour options." },
  { id: 9, name: "Leather Crossbody Bag", category: "Fashion", price: 14500, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", description: "Genuine leather, adjustable strap, zip closure." },
  { id: 10, name: "Polarized Sunglasses", category: "Fashion", price: 4200, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", description: "UV400 protection, lightweight titanium frame." },

  // Home & Kitchen
  { id: 11, name: "Stainless Steel Water Bottle", category: "Home & Kitchen", price: 2800, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80", description: "1L, vacuum insulated, keeps cold 24hr, hot 12hr." },
  { id: 12, name: "Non-Stick Frying Pan Set", category: "Home & Kitchen", price: 11200, image: "https://images.unsplash.com/photo-1584990347449-39a1d8e6e0e6?w=400&q=80", description: "3-piece set: 20cm, 24cm, 28cm." },
  { id: 13, name: "Bamboo Cutting Board", category: "Home & Kitchen", price: 3500, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", description: "Eco-friendly, juice groove, anti-slip feet." },
  { id: 14, name: "Electric Kettle 1.7L", category: "Home & Kitchen", price: 6800, image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=400&q=80", description: "Auto shut-off, boil-dry protection, 2200W." },
  { id: 15, name: "Wall Clock – Minimalist", category: "Home & Kitchen", price: 4100, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80", description: "Silent sweep, 30cm diameter, batteries included." },

  // Beauty & Personal Care
  { id: 16, name: "Vitamin C Brightening Serum", category: "Beauty", price: 5900, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80", description: "15% Vitamin C, hyaluronic acid, 30ml." },
  { id: 17, name: "Electric Facial Cleansing Brush", category: "Beauty", price: 8700, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80", description: "Waterproof, 3 speed settings, USB rechargeable." },
  { id: 18, name: "Men's Grooming Kit", category: "Beauty", price: 7200, image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80", description: "Trimmer, razor, scissors — full travel set." },

  // Sports & Fitness
  { id: 19, name: "Yoga Mat – Non-Slip 6mm", category: "Sports", price: 4500, image: "https://images.unsplash.com/photo-1601925228008-f15e9c08c7b8?w=400&q=80", description: "TPE material, carry strap included, 183x61cm." },
  { id: 20, name: "Adjustable Dumbbell Set", category: "Sports", price: 22000, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", description: "5–25kg per dumbbell, quick-adjust dial system." },
  { id: 21, name: "Jump Rope – Speed Cable", category: "Sports", price: 1800, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80", description: "Ball bearings, adjustable length, foam handles." },

  // Books & Stationery
  { id: 22, name: "Hardcover Dotted Notebook A5", category: "Stationery", price: 2200, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80", description: "192 pages, 100gsm paper, elastic closure." },
  { id: 23, name: "Gel Pen Set (12 colours)", category: "Stationery", price: 1500, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&q=80", description: "Smooth 0.5mm tip, quick-dry ink." },

  // Food & Snacks
  { id: 24, name: "Organic Honey 500g", category: "Food", price: 3800, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80", description: "Raw, unfiltered, direct from local farms." },
  { id: 25, name: "Mixed Nuts Gift Box 400g", category: "Food", price: 5200, image: "https://images.unsplash.com/photo-1567689265664-6b3b8e77bb4a?w=400&q=80", description: "Cashews, almonds, walnuts, raisins — no salt added." },
];
