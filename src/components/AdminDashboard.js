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
  background: #f5f6fa;
`;

const Sidebar = styled.div`
  width: 280px;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
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
