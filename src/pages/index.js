import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import HomePage from "../components/HomePage";

function AppContent() {
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
