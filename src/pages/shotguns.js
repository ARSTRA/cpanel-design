import React from "react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import CategoryPage from "../components/CategoryPage";

const ShotgunsPage = () => {
  return (
    <AppProvider>
      <Layout>
        <CategoryPage category="shotguns" />
      </Layout>
    </AppProvider>
  );
};

export default ShotgunsPage;
