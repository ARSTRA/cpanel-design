import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 900;
  color: #e74c3c;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const ErrorMessage = styled.h2`
  font-size: 32px;
  color: #2c3e50;
  margin: 20px 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ErrorDescription = styled.p`
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 40px;
  max-width: 500px;
`;

const HomeButton = styled(Link)`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: linear-gradient(135deg, #2980b9 0%, #1f4e79 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  }
`;

const NotFoundPage = () => {
  return (
    <AppProvider>
      <Layout>
        <NotFoundContainer>
          <ErrorCode>404</ErrorCode>
          <ErrorMessage>Page Not Found</ErrorMessage>
          <ErrorDescription>
            Sorry, the page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </ErrorDescription>
          <HomeButton to="/">🏠 Back to Home</HomeButton>
        </NotFoundContainer>
      </Layout>
    </AppProvider>
  );
};

export default NotFoundPage;

export const Head = () => <title>Page Not Found | Gun-k Pro</title>;
