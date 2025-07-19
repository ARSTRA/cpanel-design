import React from "react";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import ContactPage from "../components/ContactPage";

const Contact = () => {
  return (
    <AppProvider>
      <Layout>
        <ContactPage />
      </Layout>
    </AppProvider>
  );
};

export default Contact;
