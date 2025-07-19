import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import HandgunCollection from "../components/HandgunCollection";

const HandgunsPage = () => {
  return (
    <AppProvider>
      <Layout>
        <HandgunCollection />
      </Layout>
    </AppProvider>
  );
};

export default HandgunsPage;
