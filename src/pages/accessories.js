import React from "react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import CategoryPage from "../components/CategoryPage";

const AccessoriesPage = () => {
  return (
    <AppProvider>
      <Layout>
        <CategoryPage category="accessories" />
      </Layout>
    </AppProvider>
  );
};

export default AccessoriesPage;
