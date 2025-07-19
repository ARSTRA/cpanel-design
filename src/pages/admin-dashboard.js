import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { AppProvider, useApp } from "../context/AppContext.optimized";
import Layout from "../components/Layout";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 20px;
`;

const AdminContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const AdminSidebar = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  height: fit-content;
  position: sticky;
  top: 20px;
  animation: ${slideIn} 0.6s ease-out;
`;

const AdminProfile = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 2px solid #e1e8ed;
`;

const AdminAvatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 36px;
  color: white;
  font-weight: bold;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: linear-gradient(45deg, #1e3c72, #2a5298, #1e3c72);
    z-index: -1;
    animation: rotate 4s linear infinite;
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

const AdminName = styled.h3`
  color: #2c3e50;
  margin: 0 0 5px;
  font-size: 20px;
  font-weight: 700;
`;

const AdminRole = styled.p`
  color: #e74c3c;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AdminBadge = styled.span`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
  display: inline-block;
  animation: ${pulse} 2s infinite;
`;

const AdminNavMenu = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AdminNavItem = styled.div`
  padding: 18px 20px;
  margin: 10px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #2c3e50;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;

  &:hover {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    transform: translateX(8px);
  }

  ${(props) =>
    props.active &&
    `
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    box-shadow: 0 10px 30px rgba(30, 60, 114, 0.4);
    
    &::before {
      content: '';
      position: absolute;
      left: -15px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 30px;
      background: #e74c3c;
      border-radius: 2px;
    }
  `}

  .icon {
    font-size: 20px;
  }
`;

const MainAdminContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  animation: ${fadeIn} 0.8s ease-out;
`;

const AdminPageHeader = styled.div`
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 3px solid #e1e8ed;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #1e3c72, #2a5298);
  }
`;

const AdminPageTitle = styled.h1`
  color: #2c3e50;
  margin: 0 0 10px;
  font-size: 36px;
  font-weight: 700;
`;

const AdminPageSubtitle = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 18px;
`;

const AdminStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const AdminStatCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.color || "#1e3c72"} 0%,
    ${(props) => props.secondColor || "#2a5298"} 100%
  );
  color: white;
  padding: 30px;
  border-radius: 18px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
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
`;

const AdminStatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const AdminStatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  font-weight: 500;
`;

const AdminStatIcon = styled.div`
  font-size: 24px;
  margin-bottom: 15px;
`;

const AdminContentSection = styled.div`
  margin-bottom: 45px;
`;

const AdminSectionTitle = styled.h2`
  color: #2c3e50;
  margin: 0 0 25px;
  font-size: 28px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AdminCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
`;

const AdminCard = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 18px;
  padding: 30px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const AdminFormGroup = styled.div`
  margin-bottom: 25px;
`;

const AdminLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 15px;
`;

const AdminInput = styled.input`
  width: 100%;
  padding: 15px 18px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1e3c72;
    box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
  }
`;

const AdminTextarea = styled.textarea`
  width: 100%;
  padding: 15px 18px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 15px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1e3c72;
    box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
  }
`;

const AdminSelect = styled.select`
  width: 100%;
  padding: 15px 18px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 15px;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1e3c72;
    box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
  }
`;

const AdminButton = styled.button`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(30, 60, 114, 0.4);
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
      box-shadow: 0 10px 30px rgba(231, 76, 60, 0.4);
    }
  }

  &.success {
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);

    &:hover {
      box-shadow: 0 10px 30px rgba(39, 174, 96, 0.4);
    }
  }
`;

const AdminTable = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
`;

const AdminTableHeader = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 25px;
  font-weight: 700;
  font-size: 18px;
`;

const AdminTableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr 1fr 1fr 1fr"};
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e1e8ed;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const AdminProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 15px;
`;

const AdminStatusTag = styled.span`
  padding: 6px 15px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;

  &.active {
    background: #d4edda;
    color: #155724;
  }

  &.inactive {
    background: #f8d7da;
    color: #721c24;
  }

  &.pending {
    background: #fff3cd;
    color: #856404;
  }
`;

function AdminDashboardContent() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "handguns",
    manufacturer: "",
    caliber: "",
    capacity: "",
    images: [],
  });

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Gun-k Pro",
    headerText: "Professional firearms and accessories store",
    paymentMethods: ["credit_card", "bank_transfer", "financing"],
    shippingRates: {
      standard: "15.99",
      expedited: "29.99",
      overnight: "49.99",
    },
    taxRate: "8.25",
  });

  const adminMenuItems = [
    { id: "overview", icon: "📊", label: "Dashboard Overview" },
    { id: "products", icon: "🔫", label: "Product Management" },
    { id: "orders", icon: "📦", label: "Order Management" },
    { id: "users", icon: "👥", label: "User Management" },
    { id: "payments", icon: "💳", label: "Payment Settings" },
    { id: "shipping", icon: "🚚", label: "Shipping Settings" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "settings", icon: "⚙️", label: "Site Settings" },
  ];

  const handleProductSubmit = (e) => {
    e.preventDefault();
    // Add product logic here
    const productData = {
      ...newProduct,
      id: Date.now(),
      featured: false,
      stock: 1,
      inStock: true,
      displayLocation: [newProduct.category],
    };

    dispatch({
      type: "ADD_PRODUCT",
      payload: productData,
    });

    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "handguns",
      manufacturer: "",
      caliber: "",
      capacity: "",
      images: [],
    });

    alert("Product added successfully!");
  };

  const renderOverview = () => (
    <>
      <AdminPageHeader>
        <AdminPageTitle>🎯 Admin Dashboard</AdminPageTitle>
        <AdminPageSubtitle>
          Complete control center for your firearms business
        </AdminPageSubtitle>
      </AdminPageHeader>

      <AdminStatsGrid>
        <AdminStatCard color="#1e3c72" secondColor="#2a5298">
          <AdminStatIcon>📦</AdminStatIcon>
          <AdminStatNumber>{state.products.length}</AdminStatNumber>
          <AdminStatLabel>Total Products</AdminStatLabel>
        </AdminStatCard>
        <AdminStatCard color="#27ae60" secondColor="#2ecc71">
          <AdminStatIcon>💰</AdminStatIcon>
          <AdminStatNumber>$45,239</AdminStatNumber>
          <AdminStatLabel>Monthly Revenue</AdminStatLabel>
        </AdminStatCard>
        <AdminStatCard color="#f39c12" secondColor="#e67e22">
          <AdminStatIcon>👥</AdminStatIcon>
          <AdminStatNumber>1,247</AdminStatNumber>
          <AdminStatLabel>Active Users</AdminStatLabel>
        </AdminStatCard>
        <AdminStatCard color="#e74c3c" secondColor="#c0392b">
          <AdminStatIcon>📈</AdminStatIcon>
          <AdminStatNumber>23</AdminStatNumber>
          <AdminStatLabel>Pending Orders</AdminStatLabel>
        </AdminStatCard>
      </AdminStatsGrid>

      <AdminContentSection>
        <AdminSectionTitle>📊 Quick Actions</AdminSectionTitle>
        <AdminCardGrid>
          <AdminCard>
            <h3>🚀 Add New Product</h3>
            <p>Quickly add a new firearm or accessory to your inventory</p>
            <AdminButton onClick={() => setActiveTab("products")}>
              Add Product
            </AdminButton>
          </AdminCard>
          <AdminCard>
            <h3>📦 Process Orders</h3>
            <p>Review and process pending customer orders</p>
            <AdminButton onClick={() => setActiveTab("orders")}>
              View Orders
            </AdminButton>
          </AdminCard>
          <AdminCard>
            <h3>⚙️ Site Configuration</h3>
            <p>Update site settings, payment methods, and policies</p>
            <AdminButton onClick={() => setActiveTab("settings")}>
              Configure Site
            </AdminButton>
          </AdminCard>
        </AdminCardGrid>
      </AdminContentSection>
    </>
  );

  const renderProducts = () => (
    <>
      <AdminPageHeader>
        <AdminPageTitle>🔫 Product Management</AdminPageTitle>
        <AdminPageSubtitle>
          Add, edit, and manage your firearms inventory
        </AdminPageSubtitle>
      </AdminPageHeader>

      <AdminCardGrid>
        <AdminCard>
          <AdminSectionTitle>➕ Add New Product</AdminSectionTitle>
          <form onSubmit={handleProductSubmit}>
            <AdminFormGroup>
              <AdminLabel>Product Name</AdminLabel>
              <AdminInput
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="e.g., Glock 19 Gen 5"
                required
              />
            </AdminFormGroup>

            <AdminFormGroup>
              <AdminLabel>Category</AdminLabel>
              <AdminSelect
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                <option value="handguns">Handguns</option>
                <option value="rifles">Rifles</option>
                <option value="shotguns">Shotguns</option>
                <option value="accessories">Accessories</option>
                <option value="ammunition">Ammunition</option>
              </AdminSelect>
            </AdminFormGroup>

            <AdminFormGroup>
              <AdminLabel>Price ($)</AdminLabel>
              <AdminInput
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                placeholder="599.99"
                required
              />
            </AdminFormGroup>

            <AdminFormGroup>
              <AdminLabel>Manufacturer</AdminLabel>
              <AdminInput
                value={newProduct.manufacturer}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, manufacturer: e.target.value })
                }
                placeholder="e.g., Glock, Smith & Wesson"
                required
              />
            </AdminFormGroup>

            <AdminFormGroup>
              <AdminLabel>Caliber</AdminLabel>
              <AdminInput
                value={newProduct.caliber}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, caliber: e.target.value })
                }
                placeholder="e.g., 9mm Luger, .45 ACP"
              />
            </AdminFormGroup>

            <AdminFormGroup>
              <AdminLabel>Description</AdminLabel>
              <AdminTextarea
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                placeholder="Detailed product description including features and specifications"
                required
              />
            </AdminFormGroup>

            <AdminFormGroup>
              <AdminLabel>Product Images</AdminLabel>
              <AdminInput type="file" multiple accept="image/*" />
            </AdminFormGroup>

            <AdminButton type="submit" className="success">
              Add Product to Inventory
            </AdminButton>
          </form>
        </AdminCard>

        <AdminCard>
          <AdminSectionTitle>📋 Current Inventory</AdminSectionTitle>
          <AdminTable>
            <AdminTableHeader>
              Product Inventory (
              {state.products.filter((p) => p.category === "handguns").length}{" "}
              items)
            </AdminTableHeader>
            {state.products
              .filter((p) => p.category === "handguns")
              .slice(0, 5)
              .map((product) => (
                <AdminTableRow key={product.id} columns="2fr 1fr 1fr 1fr">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AdminProductImage
                      src={
                        product.images?.[0] ||
                        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=100&h=100&fit=crop&auto=format&q=80"
                      }
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: "600", color: "#2c3e50" }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#7f8c8d" }}>
                        {product.manufacturer}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: "600", color: "#27ae60" }}>
                    ${product.price}
                  </div>
                  <AdminStatusTag
                    className={product.inStock ? "active" : "inactive"}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </AdminStatusTag>
                  <div>
                    <AdminButton
                      className="secondary"
                      style={{
                        padding: "8px 15px",
                        fontSize: "12px",
                        marginRight: "5px",
                      }}
                    >
                      Edit
                    </AdminButton>
                    <AdminButton
                      className="danger"
                      style={{ padding: "8px 15px", fontSize: "12px" }}
                    >
                      Delete
                    </AdminButton>
                  </div>
                </AdminTableRow>
              ))}
          </AdminTable>
        </AdminCard>
      </AdminCardGrid>
    </>
  );

  const renderSettings = () => (
    <>
      <AdminPageHeader>
        <AdminPageTitle>⚙️ Site Settings</AdminPageTitle>
        <AdminPageSubtitle>
          Configure your website settings and business preferences
        </AdminPageSubtitle>
      </AdminPageHeader>

      <AdminCardGrid>
        <AdminCard>
          <AdminSectionTitle>🏢 Business Information</AdminSectionTitle>
          <AdminFormGroup>
            <AdminLabel>Site Name</AdminLabel>
            <AdminInput
              value={siteSettings.siteName}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, siteName: e.target.value })
              }
            />
          </AdminFormGroup>
          <AdminFormGroup>
            <AdminLabel>Header Text</AdminLabel>
            <AdminInput
              value={siteSettings.headerText}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, headerText: e.target.value })
              }
            />
          </AdminFormGroup>
          <AdminFormGroup>
            <AdminLabel>Tax Rate (%)</AdminLabel>
            <AdminInput
              type="number"
              step="0.01"
              value={siteSettings.taxRate}
              onChange={(e) =>
                setSiteSettings({ ...siteSettings, taxRate: e.target.value })
              }
            />
          </AdminFormGroup>
          <AdminButton className="success">Update Business Info</AdminButton>
        </AdminCard>

        <AdminCard>
          <AdminSectionTitle>💳 Payment Settings</AdminSectionTitle>
          <AdminFormGroup>
            <AdminLabel>Accepted Payment Methods</AdminLabel>
            {[
              "credit_card",
              "bank_transfer",
              "financing",
              "cryptocurrency",
            ].map((method) => (
              <div key={method} style={{ marginBottom: "10px" }}>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <input
                    type="checkbox"
                    checked={siteSettings.paymentMethods.includes(method)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSiteSettings({
                          ...siteSettings,
                          paymentMethods: [
                            ...siteSettings.paymentMethods,
                            method,
                          ],
                        });
                      } else {
                        setSiteSettings({
                          ...siteSettings,
                          paymentMethods: siteSettings.paymentMethods.filter(
                            (m) => m !== method,
                          ),
                        });
                      }
                    }}
                  />
                  {method.replace("_", " ").toUpperCase()}
                </label>
              </div>
            ))}
          </AdminFormGroup>
          <AdminButton className="success">Update Payment Settings</AdminButton>
        </AdminCard>

        <AdminCard>
          <AdminSectionTitle>🚚 Shipping Configuration</AdminSectionTitle>
          <AdminFormGroup>
            <AdminLabel>Standard Shipping ($)</AdminLabel>
            <AdminInput
              type="number"
              step="0.01"
              value={siteSettings.shippingRates.standard}
              onChange={(e) =>
                setSiteSettings({
                  ...siteSettings,
                  shippingRates: {
                    ...siteSettings.shippingRates,
                    standard: e.target.value,
                  },
                })
              }
            />
          </AdminFormGroup>
          <AdminFormGroup>
            <AdminLabel>Expedited Shipping ($)</AdminLabel>
            <AdminInput
              type="number"
              step="0.01"
              value={siteSettings.shippingRates.expedited}
              onChange={(e) =>
                setSiteSettings({
                  ...siteSettings,
                  shippingRates: {
                    ...siteSettings.shippingRates,
                    expedited: e.target.value,
                  },
                })
              }
            />
          </AdminFormGroup>
          <AdminFormGroup>
            <AdminLabel>Overnight Shipping ($)</AdminLabel>
            <AdminInput
              type="number"
              step="0.01"
              value={siteSettings.shippingRates.overnight}
              onChange={(e) =>
                setSiteSettings({
                  ...siteSettings,
                  shippingRates: {
                    ...siteSettings.shippingRates,
                    overnight: e.target.value,
                  },
                })
              }
            />
          </AdminFormGroup>
          <AdminButton className="success">Update Shipping Rates</AdminButton>
        </AdminCard>
      </AdminCardGrid>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "products":
        return renderProducts();
      case "orders":
        return renderOverview(); // Placeholder
      case "users":
        return renderOverview(); // Placeholder
      case "payments":
        return renderSettings(); // Use settings for payments
      case "shipping":
        return renderSettings(); // Use settings for shipping
      case "analytics":
        return renderOverview(); // Placeholder
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <AdminContainer>
      <AdminContent>
        <AdminSidebar>
          <AdminProfile>
            <AdminAvatar>A</AdminAvatar>
            <AdminName>Administrator</AdminName>
            <AdminRole>System Admin</AdminRole>
            <AdminBadge>Full Access</AdminBadge>
          </AdminProfile>

          <AdminNavMenu>
            {adminMenuItems.map((item) => (
              <AdminNavItem
                key={item.id}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </AdminNavItem>
            ))}
          </AdminNavMenu>
        </AdminSidebar>

        <MainAdminContent>{renderContent()}</MainAdminContent>
      </AdminContent>
    </AdminContainer>
  );
}

const AdminDashboardPage = () => {
  return (
    <AppProvider>
      <Layout>
        <AdminDashboardContent />
      </Layout>
    </AppProvider>
  );
};

export default AdminDashboardPage;

export const Head = () => <title>Admin Dashboard | Gun-k Pro</title>;
