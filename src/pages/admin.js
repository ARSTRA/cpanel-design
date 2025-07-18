import React from "react";
import { AppProvider, useApp } from "../context/AppContext";
import AdminLogin from "../components/AdminLogin";
import ModernAdminDashboard from "../components/ModernAdminDashboard";
import styled from "styled-components";

const AdminPageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 18px;
`;

function AdminContent() {
  const { state } = useApp();

  // Show loading state briefly for better UX
  if (state.isAdminAuthenticated === undefined) {
    return (
      <LoadingContainer>
        <div>Loading Admin Portal...</div>
      </LoadingContainer>
    );
  }

  return (
    <AdminPageContainer>
      {state.isAdminAuthenticated ? <ModernAdminDashboard /> : <AdminLogin />}
    </AdminPageContainer>
  );
}

const AdminPage = () => {
  return (
    <AppProvider>
      <AdminContent />
    </AppProvider>
  );
};

export default AdminPage;

// Add page metadata for SEO
export const Head = () => (
  <>
    <title>Admin Portal - Gun-k Pro</title>
    <meta
      name="description"
      content="Secure admin portal for Gun-k Pro firearms website management"
    />
    <meta name="robots" content="noindex, nofollow" />
  </>
);
