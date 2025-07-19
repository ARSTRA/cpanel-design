import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import ShotgunDetail from "../components/ShotgunDetail";

const ShotgunDetailPage = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const shotgunId = searchParams.get("id");

  return (
    <AppProvider>
      <Layout>
        <ShotgunDetail shotgunId={shotgunId} />
      </Layout>
    </AppProvider>
  );
};

export default ShotgunDetailPage;
