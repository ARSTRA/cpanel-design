import React, { useEffect } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";

const LoadingContainer = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  text-align: center;
  padding: 60px 20px;
`;

const LoadingContent = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`;

const ShippingRedirect = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = "/legal#shipping";
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <LoadingContainer>
        <LoadingContent>
          <h2>🚚 Shipping Policy</h2>
          <p>Redirecting to our comprehensive legal page...</p>
        </LoadingContent>
      </LoadingContainer>
    </Layout>
  );
};

export default ShippingRedirect;

export const Head = () => <title>Shipping Policy | Gun-k Pro</title>;
