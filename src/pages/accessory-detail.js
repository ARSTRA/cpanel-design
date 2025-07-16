import React from "react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import AccessoryDetail from "../components/AccessoryDetail";

const AccessoryDetailPage = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const accessoryId = searchParams.get("id");

  return (
    <AppProvider>
      <Layout>
        <AccessoryDetail accessoryId={accessoryId} />
      </Layout>
    </AppProvider>
  );
};

export default AccessoryDetailPage;
