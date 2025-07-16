import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  // Auth
  isAdminAuthenticated: false,
  currentUser: null,

  // Products
  products: [
    {
      id: 1,
      name: "Glock 19 Gen 5",
      description:
        "The most versatile and reliable compact pistol for concealed carry, home defense, and duty use. Features enhanced ergonomics and improved accuracy.",
      price: 549.99,
      originalPrice: 599.99,
      category: "handguns",
      stock: 15,
      images: [
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
      ],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
      manufacturer: "Glock",
      caliber: "9mm Luger",
      capacity: "15+1",
      barrelLength: "4.02 inches",
      overallLength: "7.36 inches",
      weight: "23.65 oz",
      action: "Safe Action",
      finish: "Polymer Frame / Steel Slide",
      sights: "Glock Night Sights",
      features: [
        "Enhanced trigger with smoother pull",
        "Improved grip texture",
        "Ambidextrous slide stop lever",
        "Flared magazine well",
        "No finger grooves",
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "5.5 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety", "Drop Safety"],
        magazines: "Ships with 3 magazines",
        warranty: "Limited Lifetime Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.8,
      reviews: 247,
    },
    {
      id: 11,
      name: "Sig Sauer P320",
      description:
        "Modular striker-fired pistol system adopted by the U.S. Military. Ultimate in reliability and versatility.",
      price: 629.99,
      originalPrice: 699.99,
      category: "handguns",
      stock: 12,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
      ],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
      manufacturer: "Sig Sauer",
      caliber: "9mm Luger",
      capacity: "17+1",
      barrelLength: "4.7 inches",
      overallLength: "8.0 inches",
      weight: "29.4 oz",
      action: "Striker Fired",
      finish: "Nitron Stainless Steel",
      sights: "SIGLITE Night Sights",
      features: [
        "Modular design allows caliber changes",
        "Enhanced trigger with crisp break",
        "Accessory rail for lights/lasers",
        "Removable fire control unit",
        "Tool-free disassembly",
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.5-6.5 lbs",
        safetyFeatures: ["Striker Safety", "Disconnect Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "Lifetime Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 12,
      name: "Smith & Wesson M&P Shield Plus",
      description:
        "Ultra-compact concealed carry pistol with increased capacity. Perfect balance of size and shootability.",
      price: 499.99,
      category: "handguns",
      stock: 20,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["handguns"],
      manufacturer: "Smith & Wesson",
      caliber: "9mm Luger",
      capacity: "13+1",
      barrelLength: "3.1 inches",
      overallLength: "6.1 inches",
      weight: "20.2 oz",
      action: "Striker Fired",
      finish: "Armornite Coating",
      sights: "White Dot Front / Adjustable Rear",
      features: [
        "Flat face trigger for consistent pull",
        "Aggressive grip texture",
        "Low profile carry sights",
        "Enhanced magazine release",
        "Optics ready version available",
      ],
      specifications: {
        frameSize: "Sub-Compact",
        triggerPull: "6.5 lbs",
        safetyFeatures: [
          "Trigger Safety",
          "Firing Pin Safety",
          "Magazine Safety",
        ],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Lifetime Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.6,
      reviews: 156,
    },
    {
      id: 13,
      name: "Springfield XD-M Elite",
      description:
        "Competition-grade pistol with match barrel and enhanced ergonomics. Precision meets performance.",
      price: 749.99,
      originalPrice: 829.99,
      category: "handguns",
      stock: 8,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
      ],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
      manufacturer: "Springfield Armory",
      caliber: "9mm Luger",
      capacity: "20+1",
      barrelLength: "4.5 inches",
      overallLength: "7.6 inches",
      weight: "31 oz",
      action: "Striker Fired",
      finish: "Melonite Treatment",
      sights: "Fiber Optic Front / Adjustable Rear",
      features: [
        "Match grade barrel",
        "Enhanced grip texturing",
        "Ambidextrous magazine release",
        "Striker status indicator",
        "Loaded chamber indicator",
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.5-7.7 lbs",
        safetyFeatures: ["Grip Safety", "Trigger Safety", "Firing Pin Safety"],
        magazines: "Ships with 3 magazines",
        warranty: "Limited Lifetime Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.5,
      reviews: 98,
    },
    {
      id: 14,
      name: "Walther PDP",
      description:
        "Performance Duty Pistol engineered for superior ergonomics and accuracy. The evolution of excellence.",
      price: 679.99,
      category: "handguns",
      stock: 10,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["handguns"],
      manufacturer: "Walther",
      caliber: "9mm Luger",
      capacity: "18+1",
      barrelLength: "4.0 inches",
      overallLength: "7.4 inches",
      weight: "27 oz",
      action: "Striker Fired",
      finish: "Tenifer Coating",
      sights: "Performance Duty Sights",
      features: [
        "Performance Duty Trigger",
        "SuperTerrain Slide Serrations",
        "Optics-ready slide",
        "Ambidextrous slide stop",
        "Enhanced Performance Duty Texture",
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.6 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety", "Drop Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Lifetime Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.7,
      reviews: 73,
    },
    {
      id: 15,
      name: "Ruger Security-9",
      description:
        "Affordable, reliable striker-fired pistol perfect for new shooters and budget-conscious buyers.",
      price: 379.99,
      category: "handguns",
      stock: 25,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["handguns"],
      manufacturer: "Ruger",
      caliber: "9mm Luger",
      capacity: "15+1",
      barrelLength: "4.0 inches",
      overallLength: "7.24 inches",
      weight: "23.7 oz",
      action: "Striker Fired",
      finish: "Blued Steel",
      sights: "Drift Adjustable 3-Dot",
      features: [
        "Secure Action trigger system",
        "Ergonomic grip frame",
        "Safety paddle magazine release",
        "Genuine Novak LoMount Carry sight",
        "Picatinny rail",
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "6.0 lbs",
        safetyFeatures: [
          "Trigger Safety",
          "Manual Safety",
          "Magazine Disconnect",
        ],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.3,
      reviews: 142,
    },
    {
      id: 16,
      name: "HK VP9",
      description:
        "German-engineered striker-fired pistol with customizable grip and exceptional accuracy.",
      price: 799.99,
      originalPrice: 899.99,
      category: "handguns",
      stock: 6,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
      ],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
      manufacturer: "Heckler & Koch",
      caliber: "9mm Luger",
      capacity: "15+1",
      barrelLength: "4.09 inches",
      overallLength: "7.34 inches",
      weight: "26.56 oz",
      action: "Striker Fired",
      finish: "Hostile Environment Finish",
      sights: "3-Dot Luminous",
      features: [
        "Customizable grip with panels",
        "HK Light Strike ignition system",
        "Ambidextrous controls",
        "Cold hammer-forged barrel",
        "No external safety",
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.4 lbs",
        safetyFeatures: ["Drop Safety", "Firing Pin Safety"],
        magazines: "Ships with 3 magazines",
        warranty: "HK Limited Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.8,
      reviews: 201,
    },
    {
      id: 17,
      name: "CZ P-10C",
      description:
        "Czech-made striker-fired pistol with exceptional trigger and unmatched reliability.",
      price: 599.99,
      category: "handguns",
      stock: 14,
      images: [
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["handguns"],
      manufacturer: "CZ-USA",
      caliber: "9mm Luger",
      capacity: "15+1",
      barrelLength: "4.02 inches",
      overallLength: "7.3 inches",
      weight: "26 oz",
      action: "Striker Fired",
      finish: "Nitride",
      sights: "Metal 3-Dot",
      features: [
        "Best-in-class trigger",
        "Interchangeable backstraps",
        "Fiber-reinforced polymer frame",
        "Reversible magazine release",
        "Superior ergonomics",
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "4.5-5.0 lbs",
        safetyFeatures: ["Firing Pin Safety", "Trigger Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "5 Year Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.6,
      reviews: 167,
    },
    {
      id: 18,
      name: "Beretta 92FS",
      description:
        "Classic full-size pistol used by military and law enforcement worldwide. Proven reliability and accuracy.",
      price: 679.99,
      originalPrice: 749.99,
      category: "handguns",
      stock: 9,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format",
      ],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
      manufacturer: "Beretta",
      caliber: "9mm Luger",
      capacity: "15+1",
      barrelLength: "4.9 inches",
      overallLength: "8.5 inches",
      weight: "33.3 oz",
      action: "Double/Single Action",
      finish: "Bruniton",
      sights: "3-Dot",
      features: [
        "Open-slide design",
        "Chrome-lined barrel",
        "Ambidextrous safety",
        "Reversible magazine release",
        "Combat trigger guard",
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "12 lbs DA / 4.5 lbs SA",
        safetyFeatures: ["Manual Safety", "Firing Pin Block"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.7,
      reviews: 312,
    },
    {
      id: 19,
      name: "Kimber Ultra Carry II",
      description:
        "Premium 1911-style compact pistol with enhanced features for concealed carry.",
      price: 899.99,
      category: "handguns",
      stock: 5,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format",
      ],
      featured: false,
      displayLocation: ["handguns"],
      manufacturer: "Kimber",
      caliber: ".45 ACP",
      capacity: "7+1",
      barrelLength: "3.0 inches",
      overallLength: "6.8 inches",
      weight: "25 oz",
      action: "Single Action Only",
      finish: "Satin Silver",
      sights: "Fixed Low Profile",
      features: [
        "Aluminum frame construction",
        "Match grade barrel",
        "Full-length guide rod",
        "High-ride beavertail",
        "Carry melt treatment",
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "4-5 lbs",
        safetyFeatures: ["Manual Thumb Safety", "Grip Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "Kimber Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.4,
      reviews: 87,
    },
    {
      id: 20,
      name: "Taurus G3C",
      description:
        "Affordable and reliable striker-fired compact pistol perfect for concealed carry and home defense.",
      price: 299.99,
      category: "handguns",
      stock: 22,
      images: [
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format",
      ],
      featured: false,
      displayLocation: ["handguns"],
      manufacturer: "Taurus",
      caliber: "9mm Luger",
      capacity: "12+1",
      barrelLength: "3.2 inches",
      overallLength: "6.3 inches",
      weight: "22 oz",
      action: "Striker Fired",
      finish: "Black Polymer",
      sights: "Adjustable Rear",
      features: [
        "Striker block system",
        "Manual safety",
        "Memory pads",
        "Restrike capability",
        "Loaded chamber indicator",
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "6.0 lbs",
        safetyFeatures: ["Manual Safety", "Trigger Safety", "Firing Pin Block"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Lifetime Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.2,
      reviews: 198,
    },
    {
      id: 21,
      name: "FN 509 Tactical",
      description:
        "Optics-ready tactical pistol with suppressor-ready threaded barrel. Built for professionals.",
      price: 899.99,
      originalPrice: 999.99,
      category: "handguns",
      stock: 7,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop&auto=format",
      ],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
      manufacturer: "FN America",
      caliber: "9mm Luger",
      capacity: "24+1",
      barrelLength: "4.5 inches",
      overallLength: "8.15 inches",
      weight: "27.9 oz",
      action: "Striker Fired",
      finish: "FDE Polymer Frame",
      sights: "Suppressor Height Night Sights",
      features: [
        "Optics-ready slide",
        "Threaded barrel",
        "Enhanced grip texture",
        "Ambidextrous controls",
        "Low-profile slide stop",
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.5-7.7 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety"],
        magazines: "Ships with 3 magazines (24rd)",
        warranty: "FN Limited Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.6,
      reviews: 143,
    },
    {
      id: 22,
      name: "Desert Eagle .50 AE",
      description:
        "Iconic large-caliber semi-automatic pistol. The ultimate in stopping power and prestige.",
      price: 1899.99,
      category: "handguns",
      stock: 3,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format",
      ],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
      manufacturer: "Magnum Research",
      caliber: ".50 Action Express",
      capacity: "7+1",
      barrelLength: "6.0 inches",
      overallLength: "10.75 inches",
      weight: "70.5 oz",
      action: "Semi-Automatic",
      finish: "Black Oxide",
      sights: "Fixed Combat",
      features: [
        "Gas-operated action",
        "Rotating bolt system",
        "Polygonal rifling",
        "Weaver rail system",
        "Iconic design",
      ],
      specifications: {
        frameSize: "Large Frame",
        triggerPull: "4.0 lbs",
        safetyFeatures: ["Manual Safety", "Firing Pin Safety"],
        magazines: "Ships with 1 magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.3,
      reviews: 76,
    },
    {
      id: 23,
      name: "Canik TP9SFx",
      description:
        "Competition-ready striker-fired pistol with superior ergonomics and match-grade trigger.",
      price: 459.99,
      category: "handguns",
      stock: 16,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop&auto=format",
      ],
      featured: false,
      displayLocation: ["handguns"],
      manufacturer: "Canik",
      caliber: "9mm Luger",
      capacity: "20+1",
      barrelLength: "5.2 inches",
      overallLength: "8.5 inches",
      weight: "29.9 oz",
      action: "Striker Fired",
      finish: "Tungsten Cerakote",
      sights: "Fiber Optic Front / Adjustable Rear",
      features: [
        "Competition trigger",
        "Optics-ready slide",
        "Interchangeable backstraps",
        "Extended magazine release",
        "Flared magazine well",
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "3.5-4.0 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety", "Drop Safety"],
        magazines: "Ships with 2 magazines (20rd)",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.7,
      reviews: 224,
    },
    {
      id: 24,
      name: "Mossberg MC2c",
      description:
        "Compact carry pistol designed for everyday carry with enhanced grip texture and reliable performance.",
      price: 449.99,
      category: "handguns",
      stock: 11,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop&auto=format",
      ],
      featured: false,
      displayLocation: ["handguns"],
      manufacturer: "Mossberg",
      caliber: "9mm Luger",
      capacity: "13+1",
      barrelLength: "3.9 inches",
      overallLength: "7.1 inches",
      weight: "21 oz",
      action: "Striker Fired",
      finish: "Black DLC",
      sights: "3-Dot",
      features: [
        "Aggressive grip texturing",
        "Flat-faced trigger",
        "Cross-bolt safety",
        "SIG optics compatibility",
        "Enhanced slide serrations",
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "5.5-6.5 lbs",
        safetyFeatures: [
          "Cross-Bolt Safety",
          "Trigger Safety",
          "Firing Pin Block",
        ],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.1,
      reviews: 64,
    },
    {
      id: 2,
      name: "AR-15 Sport II",
      description: "Semi-automatic rifle chambered in 5.56 NATO/.223 Remington",
      price: 899.99,
      category: "rifles",
      stock: 8,
      images: ["/api/placeholder/400/300"],
      featured: true,
      displayLocation: ["home", "featured", "rifles"],
    },
    {
      id: 3,
      name: "Tactical Red Dot Sight",
      description: "High-quality red dot sight for improved accuracy",
      price: 129.99,
      category: "accessories",
      stock: 25,
      images: ["/api/placeholder/400/300"],
      featured: false,
      displayLocation: ["accessories"],
    },
  ],

  // Orders
  orders: [
    {
      id: 1,
      customerId: 1,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      items: [{ productId: 1, quantity: 1, price: 599.99 }],
      total: 599.99,
      status: "pending",
      date: "2024-01-15",
    },
  ],

  // Users
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, City, State 12345",
      registrationDate: "2024-01-10",
    },
  ],

  // Messages
  messages: [
    {
      id: 1,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Product Inquiry",
      message: "I'm interested in the Glock 19. Is it still available?",
      date: "2024-01-15",
      read: false,
    },
  ],

  // Site Settings
  siteSettings: {
    siteName: "Gun-k",
    bankDetails: {
      bankName: "First National Bank",
      accountNumber: "****-****-1234",
      routingNumber: "021000021",
    },
    contactInfo: {
      email: "info@gunstore.com",
      phone: "(555) 123-4567",
      address: "123 Gun Store Ave, City, State 12345",
    },
    aboutUs:
      "We are a professional firearms dealer committed to providing quality products and exceptional service.",
    headerText: "Your Trusted Firearms Dealer",
    footerText: "Licensed FFL Dealer - All federal and state laws apply",
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN_ADMIN":
      return { ...state, isAdminAuthenticated: true };

    case "LOGOUT_ADMIN":
      return { ...state, isAdminAuthenticated: false };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, { ...action.payload, id: Date.now() }],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id
            ? { ...o, status: action.payload.status }
            : o,
        ),
      };

    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, { ...action.payload, id: Date.now() }],
      };

    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, { ...action.payload, id: Date.now() }],
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { ...action.payload, id: Date.now(), read: false },
        ],
      };

    case "MARK_MESSAGE_READ":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.payload ? { ...m, read: true } : m,
        ),
      };

    case "UPDATE_SITE_SETTINGS":
      return {
        ...state,
        siteSettings: { ...state.siteSettings, ...action.payload },
      };

    case "LOAD_STATE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("gunStoreState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: "LOAD_STATE", payload: parsedState });
      } catch (error) {
        console.error("Error loading saved state:", error);
      }
    }
  }, []);

  // Save state to localStorage on state changes
  useEffect(() => {
    localStorage.setItem("gunStoreState", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
