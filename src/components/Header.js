import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const TopBar = styled.div`
  background: rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  font-size: 14px;
  text-align: center;
`;

const NavigationBar = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-decoration: none;

  span {
    font-size: 32px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #2c3e50;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  cursor: pointer;

  &:hover {
    color: #3498db;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 8px 15px;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: white;
  flex: 1;
  padding: 5px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AdminButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    background: #c0392b;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Header() {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdminClick = () => {
    if (state.isAdminAuthenticated) {
      // If already authenticated, go to dashboard
      window.location.href = "/admin";
    } else {
      // Show login
      dispatch({ type: "SHOW_ADMIN_LOGIN" });
    }
  };

  return (
    <HeaderContainer>
      <TopBar>
        {state.siteSettings.headerText} | Licensed FFL Dealer | Call:{" "}
        {state.siteSettings.contactInfo.phone}
      </TopBar>

      <NavigationBar>
        <Logo>
          <span>🔫</span>
          {state.siteSettings.siteName}
        </Logo>

        <Navigation isOpen={isMenuOpen}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/handguns">Handguns</NavLink>
          <NavLink href="/rifles">Rifles</NavLink>
          <NavLink href="/shotguns">Shotguns</NavLink>
          <NavLink href="/accessories">Accessories</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </Navigation>

        <ActionButtons>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span style={{ marginLeft: "10px" }}>🔍</span>
          </SearchContainer>

          <AdminButton onClick={handleAdminClick}>
            {state.isAdminAuthenticated ? "Dashboard" : "Admin"}
          </AdminButton>

          <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</MenuToggle>
        </ActionButtons>
      </NavigationBar>
    </HeaderContainer>
  );
}
