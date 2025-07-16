import React from "react";
import { AppProvider } from "../context/AppContext";
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
