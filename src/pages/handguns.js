import React from "react";
import Layout from "../components/Layout";
import HandgunCollection from "../components/HandgunCollection";

const HandgunsPage = () => {
  return (
    <Layout>
      <HandgunCollection />
    </Layout>
  );
};

export default HandgunsPage;

export const Head = () => <title>Handguns | Gun-k Pro</title>;
