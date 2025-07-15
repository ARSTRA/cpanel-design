import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext";
import ProductManagement from "./admin/ProductManagement";
import OrderManagement from "./admin/OrderManagement";
import UserManagement from "./admin/UserManagement";
import MessageManagement from "./admin/MessageManagement";
import SiteSettings from "./admin/SiteSettings";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.1"/><circle cx="60" cy="30" r="1" fill="white" opacity="0.08"/><circle cx="40" cy="70" r="1" fill="white" opacity="0.12"/><circle cx="80" cy="60" r="1" fill="white" opacity="0.09"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  background: linear-gradient(145deg, #ff6b6b 0%, #ee5a24 50%, #fd79a8 100%);
  color: white;
  padding: 25px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 48%,
      rgba(255, 255, 255, 0.1) 49%,
      rgba(255, 255, 255, 0.1) 51%,
      transparent 52%
    );
    background-size: 20px 20px;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const Logo = styled.div`
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #34495e;
  margin-bottom: 30px;

  h2 {
    margin: 0;
    font-size: 24px;
    color: #ecf0f1;
  }

  p {
    margin: 5px 0 0 0;
    color: #bdc3c7;
    font-size: 14px;
  }
`;

const NavMenu = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 5px;
  }
`;

const NavItem = styled.button`
  width: 100%;
  padding: 15px 20px;
  background: ${(props) =>
    props.active ? "rgba(52, 152, 219, 0.2)" : "transparent"};
  border: none;
  border-left: 4px solid
    ${(props) => (props.active ? "#3498db" : "transparent")};
  color: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 0 25px 25px 0;

  &:hover {
    background: rgba(52, 152, 219, 0.1);
  }

  span {
    margin-right: 10px;
    font-size: 18px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;

const Header = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: #2c3e50;
  font-size: 28px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;

  &:hover {
    background: #c0392b;
  }
`;

const menuItems = [
  { id: "products", label: "Product Management", icon: "🔫" },
  { id: "orders", label: "Order Management", icon: "📦" },
  { id: "users", label: "User Management", icon: "👥" },
  { id: "messages", label: "Messages", icon: "📧" },
  { id: "settings", label: "Site Settings", icon: "⚙️" },
];

export default function AdminDashboard() {
  const { dispatch, state } = useApp();
  const [activeTab, setActiveTab] = useState("products");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_ADMIN" });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      case "users":
        return <UserManagement />;
      case "messages":
        return <MessageManagement />;
      case "settings":
        return <SiteSettings />;
      default:
        return <ProductManagement />;
    }
  };

  const getActiveTabTitle = () => {
    const item = menuItems.find((item) => item.id === activeTab);
    return item ? item.label : "Dashboard";
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>
          <h2>🔫 Gun Store</h2>
          <p>Admin Panel</p>
        </Logo>

        <NavMenu>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavItem
                  active={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </NavMenu>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>{getActiveTabTitle()}</HeaderTitle>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Header>

        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
}
