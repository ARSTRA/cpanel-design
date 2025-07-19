import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import AccessoryCollection from "../components/AccessoryCollection";

const AccessoriesPage = () => {
  return (
    <AppProvider>
      <Layout>
        <AccessoryCollection />
      </Layout>
    </AppProvider>
  );
};

export default AccessoriesPage;
