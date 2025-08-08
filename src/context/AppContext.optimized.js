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
    headerText: "Premier Licensed FFL Dealer - Serving Professionals & Enthusiasts Since 2003",
    aboutUs:
      "Gun-k Pro is your premier destination for professional firearms services, quality equipment, and expert guidance. As a fully licensed Federal Firearms License (FFL) dealer with over 20 years of industry experience, we serve law enforcement professionals, competitive shooters, hunters, and civilian enthusiasts nationwide. Our commitment to excellence, safety, and customer service has made us a trusted name in the firearms community.",
    footerText:
      "Licensed Federal Firearms Dealer (FFL) specializing in premium firearms, professional gunsmithing, training services, and law enforcement equipment since 2003.",
    contactInfo: {
      email: "info@gun-k.com",
      phone: "(555) 123-4567",
      address: "1247 Professional Plaza, Firearms District, TX 75201",
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

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
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
