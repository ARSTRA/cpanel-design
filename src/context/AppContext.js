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
      description: "The most versatile and reliable compact pistol for concealed carry, home defense, and duty use. Features enhanced ergonomics and improved accuracy.",
      price: 549.99,
      originalPrice: 599.99,
      category: "handguns",
      stock: 15,
      images: ["https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop"],
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
        "No finger grooves"
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "5.5 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety", "Drop Safety"],
        magazines: "Ships with 3 magazines",
        warranty: "Limited Lifetime Warranty"
      },
      inStock: true,
      onSale: true,
      rating: 4.8,
      reviews: 247
        },
    {
      id: 11,
      name: "Sig Sauer P320",
      description: "Modular striker-fired pistol system adopted by the U.S. Military. Ultimate in reliability and versatility.",
      price: 629.99,
      originalPrice: 699.99,
      category: "handguns",
      stock: 12,
      images: ["https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop"],
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
        "Tool-free disassembly"
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.5-6.5 lbs",
        safetyFeatures: ["Striker Safety", "Disconnect Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "Lifetime Warranty"
      },
      inStock: true,
      onSale: true,
      rating: 4.7,
      reviews: 189
    },
    {
      id: 12,
      name: "Smith & Wesson M&P Shield Plus",
      description: "Ultra-compact concealed carry pistol with increased capacity. Perfect balance of size and shootability.",
      price: 499.99,
      category: "handguns",
      stock: 20,
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop"],
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
        "Optics ready version available"
      ],
      specifications: {
        frameSize: "Sub-Compact",
        triggerPull: "6.5 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety", "Magazine Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Lifetime Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.6,
      reviews: 156
    },
    {
      id: 13,
      name: "Springfield XD-M Elite",
      description: "Competition-grade pistol with match barrel and enhanced ergonomics. Precision meets performance.",
      price: 749.99,
      originalPrice: 829.99,
      category: "handguns",
      stock: 8,
      images: ["https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop"],
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
        "Loaded chamber indicator"
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.5-7.7 lbs",
        safetyFeatures: ["Grip Safety", "Trigger Safety", "Firing Pin Safety"],
        magazines: "Ships with 3 magazines",
        warranty: "Limited Lifetime Warranty"
      },
      inStock: true,
      onSale: true,
      rating: 4.5,
      reviews: 98
    },
    {
      id: 14,
      name: "Walther PDP",
      description: "Performance Duty Pistol engineered for superior ergonomics and accuracy. The evolution of excellence.",
      price: 679.99,
      category: "handguns",
      stock: 10,
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop"],
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
        "Enhanced Performance Duty Texture"
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.6 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety", "Drop Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Lifetime Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.7,
      reviews: 73
    },
    {
      id: 15,
      name: "Ruger Security-9",
      description: "Affordable, reliable striker-fired pistol perfect for new shooters and budget-conscious buyers.",
      price: 379.99,
      category: "handguns",
      stock: 25,
      images: ["https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"],
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
        "Picatinny rail"
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "6.0 lbs",
        safetyFeatures: ["Trigger Safety", "Manual Safety", "Magazine Disconnect"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.3,
      reviews: 142
    },
    {
      id: 16,
      name: "HK VP9",
      description: "German-engineered striker-fired pistol with customizable grip and exceptional accuracy.",
      price: 799.99,
      originalPrice: 899.99,
      category: "handguns",
      stock: 6,
      images: ["https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop"],
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
        "No external safety"
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.4 lbs",
        safetyFeatures: ["Drop Safety", "Firing Pin Safety"],
        magazines: "Ships with 3 magazines",
        warranty: "HK Limited Warranty"
      },
      inStock: true,
      onSale: true,
      rating: 4.8,
      reviews: 201
        },
    {
      id: 17,
      name: "CZ P-10C",
      description: "Czech-made striker-fired pistol with exceptional trigger and unmatched reliability.",
      price: 599.99,
      category: "handguns",
      stock: 14,
      images: ["https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"],
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
        "Superior ergonomics"
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "4.5-5.0 lbs",
        safetyFeatures: ["Firing Pin Safety", "Trigger Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "5 Year Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.6,
      reviews: 167
    },
    {
      id: 18,
      name: "Beretta 92FS",
      description: "Classic full-size pistol used by military and law enforcement worldwide. Proven reliability and accuracy.",
      price: 679.99,
      originalPrice: 749.99,
      category: "handguns",
      stock: 9,
      images: ["https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format"],
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
        "Combat trigger guard"
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "12 lbs DA / 4.5 lbs SA",
        safetyFeatures: ["Manual Safety", "Firing Pin Block"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Warranty"
      },
      inStock: true,
      onSale: true,
      rating: 4.7,
      reviews: 312
    },
    {
      id: 19,
      name: "Kimber Ultra Carry II",
      description: "Premium 1911-style compact pistol with enhanced features for concealed carry.",
      price: 899.99,
      category: "handguns",
      stock: 5,
      images: ["https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop&auto=format", "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format"],
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
        "Carry melt treatment"
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "4-5 lbs",
        safetyFeatures: ["Manual Thumb Safety", "Grip Safety"],
        magazines: "Ships with 2 magazines",
        warranty: "Kimber Limited Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.4,
      reviews: 87
    },
    {
      id: 20,
      name: "Taurus G3C",
      description: "Affordable and reliable striker-fired compact pistol perfect for concealed carry and home defense.",
      price: 299.99,
      category: "handguns",
      stock: 22,
      images: ["https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop&auto=format", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format"],
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
        "Loaded chamber indicator"
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "6.0 lbs",
        safetyFeatures: ["Manual Safety", "Trigger Safety", "Firing Pin Block"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Lifetime Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.2,
      reviews: 198
    },
    {
      id: 21,
      name: "FN 509 Tactical",
      description: "Optics-ready tactical pistol with suppressor-ready threaded barrel. Built for professionals.",
      price: 899.99,
      originalPrice: 999.99,
      category: "handguns",
      stock: 7,
      images: ["https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format", "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop&auto=format"],
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
        "Low-profile slide stop"
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "5.5-7.7 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety"],
        magazines: "Ships with 3 magazines (24rd)",
        warranty: "FN Limited Warranty"
      },
      inStock: true,
      onSale: true,
      rating: 4.6,
      reviews: 143
    },
    {
      id: 22,
      name: "Desert Eagle .50 AE",
      description: "Iconic large-caliber semi-automatic pistol. The ultimate in stopping power and prestige.",
      price: 1899.99,
      category: "handguns",
      stock: 3,
      images: ["https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop&auto=format", "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format"],
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
        "Iconic design"
      ],
      specifications: {
        frameSize: "Large Frame",
        triggerPull: "4.0 lbs",
        safetyFeatures: ["Manual Safety", "Firing Pin Safety"],
        magazines: "Ships with 1 magazine",
        warranty: "Limited Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.3,
      reviews: 76
    },
    {
      id: 23,
      name: "Canik TP9SFx",
      description: "Competition-ready striker-fired pistol with superior ergonomics and match-grade trigger.",
      price: 459.99,
      category: "handguns",
      stock: 16,
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format", "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop&auto=format"],
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
        "Flared magazine well"
      ],
      specifications: {
        frameSize: "Full Size",
        triggerPull: "3.5-4.0 lbs",
        safetyFeatures: ["Trigger Safety", "Firing Pin Safety", "Drop Safety"],
        magazines: "Ships with 2 magazines (20rd)",
        warranty: "Limited Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.7,
      reviews: 224
    },
    {
      id: 24,
      name: "Mossberg MC2c",
      description: "Compact carry pistol designed for everyday carry with enhanced grip texture and reliable performance.",
      price: 449.99,
      category: "handguns",
      stock: 11,
      images: ["https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop&auto=format", "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop&auto=format"],
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
        "Enhanced slide serrations"
      ],
      specifications: {
        frameSize: "Compact",
        triggerPull: "5.5-6.5 lbs",
        safetyFeatures: ["Cross-Bolt Safety", "Trigger Safety", "Firing Pin Block"],
        magazines: "Ships with 2 magazines",
        warranty: "Limited Warranty"
      },
      inStock: true,
      onSale: false,
      rating: 4.1,
      reviews: 64
    },
        // RIFLES COLLECTION
    {
      id: 2,
      name: "Smith & Wesson M&P15 Sport II",
      description: "America's most popular modern sporting rifle. Reliable, accurate, and versatile for hunting, competition, and recreational shooting.",
      price: 899.99,
      originalPrice: 999.99,
      category: "rifles",
      stock: 8,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ],
      featured: true,
      displayLocation: ["home", "featured", "rifles"],
      manufacturer: "Smith & Wesson",
      caliber: "5.56 NATO/.223 Remington",
      capacity: "30 rounds (10-round compliant available)",
      barrelLength: "16 inches",
      overallLength: "32-35 inches",
      weight: "6.5 lbs",
      action: "Semi-Automatic",
      finish: "Matte Black Armornite",
      sights: "Adjustable A2 Post Front / Dual Aperture Rear",
      features: [
        "Chromed firing pin",
        "Forward assist",
        "Dust cover",
        "Picatinny rail",
        "6-position telescoping stock",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "6.5 lbs",
        safetyFeatures: ["Manual Safety", "Half-Cock Notch"],
        magazines: "Ships with 1 magazine",
        warranty: "Limited Lifetime Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.7,
      reviews: 342,
    },
    {
      id: 17,
      name: "Ruger 10/22 Carbine",
      description: "America's favorite .22 rifle. Perfect for beginners, training, and small game hunting with legendary reliability.",
      price: 349.99,
      category: "rifles",
      stock: 15,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
      ],
      featured: true,
      displayLocation: ["home", "featured", "rifles"],
      manufacturer: "Ruger",
      caliber: ".22 Long Rifle",
      capacity: "10 rounds",
      barrelLength: "18.5 inches",
      overallLength: "37 inches",
      weight: "5.0 lbs",
      action: "Semi-Automatic",
      finish: "Satin Black",
      sights: "Gold Bead Front / Folding Rear",
      features: [
        "Patented 10-round rotary magazine",
        "Cold hammer-forged barrel",
        "Extended magazine release",
        "Ergonomic stock design",
        "Easy takedown for cleaning",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "6.0 lbs",
        safetyFeatures: ["Manual Cross-Bolt Safety"],
        magazines: "Ships with 1 rotary magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 18,
      name: "Remington 700 SPS",
      description: "The most trusted bolt-action rifle platform for hunting and precision shooting. Legendary accuracy since 1962.",
      price: 649.99,
      originalPrice: 729.99,
      category: "rifles",
      stock: 6,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "Remington",
      caliber: ".308 Winchester",
      capacity: "4+1",
      barrelLength: "24 inches",
      overallLength: "46.5 inches",
      weight: "8.5 lbs",
      action: "Bolt-Action",
      finish: "Matte Black",
      sights: "None - Drilled & Tapped for Scope",
      features: [
        "Free-floating barrel",
        "Two-stage trigger",
        "Hinged floorplate",
        "Synthetic stock",
        "Pillar bedded action",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "3.5-5.0 lbs adjustable",
        safetyFeatures: ["3-Position Safety"],
        magazines: "Internal magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 19,
      name: "Winchester Model 70 Featherweight",
      description: "The rifleman's rifle. Classic American design with modern manufacturing for hunting excellence.",
      price: 1,049.99,
      category: "rifles",
      stock: 4,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "Winchester",
      caliber: ".270 Winchester",
      capacity: "5+1",
      barrelLength: "22 inches",
      overallLength: "42.7 inches",
      weight: "6.75 lbs",
      action: "Bolt-Action",
      finish: "Matte Blued",
      sights: "None - Drilled & Tapped",
      features: [
        "Controlled round feed",
        "Three-position safety",
        "Walnut stock",
        "MOA trigger system",
        "Free-floating barrel",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "3.5-5.0 lbs",
        safetyFeatures: ["3-Position M.O.A. Trigger"],
        magazines: "Fixed magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.9,
      reviews: 67,
    },
    {
      id: 20,
      name: "Marlin Model 336 Lever Action",
      description: "Classic American lever-action rifle perfect for deer hunting and brush country. Fast follow-up shots with reliability.",
      price: 599.99,
      originalPrice: 649.99,
      category: "rifles",
      stock: 10,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ],
      featured: true,
      displayLocation: ["rifles"],
      manufacturer: "Marlin",
      caliber: ".30-30 Winchester",
      capacity: "6+1",
      barrelLength: "20 inches",
      overallLength: "38.5 inches",
      weight: "7.0 lbs",
      action: "Lever-Action",
      finish: "Blued Steel",
      sights: "Brass Bead Front / Semi-Buckhorn Rear",
      features: [
        "Side ejection for scope mounting",
        "Solid-top receiver",
        "Hammer block safety",
        "American black walnut stock",
        "Tapped for scope mounts",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "4.5-6.0 lbs",
        safetyFeatures: ["Hammer Block Safety", "Half-Cock Position"],
        magazines: "Tubular magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.7,
      reviews: 124,
    },
    {
      id: 21,
      name: "Savage Arms 110 Hunter",
      description: "Precision rifle engineered for accuracy with user-adjustable AccuTrigger and button-rifled barrel.",
      price: 449.99,
      category: "rifles",
      stock: 12,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "Savage Arms",
      caliber: ".243 Winchester",
      capacity: "4+1",
      barrelLength: "22 inches",
      overallLength: "43.25 inches",
      weight: "7.5 lbs",
      action: "Bolt-Action",
      finish: "Matte Black",
      sights: "None - Drilled & Tapped",
      features: [
        "User-adjustable AccuTrigger",
        "Button-rifled barrel",
        "Synthetic AccuStock",
        "Soft grip surfaces",
        "Detachable box magazine",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "2.5-6.0 lbs adjustable",
        safetyFeatures: ["AccuTrigger Safety", "Tang Safety"],
        magazines: "Ships with 1 detachable magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.5,
      reviews: 78,
    },
    {
      id: 22,
      name: "Henry Big Boy Steel",
      description: "Modern lever-action with steel receiver and side loading gate. Perfect blend of tradition and innovation.",
      price: 899.99,
      originalPrice: 979.99,
      category: "rifles",
      stock: 7,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "Henry Repeating Arms",
      caliber: ".357 Magnum/.38 Special",
      capacity: "10+1",
      barrelLength: "20 inches",
      overallLength: "38.5 inches",
      weight: "7.08 lbs",
      action: "Lever-Action",
      finish: "Blued Steel",
      sights: "Brass Bead Front / Semi-Buckhorn Rear",
      features: [
        "Steel receiver",
        "Side loading gate",
        "Octagon barrel",
        "American walnut stock",
        "Transfer bar safety",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "4.0-5.0 lbs",
        safetyFeatures: ["Transfer Bar Safety", "Half-Cock Position"],
        magazines: "Tubular magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.8,
      reviews: 56,
    },
    {
      id: 23,
      name: "Tikka T3x Hunter",
      description: "Finnish precision engineering meets hunting performance. Exceptional accuracy in a lightweight package.",
      price: 749.99,
      category: "rifles",
      stock: 5,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "Tikka",
      caliber: ".30-06 Springfield",
      capacity: "3+1",
      barrelLength: "22.4 inches",
      overallLength: "42.9 inches",
      weight: "6.3 lbs",
      action: "Bolt-Action",
      finish: "Matte Stainless",
      sights: "None - Drilled & Tapped",
      features: [
        "Cold hammer-forged barrel",
        "Smooth bolt operation",
        "Modular synthetic stock",
        "Single-stage trigger",
        "Metallic bolt shroud",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "2.0-4.0 lbs adjustable",
        safetyFeatures: ["Two-Position Safety"],
        magazines: "Ships with 1 detachable magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.9,
      reviews: 43,
    },
    {
      id: 24,
      name: "Mossberg Patriot Predator",
      description: "Purpose-built hunting rifle with threaded barrel and camo finish. Designed for predator and varmint hunting.",
      price: 449.99,
      originalPrice: 499.99,
      category: "rifles",
      stock: 9,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "Mossberg",
      caliber: ".223 Remington",
      capacity: "5+1",
      barrelLength: "22 inches (threaded)",
      overallLength: "42 inches",
      weight: "6.5 lbs",
      action: "Bolt-Action",
      finish: "Mossy Oak Break-Up Country Camo",
      sights: "None - Scope Rail Included",
      features: [
        "Threaded barrel for suppressor",
        "LBA adjustable trigger",
        "Spiral fluted bolt",
        "Box magazine fed",
        "Mossy Oak camo finish",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "2.0-7.0 lbs adjustable",
        safetyFeatures: ["Two-Position Safety"],
        magazines: "Ships with 1 detachable magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: true,
      rating: 4.4,
      reviews: 61,
    },
    {
      id: 25,
      name: "Bergara B-14 Hunter",
      description: "Spanish precision manufacturing meets American hunting traditions. Sub-MOA accuracy guarantee.",
      price: 849.99,
      category: "rifles",
      stock: 6,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "Bergara",
      caliber: "6.5 Creedmoor",
      capacity: "4+1",
      barrelLength: "22 inches",
      overallLength: "42.5 inches",
      weight: "7.3 lbs",
      action: "Bolt-Action",
      finish: "Matte Black Cerakote",
      sights: "None - Drilled & Tapped",
      features: [
        "Match-grade barrel",
        "Sub-MOA accuracy guarantee",
        "Bergara Performance trigger",
        "Synthetic stock with SoftTouch",
        "Hinged floorplate",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "3.0-4.0 lbs",
        safetyFeatures: ["Two-Position Safety"],
        magazines: "Internal magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.8,
      reviews: 37,
    },
    {
      id: 26,
      name: "CZ 455 American",
      description: "Czech precision in .22 LR. Adjustable trigger and interchangeable barrel system for versatility.",
      price: 459.99,
      category: "rifles",
      stock: 11,
      images: [
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "CZ",
      caliber: ".22 Long Rifle",
      capacity: "5+1",
      barrelLength: "20.5 inches",
      overallLength: "39.5 inches",
      weight: "6.1 lbs",
      action: "Bolt-Action",
      finish: "Blued",
      sights: "Hooded Front / Tangent Rear",
      features: [
        "Adjustable trigger",
        "Interchangeable barrel system",
        "American pattern stock",
        "Detachable magazine",
        "Cold hammer-forged barrel",
      ],
      specifications: {
        frameSize: "Standard",
        triggerPull: "2.2-3.3 lbs adjustable",
        safetyFeatures: ["Two-Position Safety"],
        magazines: "Ships with 1 detachable magazine",
        warranty: "Limited Warranty",
      },
      inStock: true,
      onSale: false,
      rating: 4.7,
      reviews: 29,
    },
    {
      id: 27,
      name: "Weatherby Vanguard Series 2",
      description: "Sub-MOA accuracy guarantee with hand-lapped barrel. Premium hunting rifle with Monte Carlo stock.",
      price: 649.99,
      originalPrice: 699.99,
      category: "rifles",
      stock: 4,
      images: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
      ],
      featured: false,
      displayLocation: ["rifles"],
      manufacturer: "Weatherby",
      caliber: ".300 Winchester Magnum",
      capacity: "3+1",
      barrelLength: "26 inches",
      overallLength: "46.75 inches",
      weight: "7.75 lbs",
      action: "Bolt-Action",
      finish: "Matte Bead Blast",
      sights: "None - Drilled & Tapped",
      features: [
        "Sub-MOA accuracy guarantee",
        "Hand-lapped barrel",
        "Two-stage trigger",
        "Monte Carlo stock",
        "Hinged floorplate",
      ],
      specifications: {
        frameSize: "Magnum",
        triggerPull: "3.5-5.0 lbs",
        safetyFeatures: ["Three-Position Safety"],
        magazines: "Internal magazine",
        warranty: "Sub-MOA Accuracy Guarantee",
      },
      inStock: true,
      onSale: true,
      rating: 4.6,
      reviews: 52,
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