import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  // Auth
  isAdminAuthenticated: false,
  currentUser: null,

  // Products - simplified
  products: [
    {
      id: 1,
      name: "Test Product",
      description: "Test description",
      price: 99.99,
      category: "handguns",
      stock: 5,
      images: ["https://via.placeholder.com/400x300"],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
      inStock: true,
      onSale: false,
      rating: 4.5,
      reviews: 10,
    },
  ],

  // Site settings - simplified
  siteSettings: {
    siteName: "Gun-k Pro",
    headerText: "Professional firearms and accessories store",
    aboutUs: "Test about us",
    footerText: "Professional firearms dealer",
    contactInfo: {
      email: "info@gun-k.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Test City, TC 12345",
    },
  },

  // Other state
  cartItems: [],
  orders: [],
  messages: [],
  users: [],
  notifications: [],
};

function appReducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

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
