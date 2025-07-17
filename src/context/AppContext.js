import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import productsData from "../data/products.json";

const AppContext = createContext();

const initialState = {
  // Auth
  isAdminAuthenticated: false,
  currentUser: null,

  // Products - start with minimal set
  products: [],
  productsLoaded: false,

  // Shopping Cart
  cart: [],
  cartOpen: false,

  // Messages/Notifications
  messages: [],
  orders: [],

  // UI State
  searchTerm: "",
  categoryFilter: "all",
  sortBy: "name",
  isLoading: false,

  // Site Settings
  siteSettings: {
    siteName: "Gun-k Pro",
    headerText: "Your Premier Firearms Dealer",
    footerText: "Licensed FFL Dealer - Professional Service Since 1995",
    aboutUs:
      "Gun-k Pro is your trusted partner for all firearms needs. We offer a comprehensive selection of handguns, rifles, shotguns, and accessories from the industry's most respected manufacturers.",
    contactInfo: {
      email: "info@gun-k-pro.com",
      phone: "(555) 123-4567",
      address: "123 Main Street, Anytown, USA 12345",
    },
    businessHours: {
      weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
      saturday: "Saturday: 9:00 AM - 5:00 PM",
      sunday: "Sunday: Closed",
    },
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        productsLoaded: true,
        isLoading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload,
        isAdminAuthenticated: action.payload?.role === "admin",
      };

    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: null,
        isAdminAuthenticated: false,
      };

    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "TOGGLE_CART":
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };

    case "SET_CATEGORY_FILTER":
      return {
        ...state,
        categoryFilter: action.payload,
      };

    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, { id: Date.now(), ...action.payload }],
      };

    case "REMOVE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id !== action.payload),
      };

    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, { id: Date.now(), ...action.payload }],
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

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_SITE_SETTINGS":
      return {
        ...state,
        siteSettings: { ...state.siteSettings, ...action.payload },
      };

    case "HYDRATE_STATE":
      return {
        ...state,
        ...action.payload,
        products: state.products, // Keep loaded products
      };

    default:
      return state;
  }
}

// Debounced localStorage save function
let saveTimeoutId = null;
const debouncedSaveToLocalStorage = (state) => {
  if (saveTimeoutId) {
    clearTimeout(saveTimeoutId);
  }

  saveTimeoutId = setTimeout(() => {
    try {
      // Only save essential state, not the large products array
      const stateToSave = {
        currentUser: state.currentUser,
        isAdminAuthenticated: state.isAdminAuthenticated,
        cart: state.cart,
        messages: state.messages,
        orders: state.orders,
        searchTerm: state.searchTerm,
        categoryFilter: state.categoryFilter,
        sortBy: state.sortBy,
        siteSettings: state.siteSettings,
      };
      localStorage.setItem("gunStoreState", JSON.stringify(stateToSave));
    } catch (error) {
      console.warn("Failed to save state to localStorage:", error);
    }
  }, 1000); // Debounce for 1 second
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load products on mount
  useEffect(() => {
    if (!state.productsLoaded) {
      dispatch({ type: "SET_LOADING", payload: true });

      // Simulate async loading (in real app, this would be an API call)
      setTimeout(() => {
        dispatch({ type: "LOAD_PRODUCTS", payload: productsData });
      }, 100);
    }
  }, [state.productsLoaded]);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("gunStoreState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: "HYDRATE_STATE", payload: parsedState });
      }
    } catch (error) {
      console.warn("Failed to load state from localStorage:", error);
    }
  }, []);

  // Save state to localStorage with debouncing
  useEffect(() => {
    if (state.productsLoaded) {
      // Only save after products are loaded
      debouncedSaveToLocalStorage(state);
    }

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
      }
    };
  }, [
    state.currentUser,
    state.cart,
    state.messages,
    state.orders,
    state.siteSettings,
  ]);

  // Memoized context value
  const contextValue = React.useMemo(
    () => ({
      state,
      dispatch,

      // Helper functions
      addToCart: (product) =>
        dispatch({ type: "ADD_TO_CART", payload: product }),
      removeFromCart: (productId) =>
        dispatch({ type: "REMOVE_FROM_CART", payload: productId }),
      updateCartQuantity: (productId, quantity) =>
        dispatch({
          type: "UPDATE_CART_QUANTITY",
          payload: { id: productId, quantity },
        }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      toggleCart: () => dispatch({ type: "TOGGLE_CART" }),

      login: (user) => dispatch({ type: "LOGIN_USER", payload: user }),
      logout: () => dispatch({ type: "LOGOUT_USER" }),

      setSearchTerm: (term) =>
        dispatch({ type: "SET_SEARCH_TERM", payload: term }),
      setCategoryFilter: (category) =>
        dispatch({ type: "SET_CATEGORY_FILTER", payload: category }),
      setSortBy: (sortBy) => dispatch({ type: "SET_SORT_BY", payload: sortBy }),

      addMessage: (message) =>
        dispatch({ type: "ADD_MESSAGE", payload: message }),
      removeMessage: (messageId) =>
        dispatch({ type: "REMOVE_MESSAGE", payload: messageId }),

      addOrder: (order) => dispatch({ type: "ADD_ORDER", payload: order }),

      updateProduct: (product) =>
        dispatch({ type: "UPDATE_PRODUCT", payload: product }),
      deleteProduct: (productId) =>
        dispatch({ type: "DELETE_PRODUCT", payload: productId }),
      addProduct: (product) =>
        dispatch({ type: "ADD_PRODUCT", payload: product }),

      updateSiteSettings: (settings) =>
        dispatch({ type: "UPDATE_SITE_SETTINGS", payload: settings }),
    }),
    [state],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
