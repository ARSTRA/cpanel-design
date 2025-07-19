import React, { useState } from "react";
import styled from "styled-components";
import { Link, navigate } from "gatsby";

const UserNavContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const UserButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e8ed;
  overflow: hidden;
  min-width: 200px;
  z-index: 1000;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transform: ${(props) => (props.show ? "translateY(0)" : "translateY(-10px)")};
  transition: all 0.3s ease;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  color: #2c3e50;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }

  .icon {
    font-size: 16px;
    width: 20px;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: #e1e8ed;
  margin: 0;
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  color: #e74c3c;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #fdf2f2;
  }

  .icon {
    font-size: 16px;
    width: 20px;
  }
`;

const UserNavigation = ({
  user = { name: "John Doe", email: "john.doe@example.com" },
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // Clear user session
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <UserNavContainer>
      <UserButton onClick={() => setShowDropdown(!showDropdown)}>
        <span className="icon">👤</span>
        {user.name.split(" ")[0]}
        <span style={{ fontSize: "12px" }}>▼</span>
      </UserButton>

      <UserDropdown show={showDropdown}>
        <DropdownItem to="/user-dashboard">
          <span className="icon">📊</span>
          Dashboard
        </DropdownItem>
        <DropdownItem to="/user-dashboard">
          <span className="icon">👤</span>
          Profile
        </DropdownItem>
        <DropdownItem to="/user-dashboard">
          <span className="icon">📦</span>
          Orders
        </DropdownItem>
        <DropdownItem to="/user-dashboard">
          <span className="icon">❤️</span>
          Favorites
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem to="/user-dashboard">
          <span className="icon">⚙️</span>
          Settings
        </DropdownItem>
        <DropdownDivider />
        <LogoutButton onClick={handleLogout}>
          <span className="icon">🚪</span>
          Logout
        </LogoutButton>
      </UserDropdown>
    </UserNavContainer>
  );
};

export default UserNavigation;
