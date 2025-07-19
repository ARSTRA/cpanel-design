import React, { createContext, useContext, useReducer } from "react";
import { products } from "../data/products";

const AppContext = createContext();

const initialState = {
  // Auth
  isAdminAuthenticated: false,
  currentUser: null,

  // Products from external file
  products: products,

  // Site settings
  siteSettings: {
    siteName: "Gun-k Pro",
    headerText: "America's Premier Firearms & Tactical Equipment Specialists",
    aboutUs:
      "Gun-k Pro stands as America's premier destination for premium firearms, tactical equipment, and professional gunsmithing services. With over two decades of unwavering commitment to excellence, we've built our reputation on three fundamental pillars: uncompromising quality, expert knowledge, and exceptional customer service. Our federally licensed facility houses an extensive inventory of carefully curated firearms from the world's most respected manufacturers, complemented by a comprehensive selection of optics, accessories, and tactical gear. Whether you're a law enforcement professional, competitive shooter, hunter, or responsible citizen exercising your Second Amendment rights, our team of certified experts provides personalized guidance to ensure you find the perfect solution for your specific needs. We pride ourselves on maintaining the highest standards of safety, compliance, and professionalism while fostering a welcoming environment for enthusiasts of all experience levels.",
    footerText:
      "Gun-k Pro: Setting the standard for excellence in firearms retail since 2004. Licensed FFL dealer committed to safety, quality, and professional service.",
    contactInfo: {
      email: "info@gun-k.com",
      phone: "(555) 123-4567",
      address: "123 Main Street, Gunsmith City, GC 12345",
    },
    bankDetails: {
      bankName: "First National Bank",
      accountNumber: "1234567890",
      routingNumber: "123456789",
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
    case "SET_ADMIN_AUTH":
      return {
        ...state,
        isAdminAuthenticated: action.payload.isAuthenticated,
        currentUser: action.payload.user,
      };

    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload,
        ),
      };

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
