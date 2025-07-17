import React from "react";
import Layout from "../components/Layout";
import AccessoryDetail from "../components/AccessoryDetail";

const AccessoryDetailPage = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const accessoryId = searchParams.get("id");

  return (
    <Layout>
      <AccessoryDetail accessoryId={accessoryId} />
    </Layout>
  );
};

export default AccessoryDetailPage;
