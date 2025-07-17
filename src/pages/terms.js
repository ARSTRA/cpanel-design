import React, { useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import styled from "styled-components";

const LoadingContainer = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

const TermsRedirect = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = "/legal#terms";
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <LoadingContainer>
        <LoadingContent>
          <h2>📋 Terms of Service</h2>
          <p>Redirecting to our comprehensive legal page...</p>
        </LoadingContent>
      </LoadingContainer>
    </Layout>
  );
};

export default TermsRedirect;

export const Head = () => <title>Terms of Service | Gun-k Pro</title>;
