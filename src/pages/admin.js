import React from "react";
import { AppProvider, useApp } from "../context/AppContext";
import AdminLogin from "../components/AdminLogin";
import ColorfulAdminDashboard from "../components/ColorfulAdminDashboard";

function AdminContent() {
  const { state } = useApp();

  return state.isAdminAuthenticated ? (
    <ColorfulAdminDashboard />
  ) : (
    <AdminLogin />
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
