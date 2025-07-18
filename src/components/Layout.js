import React from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "./ErrorBoundary";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding-top: 80px; /* Account for fixed header */
`;

export default function Layout({ children }) {
  const { state } = useApp();

  return (
    <ErrorBoundary>
      <LayoutContainer>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </LayoutContainer>
    </ErrorBoundary>
  );
}
