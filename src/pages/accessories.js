import React from "react";
import { AppProvider } from "../context/AppContext";
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
