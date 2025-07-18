import React from "react";
import { AppProvider, useApp } from "../context/AppContext";
import AdminLogin from "../components/AdminLogin";
import ModernAdminDashboard from "../components/ModernAdminDashboard";

function AdminContent() {
  const { state } = useApp();

  return state.isAdminAuthenticated ? <ModernAdminDashboard /> : <AdminLogin />;
}

const AdminPage = () => {
  return (
    <AppProvider>
      <AdminContent />
    </AppProvider>
  );
};

export default AdminPage;
