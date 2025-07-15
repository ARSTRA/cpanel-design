import React from "react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import HomePage from "../components/HomePage";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";
import { useApp } from "../context/AppContext";

function AppContent() {
  const { state } = useApp();

  // Check if we're on admin route
  if (typeof window !== "undefined" && window.location.pathname === "/admin") {
    return state.isAdminAuthenticated ? <AdminDashboard /> : <AdminLogin />;
  }

  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}

const IndexPage = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default IndexPage;
