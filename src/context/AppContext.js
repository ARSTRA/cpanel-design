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
        "Compact 9mm pistol perfect for concealed carry and home defense",
      price: 599.99,
      category: "handguns",
      stock: 15,
      images: ["/api/placeholder/400/300"],
      featured: true,
      displayLocation: ["home", "featured", "handguns"],
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
    siteName: "Gun Store Pro",
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
