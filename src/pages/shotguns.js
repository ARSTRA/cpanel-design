import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import ShotgunCollection from "../components/ShotgunCollection";

const ShotgunsPage = () => {
  return (
    <AppProvider>
      <Layout>
        <ShotgunCollection />
      </Layout>
    </AppProvider>
  );
};

export default ShotgunsPage;
