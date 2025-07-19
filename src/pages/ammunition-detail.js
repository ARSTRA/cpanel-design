import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import AmmunitionDetail from "../components/AmmunitionDetail";

const AmmunitionDetailPage = () => {
  return (
    <AppProvider>
      <Layout>
        <AmmunitionDetail />
      </Layout>
    </AppProvider>
  );
};

export default AmmunitionDetailPage;
