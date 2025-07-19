import React, { useState } from "react";
import styled from "styled-components";
import { Link, navigate } from "gatsby";
import { useApp } from "../context/AppContext.optimized";

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

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 900;
  color: white;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 6px 12px;
  border-radius: 15px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  height: 50px;

  &:hover {
    transform: scale(1.05) rotate(-1deg);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.3);
    background: linear-gradient(
      135deg,
      rgba(255, 107, 107, 0.2),
      rgba(116, 185, 255, 0.2)
    );
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
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;

  ${Logo}:hover & {
    transform: rotate(360deg) scale(1.1);
    background: linear-gradient(
      135deg,
      rgba(255, 107, 107, 0.3),
      rgba(116, 185, 255, 0.3)
    );
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const IconSvg = styled.svg`
  transition: all 0.4s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));

  ${Logo}:hover & {
    filter: drop-shadow(0 4px 8px rgba(255, 107, 107, 0.4));
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const MainText = styled.span`
  font-size: 22px;
  font-weight: 900;
  background: linear-gradient(
    135deg,
    #ff6b6b 0%,
    #74b9ff 25%,
    #fd79a8 50%,
    #fdcb6e 75%,
    #00b894 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
  line-height: 1;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  ${Logo}:hover & {
    animation-duration: 0.5s;
  }
`;

const SubText = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: -2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  ${Logo}:hover & {
    color: #fdcb6e;
  }
`;

const Navigation = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  position: relative;

  &:hover {
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
    transform: translateY(-2px);
  }

  &.active {
    color: #3498db;
    background: rgba(52, 152, 219, 0.2);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #3498db;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 80%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(116, 185, 255, 0.2),
    rgba(253, 121, 168, 0.2)
  );
  border-radius: 25px;
  padding: 8px 15px;
  max-width: 300px;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(116, 185, 255, 0.2);

  &:focus-within {
    background: linear-gradient(
      135deg,
      rgba(116, 185, 255, 0.3),
      rgba(253, 121, 168, 0.3)
    );
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(116, 185, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    max-width: 200px;
    display: none; /* Hide search on mobile to make room for auth buttons */
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

const SearchButton = styled.button`
  background: linear-gradient(135deg, #74b9ff 0%, #fd79a8 100%);
  border: none;
  color: white;
  cursor: pointer;
  padding: 6px 8px;
  margin-left: 8px;
  border-radius: 50%;
  transition: all 0.4s ease;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(116, 185, 255, 0.3);

  &:hover {
    background: linear-gradient(135deg, #fd79a8 0%, #74b9ff 100%);
    transform: scale(1.2) rotate(15deg);
    box-shadow: 0 4px 15px rgba(253, 121, 168, 0.5);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const AuthButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const LoginButton = styled(Link)`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #fd79a8 100%);
  color: white;
  text-decoration: none;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);

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

  &:hover {
    background: linear-gradient(135deg, #fd79a8 0%, #ff6b6b 50%, #ee5a24 100%);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(255, 107, 107, 0.5);
    color: white;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 12px;
  }
`;

const SignupButton = styled(Link)`
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #00b894 100%);
  color: white;
  text-decoration: none;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(116, 185, 255, 0.3);

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

  &:hover {
    background: linear-gradient(135deg, #00b894 0%, #74b9ff 50%, #0984e3 100%);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(116, 185, 255, 0.5);
    color: white;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 12px;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Header() {
  const { state } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // For now, navigate to home page with search term
      // In a real app, you'd implement search functionality
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Get current page to highlight active nav item
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <HeaderContainer>
      <TopBar>
        {state.siteSettings.headerText} | Licensed FFL Dealer | Call:{" "}
        <a
          href={`tel:${state.siteSettings.contactInfo.phone}`}
          style={{ color: "#3498db", textDecoration: "none" }}
        >
          {state.siteSettings.contactInfo.phone}
        </a>
      </TopBar>

      <NavigationBar>
        <Logo to="/" onClick={handleLogoClick}>
          <LogoIcon>
            <IconSvg viewBox="0 0 50 50" width="24" height="24">
              <defs>
                <linearGradient
                  id="gunGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="25%" stopColor="#74b9ff" />
                  <stop offset="50%" stopColor="#fd79a8" />
                  <stop offset="75%" stopColor="#fdcb6e" />
                  <stop offset="100%" stopColor="#00b894" />
                </linearGradient>
                <linearGradient
                  id="kGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00b894" />
                  <stop offset="50%" stopColor="#74b9ff" />
                  <stop offset="100%" stopColor="#fd79a8" />
                </linearGradient>
              </defs>

              {/* Stylized Gun Shape */}
              <path
                d="M10 20 L35 20 L40 15 L45 15 L45 25 L40 25 L35 20 L35 30 L30 30 L30 25 L15 25 L15 30 L10 30 Z"
                fill="url(#gunGradient)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />

              {/* Letter K integrated */}
              <path
                d="M8 10 L8 35 M8 22 L20 10 M8 22 L20 35"
                stroke="url(#kGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </IconSvg>
          </LogoIcon>
          <LogoText>
            <MainText>Gun-k</MainText>
            <SubText>Pro</SubText>
          </LogoText>
        </Logo>

        <Navigation isOpen={isMenuOpen}>
          <NavLink
            to="/"
            onClick={handleNavClick}
            className={currentPath === "/" ? "active" : ""}
          >
            Home
          </NavLink>
          <NavLink
            to="/handguns"
            onClick={handleNavClick}
            className={currentPath === "/handguns" ? "active" : ""}
          >
            Handguns
          </NavLink>
          <NavLink
            to="/rifles"
            onClick={handleNavClick}
            className={currentPath === "/rifles" ? "active" : ""}
          >
            Rifles
          </NavLink>
          <NavLink
            to="/shotguns"
            onClick={handleNavClick}
            className={currentPath === "/shotguns" ? "active" : ""}
          >
            Shotguns
          </NavLink>
          <NavLink
            to="/accessories"
            onClick={handleNavClick}
            className={currentPath === "/accessories" ? "active" : ""}
          >
            Accessories
          </NavLink>
          <NavLink
            to="/ammunition"
            onClick={handleNavClick}
            className={currentPath === "/ammunition" ? "active" : ""}
          >
            Ammunition
          </NavLink>
        </Navigation>

        <ActionButtons>
          <SearchContainer as="form" onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">🔍</SearchButton>
          </SearchContainer>

          <AuthButtonsContainer>
            <LoginButton to="/login">Login</LoginButton>
            <SignupButton to="/signup">Sign Up</SignupButton>
          </AuthButtonsContainer>

          <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"}
          </MenuToggle>
        </ActionButtons>
      </NavigationBar>
    </HeaderContainer>
  );
}
