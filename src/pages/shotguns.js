import React from "react";
import Layout from "../components/Layout";
import ShotgunCollection from "../components/ShotgunCollection";

const ShotgunsPage = () => {
  return (
    <Layout>
      <ShotgunCollection />
    </Layout>
  );
};

export default ShotgunsPage;

export const Head = () => <title>Shotguns | Gun-k Pro</title>;
