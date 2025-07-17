import React from "react";
import Layout from "../components/Layout";
import AccessoryCollection from "../components/AccessoryCollection";

const AccessoriesPage = () => {
  return (
    <Layout>
      <AccessoryCollection />
    </Layout>
  );
};

export default AccessoriesPage;

export const Head = () => <title>Accessories | Gun-k Pro</title>;
