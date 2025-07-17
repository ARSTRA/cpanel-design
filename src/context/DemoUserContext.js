import React, { createContext, useContext, useState } from "react";

const DemoUserContext = createContext();

export const useDemoUser = () => {
  const context = useContext(DemoUserContext);
  if (!context) {
    throw new Error("useDemoUser must be used within a DemoUserProvider");
  }
  return context;
};

export const DemoUserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: "👤",
    isAuthenticated: false,
    memberSince: "2022-01-15",
    orders: [
      {
        id: "ORD-001",
        date: "2023-12-01",
        total: 549.99,
        status: "Delivered",
        items: ["Glock 19 Gen 5"],
      },
      {
        id: "ORD-002",
        date: "2023-11-15",
        total: 899.99,
        status: "Shipped",
        items: ["Smith & Wesson M&P15 Sport II"],
      },
    ],
    favorites: [1, 11, 13, 16], // Product IDs
    cart: [],
    addresses: {
      billing: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
      shipping: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
    },
    fflDealer: {
      name: "Metro Gun Shop",
      address: "456 Gun Store Ave, New York, NY 10002",
      phone: "(555) 123-4567",
      fflNumber: "1-23-456-78-9A-12345",
    },
    preferences: {
      newsletter: true,
      smsNotifications: false,
      emailNotifications: true,
      theme: "light",
    },
    stats: {
      totalOrders: 12,
      totalSpent: 2450.0,
      membershipTier: "Gold",
      rating: 4.9,
    },
  });

  const login = (email, password) => {
    // Demo login - in real app would validate with backend
    if (email && password) {
      setUser((prev) => ({ ...prev, isAuthenticated: true }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser((prev) => ({ ...prev, isAuthenticated: false }));
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const addToCart = (product, quantity = 1) => {
    setUser((prev) => {
      const existingItem = prev.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          ...prev,
          cart: prev.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { ...product, quantity }],
      };
    });
  };

  const removeFromCart = (productId) => {
    setUser((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item.id !== productId),
    }));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setUser((prev) => ({
      ...prev,
      cart: prev.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    }));
  };

  const clearCart = () => {
    setUser((prev) => ({ ...prev, cart: [] }));
  };

  const toggleFavorite = (productId) => {
    setUser((prev) => {
      const isFavorite = prev.favorites.includes(productId);
      return {
        ...prev,
        favorites: isFavorite
          ? prev.favorites.filter((id) => id !== productId)
          : [...prev.favorites, productId],
      };
    });
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleFavorite,
  };

  return (
    <DemoUserContext.Provider value={value}>
      {children}
    </DemoUserContext.Provider>
  );
};
