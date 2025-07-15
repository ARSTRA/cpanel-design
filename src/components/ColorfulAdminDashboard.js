import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useApp } from "../context/AppContext";
import ProductManagement from "./admin/ProductManagement";
import OrderManagement from "./admin/OrderManagement";
import UserManagement from "./admin/UserManagement";
import MessageManagement from "./admin/MessageManagement";
import SiteSettings from "./admin/SiteSettings";
import NotificationSystem from "./ColorfulNotification";

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 107, 107, 0.6), 0 0 40px rgba(238, 90, 36, 0.3); }
  100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.3); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(
        circle at 25% 25%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 70%
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(255, 255, 255, 0.05) 0%,
        transparent 70%
      );
    pointer-events: none;
  }
`;

const Sidebar = styled.div`
  width: 320px;
  background: linear-gradient(
    145deg,
    #ff6b6b 0%,
    #ee5a24 30%,
    #fd79a8 70%,
    #fdcb6e 100%
  );
  color: white;
  padding: 30px 25px;
  box-shadow: 8px 0 32px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${glow} 4s ease-in-out infinite;

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
      rgba(255, 255, 255, 0.15) 49%,
      rgba(255, 255, 255, 0.15) 51%,
      transparent 52%
    );
    background-size: 30px 30px;
    animation: ${shimmer} 3s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent 30%
    );
    animation: ${float} 6s ease-in-out infinite;
  }
`;

const Logo = styled.div`
  text-align: center;
  padding: 25px 0 30px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 40px;
  position: relative;
  z-index: 2;

  h2 {
    margin: 0;
    font-size: 32px;
    color: white;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
    font-weight: 900;
    background: linear-gradient(45deg, #fff, #f8f9fa, #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${pulse} 3s ease-in-out infinite;
  }

  p {
    margin: 10px 0 0 0;
    color: rgba(255, 255, 255, 0.95);
    font-size: 16px;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
  }
`;

const NavMenu = styled.nav`
  position: relative;
  z-index: 2;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
  }
`;

const NavItem = styled.button`
  width: 100%;
  padding: 18px 25px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)"
      : "rgba(255,255,255,0.1)"};
  border: ${(props) =>
    props.active ? "2px solid rgba(255,255,255,0.4)" : "2px solid transparent"};
  border-radius: 20px;
  color: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
    transform: translateX(8px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  span {
    margin-right: 15px;
    font-size: 20px;
    display: inline-block;
    animation: ${float} 4s ease-in-out infinite;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 35px;
  overflow-y: auto;
  position: relative;
`;

const Header = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
  padding: 25px 35px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      #ff6b6b,
      #ee5a24,
      #fd79a8,
      #fdcb6e,
      #74b9ff
    );
    background-size: 300% 100%;
    animation: ${shimmer} 3s linear infinite;
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: #2c3e50;
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.button`
  padding: 12px 28px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);

  &:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.color} 0%,
    ${(props) => props.colorDark} 100%
  );
  color: white;
  padding: 25px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    animation: ${glow} 2s ease-in-out;
  }

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent 30%
    );
    animation: ${float} 8s linear infinite;
  }
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
`;

const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
  position: relative;
  z-index: 1;
`;

const ContentArea = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;
`;

const menuItems = [
  { id: "products", label: "Product Management", icon: "🔫", color: "#ff6b6b" },
  { id: "orders", label: "Order Management", icon: "📦", color: "#74b9ff" },
  { id: "users", label: "User Management", icon: "👥", color: "#fd79a8" },
  { id: "messages", label: "Messages", icon: "📧", color: "#fdcb6e" },
  { id: "settings", label: "Site Settings", icon: "⚙️", color: "#55a3ff" },
];

export default function ColorfulAdminDashboard() {
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

  const getStats = () => {
    return [
      {
        number: state.products.length,
        label: "Products",
        color: "#ff6b6b",
        colorDark: "#ee5a24",
      },
      {
        number: state.orders.length,
        label: "Orders",
        color: "#74b9ff",
        colorDark: "#0984e3",
      },
      {
        number: state.users.length,
        label: "Users",
        color: "#fd79a8",
        colorDark: "#e84393",
      },
      {
        number: state.messages.filter((m) => !m.read).length,
        label: "New Messages",
        color: "#fdcb6e",
        colorDark: "#e17055",
      },
    ];
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>
          <h2>🔫 Gun Store</h2>
          <p>Admin Dashboard</p>
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

        <StatsGrid>
          {getStats().map((stat, index) => (
            <StatCard key={index} color={stat.color} colorDark={stat.colorDark}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <ContentArea>{renderContent()}</ContentArea>
      </MainContent>
    </DashboardContainer>
  );
}
