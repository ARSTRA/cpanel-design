import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import RifleCollection from "../components/RifleCollection";

const RiflesPage = () => {
  return (
    <AppProvider>
      <Layout>
        <RifleCollection />
      </Layout>
    </AppProvider>
  );
};

export default RiflesPage;
