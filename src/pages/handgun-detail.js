import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import HandgunDetail from "../components/HandgunDetail";

const HandgunDetailPage = ({ location }) => {
  // Get product ID from URL search params
  const urlParams = new URLSearchParams(location.search);
  const productId = urlParams.get("id");

  return (
    <AppProvider>
      <Layout>
        <HandgunDetail productId={productId} />
      </Layout>
    </AppProvider>
  );
};

export default HandgunDetailPage;

export const Head = ({ location }) => {
  const urlParams = new URLSearchParams(location.search);
  const productId = urlParams.get("id");
  return <title>Handgun Details #{productId} | Gun-k Pro</title>;
};
