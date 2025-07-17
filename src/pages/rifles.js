import React from "react";
import Layout from "../components/Layout";
import RifleCollection from "../components/RifleCollection";

const RiflesPage = () => {
  return (
    <Layout>
      <RifleCollection />
    </Layout>
  );
};

export default RiflesPage;

export const Head = () => <title>Rifles | Gun-k Pro</title>;
