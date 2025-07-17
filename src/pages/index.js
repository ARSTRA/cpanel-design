import React from "react";
import Layout from "../components/Layout";
import HomePage from "../components/HomePage";

const IndexPage = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Gun-k Pro | Premier Firearms Dealer</title>;
