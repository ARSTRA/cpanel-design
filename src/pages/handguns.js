import React from "react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import CategoryPage from "../components/CategoryPage";

const HandgunsPage = () => {
  return (
    <AppProvider>
      <Layout>
        <CategoryPage category="handguns" />
      </Layout>
    </AppProvider>
  );
};

export default HandgunsPage;
