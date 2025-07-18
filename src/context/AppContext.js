import React, { createContext, useContext, useReducer } from "react";
import { expandedProducts } from "../data/expandedProducts";

const AppContext = createContext();

const initialState = {
  // Auth
  isAdminAuthenticated: false,
  currentUser: null,

  // Comprehensive Firearms Collection
  products: expandedProducts,

  // Orders
  orders: [
    {
      id: 1,
      date: "2023-12-01",
      status: "Processing",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      items: [{ productId: 1, quantity: 1, price: 599.99 }],
      total: 599.99,
      paymentMethod: "Credit Card",
      shippingAddress: "123 Main St, Anytown, USA",
    },
  ],

  // Users
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "customer",
      joinDate: "2023-01-15",
    },
  ],

  // Messages
  messages: [
    {
      id: 1,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Product Inquiry",
      message: "I'm interested in the Glock 19. Is it in stock?",
      date: "2023-12-01",
    },
  ],

  // Site Settings
  siteSettings: {
    siteName: "Gun-k Pro",
    headerText: "Professional Firearms & Accessories",
    contactInfo: {
      phone: "(555) 123-GUNS",
      email: "info@gunkpro.com",
      address: "123 Gun Store Ave, Firearms City, TX 75001",
    },
    businessHours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "Closed",
    },
  },
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, { ...action.payload, id: Date.now() }],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, ...action.payload }
            : product,
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
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

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { ...action.payload, id: Date.now(), read: false },
        ],
      };

    case "UPDATE_SITE_SETTINGS":
      return {
        ...state,
        siteSettings: { ...state.siteSettings, ...action.payload },
      };

    case "LOGIN_ADMIN":
      return {
        ...state,
        isAdminAuthenticated: true,
      };

    case "LOGOUT_ADMIN":
      // Clear any stored admin credentials
      localStorage.removeItem("adminUsername");
      return {
        ...state,
        isAdminAuthenticated: false,
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
