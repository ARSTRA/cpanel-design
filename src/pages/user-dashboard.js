import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { AppProvider, useApp } from "../context/AppContext.optimized";
import Layout from "../components/Layout";
import KYCVerification from "../components/KYCVerification";
import PaymentProcessing from "../components/PaymentProcessing";
import ShoppingCart from "../components/ShoppingCart";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const DashboardContainer = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.9) 0%,
      rgba(118, 75, 162, 0.9) 100%
    ),
    url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop&auto=format&q=80");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 20px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.02) 50%,
      transparent 70%
    );
    animation: shimmer 4s infinite;
    pointer-events: none;
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

const DashboardContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: fit-content;
  position: sticky;
  top: 20px;
  animation: ${slideIn} 0.6s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
    border-radius: 20px 20px 0 0;
  }
`;

const UserProfile = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 2px solid #e1e8ed;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 32px;
  color: white;
  font-weight: bold;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
    z-index: -1;
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const UserName = styled.h3`
  color: #2c3e50;
  margin: 0 0 5px;
  font-size: 18px;
  font-weight: 600;
`;

const UserEmail = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 14px;
`;

const StatusBadge = styled.span`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
  display: inline-block;
`;

const NavMenu = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.div`
  padding: 15px 20px;
  margin: 8px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #2c3e50;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateX(5px);
  }

  ${(props) =>
    props.active &&
    `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  `}

  .icon {
    font-size: 18px;
  }

  .badge {
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    margin-left: auto;
    min-width: 20px;
  }
`;

const MainContent = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
    border-radius: 20px 20px 0 0;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e1e8ed;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin: 0 0 10px;
  font-size: 32px;
  font-weight: 700;
`;

const PageSubtitle = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.color || "#667eea"} 0%,
    ${(props) => props.secondColor || "#764ba2"} 100%
  );
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  position: relative;
  overflow: hidden;

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
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const ContentSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  &.secondary {
    background: #95a5a6;

    &:hover {
      background: #7f8c8d;
    }
  }

  &.danger {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);

    &:hover {
      box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
    }
  }
`;

const PurchaseHistory = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 15px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  font-weight: 600;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e1e8ed;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 15px;
`;

const StatusTag = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  &.completed {
    background: #d4edda;
    color: #155724;
  }

  &.pending {
    background: #fff3cd;
    color: #856404;
  }

  &.processing {
    background: #cce5ff;
    color: #004085;
  }
`;

function UserDashboardContent() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Check URL parameters on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      if (tab && menuItems.find(item => item.id === tab)) {
        setActiveTab(tab);
      }
    }
  }, []);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Gunsmith City",
    state: "GC",
    zipCode: "12345",
    dateOfBirth: "1990-01-01",
    licenseNumber: "FL123456789",
    licenseExpiry: "2025-12-31",
  });

  const [kycData, setKycData] = useState({
    idType: "drivers_license",
    idNumber: "",
    idImage: null,
    proofOfAddress: null,
    backgroundCheck: "pending",
  });

  const cartItemsCount = state.cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "cart", icon: "🛒", label: "Shopping Cart", badge: cartItemsCount > 0 ? cartItemsCount : null },
    { id: "profile", icon: "👤", label: "Profile Settings" },
    { id: "kyc", icon: "🔐", label: "Identity Verification" },
    { id: "payments", icon: "💳", label: "Payment Methods" },
    { id: "orders", icon: "📦", label: "Purchase History" },
    { id: "favorites", icon: "❤️", label: "Favorites" },
    { id: "settings", icon: "⚙️", label: "Account Settings" },
  ];

  const purchaseHistory = [
    {
      id: "001",
      product: "Glock 19 Gen 5",
      image:
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=100&h=100&fit=crop&auto=format&q=80",
      date: "2024-01-15",
      amount: "$549.99",
      status: "completed",
      ffl: "Smith's Gun Shop",
    },
    {
      id: "002",
      product: "Daniel Defense DDM4 V7",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&auto=format&q=80",
      date: "2024-01-20",
      amount: "$1,899.99",
      status: "processing",
      ffl: "Local FFL Dealer",
    },
    {
      id: "003",
      product: "Vortex Strike Eagle 1-6x24",
      image:
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=100&h=100&fit=crop&auto=format&q=80",
      date: "2024-01-25",
      amount: "$299.99",
      status: "pending",
      ffl: "N/A (Accessory)",
    },
  ];

  const handleInputChange = (section, field, value) => {
    if (section === "profile") {
      setProfileData((prev) => ({ ...prev, [field]: value }));
    } else if (section === "kyc") {
      setKycData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const renderDashboard = () => (
    <>
      <PageHeader>
        <PageTitle>Welcome back, {profileData.firstName}!</PageTitle>
        <PageSubtitle>
          Here's what's happening with your account today.
        </PageSubtitle>
      </PageHeader>

      <StatsGrid>
        <StatCard color="#667eea" secondColor="#764ba2">
          <StatNumber>3</StatNumber>
          <StatLabel>Total Purchases</StatLabel>
        </StatCard>
        <StatCard color="#27ae60" secondColor="#2ecc71">
          <StatNumber>$2,749.97</StatNumber>
          <StatLabel>Total Spent</StatLabel>
        </StatCard>
        <StatCard color="#f39c12" secondColor="#e67e22">
          <StatNumber>5</StatNumber>
          <StatLabel>Favorite Items</StatLabel>
        </StatCard>
        <StatCard color="#e74c3c" secondColor="#c0392b">
          <StatNumber>Verified</StatNumber>
          <StatLabel>KYC Status</StatLabel>
        </StatCard>
      </StatsGrid>

      <ContentSection>
        <SectionTitle>📦 Recent Purchases</SectionTitle>
        <PurchaseHistory>
          <TableHeader>Purchase History</TableHeader>
          {purchaseHistory.map((item) => (
            <TableRow key={item.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ProductImage
                  src={item.image}
                  alt={item.product}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div>
                  <div style={{ fontWeight: "600", color: "#2c3e50" }}>
                    {item.product}
                  </div>
                  <div style={{ fontSize: "12px", color: "#7f8c8d" }}>
                    Order #{item.id}
                  </div>
                </div>
              </div>
              <div>{item.date}</div>
              <div style={{ fontWeight: "600", color: "#27ae60" }}>
                {item.amount}
              </div>
              <StatusTag className={item.status}>{item.status}</StatusTag>
              <div style={{ fontSize: "12px", color: "#7f8c8d" }}>
                {item.ffl}
              </div>
            </TableRow>
          ))}
        </PurchaseHistory>
      </ContentSection>
    </>
  );

  const renderProfile = () => (
    <>
      <PageHeader>
        <PageTitle>👤 Profile Settings</PageTitle>
        <PageSubtitle>
          Manage your personal information and preferences.
        </PageSubtitle>
      </PageHeader>

      <CardGrid>
        <Card>
          <SectionTitle>Personal Information</SectionTitle>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              value={profileData.firstName}
              onChange={(e) =>
                handleInputChange("profile", "firstName", e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              value={profileData.lastName}
              onChange={(e) =>
                handleInputChange("profile", "lastName", e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                handleInputChange("profile", "email", e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              value={profileData.phone}
              onChange={(e) =>
                handleInputChange("profile", "phone", e.target.value)
              }
            />
          </FormGroup>
          <Button>Update Personal Info</Button>
        </Card>

        <Card>
          <SectionTitle>Address Information</SectionTitle>
          <FormGroup>
            <Label>Street Address</Label>
            <Input
              value={profileData.address}
              onChange={(e) =>
                handleInputChange("profile", "address", e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>City</Label>
            <Input
              value={profileData.city}
              onChange={(e) =>
                handleInputChange("profile", "city", e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>State</Label>
            <Select
              value={profileData.state}
              onChange={(e) =>
                handleInputChange("profile", "state", e.target.value)
              }
            >
              <option value="GC">Gunsmith City</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="CA">California</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>ZIP Code</Label>
            <Input
              value={profileData.zipCode}
              onChange={(e) =>
                handleInputChange("profile", "zipCode", e.target.value)
              }
            />
          </FormGroup>
          <Button>Update Address</Button>
        </Card>
      </CardGrid>
    </>
  );

  const renderKYC = () => (
    <>
      <PageHeader>
        <PageTitle>🔐 Identity Verification (KYC)</PageTitle>
        <PageSubtitle>
          Complete your identity verification to access all features and make
          firearm purchases.
        </PageSubtitle>
      </PageHeader>
      <KYCVerification />
    </>
  );

  const renderPayments = () => (
    <>
      <PageHeader>
        <PageTitle>💳 Payment Methods</PageTitle>
        <PageSubtitle>
          Manage your payment options for quick and secure checkout.
        </PageSubtitle>
      </PageHeader>
      <PaymentProcessing />
    </>
  );

  const renderCart = () => (
    <>
      <PageHeader>
        <PageTitle>🛒 Shopping Cart</PageTitle>
        <PageSubtitle>
          Review your selected items and proceed to checkout.
        </PageSubtitle>
      </PageHeader>
      <ShoppingCart />
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "cart":
        return renderCart();
      case "profile":
        return renderProfile();
      case "kyc":
        return renderKYC();
      case "payments":
        return renderPayments();
      case "orders":
        return renderDashboard(); // For now, same as dashboard
      case "favorites":
        return renderDashboard(); // Placeholder
      case "settings":
        return renderProfile(); // For now, same as profile
      default:
        return renderDashboard();
    }
  };

  return (
    <DashboardContainer>
      <DashboardContent>
        <Sidebar>
          <UserProfile>
            <Avatar>
              {profileData.firstName.charAt(0)}
              {profileData.lastName.charAt(0)}
            </Avatar>
            <UserName>
              {profileData.firstName} {profileData.lastName}
            </UserName>
            <UserEmail>{profileData.email}</UserEmail>
            <StatusBadge>Verified User</StatusBadge>
          </UserProfile>

          <NavMenu>
            {menuItems.map((item) => (
              <NavItem
                key={item.id}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span className="badge">{item.badge}</span>
                )}
              </NavItem>
            ))}
          </NavMenu>
        </Sidebar>

        <MainContent>{renderContent()}</MainContent>
      </DashboardContent>
    </DashboardContainer>
  );
}

const UserDashboardPage = () => {
  return (
    <AppProvider>
      <Layout>
        <UserDashboardContent />
      </Layout>
    </AppProvider>
  );
};

export default UserDashboardPage;

export const Head = () => <title>User Dashboard | Gun-k Pro</title>;
