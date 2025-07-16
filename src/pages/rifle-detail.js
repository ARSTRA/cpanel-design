import React from "react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import RifleDetail from "../components/RifleDetail";

const RifleDetailPage = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const rifleId = searchParams.get("id");

  return (
    <AppProvider>
      <Layout>
        <RifleDetail rifleId={rifleId} />
      </Layout>
    </AppProvider>
  );
};

export default RifleDetailPage;
