import React from "react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import CategoryPage from "../components/CategoryPage";

const RiflesPage = () => {
  return (
    <AppProvider>
      <Layout>
        <CategoryPage category="rifles" />
      </Layout>
    </AppProvider>
  );
};

export default RiflesPage;
