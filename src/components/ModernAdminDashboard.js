import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useApp } from "../context/AppContext";
import FFLRequestManager from "./FFLRequestManager";
import InventoryManager from "./InventoryManager";
import AnalyticsDashboard from "./AnalyticsDashboard";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6), 0 0 60px rgba(255, 107, 107, 0.3);
  }
`;

const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #f5576c 75%,
    #667eea 100%
  );
  background-size: 400% 400%;
  animation: ${glow} 8s ease-in-out infinite;
  display: flex;
`;

const Sidebar = styled.div`
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 30px 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    height: auto;
  }
`;

const AdminHeader = styled.div`
  padding: 0 25px 30px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  margin-bottom: 30px;
`;

const AdminLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const LogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
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
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const AdminTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const AdminSubtitle = styled.p`
  color: #7f8c8d;
  font-size: 14px;
  margin: 5px 0 0 0;
`;

const UserInfo = styled.div`
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1),
    rgba(118, 75, 162, 0.1)
  );
  padding: 15px;
  border-radius: 15px;
  border: 1px solid rgba(102, 126, 234, 0.2);

  .name {
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 5px;
  }

  .role {
    color: #667eea;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const NavigationMenu = styled.nav`
  padding: 0 15px;
`;

const MenuSection = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 10px 10px;
`;

const MenuItem = styled.button`
  width: 100%;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "transparent"};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: none;
  padding: 15px 20px;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "rgba(102, 126, 234, 0.1)"};
    transform: translateX(5px);
  }

  .icon {
    font-size: 20px;
    width: 24px;
    text-align: center;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 30px;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;

const TopBar = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TopBarActions = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: ${(props) =>
    props.variant === "primary"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : props.variant === "success"
        ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
        : props.variant === "danger"
          ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
          : "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)"};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const NotificationBadge = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
`;

const ContentArea = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 600px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.color || "#667eea"} 0%,
    ${(props) => props.colorEnd || "#764ba2"} 100%
  );
  padding: 25px;
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  .icon {
    font-size: 32px;
    margin-bottom: 15px;
    opacity: 0.9;
  }

  .value {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .label {
    font-size: 14px;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .change {
    font-size: 12px;
    margin-top: 8px;
    opacity: 0.8;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
`;

const FormSection = styled.div`
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #e9ecef;
`;

const SectionHeader = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;

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
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
`;

const TableHead = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }

  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 12px;
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
`;

const StatusBadge = styled.span`
  background: ${(props) =>
    props.status === "active"
      ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
      : props.status === "pending"
        ? "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)"
        : props.status === "declined"
          ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
          : "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"};
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

const FileUpload = styled.div`
  border: 2px dashed #667eea;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(102, 126, 234, 0.05);

  &:hover {
    border-color: #764ba2;
    background: rgba(102, 126, 234, 0.1);
  }

  .icon {
    font-size: 48px;
    color: #667eea;
    margin-bottom: 15px;
  }

  .text {
    color: #667eea;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .subtext {
    color: #7f8c8d;
    font-size: 12px;
  }
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
`;

const ModernAdminDashboard = () => {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "handguns",
    contactPhone: state.siteSettings.contactInfo.phone,
    contactEmail: state.siteSettings.contactInfo.email,
    contactAddress: state.siteSettings.contactInfo.address,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_ADMIN" });
  };

  const renderDashboardStats = () => (
    <StatsGrid>
      <StatCard color="#667eea" colorEnd="#764ba2">
        <div className="icon">📊</div>
        <div className="value">{state.products.length}</div>
        <div className="label">Total Products</div>
        <div className="change">+12% this month</div>
      </StatCard>

      <StatCard color="#00b894" colorEnd="#00a085">
        <div className="icon">💰</div>
        <div className="value">$94,350</div>
        <div className="label">Total Revenue</div>
        <div className="change">+8.5% this month</div>
      </StatCard>

      <StatCard color="#fdcb6e" colorEnd="#e17055">
        <div className="icon">👥</div>
        <div className="value">{state.users.length}</div>
        <div className="label">Active Users</div>
        <div className="change">+15% this month</div>
      </StatCard>

      <StatCard color="#ff6b6b" colorEnd="#ee5a24">
        <div className="icon">📦</div>
        <div className="value">{state.orders.length}</div>
        <div className="label">Total Orders</div>
        <div className="change">+3 today</div>
      </StatCard>
    </StatsGrid>
  );

  const renderProductManagement = () => (
    <FormGrid>
      <FormSection>
        <SectionHeader>
          <span>📦</span> Add New Product
        </SectionHeader>

        <FormGroup>
          <Label>Product Name</Label>
          <Input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Category</Label>
          <Select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleInputChange}
          >
            <option value="handguns">Handguns</option>
            <option value="rifles">Rifles</option>
            <option value="shotguns">Shotguns</option>
            <option value="accessories">Accessories</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Price ($)</Label>
          <Input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            placeholder="Enter product description"
          />
        </FormGroup>

        <FormGroup>
          <Label>Product Images</Label>
          <FileUpload>
            <div className="icon">📸</div>
            <div className="text">Click to upload images</div>
            <div className="subtext">JPG, PNG up to 5MB each</div>
          </FileUpload>
        </FormGroup>

        <ActionButton variant="success">
          <span>💾</span> Save Product
        </ActionButton>
      </FormSection>

      <FormSection>
        <SectionHeader>
          <span>📋</span> Recent Products
        </SectionHeader>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Product</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            <TableRow>
              <TableCell>Glock 19 Gen 5</TableCell>
              <TableCell>$549.99</TableCell>
              <TableCell>
                <StatusBadge status="active">Active</StatusBadge>
              </TableCell>
              <TableCell>
                <ActionButton
                  variant="primary"
                  style={{ padding: "5px 10px", fontSize: "12px" }}
                >
                  Edit
                </ActionButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Smith & Wesson M&P9</TableCell>
              <TableCell>$479.99</TableCell>
              <TableCell>
                <StatusBadge status="active">Active</StatusBadge>
              </TableCell>
              <TableCell>
                <ActionButton
                  variant="primary"
                  style={{ padding: "5px 10px", fontSize: "12px" }}
                >
                  Edit
                </ActionButton>
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </FormSection>
    </FormGrid>
  );

  const renderOrderManagement = () => (
    <div>
      <StatsGrid style={{ marginBottom: "30px" }}>
        <StatCard color="#74b9ff" colorEnd="#0984e3">
          <div className="icon">📋</div>
          <div className="value">89</div>
          <div className="label">Pending Orders</div>
        </StatCard>

        <StatCard color="#00b894" colorEnd="#00a085">
          <div className="icon">✅</div>
          <div className="value">1,234</div>
          <div className="label">Completed Orders</div>
        </StatCard>
      </StatsGrid>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Products</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          <TableRow>
            <TableCell>#ORD-001</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>Glock 19 Gen 5</TableCell>
            <TableCell>$549.99</TableCell>
            <TableCell>
              <StatusBadge status="pending">Pending</StatusBadge>
            </TableCell>
            <TableCell>
              <div style={{ display: "flex", gap: "5px" }}>
                <ActionButton
                  variant="success"
                  style={{ padding: "5px 10px", fontSize: "11px" }}
                >
                  ✓ Accept
                </ActionButton>
                <ActionButton
                  variant="danger"
                  style={{ padding: "5px 10px", fontSize: "11px" }}
                >
                  ✗ Decline
                </ActionButton>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#ORD-002</TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>AR-15 Sport II</TableCell>
            <TableCell>$899.99</TableCell>
            <TableCell>
              <StatusBadge status="active">Approved</StatusBadge>
            </TableCell>
            <TableCell>
              <ActionButton
                variant="primary"
                style={{ padding: "5px 10px", fontSize: "11px" }}
              >
                📦 Ship
              </ActionButton>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </div>
  );

  const renderSettings = () => (
    <FormGrid>
      <FormSection>
        <SectionHeader>
          <span>📞</span> Contact Information
        </SectionHeader>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            placeholder="(555) 123-4567"
          />
        </FormGroup>

        <FormGroup>
          <Label>Email Address</Label>
          <Input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            placeholder="info@gunkpro.com"
          />
        </FormGroup>

        <FormGroup>
          <Label>Business Address</Label>
          <TextArea
            name="contactAddress"
            value={formData.contactAddress}
            onChange={handleInputChange}
            placeholder="123 Gun Store Ave, Firearms City, TX 75001"
          />
        </FormGroup>

        <ActionButton variant="success">
          <span>💾</span> Save Contact Info
        </ActionButton>
      </FormSection>

      <FormSection>
        <SectionHeader>
          <span>💳</span> Payment Methods Configuration
        </SectionHeader>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {/* Traditional Payment Methods */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h4
              style={{
                margin: "0 0 15px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              💳 Traditional Payments
            </h4>
            <FormGroup>
              <Label style={{ color: "white" }}>Stripe Public Key</Label>
              <Input type="text" placeholder="pk_live_..." />
            </FormGroup>
            <FormGroup>
              <Label style={{ color: "white" }}>PayPal Client ID</Label>
              <Input type="text" placeholder="PayPal client ID" />
            </FormGroup>
          </div>

          {/* Cryptocurrency Payments */}
          <div
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h4
              style={{
                margin: "0 0 15px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ₿ Cryptocurrency
            </h4>
            <FormGroup>
              <Label style={{ color: "white" }}>Bitcoin Address</Label>
              <Input
                type="text"
                placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
              />
              <small
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                  marginTop: "5px",
                  display: "block",
                }}
              >
                Secure Bitcoin payments for international customers
              </small>
            </FormGroup>
            <FormGroup>
              <Label style={{ color: "white" }}>Ethereum Address</Label>
              <Input
                type="text"
                placeholder="0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed"
              />
              <small
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                  marginTop: "5px",
                  display: "block",
                }}
              >
                Accept ETH and ERC-20 tokens
              </small>
            </FormGroup>
            <FormGroup>
              <Label style={{ color: "white" }}>USDT TRC-20 Address</Label>
              <Input
                type="text"
                placeholder="TMDKznuDWaZwfZHcSuPPiVHbYQ8HYZ3mPt"
              />
              <small
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                  marginTop: "5px",
                  display: "block",
                }}
              >
                Tether USDT on Tron network
              </small>
            </FormGroup>
          </div>

          {/* Digital Payment Apps */}
          <div
            style={{
              background: "linear-gradient(135deg, #00b894 0%, #00a085 100%)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h4
              style={{
                margin: "0 0 15px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📱 Digital Payment Apps
            </h4>
            <FormGroup>
              <Label style={{ color: "white" }}>PayPal Tag</Label>
              <Input type="text" placeholder="@gunkpro" />
              <small
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                  marginTop: "5px",
                  display: "block",
                }}
              >
                Quick PayPal.Me payments
              </small>
            </FormGroup>
            <FormGroup>
              <Label style={{ color: "white" }}>CashApp Tag</Label>
              <Input type="text" placeholder="$GunKPro" />
              <small
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                  marginTop: "5px",
                  display: "block",
                }}
              >
                Accept payments via Cash App
              </small>
            </FormGroup>
          </div>
        </div>

        <FormGroup>
          <Label>Sales Tax Rate (%)</Label>
          <Input type="number" placeholder="8.25" step="0.01" />
        </FormGroup>

        <FormGroup>
          <Label>Federal Firearms License (FFL) Fee</Label>
          <Input type="number" placeholder="25.00" step="0.01" />
        </FormGroup>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <ActionButton variant="success">
            <span>💾</span> Save Payment Settings
          </ActionButton>
          <ActionButton variant="primary">
            <span>🔄</span> Test Payment Methods
          </ActionButton>
          <ActionButton variant="warning">
            <span>📊</span> View Payment Analytics
          </ActionButton>
        </div>

        {/* Payment Methods Overview */}
        <div
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            padding: "25px",
            borderRadius: "15px",
            marginTop: "25px",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              color: "#2c3e50",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            💰 Accepted Payment Methods
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {/* Bitcoin */}
            <div
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                border: "2px solid #f7931a",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>₿</div>
              <strong style={{ color: "#f7931a" }}>Bitcoin</strong>
              <p
                style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}
              >
                Secure, decentralized cryptocurrency
              </p>
            </div>

            {/* Ethereum */}
            <div
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                border: "2px solid #627eea",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>⧫</div>
              <strong style={{ color: "#627eea" }}>Ethereum</strong>
              <p
                style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}
              >
                Smart contract platform
              </p>
            </div>

            {/* USDT */}
            <div
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                border: "2px solid #26a17b",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>💎</div>
              <strong style={{ color: "#26a17b" }}>USDT TRC-20</strong>
              <p
                style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}
              >
                Stable coin on Tron network
              </p>
            </div>

            {/* PayPal */}
            <div
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                border: "2px solid #0070ba",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>💙</div>
              <strong style={{ color: "#0070ba" }}>PayPal</strong>
              <p
                style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}
              >
                Global digital payments
              </p>
            </div>

            {/* CashApp */}
            <div
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                border: "2px solid #00d632",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>💚</div>
              <strong style={{ color: "#00d632" }}>CashApp</strong>
              <p
                style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}
              >
                Instant peer-to-peer payments
              </p>
            </div>

            {/* Credit Cards */}
            <div
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                border: "2px solid #635bff",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>💳</div>
              <strong style={{ color: "#635bff" }}>Credit Cards</strong>
              <p
                style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}
              >
                Visa, Mastercard, Amex
              </p>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection>
        <SectionHeader>
          <span>🚚</span> Delivery Settings
        </SectionHeader>

        <FormGroup>
          <Label>Standard Shipping Rate ($)</Label>
          <Input type="number" placeholder="29.99" step="0.01" />
        </FormGroup>

        <FormGroup>
          <Label>Free Shipping Threshold ($)</Label>
          <Input type="number" placeholder="500.00" step="0.01" />
        </FormGroup>

        <FormGroup>
          <Label>Processing Time (days)</Label>
          <Input type="number" placeholder="3" />
        </FormGroup>

        <ActionButton variant="success">
          <span>💾</span> Save Delivery Settings
        </ActionButton>
      </FormSection>

      <FormSection>
        <SectionHeader>
          <span>🔧</span> Site Settings
        </SectionHeader>

        <FormGroup>
          <Label>Site Name</Label>
          <Input type="text" placeholder="Gun-k Pro" />
        </FormGroup>

        <FormGroup>
          <Label>Header Text</Label>
          <Input
            type="text"
            placeholder="Professional Firearms & Accessories"
          />
        </FormGroup>

        <FormGroup>
          <Label>FFL License Number</Label>
          <Input type="text" placeholder="1-23-456-78-9A-12345" />
        </FormGroup>

        <ActionButton variant="success">
          <span>💾</span> Save Site Settings
        </ActionButton>
      </FormSection>
    </FormGrid>
  );

  const renderUserActivity = () => (
    <div>
      <StatsGrid style={{ marginBottom: "30px" }}>
        <StatCard color="#f093fb" colorEnd="#f5576c">
          <div className="icon">👥</div>
          <div className="value">892</div>
          <div className="label">Active Users</div>
        </StatCard>

        <StatCard color="#667eea" colorEnd="#764ba2">
          <div className="icon">📊</div>
          <div className="value">3,247</div>
          <div className="label">Page Views Today</div>
        </StatCard>
      </StatsGrid>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>User</TableHeader>
            <TableHeader>Activity</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader>IP Address</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          <TableRow>
            <TableCell>john.doe@email.com</TableCell>
            <TableCell>Viewed Glock 19 Gen 5</TableCell>
            <TableCell>2 mins ago</TableCell>
            <TableCell>192.168.1.1</TableCell>
            <TableCell>
              <StatusBadge status="active">Online</StatusBadge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>jane.smith@email.com</TableCell>
            <TableCell>Added to Cart: AR-15 Sport II</TableCell>
            <TableCell>5 mins ago</TableCell>
            <TableCell>192.168.1.2</TableCell>
            <TableCell>
              <StatusBadge status="active">Online</StatusBadge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>mike.wilson@email.com</TableCell>
            <TableCell>Completed Purchase</TableCell>
            <TableCell>10 mins ago</TableCell>
            <TableCell>192.168.1.3</TableCell>
            <TableCell>
              <StatusBadge status="inactive">Offline</StatusBadge>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboardStats();
      case "products":
        return renderProductManagement();
      case "orders":
        return renderOrderManagement();
      case "users":
        return renderUserActivity();
      case "settings":
        return renderSettings();
      case "ffl":
        return <FFLRequestManager />;
      case "inventory":
        return <InventoryManager />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return renderDashboardStats();
    }
  };

  const getPageTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "📊 Dashboard Overview";
      case "products":
        return "📦 Product Management";
      case "orders":
        return "📋 Order Management";
      case "users":
        return "👥 User Activity";
      case "settings":
        return "⚙️ Settings";
      case "ffl":
        return "🏪 FFL Requests";
      case "inventory":
        return "📦 Inventory Management";
      case "analytics":
        return "📊 Analytics & Reports";
      default:
        return "📊 Dashboard";
    }
  };

  return (
    <AdminContainer>
      <Sidebar>
        <AdminHeader>
          <AdminLogo>
            <LogoIcon>
              <svg viewBox="0 0 50 50" width="28" height="28">
                <defs>
                  <linearGradient
                    id="gunGradientAdmin"
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
                    id="kGradientAdmin"
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

                <path
                  d="M10 20 L35 20 L40 15 L45 15 L45 25 L40 25 L35 20 L35 30 L30 30 L30 25 L15 25 L15 30 L10 30 Z"
                  fill="url(#gunGradientAdmin)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />

                <path
                  d="M8 10 L8 35 M8 22 L20 10 M8 22 L20 35"
                  stroke="url(#kGradientAdmin)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </LogoIcon>
            <div>
              <AdminTitle>Gun-k Pro</AdminTitle>
              <AdminSubtitle>Admin Dashboard</AdminSubtitle>
            </div>
          </AdminLogo>

          <UserInfo>
            <div className="name">Admin User</div>
            <div className="role">Super Administrator</div>
          </UserInfo>
        </AdminHeader>

        <NavigationMenu>
          <MenuSection>
            <SectionTitle>Main</SectionTitle>
            <MenuItem
              active={activeSection === "dashboard"}
              onClick={() => setActiveSection("dashboard")}
            >
              <span className="icon">📊</span>
              Dashboard
            </MenuItem>

            <MenuItem
              active={activeSection === "products"}
              onClick={() => setActiveSection("products")}
            >
              <span className="icon">📦</span>
              Products
            </MenuItem>

            <MenuItem
              active={activeSection === "orders"}
              onClick={() => setActiveSection("orders")}
            >
              <span className="icon">📋</span>
              Orders
              <NotificationBadge>12</NotificationBadge>
            </MenuItem>

            <MenuItem
              active={activeSection === "users"}
              onClick={() => setActiveSection("users")}
            >
              <span className="icon">👥</span>
              Users
            </MenuItem>

            <MenuItem
              active={activeSection === "ffl"}
              onClick={() => setActiveSection("ffl")}
            >
              <span className="icon">🏪</span>
              FFL Requests
              <NotificationBadge>3</NotificationBadge>
            </MenuItem>

            <MenuItem
              active={activeSection === "inventory"}
              onClick={() => setActiveSection("inventory")}
            >
              <span className="icon">📦</span>
              Inventory
            </MenuItem>

            <MenuItem
              active={activeSection === "analytics"}
              onClick={() => setActiveSection("analytics")}
            >
              <span className="icon">📊</span>
              Analytics
            </MenuItem>
          </MenuSection>

          <MenuSection>
            <SectionTitle>System</SectionTitle>
            <MenuItem
              active={activeSection === "settings"}
              onClick={() => setActiveSection("settings")}
            >
              <span className="icon">⚙️</span>
              Settings
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <span className="icon">🚪</span>
              Logout
            </MenuItem>
          </MenuSection>
        </NavigationMenu>
      </Sidebar>

      <MainContent>
        <TopBar>
          <PageTitle>{getPageTitle()}</PageTitle>
          <TopBarActions>
            <ActionButton variant="primary">
              <span>📊</span> Generate Report
            </ActionButton>
            <ActionButton variant="success">
              <span>💾</span> Backup Data
            </ActionButton>
            <LogoutButton onClick={handleLogout}>
              <span>🚪</span> Logout
            </LogoutButton>
          </TopBarActions>
        </TopBar>

        <ContentArea>{renderContent()}</ContentArea>
      </MainContent>
    </AdminContainer>
  );
};

export default ModernAdminDashboard;
