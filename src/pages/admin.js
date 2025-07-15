import React from "react";
import { AppProvider, useApp } from "../context/AppContext";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

function AdminContent() {
  const { state } = useApp();

  return state.isAdminAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}

const AdminPage = () => {
  return (
    <AppProvider>
      <AdminContent />
    </AppProvider>
  );
};

export default AdminPage;
