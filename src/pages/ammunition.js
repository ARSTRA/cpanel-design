import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import AmmunitionCollection from "../components/AmmunitionCollection";

const AmmunitionPage = () => {
  return (
    <AppProvider>
      <Layout>
        <AmmunitionCollection />
      </Layout>
    </AppProvider>
  );
};

export default AmmunitionPage;
